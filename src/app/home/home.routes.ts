import { Routes } from '@angular/router';
import { provideTodoStatus } from './home.di';
import { TODO_STATUS } from '../shared/constants';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/list/list.component').then((c) => c.ListComponent),
    providers: [provideTodoStatus(TODO_STATUS.all)],
  },
  {
    path: 'planning',
    loadComponent: () =>
      import('./ui/list/list.component').then((c) => c.ListComponent),
    providers: [provideTodoStatus(TODO_STATUS.planning)],
  },
  {
    path: 'processing',
    loadComponent: () =>
      import('./ui/list/list.component').then((c) => c.ListComponent),
    providers: [provideTodoStatus(TODO_STATUS.processing)],
  },
  {
    path: 'complete',
    loadComponent: () =>
      import('./ui/list/list.component').then((c) => c.ListComponent),
    providers: [provideTodoStatus(TODO_STATUS.complete)],
  },
];
