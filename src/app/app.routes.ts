import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./todos/todos.component').then((m) => m.TodosComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'weather',
    loadComponent: () =>
      import('./compenents/weather/weather.component').then(
        (m) => m.WeatherComponent
      ),
  },
];
