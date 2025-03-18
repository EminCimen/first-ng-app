import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todos';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: Todo[], searchText: string): Todo[] {
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchText)
    );
  }
}
