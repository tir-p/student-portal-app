import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../services/student-service';
import { RouterLink } from "@angular/router";

/**
 * Navbar Component
 * Displays the top navigation bar with university name and user profile dropdown
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-component.html'
})
export class NavbarComponent {
  // Connect to student service to display student name and profile image
  readonly student;

  constructor(private studentService: StudentService) {
    this.student = this.studentService.student;
  }
}