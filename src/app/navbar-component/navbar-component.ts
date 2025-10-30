import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../services/student-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">University of Mauritius</span>
        
        <div class="d-flex align-items-center">
          <div class="dropdown">
            <button 
              class="btn btn-link text-decoration-none dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown"
            >
              <img 
                [src]="student()?.profileImage || 'assets/images/default-avatar.png'" 
                class="rounded-circle me-2" 
                width="32" 
                height="32"
                alt="Profile"
              >
              {{ student()?.firstName }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="/profile">My Profile</a></li>
              <li><a class="dropdown-item" href="/settings">Settings</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="/logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  readonly student;

  constructor(private studentService: StudentService) {
    this.student = this.studentService.student;
  }
}