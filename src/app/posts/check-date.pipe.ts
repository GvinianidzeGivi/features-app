import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkDate'
})
export class CheckDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const dateNow = new Date().toLocaleDateString();
    return value == dateNow ? value : false
  }

}
