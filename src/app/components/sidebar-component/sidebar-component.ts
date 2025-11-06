import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Sidebar Component
 * Displays navigation menu on the left side
 * Shows active route with routerLinkActive directive
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="sidebar">
      <ul class="nav-links">
        <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
        <li><a routerLink="/courses" routerLinkActive="active">Courses</a></li>
        <li><a routerLink="/grades" routerLinkActive="active">Grades</a></li>
        <li><a routerLink="/attendance" routerLinkActive="active">Attendance</a></li>
        <li><a routerLink="/profile" routerLinkActive="active">Profile</a></li>
      </ul>
    </nav>
  `,
  styleUrls: ['./sidebar-component.scss']
})
export class SidebarComponent {}