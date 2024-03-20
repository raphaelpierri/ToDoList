import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTasksComponent } from './cadastrar-tasks.component';

describe('CadastrarTasksComponent', () => {
  let component: CadastrarTasksComponent;
  let fixture: ComponentFixture<CadastrarTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
