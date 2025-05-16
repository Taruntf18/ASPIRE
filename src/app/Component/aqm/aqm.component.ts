import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AqmService } from '../../service/aqm.service';

@Component({
  selector: 'app-aqm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './aqm.component.html',
  styleUrls: ['./aqm.component.css'],
})

export class AQMComponent implements OnInit {
  aqmForm: FormGroup;
  leadershipData: any[] = [];
  orgChartFile: File | null = null;
  orgChartPreview: string | null = null;
  aqmDocumentFile: File | null = null;
  isLoading = false;


  constructor(private fb: FormBuilder, private http: HttpClient, private apiService: AqmService) {
    this.aqmForm = this.fb.group({
      issueNumber:['', [Validators.required]],
      revisionNumber:['',[Validators.required]],
      qualityPolicy: ['', [Validators.required,  Validators.minLength(50),  Validators.maxLength(500)]],
      majorObjectives: this.fb.array([
        this.fb.group({
          objective: ['', [Validators.required, Validators.maxLength(3)]],
        }),
      ]),
      orgChart: [null, Validators.required],  // Add required validator for image
      aqmDocument: [null, Validators.required]  // Add required validator for PDF
    });
  }

  ngOnInit(): void {
    this.loadLeadershipData();
  }

  get majorObjectives(): FormArray {
    return this.aqmForm.get('majorObjectives') as FormArray;
  }

  allObjectivesValid(): boolean {
    return this.majorObjectives.controls.every((control) => control.valid);
  }

  addProcedure(): void {
    this.majorObjectives.push(
      this.fb.group({
        objective: ['', [Validators.required, Validators.minLength(3)]],
      })
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
        this.aqmForm.get('orgChart')?.setValue(file); // Update form control
        this.previewImage(file);
      } else if (field === 'aqmDocument') {
        this.aqmDocumentFile = file;
        this.aqmForm.get('aqmDocument')?.setValue(file); // Update form control
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
      this.aqmForm.get('orgChart')?.setValue(null); // Clear form control
    } else if (field === 'aqmDocument') {
      this.aqmDocumentFile = null;
      this.aqmForm.get('aqmDocument')?.setValue(null); // Clear form control
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
    // Proceed with form submission if valid
    if (this.aqmForm.valid) {
      const formData = new FormData();
      formData.append('qualityPolicy', this.aqmForm.value.qualityPolicy);
      
      this.aqmForm.value.majorObjectives.forEach((obj: any, index: number) => {
        formData.append(`majorObjectives[${index}]`, obj.objective);
      });
  
      if (this.orgChartFile) {
        formData.append('orgChart', this.orgChartFile);
      }
      if (this.aqmDocumentFile) {
        formData.append('aqmDocument', this.aqmDocumentFile);
      }

      


      for (const [key, value] of (formData as any).entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }
      

      this.apiService.postAqmData(formData).subscribe({
        next:(res) => {
          console.log("aqm upload Successful", res)
        },
        error:(error) => console.log("aqm upload error", error)
      })
      
      

    } else {
      this.aqmForm.markAllAsTouched();
      console.log('Form is invalid - please check all required fields');
    }
  }



  resetForm(): void {
    this.aqmForm.reset();
    this.majorObjectives.clear();
    this.addProcedure();
  
    this.orgChartFile = null;
    this.orgChartPreview = null;
    this.aqmDocumentFile = null;
    
    // Explicitly mark the file controls as untouched
    this.aqmForm.get('orgChart')?.markAsUntouched();
    this.aqmForm.get('aqmDocument')?.markAsUntouched();
  }
}