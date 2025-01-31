import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateGalleryComponent } from './private-gallery.component';

describe('PrivateGalleryComponent', () => {
  let component: PrivateGalleryComponent;
  let fixture: ComponentFixture<PrivateGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
