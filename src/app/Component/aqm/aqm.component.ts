import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
    private apiService: AqmService,
    private authService: AuthService
  ) {
    this.aqmForm = this.fb.group({
      issueNo: ['', [Validators.required]],
      issueDate: ['', [Validators.required]],
      revisionNo: ['', [Validators.required]],
      revisionDate: ['', [Validators.required]],
      existingDetails: ['', [Validators.required]],
      existingDetailsUpload: ['N'],
      changesSuggested: ['', [Validators.required]],
      changesSuggestedUpload: ['N'],
      mrComments: [''],
      requestOn: [''],
      status: ['MR', Validators.required],
      empno: [authService.getUser().employeeModel.empno, Validators.required],
      aqmDocument: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

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
    if (this.aqmForm.valid) {
      this.isLoading = true;

      // Step 1: Build plain JSON object from form values
      const aqmFormJson: any = {};

      Object.keys(this.aqmForm.value).forEach((key) => {
        // Exclude file-related fields and only include form data
        if (
          key !== 'aqmDocument' &&
          key !== 'existingDetailsDoc' &&
          key !== 'changesSuggestedDoc'
        ) {
          aqmFormJson[key] = this.aqmForm.value[key];
        }
      });

      // Step 2: Add nested JSON object for aspireAqmAmendmentFlowWrapper
      aqmFormJson['aspireAqmAmendmentFlowWrapper'] = {
        reqFromRole: 'MR-Office',
        requestFrom: this.authService.getUser().employeeModel.empno,
        reqToRole: 'MR',
        status: 'Requested',
      };

      console.log('AQM Form JSON:', JSON.stringify(aqmFormJson, null, 2));

      this.apiService.postAqmData(aqmFormJson).subscribe({
        next: (res) => {
          if (res.existingDetailsUpload == 'Y' && this.existingDetailsDocFile) {
            const renamedFile = new File([this.existingDetailsDocFile], res.exsitingDetailsFileName, { type: this.existingDetailsDocFile.type });
            this.apiService.uploadDocument(renamedFile, "aqmExistingDetails").subscribe({
              next: (res) => { console.log(res) },
              error: (err) => { console.log(err) }
            })
          }

          if (res.changesSuggestedUpload == 'Y' && this.changesSuggestedDocFile) {
            const renamedFile = new File([this.changesSuggestedDocFile], res.changesSuggestedFileName, { type: this.changesSuggestedDocFile.type });
            this.apiService.uploadDocument(renamedFile, "aqmChangesSuggested").subscribe({
              next: (res) => { console.log(res) },
              error: (err) => { console.log(err) }
            })
          }
          if (this.aqmDocumentFile) {
            const renamedFile = new File([this.aqmDocumentFile], res.unsignedAqmFileName, { type: this.aqmDocumentFile.type });
            this.apiService.uploadDocument(renamedFile, "aqmUnsignedAmendmentDoc").subscribe({
              next: (res) => { console.log(res) },
              error: (err) => { console.log(err) }
            })
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log("AQM submission error", err);
          this.isLoading = false;
        }
      });
    } else {
      this.aqmForm.markAllAsTouched();
      console.log('Form is invalid - please check all required fields');
    }
  }

  resetForm(): void {
    this.aqmForm.reset({
      existingDetailsUpload: 'N',
      changesSuggestedUpload: 'N',
    });
    this.aqmDocumentFile = null;
    this.existingDetailsDocFile = null;
    this.changesSuggestedDocFile = null;

    // Reset file inputs
    ['aqmDocument', 'existingDetailsDoc', 'changesSuggestedDoc'].forEach(
      (field) => {
        const fileInput = document.getElementById(field) as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }
    );

    // Mark all controls as untouched
    Object.keys(this.aqmForm.controls).forEach((key) => {
      this.aqmForm.get(key)?.markAsUntouched();
    });
  }
}
