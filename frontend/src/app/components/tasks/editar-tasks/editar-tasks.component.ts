import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { TasksService } from '../../../services/tasks.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StatusOption } from '../../../enums/status.enum';
import { FadeIn } from '../../../util/animations';

@Component({
  selector: 'app-editar-tasks',
  standalone: true,
  imports: [ReactiveFormsModule, ToastrModule],
  templateUrl: './editar-tasks.component.html',
  styleUrl: './editar-tasks.component.scss',
  animations: [FadeIn(500, true)]
})
export class EditarTasksComponent implements OnInit{

  id!: number
  formCadastro!: FormGroup
  isFormSubmitted: boolean = false
  statusOptions: StatusOption[] = [
    {title: 'Pendente', value: 'PENDENTE'},
    {title: 'Em Andamento', value: 'ANDAMENTO'},
    {title: 'Concluído', value: 'CONCLUIDO'},
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {

  }

  get f(): { [key: string]: AbstractControl } {
    return this.formCadastro.controls;
  }

ngOnInit(): void {
  this.fetchRouteParameters().subscribe(() => {
    this.fillForm();
    this.createForm();
  })
}

private createForm(): void {
  this.formCadastro = this.fb.group({
    descricao: [null, Validators.required],
    status: [null, Validators.required]
  })
}

  private fetchRouteParameters(): Observable<any> {
    return this.route.paramMap.pipe(
      map((params) => {
          this.id = +params.get('id')!;
      })
    );
  }

  private fillForm(): void {
    this.tasksService.getTask(this.id).subscribe((resp) => {
      this.formCadastro.patchValue(resp)
    })
  }

  onVoltar () {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }

  onSalvar () {
    const values = this.formCadastro.value
    this.tasksService.updateTask(this.id, values)
    .pipe(
      catchError((err) => {
        this.toastr.warning('Não foi possível editar a tarefa', err.error);
        return of();
      })
    ).subscribe(() => {
      this.toastr.success('Tarefa editada com sucesso!', 'Sucesso');
    })
  }

}
