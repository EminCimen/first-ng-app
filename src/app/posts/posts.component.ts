import { Component, signal, inject } from '@angular/core';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';
import { PostItemComponent } from '../compenents/post-item/post-item.component';

@Component({
  selector: 'app-posts',
  imports: [PostItemComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts = signal<Post[]>([]);
  postsService = inject(PostsService);

  ngOnInit() {
    this.postsService.getPosts().subscribe((posts) => this.posts.set(posts));
  }
}
