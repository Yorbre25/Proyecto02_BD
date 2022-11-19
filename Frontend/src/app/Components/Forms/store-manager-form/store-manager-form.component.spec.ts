import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManagerFormComponent } from './store-manager-form.component';

describe('StoreManagerFormComponent', () => {
  let component: StoreManagerFormComponent;
  let fixture: ComponentFixture<StoreManagerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreManagerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
