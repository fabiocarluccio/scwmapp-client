import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitTaxesComponent } from './emit-taxes.component';

describe('EmitTaxesComponent', () => {
  let component: EmitTaxesComponent;
  let fixture: ComponentFixture<EmitTaxesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmitTaxesComponent]
    });
    fixture = TestBed.createComponent(EmitTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
