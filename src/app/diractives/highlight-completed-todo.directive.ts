import { Directive, ElementRef, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]',
})
export class HighlightCompletedTodoDirective {
  isCompleted = input<boolean>(false);
  el = inject(ElementRef);
  stylesEffect = effect(() => {
    if (this.isCompleted()) {
      this.el.nativeElement.style.backgroundColor = 'green';
      this.el.nativeElement.style.color = 'white';
      this.el.nativeElement.style.textDecoration = 'line-through';
    } else {
      this.el.nativeElement.style.backgroundColor = 'white';
      this.el.nativeElement.style.color = 'black';
      this.el.nativeElement.style.textDecoration = 'none';
    }
  });
}
