export interface DashboardStats {
  currentSemester: string;
  currentGPA: number;
  totalCredits: number;
  attendanceRate: number;
  upcomingAssignments: number;
  activeCourses: number;
  totalCourses: number;
  recentActivities: [];
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
  courseCode?: string;
  description?: string;
}

export type EventType = 'assignment' | 'exam' | 'class' | 'deadline' | 'holiday';