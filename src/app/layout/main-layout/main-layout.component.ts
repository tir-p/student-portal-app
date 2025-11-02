import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../navbar-component/navbar-component';
import { SidebarComponent } from '../../sidebar-component/sidebar-component';
import { StudentService } from '../../services/student-service';

/**
 * Main Layout Component
 * Provides the overall page structure with navbar, sidebar, and content area
 * The router-outlet displays the active route component
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  template: `
    <div class="layout">
      <!-- Top navigation bar -->
      <app-navbar></app-navbar>
      <div class="content-wrapper">
        <!-- Left sidebar navigation -->
        <app-sidebar></app-sidebar>
        <!-- Main content area where route components are displayed -->
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .content-wrapper {
      display: flex;
      flex: 1;
    }
    .main-content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    // Load student profile when layout initializes so navbar has access to student data
    this.studentService.loadStudentProfile('1');
  }
}