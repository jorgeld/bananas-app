import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeysComponent } from './monkeys.component';

describe('MonkeysComponent', () => {
  let component: MonkeysComponent;
  let fixture: ComponentFixture<MonkeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonkeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonkeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
