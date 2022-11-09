import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManagerFormComponent } from './edit-manager-form.component';

describe('EditManagerFormComponent', () => {
  let component: EditManagerFormComponent;
  let fixture: ComponentFixture<EditManagerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditManagerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
