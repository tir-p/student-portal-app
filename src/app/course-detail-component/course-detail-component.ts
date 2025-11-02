import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../services/course-service';
import { GradeService } from '../services/grade-service';
import { Course } from '../interfaces/course';
import { CourseCodePipe } from '../pipes/course-code-pipe-pipe';
import { CreditHoursPipe } from '../pipes/credit-hours-pipe-pipe';
import { SemesterPipe } from '../pipes/semester-pipe-pipe';
import { GradeColorPipe } from '../pipes/grade-color-pipe-pipe';
import { TimeRemainingPipe } from '../pipes/time-remaining-pipe-pipe';

/**
 * Course Detail Component
 * Displays detailed information about a specific course
 * Shows course info, schedule, instructor, and student's grade for the course
 */
@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CourseCodePipe,
    CreditHoursPipe,
    SemesterPipe,
    GradeColorPipe,
    TimeRemainingPipe
  ],
  templateUrl: './course-detail-component.html',
  styleUrls: ['./course-detail-component.scss']
})
export class CourseDetailComponent implements OnInit {
  // Connect to service loading state
  readonly loading;
  
  // Signal to store the current course data
  course = signal<Course | undefined>(undefined);
  // Signal to store the course ID from the route
  courseId = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private gradeService: GradeService
  ) {
    this.loading = this.courseService.loading;
  }

  /**
   * Called when component initializes
   * Subscribes to route parameters to get course ID and load course details
   */
  ngOnInit(): void {
    // Get course ID from the URL route parameter
    this.route.params.subscribe(params => {
      this.courseId.set(params['id']);
      this.loadCourseDetails();
    });
  }

  /**
   * Loads course details from the service
   * Called whenever the course ID changes
   */
  private loadCourseDetails(): void {
    this.courseService.getCourseById(this.courseId()).subscribe(course => {
      this.course.set(course);
    });
  }

  /**
   * Gets the grade for this course
   * @returns Grade object for the current course, or undefined if not found
   */
  getCourseGrade() {
    return this.gradeService.getGradeByCourseId(this.courseId());
  }
}