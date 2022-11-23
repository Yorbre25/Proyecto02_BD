import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRecentsComponent } from './client-recents.component';

describe('ClientRecentsComponent', () => {
  let component: ClientRecentsComponent;
  let fixture: ComponentFixture<ClientRecentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRecentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRecentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
