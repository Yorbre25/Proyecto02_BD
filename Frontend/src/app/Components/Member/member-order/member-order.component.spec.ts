import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberOrderComponent } from './member-order.component';

describe('MemberOrderComponent', () => {
  let component: MemberOrderComponent;
  let fixture: ComponentFixture<MemberOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
