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
  /**
   * Transforms a letter grade into a Bootstrap CSS class for text color
   * @param grade - Letter grade (A+, A, A-, B+, B, etc.)
   * @returns Bootstrap text color class (text-success, text-primary, etc.)
   */
  transform(grade: string): string {
    // A grades = green (success)
    if (['A+', 'A', 'A-'].includes(grade)) return 'text-success';
    // B grades = blue (primary)
    if (['B+', 'B', 'B-'].includes(grade)) return 'text-primary';
    // C grades = yellow (warning)
    if (['C+', 'C', 'C-'].includes(grade)) return 'text-warning';
    // D and F grades = red (danger)
    return 'text-danger';
  }
}