import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBusinessComponent } from './client-business.component';

describe('ClientBusinessComponent', () => {
  let component: ClientBusinessComponent;
  let fixture: ComponentFixture<ClientBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
