import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Angular2SmartTableModule, LocalDataSource, Settings } from 'angular2-smart-table';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pesquisar-tasks',
  standalone: true,
  imports: [Angular2SmartTableModule, BsDropdownModule, TooltipModule, ModalModule],
  templateUrl: './pesquisar-tasks.component.html',
  styleUrl: './pesquisar-tasks.component.scss'
})
export class PesquisarTasksComponent {

  source: LocalDataSource;
  data: any[] = [
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
    {id: 1, descricao: 'Teste', status: 'Pendente'},
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.source = new LocalDataSource(this.data)
  }

  settings: Settings = {
    mode: 'external',
    attr: {
      class: 'table table-hover'
    },
    noDataMessage: 'Não existem tarefas cadastradas',
    actions: {
      columnTitle: 'Ação',
      position: 'right',
      add: true
    },
    columns: {
      id: {
        title: 'ID',
        width: '10%'
      },
      descricao: {
        title: 'Descrição',
        width: '50%'
      },
      status: {
        title: 'Status'
      },
    },
      add: {
        addButtonContent: this.createActionCreateContent('Cadastrar', ''),
      },
      edit: {
        editButtonContent: this.createRowActionEditContent('Visualizar', ''),
      },
      delete: {
        deleteButtonContent: this.createRowActionDeleteContent('Excluir', ''),
      },
  };

  createActionCreateContent(title: string, cssClass: string): string {
    return `<span class="btn btn-success ${cssClass}" title="${title}"><i class="bi bi-plus"></i></span>`;
  }

  createRowActionCreateContent(title: string, cssClass: string): string {
    return `<span class="btn btn-sm btn-primary ${cssClass}" title="${title}"><i class="bi bi-plus"></i></span>`;
  }

  createRowActionEditContent(title: string, cssClass: string): string {
    return `<span class="btn btn-sm btn-warning ${cssClass}" title="${title}"><i class="bi bi-pencil-square"></i></span>`;
  }

  createRowActionDeleteContent(title: string, cssClass: string): string {
    return `<span class="btn btn-sm btn-danger ${cssClass}" title="${title}"><i class="bi bi-trash"></i></span>`;
  }

  onAdd() {
    this.router.navigate(['cadastrar'], { relativeTo: this.route });
  }

}
