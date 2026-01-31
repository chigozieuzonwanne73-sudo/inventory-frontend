import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionDialogComponent } from './transmission-dialog.component';

describe('TransmissionDialogComponent', () => {
  let component: TransmissionDialogComponent;
  let fixture: ComponentFixture<TransmissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
