import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { TodoStore } from 'src/app/shared/store/todo.store';
import { injectTodoStatus } from '../../home.di';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TodoItemComponent, NgFor, AsyncPipe],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  readonly #todoStatus = injectTodoStatus();
  readonly todoStore = inject(TodoStore);
  readonly todoList$ = combineLatest([
    this.todoStore.search$,
    this.todoStore.getTodoList(this.#todoStatus),
  ]).pipe(
    map(([search, todoList]) => {
      if (!search) {
        return todoList;
      }
      return todoList.filter((item) =>
        item.title.toLowerCase().trim().includes(search.trim())
      );
    })
  );
}
