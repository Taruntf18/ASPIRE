import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AQMComponent } from './aqm.component';

describe('AQMComponent', () => {
  let component: AQMComponent;
  let fixture: ComponentFixture<AQMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AQMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AQMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
