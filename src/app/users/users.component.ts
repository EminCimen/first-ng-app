import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  usersService = inject(UsersService);

  userList = signal<User[]>([]);

  ngOnInit() {
    console.log('ngOnInit');
    this.usersService.getUsers().subscribe((user) => {
      this.userList.set(user);
    });
  }
}
