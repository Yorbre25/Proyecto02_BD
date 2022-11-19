import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryManInfoComponent } from './delivery-man-info.component';

describe('DeliveryManInfoComponent', () => {
  let component: DeliveryManInfoComponent;
  let fixture: ComponentFixture<DeliveryManInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryManInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryManInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
