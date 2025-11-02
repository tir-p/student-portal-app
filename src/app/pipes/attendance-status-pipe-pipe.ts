import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to transform attendance percentage into status label and CSS class
 * Returns both a label ("Good", "Warning", "Critical") and Bootstrap badge class
 * Usage: {{ attendancePercentage | attendanceStatus }}
 */
@Pipe({
  name: 'attendanceStatus',
  standalone: true
})
export class AttendanceStatusPipe implements PipeTransform {
  /**
   * Transforms attendance percentage into status object
   * @param percentage - Attendance percentage (0-100)
   * @returns Object with label and Bootstrap badge class for styling
   */
  transform(percentage: number): { label: string; class: string } {
    // 75% and above = Good (green badge)
    if (percentage >= 75) {
      return { label: 'Good', class: 'badge bg-success' };
    } 
    // 65-74% = Warning (yellow badge)
    else if (percentage >= 65) {
      return { label: 'Warning', class: 'badge bg-warning' };
    } 
    // Below 65% = Critical (red badge)
    else {
      return { label: 'Critical', class: 'badge bg-danger' };
    }
  }
}