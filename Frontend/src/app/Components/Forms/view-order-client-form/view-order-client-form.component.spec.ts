import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderClientFormComponent } from './view-order-client-form.component';

describe('ViewOrderClientFormComponent', () => {
  let component: ViewOrderClientFormComponent;
  let fixture: ComponentFixture<ViewOrderClientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrderClientFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrderClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
