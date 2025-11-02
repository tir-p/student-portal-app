import { Injectable, signal, computed } from '@angular/core';
import { Attendance, AttendanceRecord } from '../interfaces/attendance';

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

  // Mock attendance data - in a real app, this would come from an API
  private mockAttendanceData: Attendance[] = [
    {
      id: 'att1',
      studentId: '1',
      courseId: '1',
      courseName: 'Advanced Software Engineering',
      courseCode: 'CSE-4101',
      totalClasses: 20,
      attendedClasses: 19,
      attendancePercentage: 95,
      status: 'good',
      records: [
        {
          id: 'rec1',
          date: new Date('2024-09-02'),
          status: 'present',
          classType: 'lecture',
          remarks: ''
        },
        {
          id: 'rec2',
          date: new Date('2024-09-04'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec3',
          date: new Date('2024-09-09'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec4',
          date: new Date('2024-09-11'),
          status: 'late',
          classType: 'lecture',
          remarks: 'Arrived 10 minutes late'
        },
        {
          id: 'rec5',
          date: new Date('2024-09-16'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec6',
          date: new Date('2024-09-18'),
          status: 'absent',
          classType: 'lecture',
          remarks: 'Medical leave'
        },
        {
          id: 'rec7',
          date: new Date('2024-09-23'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec8',
          date: new Date('2024-09-25'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec9',
          date: new Date('2024-09-30'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec10',
          date: new Date('2024-10-02'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec11',
          date: new Date('2024-10-07'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec12',
          date: new Date('2024-10-09'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec13',
          date: new Date('2024-10-14'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec14',
          date: new Date('2024-10-16'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec15',
          date: new Date('2024-10-21'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec16',
          date: new Date('2024-10-23'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec17',
          date: new Date('2024-10-28'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec18',
          date: new Date('2024-10-30'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec19',
          date: new Date('2024-11-04'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec20',
          date: new Date('2024-11-06'),
          status: 'present',
          classType: 'lecture'
        }
      ]
    },
    {
      id: 'att2',
      studentId: '1',
      courseId: '2',
      courseName: 'Machine Learning',
      courseCode: 'CSE-4102',
      totalClasses: 18,
      attendedClasses: 13,
      attendancePercentage: 72.2,
      status: 'warning',
      records: [
        {
          id: 'rec21',
          date: new Date('2024-09-03'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec22',
          date: new Date('2024-09-05'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec23',
          date: new Date('2024-09-10'),
          status: 'absent',
          classType: 'lab',
          remarks: 'Personal emergency'
        },
        {
          id: 'rec24',
          date: new Date('2024-09-12'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec25',
          date: new Date('2024-09-17'),
          status: 'late',
          classType: 'lab',
          remarks: 'Arrived 15 minutes late'
        },
        {
          id: 'rec26',
          date: new Date('2024-09-19'),
          status: 'absent',
          classType: 'lab'
        },
        {
          id: 'rec27',
          date: new Date('2024-09-24'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec28',
          date: new Date('2024-09-26'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec29',
          date: new Date('2024-10-01'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec30',
          date: new Date('2024-10-03'),
          status: 'absent',
          classType: 'lab'
        },
        {
          id: 'rec31',
          date: new Date('2024-10-08'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec32',
          date: new Date('2024-10-10'),
          status: 'excused',
          classType: 'lab',
          remarks: 'Official university event'
        },
        {
          id: 'rec33',
          date: new Date('2024-10-15'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec34',
          date: new Date('2024-10-17'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec35',
          date: new Date('2024-10-22'),
          status: 'absent',
          classType: 'lab'
        },
        {
          id: 'rec36',
          date: new Date('2024-10-24'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec37',
          date: new Date('2024-10-29'),
          status: 'present',
          classType: 'lab'
        },
        {
          id: 'rec38',
          date: new Date('2024-10-31'),
          status: 'present',
          classType: 'lab'
        }
      ]
    },
    {
      id: 'att3',
      studentId: '1',
      courseId: '3',
      courseName: 'Cloud Computing',
      courseCode: 'CSE-4103',
      totalClasses: 16,
      attendedClasses: 16,
      attendancePercentage: 100,
      status: 'good',
      records: [
        {
          id: 'rec39',
          date: new Date('2024-09-04'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec40',
          date: new Date('2024-09-06'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec41',
          date: new Date('2024-09-11'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec42',
          date: new Date('2024-09-13'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec43',
          date: new Date('2024-09-18'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec44',
          date: new Date('2024-09-20'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec45',
          date: new Date('2024-09-25'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec46',
          date: new Date('2024-09-27'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec47',
          date: new Date('2024-10-02'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec48',
          date: new Date('2024-10-04'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec49',
          date: new Date('2024-10-09'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec50',
          date: new Date('2024-10-11'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec51',
          date: new Date('2024-10-16'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec52',
          date: new Date('2024-10-18'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec53',
          date: new Date('2024-10-23'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec54',
          date: new Date('2024-10-25'),
          status: 'present',
          classType: 'lecture'
        }
      ]
    },
    {
      id: 'att4',
      studentId: '1',
      courseId: '4',
      courseName: 'Operating Systems',
      courseCode: 'CSE-4104',
      totalClasses: 20,
      attendedClasses: 12,
      attendancePercentage: 60,
      status: 'critical',
      records: [
        {
          id: 'rec55',
          date: new Date('2024-09-02'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec56',
          date: new Date('2024-09-05'),
          status: 'absent',
          classType: 'lecture',
          remarks: 'Missed class'
        },
        {
          id: 'rec57',
          date: new Date('2024-09-09'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec58',
          date: new Date('2024-09-12'),
          status: 'absent',
          classType: 'lecture'
        },
        {
          id: 'rec59',
          date: new Date('2024-09-16'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec60',
          date: new Date('2024-09-19'),
          status: 'absent',
          classType: 'lecture',
          remarks: 'Medical appointment'
        },
        {
          id: 'rec61',
          date: new Date('2024-09-23'),
          status: 'late',
          classType: 'lecture',
          remarks: 'Arrived 20 minutes late'
        },
        {
          id: 'rec62',
          date: new Date('2024-09-26'),
          status: 'absent',
          classType: 'lecture'
        },
        {
          id: 'rec63',
          date: new Date('2024-09-30'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec64',
          date: new Date('2024-10-03'),
          status: 'absent',
          classType: 'lecture'
        },
        {
          id: 'rec65',
          date: new Date('2024-10-07'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec66',
          date: new Date('2024-10-10'),
          status: 'absent',
          classType: 'lecture'
        },
        {
          id: 'rec67',
          date: new Date('2024-10-14'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec68',
          date: new Date('2024-10-17'),
          status: 'absent',
          classType: 'lecture'
        },
        {
          id: 'rec69',
          date: new Date('2024-10-21'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec70',
          date: new Date('2024-10-24'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec71',
          date: new Date('2024-10-28'),
          status: 'absent',
          classType: 'lecture'
        },
        {
          id: 'rec72',
          date: new Date('2024-10-31'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec73',
          date: new Date('2024-11-04'),
          status: 'present',
          classType: 'lecture'
        },
        {
          id: 'rec74',
          date: new Date('2024-11-07'),
          status: 'present',
          classType: 'lecture'
        }
      ]
    }
  ];

  /**
   * Loads attendance records
   * In a real app, this would fetch from an API
   * Currently returns mock attendance data
   */
  loadAttendance(): void {
    this.loading.set(true);
    this.error.set(null);
    
    // Simulate API call delay
    setTimeout(() => {
      // Set mock attendance data
      this.attendanceRecords.set(this.mockAttendanceData);
      this.loading.set(false);
    }, 1000);
  }
}