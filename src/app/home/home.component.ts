import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TodoStore } from '../shared/store/todo.store';
import { TabComponent } from './ui/tab/tab.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabComponent, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly #todoStore = inject(TodoStore);
  readonly searchForm = new FormControl('', {
    nonNullable: true,
  });
  readonly #destroyed$ = new Subject<void>();
  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        takeUntil(this.#destroyed$)
      )
      .subscribe((search) => this.#todoStore.updateSearch(search));
  }

  ngOnDestroy(): void {
    this.#destroyed$.next();
    this.#destroyed$.complete();
  }
}
