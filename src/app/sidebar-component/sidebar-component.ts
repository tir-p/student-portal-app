import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: #f8f9fa;
      padding: 20px;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    }
    .nav-links {
      list-style: none;
      padding: 0;
    }
    .nav-links li {
      margin: 10px 0;
    }
    .nav-links a {
      text-decoration: none;
      color: #333;
      padding: 10px;
      display: block;
      border-radius: 4px;
    }
    .nav-links a:hover, .nav-links a.active {
      background: #e9ecef;
    }
  `]
})
export class SidebarComponent {}