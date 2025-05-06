import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ProcedureDocument {
  file: File | null;
}

interface WorkInstruction {
  text: string;
  document: File | null;
}

interface QualityRecord {
  text: string;
  document: File | null;
}

interface Format {
  text: string;
  document: File | null;
}

@Component({
  selector: 'app-dqm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // Added FormsModule here
  templateUrl: './dqm.component.html',
  styleUrls: ['./dqm.component.css']
})
export class DqmComponent {
  divisions = [
    'Administration',
    'Finance',
    'Human Resources',
    'Operations',
    'IT',
    'Marketing',
    'Sales',
    'Customer Support'
  ];

  dqmForm: FormGroup;
  procedureDocuments: ProcedureDocument[] = [];
  showSecondForm = false;
  workInstructions: WorkInstruction[][] = [];
  qualityRecords: QualityRecord[][] = [];
  formats: Format[][] = [];
  currentProcedureIndex = 0;
  allProceduresCompleted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.dqmForm = this.fb.group({
      division: ['', Validators.required],
      mainObjectives: ['', Validators.required],
      coreActivities: this.fb.array([''], Validators.required),
      procedures: this.fb.array([''], Validators.required)
    });
    this.procedureDocuments.push({ file: null });
  }

  get coreActivities() {
    return this.dqmForm.get('coreActivities') as FormArray;
  }

  get procedures() {
    return this.dqmForm.get('procedures') as FormArray;
  }

  addCoreActivity() {
    this.coreActivities.push(this.fb.control('', Validators.required));
  }

  removeCoreActivity(index: number) {
    if (this.coreActivities.length > 1) {
      this.coreActivities.removeAt(index);
    }
  }

  addProcedure() {
    this.procedures.push(this.fb.control('', Validators.required));
    this.procedureDocuments.push({ file: null });
  }

  removeProcedure(index: number) {
    if (this.procedures.length > 1) {
      this.procedures.removeAt(index);
      this.procedureDocuments.splice(index, 1);
    }
  }

  onProcedureDocChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.procedureDocuments[index] = {
        ...this.procedureDocuments[index],
        file: input.files[0]
      };
    }
  }

  removeProcedureDoc(index: number) {
    this.procedureDocuments[index].file = null;
    const fileInput = document.getElementById(`procedureDoc_${index}`) as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  getFileSize(bytes: number | undefined): string {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  handleNext() {
    if (this.dqmForm.valid) {
      const procedureCount = this.procedures.length;
      this.workInstructions = Array(procedureCount).fill(null).map(() => [{ text: '', document: null }]);
      this.qualityRecords = Array(procedureCount).fill(null).map(() => [{ text: '', document: null }]);
      this.formats = Array(procedureCount).fill(null).map(() => [{ text: '', document: null }]);
      this.currentProcedureIndex = 0;
      this.allProceduresCompleted = false;
      this.showSecondForm = true;
    }
  }

  // Work Instructions methods
  addWorkInstruction(procedureIndex: number) {
    this.workInstructions[procedureIndex].push({ text: '', document: null });
  }

  removeWorkInstruction(procedureIndex: number, instructionIndex: number) {
    if (this.workInstructions[procedureIndex].length > 1) {
      this.workInstructions[procedureIndex].splice(instructionIndex, 1);
    }
  }

  onWorkInstructionDocChange(event: Event, procedureIndex: number, instructionIndex: number) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.workInstructions[procedureIndex][instructionIndex].document = input.files[0];
    }
  }

  removeWorkInstructionDoc(procedureIndex: number, instructionIndex: number) {
    this.workInstructions[procedureIndex][instructionIndex].document = null;
    const fileInput = document.getElementById(`workInstructionDoc_${procedureIndex}_${instructionIndex}`) as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  // Quality Records methods
  addQualityRecord(procedureIndex: number) {
    this.qualityRecords[procedureIndex].push({ text: '', document: null });
  }

  removeQualityRecord(procedureIndex: number, recordIndex: number) {
    if (this.qualityRecords[procedureIndex].length > 1) {
      this.qualityRecords[procedureIndex].splice(recordIndex, 1);
    }
  }

  onQualityRecordDocChange(event: Event, procedureIndex: number, recordIndex: number) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.qualityRecords[procedureIndex][recordIndex].document = input.files[0];
    }
  }

  removeQualityRecordDoc(procedureIndex: number, recordIndex: number) {
    this.qualityRecords[procedureIndex][recordIndex].document = null;
    const fileInput = document.getElementById(`qualityRecordDoc_${procedureIndex}_${recordIndex}`) as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  // Formats methods
  addFormat(procedureIndex: number) {
    this.formats[procedureIndex].push({ text: '', document: null });
  }

  removeFormat(procedureIndex: number, formatIndex: number) {
    if (this.formats[procedureIndex].length > 1) {
      this.formats[procedureIndex].splice(formatIndex, 1);
    }
  }

  onFormatDocChange(event: Event, procedureIndex: number, formatIndex: number) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.formats[procedureIndex][formatIndex].document = input.files[0];
    }
  }

  removeFormatDoc(procedureIndex: number, formatIndex: number) {
    this.formats[procedureIndex][formatIndex].document = null;
    const fileInput = document.getElementById(`formatDoc_${procedureIndex}_${formatIndex}`) as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  submitProcedureDetails() {
    // Move to next procedure or mark as completed
    if (this.currentProcedureIndex < this.procedures.length - 1) {
      this.currentProcedureIndex++;
    } else {
      this.allProceduresCompleted = true;
    }
  }

  onSubmitSecondForm() {
    const formData = new FormData();

    formData.append('division', this.dqmForm.value.division);
    formData.append('mainObjectives', this.dqmForm.value.mainObjectives);

    this.dqmForm.value.coreActivities.forEach((activity: string, index: number) => {
      formData.append(`coreActivities[${index}]`, activity);
    });

    this.dqmForm.value.procedures.forEach((procedure: string, index: number) => {
      formData.append(`procedures[${index}]`, procedure);
      if (this.procedureDocuments[index]?.file) {
        formData.append(`procedureDocuments[${index}]`, this.procedureDocuments[index].file as File);
      }

      this.workInstructions[index].forEach((instruction, i) => {
        formData.append(`procedures[${index}].workInstructions[${i}].text`, instruction.text);
        if (instruction.document) {
          formData.append(`procedures[${index}].workInstructions[${i}].document`, instruction.document);
        }
      });

      this.qualityRecords[index].forEach((record, i) => {
        formData.append(`procedures[${index}].qualityRecords[${i}].text`, record.text);
        if (record.document) {
          formData.append(`procedures[${index}].qualityRecords[${i}].document`, record.document);
        }
      });

      this.formats[index].forEach((format, i) => {
        formData.append(`procedures[${index}].formats[${i}].text`, format.text);
        if (format.document) {
          formData.append(`procedures[${index}].formats[${i}].document`, format.document);
        }
      });
    });

    console.log('Form submitted with all data:', formData);
    alert('All data submitted successfully!');
  }

  goBack() {
    if (this.currentProcedureIndex > 0) {
      this.currentProcedureIndex--;
    } else {
      this.showSecondForm = false;
    }
  }
}