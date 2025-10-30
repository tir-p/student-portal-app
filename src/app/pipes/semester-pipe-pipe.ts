import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'semester',
  standalone: true
})
export class SemesterPipe implements PipeTransform {
  transform(semester: string): string {
    const parts = semester.split('-');
    if (parts.length !== 2) return semester;

    const [term, year] = parts;
    const termMap: Record<string, string> = {
      'spring': 'Spring',
      'summer': 'Summer',
      'fall': 'Fall',
      'winter': 'Winter'
    };

    return `${termMap[term.toLowerCase()] || term} ${year}`;
  }
}