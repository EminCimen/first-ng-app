import { Component, inject, signal } from '@angular/core';
import { Todo } from '../models/todos';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoItems = signal<Todo[]>([]);

  todosService = inject(TodosService);

  ngOnInit() {
    this.todosService.getTodos().subscribe((todos) => {
      console.log(22);
      this.todoItems.set(todos);
    });
  }
}
