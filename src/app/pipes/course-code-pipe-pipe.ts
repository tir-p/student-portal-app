import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseCode',
  standalone: true
})
export class CourseCodePipe implements PipeTransform {
  transform(code: string, format: 'short' | 'full' = 'full'): string {
    if (!code) return '';

    if (format === 'short') {
      return code.split('-')[0] || code;
    }

    return code.replace(/-/g, ' ');
  }
}