import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqmStatusComponent } from './aqm-status.component';

describe('AqmStatusComponent', () => {
  let component: AqmStatusComponent;
  let fixture: ComponentFixture<AqmStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AqmStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AqmStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
