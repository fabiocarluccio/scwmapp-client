import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizensListComponent } from './citizens-list.component';

describe('CitizensListComponent', () => {
  let component: CitizensListComponent;
  let fixture: ComponentFixture<CitizensListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitizensListComponent]
    });
    fixture = TestBed.createComponent(CitizensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
