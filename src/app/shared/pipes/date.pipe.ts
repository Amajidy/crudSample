import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'persianDate'
})
export class DatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return moment(value).format('jYYYY/jMM/jDD')
  }

}
