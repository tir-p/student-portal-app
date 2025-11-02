import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format time remaining until a date
 * Returns a compact string like "5d 2h" or "3h 15m"
 * Usage: {{ dueDate | timeRemaining }}
 */
@Pipe({
  name: 'timeRemaining',
  standalone: true
})
export class TimeRemainingPipe implements PipeTransform {
  /**
   * Calculates and formats time remaining until the target date
   * @param date - Target date (Date object or string)
   * @returns Formatted time remaining string (e.g., "5d 2h", "Overdue")
   */
  transform(date: Date | string): string {
    const now = new Date();
    const target = new Date(date);
    const diffMs = target.getTime() - now.getTime();

    // If date has passed
    if (diffMs < 0) return 'Overdue';

    // Calculate days, hours, and minutes remaining
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // Return compact format: "days hours" or "hours minutes" or "minutes"
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
}