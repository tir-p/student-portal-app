/**
 * Utility class for grade-related calculations
 * Provides methods to calculate GPA, convert percentages to letter grades, and determine grade colors
 */
export class GradeUtil {
  /**
   * Grade scale mapping: letter grade to grade points
   * Used for GPA calculations
   */
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
  }

  /**
   * Calculates GPA from an array of grades
   * Formula: Sum of (grade points × credits) / total credits
   * @param grades - Array of objects with letterGrade and credits
   * @returns GPA as a number (rounded to 2 decimal places)
   */
  static calculateGPA(grades: { letterGrade: string; credits: number }[]): number {
    if (!grades || grades.length === 0) return 0;

    // Calculate total grade points (grade points × credits for each course)
    let totalPoints = 0;
    for (const grade of grades) {
      const points = this.GRADE_SCALE[grade.letterGrade] || 0;
      totalPoints += points * grade.credits;
    }

    // Calculate total credits
    let totalCredits = 0;
    for (const grade of grades) {
      totalCredits += grade.credits;
    }

    // GPA = total points / total credits (rounded to 2 decimal places)
      if (totalCredits > 0) {
        return parseFloat((totalPoints / totalCredits).toFixed(2));
      } else {
        return 0;
      }
  }

  /**
   * Converts a percentage score to a letter grade
   * Uses standard grading scale
   * @param percentage - Score as a percentage (0-100)
   * @returns Letter grade (A+, A, A-, B+, etc.)
   */
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

  /**
   * Returns Bootstrap color class name based on letter grade
   * Used for styling grades in the UI
   * @param letterGrade - Letter grade (A+, A, A-, etc.)
   * @returns Bootstrap color class name
   */
  static getGradeColor(letterGrade: string): string {
    if (['A+', 'A', 'A-'].includes(letterGrade)) return 'success'; // Green
    if (['B+', 'B', 'B-'].includes(letterGrade)) return 'primary'; // Blue
    if (['C+', 'C', 'C-'].includes(letterGrade)) return 'warning'; // Yellow
    return 'danger'; // Red for D and F
  }
}