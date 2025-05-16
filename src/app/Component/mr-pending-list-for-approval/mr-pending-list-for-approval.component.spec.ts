import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MRPendingListForApprovalComponent } from './mr-pending-list-for-approval.component';

describe('MRPendingListForApprovalComponent', () => {
  let component: MRPendingListForApprovalComponent;
  let fixture: ComponentFixture<MRPendingListForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MRPendingListForApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MRPendingListForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
