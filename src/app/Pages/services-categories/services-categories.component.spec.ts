import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesCategoriesComponent } from './services-categories.component';

describe('ServicesCategoriesComponent', () => {
  let component: ServicesCategoriesComponent;
  let fixture: ComponentFixture<ServicesCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
