import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestServicesComponent } from './request-services.component';

describe('RequestServicesComponent', () => {
  let component: RequestServicesComponent;
  let fixture: ComponentFixture<RequestServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
