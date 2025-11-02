import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format course codes for display
 * Converts format like "CSE-4101" to "CSE 4101" or just "CSE"
 * Usage: {{ courseCode | courseCode }} or {{ courseCode | courseCode:'short' }}
 */
@Pipe({
  name: 'courseCode',
  standalone: true
})
export class CourseCodePipe implements PipeTransform {
  /**
   * Transforms course code format
   * @param code - Course code (e.g., "CSE-4101")
   * @param format - 'short' returns just prefix (e.g., "CSE"), 'full' replaces dashes with spaces
   * @returns Formatted course code string
   */
  transform(code: string, format: 'short' | 'full' = 'full'): string {
    if (!code) return '';

    // Short format: return only the prefix before the dash
    if (format === 'short') {
      return code.split('-')[0] || code;
    }

    // Full format: replace dashes with spaces (e.g., "CSE-4101" -> "CSE 4101")
    return code.replace(/-/g, ' ');
  }
}