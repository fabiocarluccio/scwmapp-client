import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestItemCardComponent } from './request-item-card.component';

describe('RequestItemCardComponent', () => {
  let component: RequestItemCardComponent;
  let fixture: ComponentFixture<RequestItemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestItemCardComponent]
    });
    fixture = TestBed.createComponent(RequestItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
