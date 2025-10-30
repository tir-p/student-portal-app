import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../services/course-service';
import { CourseCodePipe } from '../pipes/course-code-pipe-pipe';
import { CreditHoursPipe } from '../pipes/credit-hours-pipe-pipe';

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
  readonly courses;
  readonly loading;

  constructor(private courseService: CourseService) {
    this.courses = this.courseService.courses;
    this.loading = this.courseService.loading;
  }

  ngOnInit(): void {
    if (this.courses().length === 0) {
      this.courseService.loadCourses();
    }
  }

  getProgressPercentage(enrolled: number, max: number): number {
    return (enrolled / max) * 100;
  }
}