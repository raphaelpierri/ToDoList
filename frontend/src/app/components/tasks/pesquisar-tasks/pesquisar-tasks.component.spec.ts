import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarTasksComponent } from './pesquisar-tasks.component';

describe('PesquisarTasksComponent', () => {
  let component: PesquisarTasksComponent;
  let fixture: ComponentFixture<PesquisarTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisarTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PesquisarTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
