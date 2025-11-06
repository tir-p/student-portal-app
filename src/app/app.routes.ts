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
      import('./components/dashboard-component/dashboard-component').then(m => m.DashboardComponent)
  },
  // Courses list route - shows all available courses
  {
    path: 'courses',
    loadComponent: () =>
      import('./components/course-list-component/course-list-component').then(m => m.CourseListComponent)
  },
  // Grades route - displays student grades
  {
    path: 'grades',
    loadComponent: () =>
      import('./components/grades-component/grades-component').then(m => m.GradesComponent)
  },
  // Grade detail route - shows detailed info about a specific grade
  // :id is a route parameter (e.g., /grades/1)
  {
    path: 'grades/:id',
    loadComponent: () =>
      import('./components/grade-detail-component/grade-detail-component').then(
        (m) => m.GradeDetailComponent
      ),
  },
  // Attendance route - shows attendance records
  {
    path: 'attendance',
    loadComponent: () =>
      import('./components/attendance-component/attendance-component').then(m => m.AttendanceComponent)
  },
  // Profile route - student profile page
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile-component/profile-component').then(m => m.ProfileComponent)
  },
  // Course detail route - shows detailed info about a specific course
  // :id is a route parameter (e.g., /courses/1)
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./components/attendance-component/course-detail-component/course-detail-component').then(
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