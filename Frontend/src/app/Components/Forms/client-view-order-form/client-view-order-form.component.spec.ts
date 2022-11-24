import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewOrderFormComponent } from './client-view-order-form.component';

describe('ClientViewOrderFormComponent', () => {
  let component: ClientViewOrderFormComponent;
  let fixture: ComponentFixture<ClientViewOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientViewOrderFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientViewOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
