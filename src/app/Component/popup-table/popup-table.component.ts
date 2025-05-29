import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AqmService } from '../../service/aqm.service';
import { AuthService } from '../AppGuard/auth.service';

@Component({
  selector: 'app-popup-table',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './popup-table.component.html',
  styleUrl: './popup-table.component.css'
})
export class PopupTableComponent {
  @Input() data: any;
  @Input() visible: boolean = false;
  @Input() typeOfsubmit: any;
  @Output() visibleChange = new EventEmitter<boolean>();
  commentsForm: FormGroup;
  aspireAqmAmendmentFlowModel: any;

  constructor(private fb: FormBuilder, private aqmService: AqmService, private authService: AuthService) {
    this.commentsForm = this.fb.group({
      comments: ['', Validators.required]
    })
  }

  close() {
    this.commentsForm.controls['comments'].setValue('');
    this.visible = false;
    this.visibleChange.emit(false);
    console.log(this.data);
    console.log(this.authService.getUser());
    
  }

  submitComment() {
    let jsonData = {
      "aqmMasterTransId": this.data.aqmMasterTransId,
      "status": "MR_office_for_clarification", 
      "aspireAqmAmendmentFlowModel": {
        "status":"",
        "remarks": this.commentsForm.controls['comments'].value,
        "reqFromRole": "MR",
        "reqToRole": "MR-Office",
        "requestFrom": this.authService.getUser().employeeModel.empno,
        "requestTo": this.authService.getUser().employeeModel.empno,
      },
    };

    if (this.typeOfsubmit == 'approve') {
      jsonData.aspireAqmAmendmentFlowModel.status = "Approved";
      console.log(jsonData);
      this.aqmService.updateAqmWithStatus(jsonData).subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log(error)
      })
    } else if (this.typeOfsubmit == 'resend') {
      jsonData.aspireAqmAmendmentFlowModel.status = "Sent Back";
      console.log(jsonData);
      this.aqmService.updateAqmWithStatus(jsonData).subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log(error)
      })
    } else if (this.typeOfsubmit == 'reject') {
      jsonData.status = "Rejected"
      jsonData.aspireAqmAmendmentFlowModel.status = "Reject";
      console.log(jsonData);
      
      this.aqmService.updateAqmWithStatus(jsonData).subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log(error)
      })
    }
    this.close();
  }
}
