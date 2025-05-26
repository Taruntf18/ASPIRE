import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../AppGuard/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { userId, password } = this.loginForm.value;

    this.authService.login(userId, password).subscribe({
      next: (response) => {
        this.authService.setUserData(response);
        const roles = response.roles || [];

        if (roles.includes('MR')) {
          this.router.navigate(['/aqm-amendment-pending']);
        } else if (roles.includes('MR-Office')) {
          this.router.navigate(['/aqm-amendment-request']);
        } else if (roles.includes('DR')) {
          this.router.navigate(['/aqm-status']);
        } else {
          this.errorMessage = 'Unauthorized role. Please contact admin.';
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.isLoading = false;
      },
    });
  }
}