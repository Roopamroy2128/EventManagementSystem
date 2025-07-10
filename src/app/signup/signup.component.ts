import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, SignupRequest } from '../services/auth.service'; // ✅ Import AuthService
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  showSuccessPopup = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // ✅ Inject AuthService
    private router: Router            // ✅ Inject Router for optional redirect
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { mismatch: true }
      : null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
const signupData: SignupRequest = {
  firstName: formValue.firstName,
  lastName: formValue.lastName,
  email: formValue.email,
  phoneNumber: formValue.phone,
  password: formValue.password,
  role: 'User' // or optional
};
      this.authService.signup(signupData).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.showSuccessPopup = true;

          // Optional: redirect after delay
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Signup failed:', error);
          if (error.status === 409) {
            this.errorMessage = 'Email already exists. Please use a different email.';
          } else {
            this.errorMessage = 'Signup failed. Please try again later.';
          }
        }
      });
    }
  }
}
