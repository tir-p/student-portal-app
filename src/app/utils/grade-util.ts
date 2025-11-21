/**
 * Utility class for grade calculations
 * Handles GPA, letter grade conversion and UI color mapping
 */
export class GradeUtil {

  /**
   * Grade scale mapping: letter grade → grade points
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
  };

  /**
   * Calculates GPA from an array of grades.
   * Formula: Σ(grade points × credits) / Σ(credits)
   */
  static calculateGPA(grades: { letterGrade: string; credits: number }[]): number {
    if (!grades || grades.length === 0) return 0; // ✔ If grades is null, undefined, or empty → return 0 immediately (no data to calculate GPA).

    let totalPoints = 0;
    let totalCredits = 0;

    for (const grade of grades) {
      const normalized = grade.letterGrade.trim().toUpperCase(); //Convert grade to uppercase and remove spaces (" a " → "A"):
      const points = this.GRADE_SCALE[normalized] ?? 0; // ?? 0 → If grade not found in GRADE_SCALE, assume 0 points.

      totalPoints += points * grade.credits;
      totalCredits += grade.credits;
    }

    if (totalCredits === 0) return 0;

    return parseFloat((totalPoints / totalCredits).toFixed(2));
  }

  /**
   * Converts a percentage to a letter grade.
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
   * Returns color class based on letter grade.
   */
  static getGradeColor(letterGrade: string): string {
    const grade = letterGrade.trim().toUpperCase();

    if (['A+', 'A', 'A-'].includes(grade)) return 'success'; // Green
    if (['B+', 'B', 'B-'].includes(grade)) return 'primary'; // Blue
    if (['C+', 'C', 'C-'].includes(grade)) return 'warning'; // Yellow

    return 'danger'; // D, F
  }
}
