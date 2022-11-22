import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackFormComponent } from './add-feedback-form.component';

describe('AddFeedbackFormComponent', () => {
  let component: AddFeedbackFormComponent;
  let fixture: ComponentFixture<AddFeedbackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedbackFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
