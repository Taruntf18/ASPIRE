import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(
      'haryhsyt'
    );
    
    if (this.loginForm.valid) {
      console.log('Submitted form data:', this.loginForm.value);
      this.isLoading = true;

      this.http.post(`${baseUrl}/login`, this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login successful', res);
          alert('Login successful!');
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Login error', err);
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.isLoading = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
