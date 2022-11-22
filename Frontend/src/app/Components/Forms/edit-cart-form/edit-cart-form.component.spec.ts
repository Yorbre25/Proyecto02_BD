import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCartFormComponent } from './edit-cart-form.component';

describe('EditCartFormComponent', () => {
  let component: EditCartFormComponent;
  let fixture: ComponentFixture<EditCartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCartFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
