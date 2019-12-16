import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintBoxComponent } from './complaint-box.component';

describe('ComplaintBoxComponent', () => {
  let component: ComplaintBoxComponent;
  let fixture: ComponentFixture<ComplaintBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
