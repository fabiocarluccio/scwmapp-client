import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartBinItemCardComponent } from './smart-bin-item-card.component';

describe('SmartBinItemCardComponent', () => {
  let component: SmartBinItemCardComponent;
  let fixture: ComponentFixture<SmartBinItemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartBinItemCardComponent]
    });
    fixture = TestBed.createComponent(SmartBinItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
