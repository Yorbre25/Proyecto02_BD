import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProductManagementComponent } from './member-product-management.component';

describe('MemberProductManagementComponent', () => {
  let component: MemberProductManagementComponent;
  let fixture: ComponentFixture<MemberProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberProductManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
