import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightInterfaceComponent } from './light-interface.component';

describe('LightInterfaceComponent', () => {
  let component: LightInterfaceComponent;
  let fixture: ComponentFixture<LightInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
