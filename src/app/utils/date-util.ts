/**
 * Utility class for date-related operations
 * Provides methods to check date status and format time remaining
 */
export class DateUtil {
  /**
   * Checks if a date is upcoming within a certain number of days
   * @param date - The date to check
   * @param daysAhead - Number of days to look ahead (default: 7)
   * @returns True if date is today or within the specified days
   */
  static isUpcoming(date: Date, daysAhead: number = 7): boolean {
    const today = new Date();
    const targetDate = new Date(date);
    
    // Calculate difference in milliseconds
    const diffTime = targetDate.getTime() - today.getTime();
    // Convert to days (milliseconds to days: ms / (1000 * 60 * 60 * 24))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Return true if date is in the future but within the specified days
    return diffDays >= 0 && diffDays <= daysAhead;
  }

  /**
   * Checks if a date is in the past
   * @param date - The date to check
   * @returns True if the date is before today
   */
  static isPast(date: Date): boolean {
    return new Date(date) < new Date();
  }

  /**
   * Calculates the difference in days between two dates
   * @param date1 - First date
   * @param date2 - Second date
   * @returns Number of days between the two dates (always positive)
   */
  static getDaysDifference(date1: Date, date2: Date): number {
    // Calculate absolute difference in milliseconds
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    // Convert to days and round up
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Formats time remaining until a date
   * Returns a human-readable string like "5 days left" or "Overdue"
   * @param date - The target date
   * @returns Formatted string describing time remaining
   */
  static formatTimeRemaining(date: Date): string {
    const now = new Date();
    const target = new Date(date);
    const diffMs = target.getTime() - now.getTime();

    // If date has passed
    if (diffMs < 0) return 'Overdue';

    // Calculate days and hours remaining
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    // Return appropriate message
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
    return 'Due soon';
  }
}