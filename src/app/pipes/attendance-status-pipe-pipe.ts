import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attendanceStatus',
  standalone: true
})
export class AttendanceStatusPipe implements PipeTransform {
  transform(percentage: number): { label: string; class: string } {
    if (percentage >= 75) {
      return { label: 'Good', class: 'badge bg-success' };
    } else if (percentage >= 65) {
      return { label: 'Warning', class: 'badge bg-warning' };
    } else {
      return { label: 'Critical', class: 'badge bg-danger' };
    }
  }
}