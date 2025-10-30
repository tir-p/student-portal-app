import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRemaining',
  standalone: true
})
export class TimeRemainingPipe implements PipeTransform {
  transform(date: Date | string): string {
    const now = new Date();
    const target = new Date(date);
    const diffMs = target.getTime() - now.getTime();

    if (diffMs < 0) return 'Overdue';

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
}