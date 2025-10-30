export class GradeUtil {
  private static readonly GRADE_SCALE: Record<string, number> = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D': 1.0,
    'F': 0.0
  };

  static calculateGPA(grades: { letterGrade: string; credits: number }[]): number {
    if (!grades || grades.length === 0) return 0;

    const totalPoints = grades.reduce((sum, grade) => {
      const points = this.GRADE_SCALE[grade.letterGrade] || 0;
      return sum + (points * grade.credits);
    }, 0);

    const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);

    return totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;
  }

  static getLetterGrade(percentage: number): string {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 60) return 'D';
    return 'F';
  }

  static getGradeColor(letterGrade: string): string {
    if (['A+', 'A', 'A-'].includes(letterGrade)) return 'success';
    if (['B+', 'B', 'B-'].includes(letterGrade)) return 'primary';
    if (['C+', 'C', 'C-'].includes(letterGrade)) return 'warning';
    return 'danger';
  }
}