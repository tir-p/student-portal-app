import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to transform letter grade to Bootstrap text color class
 * Used in templates to color-code grades for visual feedback
 * Usage: {{ grade | gradeColor }}
 */
@Pipe({
  name: 'gradeColor',
  standalone: true
})
export class GradeColorPipe implements PipeTransform {
  transform(grade: string): string {
    if (!grade) return 'text-danger';

    const g = grade.trim().toUpperCase(); // normalize input

    if (['A+', 'A', 'A-'].includes(g)) return 'text-success';
    if (['B+', 'B', 'B-'].includes(g)) return 'text-primary';
    if (['C+', 'C', 'C-'].includes(g)) return 'text-warning';
    if (['D+', 'D', 'D-'].includes(g)) return 'text-danger';
    if (['F'].includes(g)) return 'text-danger';

    return 'text-secondary'; // fallback for unexpected grades
  }
}
