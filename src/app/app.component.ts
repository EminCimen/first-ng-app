import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './compenents/header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './compenents/footer/footer.component';
import { TodosComponent } from './todos/todos.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="d-flex flex-column min-vh-100">
      <app-header />
      <main class="flex-grow-1 container py-4">
        <router-outlet />
      </main>
      <app-footer [logo]="logo()" [footerLink]="footerLink()" />
    </div>
  `,
  styles: [
    `
      main {
        padding: 20px;
        min-height: calc(100vh - 200px);
      }
    `,
  ],
})
export class AppComponent {
  title = 'first-ng-app';
  title2 = signal('Site 2');
  logo = signal('logo.png');
  footerLink = signal('https://www.google.com');
}
