import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProductInfoComponent } from './member-product-info.component';

describe('MemberProductInfoComponent', () => {
  let component: MemberProductInfoComponent;
  let fixture: ComponentFixture<MemberProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberProductInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
