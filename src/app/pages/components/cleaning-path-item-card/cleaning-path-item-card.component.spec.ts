import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningPathItemCardComponent } from './cleaning-path-item-card.component';

describe('CleaningPathItemCardComponent', () => {
  let component: CleaningPathItemCardComponent;
  let fixture: ComponentFixture<CleaningPathItemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CleaningPathItemCardComponent]
    });
    fixture = TestBed.createComponent(CleaningPathItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
