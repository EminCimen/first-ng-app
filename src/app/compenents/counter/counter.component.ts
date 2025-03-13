import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  counter = signal(0);

  increment() {
    this.counter.update((value) => value + 1);
  }

  decrement() {
    if (this.counter() > 0) {
      this.counter.update((value) => value - 1);
    }
  }

  reset() {
    this.counter.set(0);
  }
}
