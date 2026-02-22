import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorContainerComponent } from './features/editor/editor-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EditorContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-practica');
}
