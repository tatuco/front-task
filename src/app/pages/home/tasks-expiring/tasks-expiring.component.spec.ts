import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksExpiringComponent } from './tasks-expiring.component';

describe('TasksExpiringComponent', () => {
  let component: TasksExpiringComponent;
  let fixture: ComponentFixture<TasksExpiringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksExpiringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksExpiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
