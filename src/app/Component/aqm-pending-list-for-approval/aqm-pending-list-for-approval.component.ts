import { Component, OnInit } from '@angular/core';
import { AqmService } from '../../service/aqm.service';
import { PopupTableComponent } from '../popup-table/popup-table.component';

@Component({
  selector: 'app-aqm-pending-list-for-approval',
  standalone: true,
  imports: [PopupTableComponent],
  templateUrl: './aqm-pending-list-for-approval.component.html',
  styleUrl: './aqm-pending-list-for-approval.component.css'
})
export class AQMPendingListForApprovalComponent implements OnInit {
  aqmData: any = [];
  isPopupVisible = false;
  selectedData: any;
  submitType: String | undefined;
  constructor(private aqmService: AqmService) { }

  ngOnInit(): void {
    this.fetchAqmData();
  }

  fetchAqmData(){
    this.aqmService.getDataByStatus('MR').subscribe({
      next: (data) => {
        this.aqmData = data;
        console.log(this.aqmData);
        
      },
      error: (error) => {
        console.error('Error fetching AQM data:', error);
      }
    });
  }

  showPopup(item: any, type: String) {
    this.selectedData =  JSON.parse(JSON.stringify(item));
    this.submitType = type;
    this.isPopupVisible = true;
  }

}