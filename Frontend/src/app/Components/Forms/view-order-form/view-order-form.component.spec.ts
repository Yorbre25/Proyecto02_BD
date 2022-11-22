import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderFormComponent } from './view-order-form.component';

describe('ViewOrderFormComponent', () => {
  let component: ViewOrderFormComponent;
  let fixture: ComponentFixture<ViewOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrderFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
