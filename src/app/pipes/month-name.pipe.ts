import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
  standalone: true,
})
export class MonthNamePipe implements PipeTransform {
  private months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  transform(value: number): string {
    if (value < 0 || value > 12) {
      return 'Invalid month';
    }
    return this.months[value];
  }
}
