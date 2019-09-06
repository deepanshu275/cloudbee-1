import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstanceDialogComponent } from './add-instance-dialog.component';

describe('AddInstanceDialogComponent', () => {
  let component: AddInstanceDialogComponent;
  let fixture: ComponentFixture<AddInstanceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInstanceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
