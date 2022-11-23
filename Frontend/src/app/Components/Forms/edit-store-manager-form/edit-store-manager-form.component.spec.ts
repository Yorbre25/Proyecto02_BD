import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStoreManagerFormComponent } from './edit-store-manager-form.component';

describe('EditStoreManagerFormComponent', () => {
  let component: EditStoreManagerFormComponent;
  let fixture: ComponentFixture<EditStoreManagerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStoreManagerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStoreManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
