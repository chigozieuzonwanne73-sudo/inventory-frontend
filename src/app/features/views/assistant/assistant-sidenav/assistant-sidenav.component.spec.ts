import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantSidenavComponent } from './assistant-sidenav.component';

describe('AssistantSidenavComponent', () => {
  let component: AssistantSidenavComponent;
  let fixture: ComponentFixture<AssistantSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
