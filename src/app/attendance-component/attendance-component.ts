import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../services/attendance-service';
import { AttendanceStatusPipe } from '../pipes/attendance-status-pipe-pipe';
import { CourseCodePipe } from '../pipes/course-code-pipe-pipe';

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
  readonly attendanceRecords;
  readonly loading;
  readonly error;

  readonly overallAttendance;

  constructor(private attendanceService: AttendanceService) {
    this.attendanceRecords = this.attendanceService.attendanceRecords;
    this.loading = this.attendanceService.loading;
    this.error = this.attendanceService.error;

    this.overallAttendance = computed(() => {
      const records = this.attendanceRecords();
      if (records.length === 0) return 0;

      const totalClasses = records.reduce((sum, r) => sum + r.totalClasses, 0);
      const attendedClasses = records.reduce((sum, r) => sum + r.attendedClasses, 0);

      return totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
    });
  }

  ngOnInit(): void {
    if (this.attendanceRecords().length === 0) {
      this.attendanceService.loadAttendance();
    }
  }

  getStatusClass(percentage: number): string {
    if (percentage >= 75) return 'text-success';
    if (percentage >= 65) return 'text-warning';
    return 'text-danger';
  }
}