import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { CadastrarTasksComponent } from './cadastrar-tasks/cadastrar-tasks.component';
import { PesquisarTasksComponent } from './pesquisar-tasks/pesquisar-tasks.component';
import { EditarTasksComponent } from './editar-tasks/editar-tasks.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TasksRoutingModule,
  ]
})
export class TasksModule { }
