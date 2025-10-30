import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidationUtil {
  static studentIdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const pattern = /^[A-Z]{2}\d{6}$/;
      return pattern.test(value) ? null : { invalidStudentId: true };
    };
  }

  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const pattern = /^\+?[\d\s-()]+$/;
      return pattern.test(value) && value.replace(/\D/g, '').length >= 10
        ? null
        : { invalidPhone: true };
    };
  }

  static gpaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined) return null;

      return value >= 0 && value <= 4.0 ? null : { invalidGPA: true };
    };
  }
}