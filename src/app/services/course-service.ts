import { Injectable, signal, computed } from '@angular/core';
import { Course } from '../interfaces/course';

/**
 * Service to manage course data
 * Handles loading courses, filtering active courses, and calculating credits
 */
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // Private signals to store course data
  private coursesSignal = signal<Course[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Public readonly signals for components to use
  readonly courses = this.coursesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  
  // Computed signal: automatically filters to show only active courses
  readonly activeCourses = computed(() => 
    this.coursesSignal().filter(c => c.status === 'active')
  );
  
  // Computed signal: calculates total credit hours from active courses
  readonly totalCredits = computed(() =>
    this.activeCourses().reduce((sum, course) => sum + course.credits, 0)
  );

  // Mock course data - in a real app, this would come from an API
  private mockCourses: Course[] = [
    {
      id: '1',
      code: 'CSE-4101',
      name: 'Advanced Software Engineering',
      description: 'Design patterns, architecture, and best practices',
      credits: 3,
      semester: 'fall-2025',
      instructor: {
        id: 'i1',
        name: 'Dr. J Seetohul',
        email: 'j.seetohul@university.mu',
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
      semester: 'fall-2025',
      instructor: {
        id: 'i2',
        name: 'Prof. Jesus',
        email: 'prof.jesus@university.mu',
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
      semester: 'fall-2025',
      instructor: {
        id: 'i3',
        name: 'Dr. Jean Melon',
        email: 'jean.melon@university.mu',
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
      name: 'Operating Systems',
      description: 'OS concepts, process management, memory management, and file systems',
      credits: 3,
      semester: 'fall-2025',
      instructor: {
        id: 'i4',
        name: 'Mr Gavin Sathan',
        email: 'g.sathan@university.mu',
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

  /**
   * Loads all courses
   * Uses setTimeout to simulate API call delay
   */
  loadCourses(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // Simulate API delay, then set the mock courses
    setTimeout(() => {
      this.coursesSignal.set(this.mockCourses);
      this.loadingSignal.set(false);
    }, 600);
  }

  /**
   * Finds a course by its ID
   * Returns the course or undefined if not found
   */
  getCourseById(id: string): Course | undefined {
    return this.coursesSignal().find(c => c.id === id);
  }

  /**
   * Enrolls student in a course
   * In a real app, this would make an API call to enroll
   */
  enrollInCourse(courseId: string): boolean {
    return true;
  }

  /**
   * Drops a course enrollment
   * In a real app, this would make an API call to drop the course
   */
  dropCourse(courseId: string): boolean {
    return true;
  }
}