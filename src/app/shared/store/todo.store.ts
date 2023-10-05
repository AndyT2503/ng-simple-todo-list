import { Injectable, inject } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { Observable, map, tap } from 'rxjs';
import { STORAGE_KEY, TODO_STATUS } from '../constants';
import { TodoItem } from '../models';
import { LocalStorageService } from '../utils';
import { Router } from '@angular/router';

interface TodoState {
  todoList: TodoItem[];
  search: string;
}

@Injectable()
export class TodoStore
  extends ComponentStore<TodoState>
  implements OnStoreInit
{
  readonly #localStorage = inject(LocalStorageService);
  readonly #router = inject(Router);
  readonly search$ = this.select((s) => s.search);
  ngrxOnStoreInit(): void {
    this.setState({
      todoList: this.#localStorage.getItem<TodoItem[]>(STORAGE_KEY.todo) || [],
      search: '',
    });
  }

  getTodoList(status: TODO_STATUS): Observable<TodoItem[]> {
    return this.select((s) => s.todoList).pipe(
      map((todos) => {
        if (status === TODO_STATUS.all) {
          return todos;
        } else {
          return todos.filter((item) => item.status === status);
        }
      })
    );
  }

  updateSearch(search: string): void {
    this.patchState({
      search,
    });
  }

  getTodoDetail(title: string): TodoItem {
    return this.get((s) => s.todoList).find((x) => x.title === title)!;
  }

  readonly addTodo = this.effect<Omit<TodoItem, 'status'>>(
    tap((todoItem) => {
      const newTodoItem = { ...todoItem, status: TODO_STATUS.planning };
      this.patchState((s) => ({
        todoList: [...s.todoList, newTodoItem],
      }));
      this.#updateLocalStorage();
      this.#router.navigate(['/']);
    })
  );

  readonly #updateLocalStorage = this.effect<void>(
    tap(() => {
      const currTodoList = this.get((s) => s.todoList);
      this.#localStorage.setItem(STORAGE_KEY.todo, currTodoList);
    })
  );

  readonly removeTodo = this.effect<TodoItem>(
    tap((todoItem) => {
      this.patchState((s) => ({
        todoList: [...s.todoList.filter((x) => x.title !== todoItem.title)],
      }));
      this.#updateLocalStorage();
    })
  );

  readonly changeStatus = this.effect<TodoItem>(
    tap((todoItem) => {
      const updateTodo = this.get((s) => s.todoList).find(
        (x) => x.title === todoItem.title
      )!;

      switch (updateTodo.status) {
        case TODO_STATUS.planning:
          updateTodo.status = TODO_STATUS.processing;
          break;
        case TODO_STATUS.processing:
          updateTodo.status = TODO_STATUS.complete;
          break;
        default:
          break;
      }

      this.patchState((s) => ({
        todoList: [...s.todoList],
      }));
      this.#updateLocalStorage();
    })
  );
}
