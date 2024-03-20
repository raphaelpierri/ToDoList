import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTasksComponent } from './editar-tasks.component';

describe('EditarTasksComponent', () => {
  let component: EditarTasksComponent;
  let fixture: ComponentFixture<EditarTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
