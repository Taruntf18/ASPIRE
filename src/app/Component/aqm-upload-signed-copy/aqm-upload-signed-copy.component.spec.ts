import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqmUploadSignedCopyComponent } from './aqm-upload-signed-copy.component';

describe('AqmUploadSignedCopyComponent', () => {
  let component: AqmUploadSignedCopyComponent;
  let fixture: ComponentFixture<AqmUploadSignedCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AqmUploadSignedCopyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AqmUploadSignedCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
