import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../interfaces/course';
import { API_CONFIG } from '../config/api.config';

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
  // Backend sends 'active' (camelCase) but we support both for compatibility
  readonly activeCourses = computed(() => 
    this.coursesSignal().filter(c => c.status === 'active' || c.status === 'Active')
  );
  
  // Computed signal: calculates total credit hours from active courses
  readonly totalCredits = computed(() =>
    this.activeCourses().reduce((sum, course) => sum + course.credits, 0)
  );

  constructor(private http: HttpClient) {}

  /**
   * Loads all courses from the API
   */
  loadCourses(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<Course[]>(`${API_CONFIG.baseUrl}/Course`).subscribe({
      next: (courses) => {
        this.coursesSignal.set(courses);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(error.message || 'Failed to load courses');
        this.loadingSignal.set(false);
        console.error('Error loading courses:', error);
      }
    });
  }

  /**
   * Finds a course by its ID
   * First checks local cache, then calls API if not found
   * @param id - Course ID
   * @returns The course or undefined if not found
   */
  getCourseById(id: number): Course | undefined {
    // First check local cache
    const cachedCourse = this.coursesSignal().find(c => c.id === id);
    if (cachedCourse) {
      return cachedCourse;
    }
    
    // If not in cache, could fetch from API
    // For now, return undefined - could be enhanced to fetch from API
    // this.http.get<Course>(`${API_CONFIG.baseUrl}/Course/${id}`).subscribe(...)
    return undefined;
  }
  
  /**
   * Fetches a course by ID from the API
   * Use this when you need to ensure you have the latest course data
   * @param id - Course ID
   */
  fetchCourseById(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    
    this.http.get<Course>(`${API_CONFIG.baseUrl}/Course/${id}`).subscribe({
      next: (course) => {
        // Update the courses array with the fetched course
        const currentCourses = this.coursesSignal();
        const index = currentCourses.findIndex(c => c.id === id);
        if (index >= 0) {
          // Update existing course
          const updated = [...currentCourses];
          updated[index] = course;
          this.coursesSignal.set(updated);
        } else {
          // Add new course to array
          this.coursesSignal.set([...currentCourses, course]);
        }
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(error.message || 'Failed to load course');
        this.loadingSignal.set(false);
        console.error('Error loading course:', error);
      }
    });
  }

  /**
   * Enrolls student in a course
   * In a real app, this would make an API call to enroll
   */
  enrollInCourse(courseId: number): boolean {
    // TODO: Implement enrollment API call
    return true;
  }

  /**
   * Drops a course enrollment
   * In a real app, this would make an API call to drop the course
   */
  dropCourse(courseId: number): boolean {
    // TODO: Implement drop course API call
    return true;
  }
}