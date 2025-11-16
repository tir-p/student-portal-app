import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student-service';
import { ValidationUtil } from '../../utils/validation-util';

/**
 * Profile Component
 * Allows students to view and edit their profile information
 * Uses reactive forms with validation
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.scss']
})
export class ProfileComponent implements OnInit {
  // Form group to manage all form controls
  profileForm!: FormGroup;
  
  // Connect to service signals
  readonly student;
  readonly loading;

  /*
  why use readonly signasl?
  readonly ensures the component treats service-provided signals as read-only references, 
  avoiding accidental reassignment and making intent explicit. 
  You still get reactive updates as the service writes to those signals.
  */
  
  // Tracks whether user is in edit mode
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.student = this.studentService.student;
    this.loading = this.studentService.loading;
  }

  /**
   * Called when component initializes
   * Loads student profile and sets up the form
   */
  ngOnInit(): void {
    this.studentService.loadStudentProfile('1');
    this.initializeForm();
  }

  /**
   * Initializes the form with student data
   * Sets up validation rules for each field
   * Form is disabled by default (view mode)
   */
  private initializeForm(): void {
    const student = this.student();
    
    // Create form group with all student fields and validation rules
    this.profileForm = this.fb.group({
      firstName: [student?.firstName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [student?.lastName || '', [Validators.required, Validators.minLength(2)]],
      email: [student?.email || '', [Validators.required, Validators.email]],
      contactNumber: [
        student?.contactNumber || '',
        [Validators.required, ValidationUtil.phoneValidator()]
      ],
      // Nested form group for address fields
      address: this.fb.group({
        street: [student?.address?.street || '', Validators.required],
        city: [student?.address?.city || '', Validators.required],
        state: [student?.address?.state || '', Validators.required],
        zipCode: [student?.address?.zipCode || '', Validators.required],
        country: [student?.address?.country || '', Validators.required]
      })
    });

    // Disable form if not in edit mode (view-only)
    if (!this.isEditing) {
      this.profileForm.disable();
    }
  }

  /**
   * Toggles between edit mode and view mode
   * Enables/disables form accordingly
   */
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    
    if (this.isEditing) {
      // Enable form for editing
      this.profileForm.enable();
    } else {
      // Disable form and reset to original values
      this.profileForm.disable();
      this.initializeForm();
    }
  }

  /**
   * Handles form submission
   * Updates student profile if form is valid
   */
  onSubmit(): void {
    if (this.profileForm.valid && this.student()) {
      const studentId = this.student()!.id;
      const updatedStudent = { ...this.student()!, ...this.profileForm.value };
      this.studentService.updateStudentProfile(studentId, updatedStudent);
      this.isEditing = false;
      this.profileForm.disable();
    }
  }


  /**
   * Gets error message for a form field
   * Used to display validation errors to the user
   * @param controlName - Name of the form control
   * @returns Error message string
   */
  getErrorMessage(controlName: string): string {
    const control = this.profileForm.get(controlName);
    
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('email')) return 'Invalid email format';
    if (control?.hasError('minlength')) return 'Too short';
    if (control?.hasError('invalidPhone')) return 'Invalid phone number';
    
    return '';
  }
}