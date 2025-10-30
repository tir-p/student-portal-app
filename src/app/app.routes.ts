import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard-component/dashboard-component').then(m => m.DashboardComponent)
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./course-list-component/course-list-component').then(m => m.CourseListComponent)
  },
  {
    path: 'grades',
    loadComponent: () =>
      import('./grades-component/grades-component').then(m => m.GradesComponent)
  },
  {
    path: 'attendance',
    loadComponent: () =>
      import('./attendance-component/attendance-component').then(m => m.AttendanceComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile-component/profile-component').then(m => m.ProfileComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];