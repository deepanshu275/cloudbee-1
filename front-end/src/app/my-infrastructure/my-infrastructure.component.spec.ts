import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInfrastructureComponent } from './my-infrastructure.component';

describe('MyInfrastructureComponent', () => {
  let component: MyInfrastructureComponent;
  let fixture: ComponentFixture<MyInfrastructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInfrastructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
