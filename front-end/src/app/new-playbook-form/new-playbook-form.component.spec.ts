import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlaybookFormComponent } from './new-playbook-form.component';

describe('NewPlaybookFormComponent', () => {
  let component: NewPlaybookFormComponent;
  let fixture: ComponentFixture<NewPlaybookFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlaybookFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlaybookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
