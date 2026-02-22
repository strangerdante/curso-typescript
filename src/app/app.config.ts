import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, Target, Lightbulb, Sparkles, Pencil, CheckCircle2, Play, Menu, X, ChevronDown, ChevronRight, ArrowRightCircle } from 'lucide-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(LucideAngularModule.pick({ Target, Lightbulb, Sparkles, Pencil, CheckCircle2, Play, Menu, X, ChevronDown, ChevronRight, ArrowRightCircle }))
  ]
};
