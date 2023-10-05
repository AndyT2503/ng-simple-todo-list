import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TODO_STATUS } from 'src/app/shared/constants';
import { TodoItem } from 'src/app/shared/models';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input({required: true}) todoItem!: TodoItem;
  @Output() onDelete = new EventEmitter<TodoItem>();
  @Output() onChangeStatus = new EventEmitter<TodoItem>();
  readonly todoStatus = TODO_STATUS;
}
