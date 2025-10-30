export class DateUtil {
  static isUpcoming(date: Date, daysAhead: number = 7): boolean {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= daysAhead;
  }

  static isPast(date: Date): boolean {
    return new Date(date) < new Date();
  }

  static getDaysDifference(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static formatTimeRemaining(date: Date): string {
    const now = new Date();
    const target = new Date(date);
    const diffMs = target.getTime() - now.getTime();

    if (diffMs < 0) return 'Overdue';

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
    return 'Due soon';
  }
}