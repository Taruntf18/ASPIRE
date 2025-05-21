import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqmRequestForClarificationComponent } from './aqm-request-for-clarification.component';

describe('AqmRequestForClarificationComponent', () => {
  let component: AqmRequestForClarificationComponent;
  let fixture: ComponentFixture<AqmRequestForClarificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AqmRequestForClarificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AqmRequestForClarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
