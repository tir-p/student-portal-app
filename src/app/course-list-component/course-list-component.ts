import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../services/course-service';
import { CourseCodePipe } from '../pipes/course-code-pipe-pipe';
import { CreditHoursPipe } from '../pipes/credit-hours-pipe-pipe';

/**
 * Course List Component
 * Displays all available courses
 * Shows course details and enrollment information
 */
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CourseCodePipe,
    CreditHoursPipe
  ],
  templateUrl: './course-list-component.html',
  styleUrls: ['./course-list-component.scss']
})
export class CourseListComponent implements OnInit {
  // Connect to service signals
  readonly courses;
  readonly loading;

  constructor(private courseService: CourseService) {
    this.courses = this.courseService.courses;
    this.loading = this.courseService.loading;
  }

  /**
   * Called when component initializes
   * Loads courses if they haven't been loaded yet
   */
  ngOnInit(): void {
    if (this.courses().length === 0) {
      this.courseService.loadCourses();
    }
  }

  /**
   * Calculates enrollment progress percentage
   * Used to show how full a course is
   * @param enrolled - Number of students enrolled
   * @param max - Maximum capacity
   * @returns Percentage (0-100)
   */
  getProgressPercentage(enrolled: number, max: number): number {
    return (enrolled / max) * 100;
  }
}