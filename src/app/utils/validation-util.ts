import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Utility class for form validation
 * Provides custom validators for student-related fields
 */
export class ValidationUtil {
  /**
   * Validates student ID format
   * Expected format: 2 uppercase letters followed by 6 digits (e.g., "CS202101")
   * @returns Validator function for Angular forms
   */
  static studentIdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      // If empty, don't validate (handled by required validator)
      if (!value) return null;

      // Pattern: 2 letters (A-Z) followed by 6 digits
      const pattern = /^[A-Z]{2}\d{6}$/;
      // Return error if pattern doesn't match, null if valid
      return pattern.test(value) ? null : { invalidStudentId: true };
    };
  }

  /**
   * Validates phone number format
   * Allows international format with +, spaces, dashes, and parentheses
   * Must have at least 10 digits
   * @returns Validator function for Angular forms
   */
  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      // If empty, don't validate (handled by required validator)
      if (!value) return null;

      // Pattern allows + at start, digits, spaces, dashes, parentheses
      const pattern = /^\+?[\d\s-()]+$/;
      // Remove all non-digits and check length
      const digitCount = value.replace(/\D/g, '').length;
      
      // Valid if pattern matches AND has at least 10 digits
      return pattern.test(value) && digitCount >= 10
        ? null
        : { invalidPhone: true };
    };
  }

  /**
   * Validates GPA value
   * GPA must be between 0.0 and 4.0
   * @returns Validator function for Angular forms
   */
  static gpaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      // If empty, don't validate (handled by required validator)
      if (value === null || value === undefined) return null;

      // GPA must be between 0 and 4.0
      return value >= 0 && value <= 4.0 ? null : { invalidGPA: true };
    };
  }
}