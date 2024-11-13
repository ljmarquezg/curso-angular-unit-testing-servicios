import { Directive, ElementRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {

  defaultColor: string = 'gray';
  @Input('highlight') bgColor: string = '';

  constructor(
    private elementRef: ElementRef
  ) {
    this.elementRef.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges(): void {
    this.elementRef.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }

}
