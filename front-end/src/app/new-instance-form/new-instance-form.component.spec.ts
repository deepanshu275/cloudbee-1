import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstanceFormComponent } from './new-instance-form.component';

describe('NewInstanceFormComponent', () => {
  let component: NewInstanceFormComponent;
  let fixture: ComponentFixture<NewInstanceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInstanceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
