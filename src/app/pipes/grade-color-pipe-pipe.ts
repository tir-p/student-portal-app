import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gradeColor',
  standalone: true
})
export class GradeColorPipe implements PipeTransform {
  transform(grade: string): string {
    if (['A+', 'A', 'A-'].includes(grade)) return 'text-success';
    if (['B+', 'B', 'B-'].includes(grade)) return 'text-primary';
    if (['C+', 'C', 'C-'].includes(grade)) return 'text-warning';
    return 'text-danger';
  }
}