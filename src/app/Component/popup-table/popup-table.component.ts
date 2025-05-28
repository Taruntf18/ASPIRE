import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder){
    this.commentsForm = this.fb.group({
      comments:['', Validators.required]
    })
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  
  submitComment() {
    console.log('Submitted comment:' + this.commentsForm.get('comments')?.value);
    console.log('type of submit ' + this.typeOfsubmit);
    if(this.typeOfsubmit == 'approve'){

    }else if(this.typeOfsubmit == 'resend'){

    }else if(this.typeOfsubmit == 'reject'){
      
    }
    this.close();
  }
}
