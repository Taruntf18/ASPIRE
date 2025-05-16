import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupdetailsComponent } from './popupdetails.component';

describe('PopupdetailsComponent', () => {
  let component: PopupdetailsComponent;
  let fixture: ComponentFixture<PopupdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
