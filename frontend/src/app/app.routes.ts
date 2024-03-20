import { EditarTasksComponent } from './components/tasks/editar-tasks/editar-tasks.component';
import { CadastrarTasksComponent } from './components/tasks/cadastrar-tasks/cadastrar-tasks.component';
import { PesquisarTasksComponent } from './components/tasks/pesquisar-tasks/pesquisar-tasks.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: PesquisarTasksComponent
  },
  {
    path: 'cadastrar',
    component: CadastrarTasksComponent
  },
  {
    path: 'editar/:id',
    component: EditarTasksComponent
  }
];
