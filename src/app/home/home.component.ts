import { Component } from '@angular/core';
import { CounterComponent } from '../compenents/counter/counter.component';

@Component({
  selector: 'app-home',
  imports: [CounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  onKeyUp(event: KeyboardEvent) {
    console.log('user typed key', event.key);
  }
}
