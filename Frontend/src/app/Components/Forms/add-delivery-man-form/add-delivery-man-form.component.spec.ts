import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryManFormComponent } from './add-delivery-man-form.component';

describe('AddDeliveryManFormComponent', () => {
  let component: AddDeliveryManFormComponent;
  let fixture: ComponentFixture<AddDeliveryManFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeliveryManFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeliveryManFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
