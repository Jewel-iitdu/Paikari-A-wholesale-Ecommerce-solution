import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemBarComponent } from './menu-item-bar.component';

describe('MenuItemBarComponent', () => {
  let component: MenuItemBarComponent;
  let fixture: ComponentFixture<MenuItemBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
