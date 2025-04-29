// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
    
    imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm : FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login attempt with', this.loginForm.value);
      
    }
  }
}