import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleLookupComponent } from './vehicle-lookup.component';

describe('VehicleLookupComponent', () => {
  let component: VehicleLookupComponent;
  let fixture: ComponentFixture<VehicleLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleLookupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
