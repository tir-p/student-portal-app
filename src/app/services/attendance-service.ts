import { Injectable, signal } from '@angular/core';
import { Attendance } from '../interfaces/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  readonly attendanceRecords = signal<Attendance[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadAttendance(): void {
    this.loading.set(true);
    this.error.set(null);
    // TODO: Implement API call
    setTimeout(() => {
      // Mock data
      this.attendanceRecords.set([]);
      this.loading.set(false);
    }, 1000);
  }
}