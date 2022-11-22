import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAdministrationComponent } from './member-administration.component';

describe('MemberAdministrationComponent', () => {
  let component: MemberAdministrationComponent;
  let fixture: ComponentFixture<MemberAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberAdministrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
