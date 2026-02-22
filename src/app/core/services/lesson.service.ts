import { Injectable, signal, computed } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { LESSON_1 } from '../data/lesson-1.data';
import { LESSON_2 } from '../data/lesson-2.data';
import { LESSON_3 } from '../data/lesson-3.data';
import { LESSON_4 } from '../data/lesson-4.data';
import { LESSON_5 } from '../data/lesson-5.data';

const COMPLETED_KEY = 'ts-master-completed';

@Injectable({
    providedIn: 'root'
})
export class LessonService {
    lessons = signal<Lesson[]>(this.loadLessonsWithProgress());

    currentLesson = signal<Lesson | null>(this.lessons()[0]);
    currentPractice = signal<any | null>(this.lessons()[0].practices[0]);

    /** Progress per lesson: { completed, total, percent } */
    lessonProgress = computed(() => {
        const lessons = this.lessons();
        const progressMap: Record<string, { completed: number; total: number; percent: number }> = {};
        for (const lesson of lessons) {
            const total = lesson.practices.length;
            const completed = lesson.practices.filter(p => p.isCompleted).length;
            progressMap[lesson.id] = {
                completed,
                total,
                percent: total > 0 ? Math.round((completed / total) * 100) : 0
            };
        }
        return progressMap;
    });

    /** Next incomplete practice in the current lesson */
    nextIncompletePractice = computed(() => {
        const lesson = this.currentLesson();
        const currentPractice = this.currentPractice();
        if (!lesson || !currentPractice) return null;

        const currentIndex = lesson.practices.findIndex(p => p.id === currentPractice.id);

        // First, look for the next incomplete after current
        for (let i = currentIndex + 1; i < lesson.practices.length; i++) {
            if (!lesson.practices[i].isCompleted) {
                return lesson.practices[i];
            }
        }
        // Then, look before current (wrap around)
        for (let i = 0; i < currentIndex; i++) {
            if (!lesson.practices[i].isCompleted) {
                return lesson.practices[i];
            }
        }
        return null; // All completed!
    });

    selectLesson(lesson: Lesson) {
        this.currentLesson.set(lesson);
        this.currentPractice.set(lesson.practices[0]);
    }

    selectPractice(practice: any) {
        this.currentPractice.set(practice);
    }

    markPracticeAsCompleted(practiceId: string, isCompleted: boolean = true) {
        // Update localStorage
        const completedIds = this.getCompletedIds();
        if (isCompleted) {
            completedIds.add(practiceId);
        } else {
            completedIds.delete(practiceId);
        }
        localStorage.setItem(COMPLETED_KEY, JSON.stringify([...completedIds]));

        // Update signals
        this.lessons.update(lessons => {
            return lessons.map(lesson => ({
                ...lesson,
                practices: lesson.practices.map(p =>
                    p.id === practiceId ? { ...p, isCompleted } : p
                )
            }));
        });

        const cp = this.currentPractice();
        if (cp && cp.id === practiceId) {
            this.currentPractice.set({ ...cp, isCompleted });
        }
    }

    advanceToNextPractice(): boolean {
        const next = this.nextIncompletePractice();
        if (next) {
            this.currentPractice.set(next);
            return true;
        }
        return false;
    }

    private loadLessonsWithProgress(): Lesson[] {
        const completedIds = this.getCompletedIds();
        return [LESSON_1, LESSON_2, LESSON_3, LESSON_4, LESSON_5].map(lesson => ({
            ...lesson,
            practices: lesson.practices.map(p => ({
                ...p,
                isCompleted: completedIds.has(p.id)
            }))
        }));
    }

    private getCompletedIds(): Set<string> {
        try {
            const raw = localStorage.getItem(COMPLETED_KEY);
            return raw ? new Set(JSON.parse(raw)) : new Set();
        } catch {
            return new Set();
        }
    }
}
