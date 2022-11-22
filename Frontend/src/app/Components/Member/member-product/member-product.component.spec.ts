import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProductComponent } from './member-product.component';

describe('MemberProductComponent', () => {
  let component: MemberProductComponent;
  let fixture: ComponentFixture<MemberProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
