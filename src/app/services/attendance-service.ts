import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendance, AttendanceRecord } from '../interfaces/attendance';
import { API_CONFIG } from '../config/api.config';

/**
 * Service to manage attendance records
 * Tracks student attendance for courses
 */
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  // Public signals that components can read
  readonly attendanceRecords = signal<Attendance[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  // Computed signal: automatically calculates overall attendance percentage across all courses
  readonly overallAttendance = computed(() => {
    const records = this.attendanceRecords();
    if (records.length === 0) return 0;

    // Sum up total classes and attended classes across all courses
    let totalClasses = 0;
    let attendedClasses = 0;
    
    for (const record of records) {
      totalClasses += record.totalClasses;
      attendedClasses += record.attendedClasses;
    }

    // Calculate percentage: (attended / total) × 100
    return totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
  });

  /**
   * Loads attendance records for a student from the API
   * @param studentId - The student ID to load attendance for
   */
  loadAttendance(studentId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.http.get<Attendance[]>(`${API_CONFIG.baseUrl}/Attendance/student/${studentId}`).subscribe({
      next: (attendances) => {
        // Convert date strings to Date objects for records
        attendances.forEach(attendance => {
          if (attendance.records) {
            attendance.records.forEach(record => {
              if (typeof record.date === 'string') {
                record.date = new Date(record.date);
              }
            });
          }
        });
        this.attendanceRecords.set(attendances);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error.message || 'Failed to load attendance');
        this.loading.set(false);
        console.error('Error loading attendance:', error);
      }
    });
  }
}