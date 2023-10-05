import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypedFormGroup } from '../shared/utils';
import { TodoItem } from '../shared/models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoStore } from '../shared/store/todo.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  readonly #todoStore = inject(TodoStore);
  todoForm: TypedFormGroup<Omit<TodoItem, 'status'>> = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    content: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  submit(): void {
    if(this.todoForm.invalid) {
      alert('Form is invalid');
      return;
    }
    this.#todoStore.addTodo(this.todoForm.getRawValue());
  }
}
