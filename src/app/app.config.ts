import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { TodoStore } from './shared/store/todo.store';
import { provideComponentStore } from '@ngrx/component-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideComponentStore(TodoStore),
  ],
};
