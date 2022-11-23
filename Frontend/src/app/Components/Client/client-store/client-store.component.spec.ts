import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSTOREComponent } from './client-store.component';

describe('ClientSTOREComponent', () => {
  let component: ClientSTOREComponent;
  let fixture: ComponentFixture<ClientSTOREComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSTOREComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSTOREComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
