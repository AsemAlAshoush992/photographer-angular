import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryOrdersComponent } from './gallery-orders.component';

describe('GalleryOrdersComponent', () => {
  let component: GalleryOrdersComponent;
  let fixture: ComponentFixture<GalleryOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
