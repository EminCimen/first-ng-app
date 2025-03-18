import { Component, inject, output, signal } from '@angular/core';
import { Todo } from '../models/todos';
import { TodosService } from '../services/todos.service';
import { HighlightCompletedTodoDirective } from '../diractives/highlight-completed-todo.directive';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos',
  imports: [HighlightCompletedTodoDirective, SearchPipe, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoItems = signal<Todo[]>([]);
  todosService = inject(TodosService);
  todoToggled = output<Todo>();
  searchText = signal('');

  constructor() {
    this.todosService.getTodos().subscribe((todos) => {
      this.todoItems.set(todos);
    });
  }

  todoClicked(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoItems.update((items) =>
      items.map((item) => (item.id === todo.id ? updatedTodo : item))
    );
    this.todoToggled.emit(updatedTodo);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchText.set(input.value);
  }
}
