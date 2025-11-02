import { Component, signal } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

/**
 * Root App Component
 * This is the main component that bootstraps the entire application
 * Displays the MainLayoutComponent which contains navbar, sidebar, and router outlet
 */
@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Application title (currently not used in template)
  protected readonly title = signal('student-portal-app');
}
