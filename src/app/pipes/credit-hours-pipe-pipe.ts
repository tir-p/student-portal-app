import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditHours',
  standalone: true
})
export class CreditHoursPipe implements PipeTransform {
  transform(credits: number): string {
    return `${credits} ${credits === 1 ? 'credit' : 'credits'}`;
  }
}