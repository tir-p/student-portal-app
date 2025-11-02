import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../services/attendance-service';
import { AttendanceStatusPipe } from '../pipes/attendance-status-pipe-pipe';

/**
 * Attendance Component
 * Displays student attendance records by course
 * Shows attendance percentage and overall attendance rate
 */
@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    AttendanceStatusPipe
  ],
  templateUrl: './attendance-component.html',
  styleUrls: ['./attendance-component.scss']
})
export class AttendanceComponent implements OnInit {
  // Connect to service signals
  readonly attendanceRecords;
  readonly loading;
  readonly error;
  // Use the computed overall attendance from the service
  readonly overallAttendance;

  constructor(private attendanceService: AttendanceService) {
    this.attendanceRecords = this.attendanceService.attendanceRecords;
    this.loading = this.attendanceService.loading;
    this.error = this.attendanceService.error;
    // Use the overall attendance calculation from the service
    this.overallAttendance = this.attendanceService.overallAttendance;
  }

  /**
   * Called when component initializes
   * Loads attendance records if they haven't been loaded yet
   */
  ngOnInit(): void {
    if (this.attendanceRecords().length === 0) {
      this.attendanceService.loadAttendance();
    }
  }

  /**
   * Returns CSS class based on attendance percentage
   * Green for good (>=75%), yellow for warning (>=65%), red for poor (<65%)
   * @param percentage - Attendance percentage (0-100)
   * @returns CSS class name for styling
   */
  getStatusClass(percentage: number): string {
    if (percentage >= 75) return 'text-success'; // Good attendance
    if (percentage >= 65) return 'text-warning'; // Warning level
    return 'text-danger'; // Poor attendance
  }
}