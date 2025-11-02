import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format semester strings for display
 * Converts format like "fall-2024" to "Fall 2024"
 * Usage: {{ semester | semester }}
 */
@Pipe({
  name: 'semester',
  standalone: true
})
export class SemesterPipe implements PipeTransform {
  /**
   * Transforms semester string from database format to display format
   * @param semester - Semester in format "term-year" (e.g., "fall-2024")
   * @returns Formatted semester string (e.g., "Fall 2024")
   */
  transform(semester: string): string {
    // Split semester into term and year parts
    const parts = semester.split('-');
    // If format is wrong, return original string
    if (parts.length !== 2) return semester;

    const [term, year] = parts;
    
    // Map lowercase term names to capitalized display names
    const termMap: Record<string, string> = {
      'spring': 'Spring',
      'summer': 'Summer',
      'fall': 'Fall',
      'winter': 'Winter'
    };

    // Return formatted string: "Term Year"
    return `${termMap[term.toLowerCase()] || term} ${year}`;
  }
}