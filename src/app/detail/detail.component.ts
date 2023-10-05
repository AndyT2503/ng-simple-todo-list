import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoStore } from '../shared/store/todo.store';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly todoItem = inject(TodoStore).getTodoDetail(
    this.#activatedRoute.snapshot.params['title']
  );
}
