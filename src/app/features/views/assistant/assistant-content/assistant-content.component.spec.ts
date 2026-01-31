import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantContentComponent } from './assistant-content.component';

describe('AssistantContentComponent', () => {
  let component: AssistantContentComponent;
  let fixture: ComponentFixture<AssistantContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
