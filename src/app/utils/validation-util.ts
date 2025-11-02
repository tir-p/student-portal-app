import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Utility class for form validation
 * Provides custom validators for student-related fields
 */
export class ValidationUtil {
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
}