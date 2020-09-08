import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCheckDate]'
})
export class CheckDateDirective {

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log(this.elementRef);

  }

}
