import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-aqm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './aqm.component.html',
  styleUrls: ['./aqm.component.css']
})
export class AQMComponent implements OnInit {
  aqmForm: FormGroup;
  leadershipData: any[] = [];
  orgChartFile: File | null = null;
  orgChartPreview: string | null = null;
  aqmDocumentFile: File | null = null;
  isLoading = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.aqmForm = this.fb.group({
      qualityPolicy: ['', [Validators.required, Validators.minLength(50)]],
      majorObjectives: this.fb.array([
        this.fb.control('', [Validators.required, Validators.minLength(3)])
      ])
    });
  }

  ngOnInit(): void {
    this.loadLeadershipData();
  }

  get majorObjectives(): FormArray {
    return this.aqmForm.get('majorObjectives') as FormArray;
  }

  addProcedure(): void {
    this.majorObjectives.push(
      this.fb.control('', [Validators.required, Validators.minLength(3)])
    );
  }

  loadLeadershipData(): void {
    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      this.leadershipData = [];
      this.isLoading = false;
    }, 1500);
  }

  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      if (field === 'orgChart') {
        this.orgChartFile = file;
        this.previewImage(file);
      } else if (field === 'aqmDocument') {
        this.aqmDocumentFile = file;
      }
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.orgChartPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeFile(field: string): void {
    if (field === 'orgChart') {
      this.orgChartFile = null;
      this.orgChartPreview = null;
    } else if (field === 'aqmDocument') {
      this.aqmDocumentFile = null;
    }
  }

  getFileSize(bytes: number): string {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onSubmit(): void {
    if (this.aqmForm.valid) {
      const formData = new FormData();
      formData.append('qualityPolicy', this.aqmForm.value.qualityPolicy);
      this.majorObjectives.controls.forEach((control, index) => {
        formData.append(`majorObjectives[${index}]`, control.value);
      });

      if (this.orgChartFile) {
        formData.append('orgChart', this.orgChartFile);
      }
      if (this.aqmDocumentFile) {
        formData.append('aqmDocument', this.aqmDocumentFile);
      }

      // In real app: this.http.post('/api/aqm', formData).subscribe(...)
      console.log('Form submitted', formData);
      alert('Form submitted successfully!');
    } else {
      this.aqmForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.aqmForm.reset();
    // Reset FormArray to 1 control
    this.majorObjectives.clear();
    this.addProcedure();

    this.orgChartFile = null;
    this.orgChartPreview = null;
    this.aqmDocumentFile = null;
  }
}
