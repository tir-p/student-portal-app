import { Injectable, signal, computed } from '@angular/core';
import { Course } from '../interfaces/course';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesSignal = signal<Course[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  readonly courses = this.coursesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  
  readonly activeCourses = computed(() => 
    this.coursesSignal().filter(c => c.status === 'active')
  );
  
  readonly totalCredits = computed(() =>
    this.activeCourses().reduce((sum, course) => sum + course.credits, 0)
  );

  // Mock data
  private mockCourses: Course[] = [
    {
      id: '1',
      code: 'CSE-4101',
      name: 'Advanced Software Engineering',
      description: 'Design patterns, architecture, and best practices',
      credits: 3,
      semester: 'fall-2024',
      instructor: {
        id: 'i1',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@university.mu',
        department: 'Computer Science',
        officeHours: 'Mon/Wed 2-4 PM'
      },
      schedule: [
        { day: 'Monday', startTime: '10:00', endTime: '11:30', location: 'Room 301' },
        { day: 'Wednesday', startTime: '10:00', endTime: '11:30', location: 'Room 301' }
      ],
      enrolledStudents: 45,
      maxCapacity: 50,
      status: 'active'
    },
    {
      id: '2',
      code: 'CSE-4102',
      name: 'Machine Learning',
      description: 'Introduction to ML algorithms and applications',
      credits: 4,
      semester: 'fall-2024',
      instructor: {
        id: 'i2',
        name: 'Prof. Michael Chen',
        email: 'michael.chen@university.mu',
        department: 'Computer Science',
        officeHours: 'Tue/Thu 1-3 PM'
      },
      schedule: [
        { day: 'Tuesday', startTime: '14:00', endTime: '15:30', location: 'Lab 205' },
        { day: 'Thursday', startTime: '14:00', endTime: '15:30', location: 'Lab 205' }
      ],
      enrolledStudents: 38,
      maxCapacity: 40,
      status: 'active'
    },
    {
      id: '3',
      code: 'CSE-4103',
      name: 'Cloud Computing',
      description: 'Cloud infrastructure, services, and deployment',
      credits: 3,
      semester: 'fall-2024',
      instructor: {
        id: 'i3',
        name: 'Dr. Emily Rodriguez',
        email: 'emily.rodriguez@university.mu',
        department: 'Computer Science',
        officeHours: 'Wed/Fri 10-12 PM'
      },
      schedule: [
        { day: 'Wednesday', startTime: '13:00', endTime: '14:30', location: 'Room 402' },
        { day: 'Friday', startTime: '13:00', endTime: '14:30', location: 'Room 402' }
      ],
      enrolledStudents: 42,
      maxCapacity: 45,
      status: 'active'
    },
    {
      id: '4',
      code: 'CSE-4104',
      name: 'Cybersecurity',
      description: 'Network security, cryptography, and ethical hacking',
      credits: 3,
      semester: 'fall-2024',
      instructor: {
        id: 'i4',
        name: 'Dr. James Wilson',
        email: 'james.wilson@university.mu',
        department: 'Computer Science',
        officeHours: 'Mon/Thu 3-5 PM'
      },
      schedule: [
        { day: 'Monday', startTime: '15:00', endTime: '16:30', location: 'Room 303' },
        { day: 'Thursday', startTime: '15:00', endTime: '16:30', location: 'Room 303' }
      ],
      enrolledStudents: 35,
      maxCapacity: 40,
      status: 'active'
    }
  ];

  loadCourses(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    setTimeout(() => {
      this.coursesSignal.set(this.mockCourses);
      this.loadingSignal.set(false);
    }, 600);
  }

  getCourseById(id: string): Observable<Course | undefined> {
    const course = this.coursesSignal().find(c => c.id === id);
    return of(course).pipe(delay(300));
  }

  enrollInCourse(courseId: string): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  dropCourse(courseId: string): Observable<boolean> {
    return of(true).pipe(delay(500));
  }
}