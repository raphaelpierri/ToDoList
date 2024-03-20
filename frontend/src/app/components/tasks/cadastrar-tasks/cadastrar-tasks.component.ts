import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-tasks',
  standalone: true,
  imports: [ReactiveFormsModule, ToastrModule],
  templateUrl: './cadastrar-tasks.component.html',
  styleUrl: './cadastrar-tasks.component.scss'
})
export class CadastrarTasksComponent implements OnInit{
formCadastro!: FormGroup;
isFormSubmitted: boolean = false

constructor(
  private fb: FormBuilder,
  private route: ActivatedRoute,
  private tasksService: TasksService,
  private router: Router,
  private toastr: ToastrService
) {}

get f(): { [key: string]: AbstractControl } {
  return this.formCadastro.controls;
}

  ngOnInit(): void {
      this.createForm();
  }

  private createForm(): void {
    this.formCadastro = this.fb.group({
      descricao: [null, Validators.required],
      status: [null, Validators.required]
    })
  }

  onVoltar () {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onCadastrar () {
    this.isFormSubmitted = true
    if (!this.formCadastro.valid) {
      return
    }
    const values = this.formCadastro.value
      this.tasksService.createTask(values)
      .subscribe((resp) => {
        this.toastr.success('Tarefa adicionada com sucesso!', 'Sucesso');
        this.router.navigate(['../'], {relativeTo: this.route})
      });
  }


}
