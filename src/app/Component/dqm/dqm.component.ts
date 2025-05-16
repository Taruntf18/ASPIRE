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
import { DqmService } from '../../service/dqm.service';

@Component({
  selector: 'app-dqm',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, HttpClientModule // ✅ Add this line
  ],
  templateUrl: './dqm.component.html',
  styleUrls: ['./dqm.component.css']
})
export class DqmComponent implements OnInit {
  dqmForm: FormGroup;
  dqmDocumentFile: File | null = null;
  existingDetailsDocFile: File | null = null;
  changesSuggestedDocFile: File | null = null;
  isLoading = false;

  constructor(
      private fb: FormBuilder, 
      private http: HttpClient, 
      private apiService: DqmService
    ) {
      this.dqmForm = this.fb.group({
        from: ['MR Office', [Validators.required]],
        to: ['Director', [Validators.required]],
        issueNumber: ['', [Validators.required]],
        issueDate: ['', [Validators.required]],
        revisionNumber: ['', [Validators.required]],
        revisionDate: ['', [Validators.required]],
        existingDetails: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
        changesSuggested: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
        dqmDocument: [null, Validators.required]
      });
    }

  ngOnInit(): void {}

  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      switch (field) {
        case 'dqmDocument':
          this.dqmDocumentFile = file;
          this.dqmForm.get('dqmDocument')?.setValue(file);
          break;
        case 'existingDetailsDoc':
          this.existingDetailsDocFile = file;
          break;
        case 'changesSuggestedDoc':
          this.changesSuggestedDocFile = file;
          break;
      }
    }
  }

  removeFile(field: string): void {
    switch (field) {
      case 'dqmDocument':
        this.dqmDocumentFile = null;
        this.dqmForm.get('dqmDocument')?.setValue(null);
        break;
      case 'existingDetailsDoc':
        this.existingDetailsDocFile = null;
        break;
      case 'changesSuggestedDoc':
        this.changesSuggestedDocFile = null;
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
    if (this.dqmForm.valid) {
      const formData = new FormData();
      
      // Append all form values
      Object.keys(this.dqmForm.value).forEach(key => {
        if (key !== 'dqmDocument') {
          formData.append(key, this.dqmForm.value[key]);
        }
      });

      // Append files
      if (this.dqmDocumentFile) {
        formData.append('dqmDocument', this.dqmDocumentFile);
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

      // // Submit to API
      // this.apiService.postDqmData(formData).subscribe({
      //   next: (res) => {
      //     console.log("DQM upload successful", res);
      //     // Add any success handling here
      //   },
      //   error: (error) => {
      //     console.log("AQM upload error", error);
      //     // Add error handling here
      //   }
      // });
      
    } else {
      this.dqmForm.markAllAsTouched();
      console.log('Form is invalid - please check all required fields');
    }
  }

  resetForm(): void {
    this.dqmForm.reset();
    this.dqmDocumentFile = null;
    this.existingDetailsDocFile = null;
    this.changesSuggestedDocFile = null;
    
    // Reset file inputs
    ['dqmDocument', 'existingDetailsDoc', 'changesSuggestedDoc'].forEach(field => {
      const fileInput = document.getElementById(field) as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    });

    // Mark all controls as untouched
    Object.keys(this.dqmForm.controls).forEach(key => {
      this.dqmForm.get(key)?.markAsUntouched();
    });
  }
}