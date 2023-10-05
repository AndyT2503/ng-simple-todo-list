import { TODO_STATUS } from '../shared/constants';
import { createInjectionToken } from '../shared/utils';

export const [injectTodoStatus, provideTodoStatus] =
  createInjectionToken<TODO_STATUS>('Todo Status');
