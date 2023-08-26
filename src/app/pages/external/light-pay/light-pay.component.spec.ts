import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightPayComponent } from './light-pay.component';

describe('LightPayComponent', () => {
  let component: LightPayComponent;
  let fixture: ComponentFixture<LightPayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LightPayComponent]
    });
    fixture = TestBed.createComponent(LightPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
