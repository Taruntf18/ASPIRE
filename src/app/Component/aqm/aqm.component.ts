import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aqm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aqm.component.html',
  styleUrls: ['./aqm.component.css']
})
export class AQMComponent implements OnInit {
  aqmForm!: FormGroup;
  leadershipInfo: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.aqmForm = this.fb.group({
      qualityPolicy: ['', Validators.required],
      majorObjectives: ['', Validators.required],
    });

    this.leadershipInfo = 'Leadership info loaded from database';
  }

  onFileChange(event: any, type: string): void {
    const file = event.target.files[0];
    if (file) {
      console.log(`${type} file selected:`, file);
    }
  }

  onSubmit(): void {
    if (this.aqmForm.valid) {
      console.log('Submitted data:', this.aqmForm.value);
    }
  }
}
