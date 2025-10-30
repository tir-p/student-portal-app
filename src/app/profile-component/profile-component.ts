import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../services/student-service';
import { ValidationUtil } from '../utils/validation-util';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  readonly student;
  readonly loading;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.student = this.studentService.student;
    this.loading = this.studentService.loading;
  }

  ngOnInit(): void {
    this.studentService.loadStudentProfile('1');
    this.initializeForm();
  }

  private initializeForm(): void {
    const student = this.student();
    
    this.profileForm = this.fb.group({
      firstName: [student?.firstName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [student?.lastName || '', [Validators.required, Validators.minLength(2)]],
      email: [student?.email || '', [Validators.required, Validators.email]],
      contactNumber: [
        student?.contactNumber || '',
        [Validators.required, ValidationUtil.phoneValidator()]
      ],
      address: this.fb.group({
        street: [student?.address.street || '', Validators.required],
        city: [student?.address.city || '', Validators.required],
        state: [student?.address.state || '', Validators.required],
        zipCode: [student?.address.zipCode || '', Validators.required],
        country: [student?.address.country || '', Validators.required]
      })
    });

    if (!this.isEditing) {
      this.profileForm.disable();
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    
    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
      this.initializeForm();
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.studentService.updateStudentProfile(this.profileForm.value)
        .subscribe(() => {
          this.isEditing = false;
          this.profileForm.disable();
        });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.profileForm.get(controlName);
    
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('email')) return 'Invalid email format';
    if (control?.hasError('minlength')) return 'Too short';
    if (control?.hasError('invalidPhone')) return 'Invalid phone number';
    
    return '';
  }
}