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
import { AuthService } from '../AppGuard/auth.service';

@Component({
  selector: 'app-aqm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './aqm.component.html',
  styleUrls: ['./aqm.component.css'],
})
export class AQMComponent implements OnInit {
  aqmForm: FormGroup;
  aqmDocumentFile: File | null = null;
  existingDetailsDocFile: File | null = null;
  changesSuggestedDocFile: File | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private apiService: AqmService,
    private authService: AuthService
  ) {
    this.aqmForm = this.fb.group({
      issueNumber: ['', [Validators.required]],
      issueDate: ['', [Validators.required]],
      revisionNumber: ['', [Validators.required]],
      revisionDate: ['', [Validators.required]],
      existingDetails: ['', [Validators.required]],
      existingDetailsUpload: ['N'], // Track if document is uploaded (Y/N)
      changesSuggested: ['', [Validators.required]],
      changesSuggestedUpload: ['N'], // Track if document is uploaded (Y/N)
      mrComments:[''],
      empno:[authService.getUser().employeeModel.empno, Validators.required],
      status:["MR", Validators.required],
      aqmDocument: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      switch (field) {
        case 'aqmDocument':
          this.aqmDocumentFile = file;
          this.aqmForm.get('aqmDocument')?.setValue(file);
          break;
        case 'existingDetailsDoc':
          this.existingDetailsDocFile = file;
          this.aqmForm.get('existingDetailsUpload')?.setValue('Y');
          break;
        case 'changesSuggestedDoc':
          this.changesSuggestedDocFile = file;
          this.aqmForm.get('changesSuggestedUpload')?.setValue('Y');
          break;
      }
    }
  }

  removeFile(field: string): void {
    switch (field) {
      case 'aqmDocument':
        this.aqmDocumentFile = null;
        this.aqmForm.get('aqmDocument')?.setValue(null);
        break;
      case 'existingDetailsDoc':
        this.existingDetailsDocFile = null;
        this.aqmForm.get('existingDetailsUpload')?.setValue('N');
        break;
      case 'changesSuggestedDoc':
        this.changesSuggestedDocFile = null;
        this.aqmForm.get('changesSuggestedUpload')?.setValue('N');
        break;
    }
    // Reset the file input value
    const fileInput = document.getElementById(field) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
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
    const formData = new FormData();
    
    // Append all form values
    Object.keys(this.aqmForm.value).forEach(key => {
      if (key !== 'aqmDocument' && key !== 'existingDetailsDoc' && key !== 'changesSuggestedDoc') {
        formData.append(key, this.aqmForm.value[key]);
      }
    });

    // Append files
    if (this.aqmDocumentFile) {
      formData.append('aqmDocument', this.aqmDocumentFile);
    }
    if (this.existingDetailsDocFile) {
      formData.append('existingDetailsDoc', this.existingDetailsDocFile);
    }
    if (this.changesSuggestedDocFile) {
      formData.append('changesSuggestedDoc', this.changesSuggestedDocFile);
    }

    // Log form data for debugging
    for (const [key, value] of (formData as any).entries()) {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    }
    if (this.aqmForm.valid) {

      // Submit to API
      // this.apiService.postAqmData(formData).subscribe({
      //   next: (res) => {
      //     console.log("AQM upload successful", res);
      //     // Add any success handling here
      //   },
      //   error: (error) => {
      //     console.log("AQM upload error", error);
      //     // Add error handling here
      //   }
      // });
      
    } else {
      this.aqmForm.markAllAsTouched();
      console.log('Form is invalid - please check all required fields');
    }
  }

  resetForm(): void {
    this.aqmForm.reset({
      existingDetailsUpload: 'N',
      changesSuggestedUpload: 'N'
    });
    this.aqmDocumentFile = null;
    this.existingDetailsDocFile = null;
    this.changesSuggestedDocFile = null;
    
    // Reset file inputs
    ['aqmDocument', 'existingDetailsDoc', 'changesSuggestedDoc'].forEach(field => {
      const fileInput = document.getElementById(field) as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    });

    // Mark all controls as untouched
    Object.keys(this.aqmForm.controls).forEach(key => {
      this.aqmForm.get(key)?.markAsUntouched();
    });
  }
}