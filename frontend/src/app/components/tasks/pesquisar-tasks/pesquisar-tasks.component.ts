import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Angular2SmartTableModule, LocalDataSource, Row, Settings } from 'angular2-smart-table';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TasksService } from '../../../services/tasks.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StatusOption } from '../../../enums/status.enum';
import { FadeIn } from '../../../util/animations';

@Component({
  selector: 'app-pesquisar-tasks',
  standalone: true,
  imports: [Angular2SmartTableModule, BsDropdownModule, TooltipModule, ModalModule, ToastrModule],
  templateUrl: './pesquisar-tasks.component.html',
  styleUrl: './pesquisar-tasks.component.scss',
  animations: [FadeIn(500, true)]
})


export class PesquisarTasksComponent implements OnInit{

  source!: LocalDataSource;
  statusOptions: StatusOption[] = [
    {title: 'Pendente', value: 'PENDENTE'},
    {title: 'Em Andamento', value: 'ANDAMENTO'},
    {title: 'Concluído', value: 'CONCLUIDO'},
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.tasksService.findAllTasks().subscribe((resp) => {
      this.source = resp})
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
    rowClassFunction: (row: Row) => {
      console.log(row)
      const data = row.getData();
      if(data.status === 'PENDENTE'){
        return 'cor-pendente';
      }
      if(data.status === 'CONCLUIDO'){
        return 'cor-concluido';
      }
        return 'cor-andamento';
  },
    columns: {
/*       id: {
        title: 'ID',
        width: '10%'
      }, */
      descricao: {
        title: 'Descrição',
        width: '60%',
        filter: {
          type: 'text',
        },
      },
      status: {
        title: 'Status',
        ...this.listFilter(this.statusOptions),
        valuePrepareFunction: (value) => {
          if (value === 'PENDENTE') {
            return 'Pendente'
          }
          if (value === 'CONCLUIDO') {
            return 'Concluído'
          }
          return 'Em Andamento'
        },
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

  listFilter(
    listElements: { value: any; title: any }[],
    selectText = 'Selecionar',
    strictSearch = false
  ): any {
    const filter = {
      type: 'list',
      config: {
        selectText: selectText,
        list: strictSearch
          ? listElements.map((item) => ({ value: `$${item.value}`, title: item.title }))
          : listElements,
      },
    };
    return { filter };
  }

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

  onEdit(event: any) {
    const { id } = event.data
     this.router.navigate(['editar/', id], { relativeTo: this.route });
  }

  onDelete(event: any) {
    const { id } = event.data
    this.tasksService.deleteTask(id).subscribe(() => {
      this.tasksService.findAllTasks().subscribe((resp) => {
        this.source = new LocalDataSource(resp);
      });
      this.toastrService.success('Tarefa excluída com sucesso!', 'Sucesso')
    })
  }

}
