import * as moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timePipe'})
export class TimePipe implements PipeTransform {
  transform(time: number, format: string): any {
    return time ? 'as ' + moment(time).format(format)
                : 'a poucos segundos';
  }
};