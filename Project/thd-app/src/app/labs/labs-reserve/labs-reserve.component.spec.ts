import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsReserveComponent } from './labs-reserve.component';

describe('LabsReserveComponent', () => {
  let component: LabsReserveComponent;
  let fixture: ComponentFixture<LabsReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabsReserveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
