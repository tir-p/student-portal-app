import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format credit hours with proper pluralization
 * Converts number to "X credit" or "X credits"
 * Usage: {{ credits | creditHours }}
 */
@Pipe({
  name: 'creditHours',
  standalone: true
})
export class CreditHoursPipe implements PipeTransform {
  /**
   * Formats credit hours with proper singular/plural form
   * @param credits - Number of credit hours
   * @returns Formatted string (e.g., "3 credits" or "1 credit")
   */
  transform(credits: number): string {
    // Use singular "credit" for 1, plural "credits" for all other numbers
    return `${credits} ${credits === 1 ? 'credit' : 'credits'}`;
  }
}