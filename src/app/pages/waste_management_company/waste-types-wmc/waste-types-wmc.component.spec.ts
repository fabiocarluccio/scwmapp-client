import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteTypesWmcComponent } from './waste-types-wmc.component';

describe('WasteTypesWmcComponent', () => {
  let component: WasteTypesWmcComponent;
  let fixture: ComponentFixture<WasteTypesWmcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WasteTypesWmcComponent]
    });
    fixture = TestBed.createComponent(WasteTypesWmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
