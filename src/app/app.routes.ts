import { Routes } from '@angular/router';

/**
 * Application Routes Configuration
 * Defines all the routes (URLs) in the application
 * Uses lazy loading to load components only when needed (better performance)
 */
export const routes: Routes = [
  // Dashboard route - shows overview statistics
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard-component/dashboard-component').then(m => m.DashboardComponent)
  },
  // Courses list route - shows all available courses
  {
    path: 'courses',
    loadComponent: () =>
      import('./course-list-component/course-list-component').then(m => m.CourseListComponent)
  },
  // Grades route - displays student grades
  {
    path: 'grades',
    loadComponent: () =>
      import('./grades-component/grades-component').then(m => m.GradesComponent)
  },
  // Grade detail route - shows detailed info about a specific grade
  // :id is a route parameter (e.g., /grades/1)
  {
    path: 'grades/:id',
    loadComponent: () =>
      import('./grade-detail-component/grade-detail-component').then(
        (m) => m.GradeDetailComponent
      ),
  },
  // Attendance route - shows attendance records
  {
    path: 'attendance',
    loadComponent: () =>
      import('./attendance-component/attendance-component').then(m => m.AttendanceComponent)
  },
  // Profile route - student profile page
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile-component/profile-component').then(m => m.ProfileComponent)
  },
  // Course detail route - shows detailed info about a specific course
  // :id is a route parameter (e.g., /courses/1)
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./course-detail-component/course-detail-component').then(
        (m) => m.CourseDetailComponent
      ),
  },
  // Default route - redirects to dashboard when user visits root URL
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];