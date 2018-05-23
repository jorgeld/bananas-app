import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmistososComponent } from './amistosos.component';

describe('AmistososComponent', () => {
  let component: AmistososComponent;
  let fixture: ComponentFixture<AmistososComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmistososComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmistososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
