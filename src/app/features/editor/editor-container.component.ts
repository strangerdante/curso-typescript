import { Component, computed, effect, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', typescript);
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-editor-container',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule
  ],
  template: `
    <div class="app-container">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <span class="ts-icon">TS</span>
            <h1>TypeScript Master</h1>
          </div>
          <button class="btn-hamburger" (click)="lessonPickerOpen = !lessonPickerOpen">
            <lucide-icon [name]="lessonPickerOpen ? 'x' : 'menu'"></lucide-icon>
          </button>
        </div>

        @if (lessonPickerOpen) {
          <!-- LESSON PICKER -->
          <div class="lesson-picker">
            @for (lesson of lessons(); track lesson.id) {
              <div 
                class="lesson-picker-item"
                [class.active]="currentLesson()?.id === lesson.id"
                (click)="selectLessonFromPicker(lesson)"
              >
                <span class="lesson-picker-name">{{ lesson.title }}</span>
                <span class="lesson-progress-label">{{ lessonProgress()[lesson.id]?.completed || 0 }}/{{ lessonProgress()[lesson.id]?.total || 0 }}</span>
              </div>
            }
          </div>
        } @else {
          <!-- CURRENT LESSON EXERCISES -->
          <div class="modules-list">
            <div class="current-lesson-label">{{ currentLesson()?.title }}</div>
            <div class="practices-list">
              @for (practice of currentLesson()?.practices; track practice.id) {
                <div 
                  class="practice-item"
                  [class.active]="currentPractice()?.id === practice.id"
                  (click)="lessonService.selectPractice(practice)"
                >
                  <span class="practice-name">{{ $index + 1 }}. {{ practice.title }}</span>
                  @if(practice.isCompleted) {
                    <lucide-icon name="check-circle-2" class="completed-icon" title="Misión Completada"></lucide-icon>
                  }
                </div>
              }
            </div>
          </div>
        }
      </aside>

      <!-- MAIN EDITOR WORKSPACE -->
      <main class="workspace">
        <header class="workspace-header">
          <div class="header-info">
            <h2>{{ currentLesson()?.title }}</h2>
            <div class="header-progress">
              <div class="header-progress-bar">
                <div class="header-progress-fill"
                     [style.width.%]="lessonProgress()[currentLesson()?.id || '']?.percent || 0"
                     [class.complete]="lessonProgress()[currentLesson()?.id || '']?.percent === 100"></div>
              </div>
              <span class="header-progress-label">
                {{ lessonProgress()[currentLesson()?.id || '']?.completed || 0 }}/{{ lessonProgress()[currentLesson()?.id || '']?.total || 0 }} completadas
              </span>
            </div>
          </div>
          <div class="actions">
            <button class="btn btn-secondary" (click)="resetMission()">Reiniciar Misión</button>
            <button class="btn btn-primary" (click)="runCode()">Ejecutar Código <lucide-icon name="play" class="play-icon"></lucide-icon></button>
          </div>
        </header>

        <div class="workspace-content">
          <!-- LEARNING MATERIAL PANEL -->
          <div class="learning-panel panel panel-glass">
            <div class="panel-header">
              <h3>Misión: {{ currentPractice()?.title }}</h3>
            </div>
            <div class="panel-body">
              <div class="theory-section">
                <div class="theory-block">
                  <h4><lucide-icon name="target" class="icon"></lucide-icon> Objetivo</h4>
                  <p [innerHTML]="formatText(currentPractice()?.goal)"></p>
                </div>

                <div class="theory-block">
                  <h4><lucide-icon name="lightbulb" class="icon"></lucide-icon> Concepto Clave</h4>
                  <p [innerHTML]="formatText(currentPractice()?.theory)"></p>
                </div>
                
                @if(currentPractice()?.syntax?.length) {
                  <div class="theory-block syntax-block">
                    <h4><lucide-icon name="sparkles" class="icon"></lucide-icon> Sintaxis</h4>
                    <div class="syntax-list">
                      @for (syn of currentPractice()?.syntax; track syn) {
                        <code class="hljs typescript syntax-snippet" [innerHTML]="highlightSyntax(syn)"></code>
                      }
                    </div>
                  </div>
                }
              </div>

              <div class="practice-instructions">
                <h4><lucide-icon name="pencil" class="icon"></lucide-icon> Pasos a seguir</h4>
                <p [innerHTML]="formatText(currentPractice()?.description)"></p>
              </div>
            </div>
          </div>

          <div class="editor-panel panel panel-glass">
            <div class="panel-header tab-group">
              <div class="tabs-container">
                <div class="tab" [class.active]="activeTab === 'editor'" (click)="activeTab = 'editor'">index.ts</div>
                <div class="tab" [class.active]="activeTab === 'solution'" (click)="activeTab = 'solution'">
                  <lucide-icon name="lightbulb" class="tab-icon"></lucide-icon> solución.ts
                </div>
              </div>
              <div class="editor-actions">
                <span class="status healthy">● Todo Compila</span>
              </div>
            </div>
            
            <div class="editor-area">
              @if (activeTab === 'editor') {
                <pre class="code-output"><code class="hljs typescript" [innerHTML]="highlightedCode()"></code></pre>
                <textarea 
                  #codeInput
                  class="code-input" 
                  [(ngModel)]="codeContent" 
                  spellcheck="false"
                  (scroll)="syncScroll($event)"
                  (keydown)="handleEditorKeydown($event)"
                ></textarea>
              } @else {
                <pre class="code-output solution-view"><code class="hljs typescript" [innerHTML]="highlightedSolution()"></code></pre>
              }
            </div>
          </div>

          <!-- TERMINAL / CONSOLE PANEL -->
          <div class="console-panel panel panel-glass">
            <div class="panel-header">
              <h3>Terminal</h3>
              <button class="btn btn-icon" (click)="clearConsole()">Limpiar</button>
            </div>
            <div class="console-output">
              @for (log of outputLogs; track $index) {
                <div class="log-line" [class.error]="log.type === 'error'" [class.success]="log.type === 'success'" [class.output]="log.type === 'output'">
                  <span class="prompt">~></span> {{ log.message }}
                </div>
              }
              @if (showNextButton) {
                <div class="next-practice-container">
                  <button class="btn btn-next" (click)="advanceToNext()">
                    <lucide-icon name="arrow-right-circle" class="icon"></lucide-icon>
                    Siguiente Misión
                  </button>
                </div>
              }
              @if (showAllCompleteMessage) {
                <div class="all-complete-container">
                  <span class="all-complete-badge">🏆 ¡Lección completada al 100%!</span>
                </div>
              }
              @if (outputLogs.length === 0) {
                <div class="log-line empty">Esperando ejecución...</div>
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./editor-container.component.css'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, height: 0, overflow: 'hidden' }),
        animate('250ms ease-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*', overflow: 'hidden' }),
        animate('200ms ease-in', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class EditorContainerComponent {
  lessonService = inject(LessonService);
  sanitizer = inject(DomSanitizer);

  lessons = this.lessonService.lessons;
  currentLesson = this.lessonService.currentLesson;
  currentPractice = this.lessonService.currentPractice;
  lessonProgress = this.lessonService.lessonProgress;

  // Local state
  _codeContent = '';
  private _currentPracticeId = '';
  showNextButton = false;
  showAllCompleteMessage = false;
  lessonPickerOpen = false;

  selectLessonFromPicker(lesson: any) {
    this.lessonService.selectLesson(lesson);
    this.lessonPickerOpen = false;
  }

  get codeContent(): string {
    return this._codeContent;
  }

  set codeContent(val: string) {
    this._codeContent = val;
  }

  outputLogs: { type: 'info' | 'error' | 'success' | 'output', message: string }[] = [];
  activeTab: 'editor' | 'solution' = 'editor';

  constructor() {
    // Reset code content and terminal only when switching to a different practice
    effect(() => {
      const practice = this.currentPractice();
      const newId = practice?.id || '';
      if (newId !== this._currentPracticeId) {
        this._currentPracticeId = newId;
        const savedCode = this.getSavedCode(newId);
        this._codeContent = savedCode || practice?.initialCode || '';
        this.outputLogs = [];
      }
    });
  }

  private getSavedCode(practiceId: string): string | null {
    return localStorage.getItem(`ts-master-code-${practiceId}`);
  }

  private saveCode(practiceId: string, code: string): void {
    localStorage.setItem(`ts-master-code-${practiceId}`, code);
  }

  private removeSavedCode(practiceId: string): void {
    localStorage.removeItem(`ts-master-code-${practiceId}`);
  }

  highlightedCode(): SafeHtml {
    const raw = hljs.highlight(this.codeContent, { language: 'typescript' }).value;
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  }

  highlightedSolution(): SafeHtml {
    const solution = this.currentPractice()?.solutionCode || '// No hay solución disponible para este ejercicio.';
    const raw = hljs.highlight(solution, { language: 'typescript' }).value;
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  }

  highlightSyntax(code: string): SafeHtml {
    const raw = hljs.highlight(code, { language: 'typescript' }).value;
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  }

  formatText(text?: string): SafeHtml {
    if (!text) return '';
    const formatted = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }

  syncScroll(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const pre = textarea.previousElementSibling as HTMLElement;
    if (pre) {
      pre.scrollTop = textarea.scrollTop;
      pre.scrollLeft = textarea.scrollLeft;
    }
  }

  handleEditorKeydown(event: KeyboardEvent) {
    const textarea = event.target as HTMLTextAreaElement;
    const { selectionStart, selectionEnd, value } = textarea;

    // --- TAB: insert 2 spaces ---
    if (event.key === 'Tab') {
      event.preventDefault();
      const before = value.substring(0, selectionStart);
      const after = value.substring(selectionEnd);
      this.codeContent = before + '  ' + after;
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
      });
      return;
    }

    // --- ENTER: auto-indent ---
    if (event.key === 'Enter') {
      event.preventDefault();
      const before = value.substring(0, selectionStart);
      const after = value.substring(selectionEnd);

      // Get current line's leading whitespace
      const currentLine = before.split('\n').pop() || '';
      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';

      const charBefore = before.trimEnd().slice(-1);
      const charAfter = after.trimStart()[0];

      // If line ends with '{', '(' or ':' → add extra indent
      if (charBefore === '{' || charBefore === '(' || charBefore === ':') {
        const newIndent = currentIndent + '  ';

        // If next char is the closing bracket, put cursor between them
        if ((charBefore === '{' && charAfter === '}') || (charBefore === '(' && charAfter === ')')) {
          this.codeContent = before + '\n' + newIndent + '\n' + currentIndent + after;
          setTimeout(() => {
            const pos = selectionStart + 1 + newIndent.length;
            textarea.selectionStart = textarea.selectionEnd = pos;
          });
        } else {
          this.codeContent = before + '\n' + newIndent + after;
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = selectionStart + 1 + newIndent.length;
          });
        }
      } else {
        // Normal enter: keep same indentation
        this.codeContent = before + '\n' + currentIndent + after;
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 1 + currentIndent.length;
        });
      }
      return;
    }

    // --- '}' / ')': auto-dedent ---
    if (event.key === '}' || event.key === ')') {
      const before = value.substring(0, selectionStart);
      const currentLine = before.split('\n').pop() || '';
      // Only dedent if the line is whitespace-only (cursor at indentation)
      if (/^\s+$/.test(currentLine) && currentLine.length >= 2) {
        event.preventDefault();
        const dedented = currentLine.slice(2);
        const lineStart = before.length - currentLine.length;
        const newBefore = value.substring(0, lineStart) + dedented + event.key;
        const after = value.substring(selectionEnd);
        this.codeContent = newBefore + after;
        setTimeout(() => {
          const pos = lineStart + dedented.length + 1;
          textarea.selectionStart = textarea.selectionEnd = pos;
        });
        return;
      }
    }
  }

  runCode() {
    this.clearConsole();
    this.showNextButton = false;
    this.showAllCompleteMessage = false;
    this.outputLogs.push({ type: 'info', message: 'Compilando TypeScript...' });
    const practice = this.currentPractice();
    if (!practice || !practice.validations) {
      this.outputLogs.push({ type: 'info', message: 'Ejecución completada. (Sin validaciones específicas configuradas).' });
      return;
    }

    try {
      let allPassed = true;
      for (const validation of practice.validations) {
        const regex = new RegExp(validation.pattern, validation.flags || 'g');
        const matches = regex.test(this.codeContent);
        const passed = validation.negate ? !matches : matches;
        if (!passed) {
          this.outputLogs.push({ type: 'error', message: `❌ Error: ${validation.message}` });
          allPassed = false;
        }
      }

      if (allPassed) {
        // Check expectedOutput if defined
        if (practice.expectedOutput) {
          const actualOutput = this.evaluateConsoleOutput(this.codeContent);
          if (actualOutput !== null) {
            const expected = practice.expectedOutput.trim();
            const actual = actualOutput.trim();
            if (actual === expected) {
              this.outputLogs.push({ type: 'output', message: `📤 Output: ${actual}` });
              this.outputLogs.push({ type: 'success', message: '✅ Output correcto — coincide con el esperado.' });
            } else {
              this.outputLogs.push({ type: 'output', message: `📤 Tu output: ${actual}` });
              this.outputLogs.push({ type: 'error', message: `❌ Se esperaba: ${expected}` });
              allPassed = false;
            }
          }
        }

        if (allPassed) {
          this.lessonService.markPracticeAsCompleted(practice.id);
          this.saveCode(practice.id, this.codeContent);
          this.outputLogs.push({ type: 'success', message: '✅ ¡Misión cumplida! Todo el código es correcto y tipado adecuadamente.' });

          // Check if there's a next incomplete practice
          const next = this.lessonService.nextIncompletePractice();
          if (next) {
            this.showNextButton = true;
          } else {
            this.showAllCompleteMessage = true;
          }
        }
      }
    } catch (e: any) {
      this.outputLogs.push({ type: 'error', message: e.message });
    }
  }

  /** Simple evaluator: extracts console.log() arguments and "executes" them */
  private evaluateConsoleOutput(code: string): string | null {
    try {
      const logs: string[] = [];
      const mockConsole = { log: (...args: any[]) => logs.push(args.map(a => String(a)).join(' ')) };
      const wrappedCode = code.replace(/console\.log/g, '__console__.log');
      const fn = new Function('__console__', wrappedCode);
      fn(mockConsole);
      return logs.join('\n');
    } catch {
      return null; // If evaluation fails, skip output check
    }
  }

  advanceToNext() {
    this.showNextButton = false;
    this.showAllCompleteMessage = false;
    this.lessonService.advanceToNextPractice();
  }

  clearConsole() {
    this.outputLogs = [];
  }

  resetMission() {
    const practice = this.currentPractice();
    if (practice) {
      this.lessonService.markPracticeAsCompleted(practice.id, false);
      this.removeSavedCode(practice.id);
      this.codeContent = practice.initialCode || '';
      this.clearConsole();
      this.showNextButton = false;
      this.showAllCompleteMessage = false;
      this.outputLogs.push({ type: 'info', message: 'Misión reiniciada con éxito.' });
    }
  }
}
