import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AQMPendingListForApprovalComponent } from './aqm-pending-list-for-approval.component';

describe('AQMPendingListForApprovalComponent', () => {
  let component: AQMPendingListForApprovalComponent;
  let fixture: ComponentFixture<AQMPendingListForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AQMPendingListForApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AQMPendingListForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
