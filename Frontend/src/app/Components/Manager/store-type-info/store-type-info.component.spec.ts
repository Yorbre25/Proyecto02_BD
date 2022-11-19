import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTypeInfoComponent } from './store-type-info.component';

describe('StoreTypeInfoComponent', () => {
  let component: StoreTypeInfoComponent;
  let fixture: ComponentFixture<StoreTypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTypeInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
