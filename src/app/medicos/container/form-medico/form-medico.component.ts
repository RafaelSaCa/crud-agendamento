import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Medico } from '../../model/medico';
import { MedicoService } from '../../service/medico.service';

@Component({
  selector: 'app-form-medico',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './form-medico.component.html',
  styleUrl: './form-medico.component.scss',
})
export class FormMedicoComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: MedicoService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormMedicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medico
  ) {}

  ngOnInit(): void {
     this.builForm();
  }



  builForm() {
    this.form = this.formBuilder.group({
      nome: [''],
      sobrenome: [''],
      crm: [''],
      telefone: [''],
    });

    if (this.data && this.data.nome) {
      this.carregaDadosForm();
    }
  }

  carregaDadosForm() {
    this.form.patchValue({
      nome: this.data.nome,
      sobrenome: this.data.sobrenome,
      cpf: this.data.crm,
      telefone: this.data.telefone,
    });
  }
  onSubmit() {
    const medico: Medico = this.form.getRawValue();

    if (this.data && this.data.nome) {
      this.service.atualizar(this.data.id, medico).subscribe(
        (dados) => this.snackBarSucesso(),
        (error) => this.snackBarErro()
      );
      this.dialogRef.close();
    } else {
      this.service.cadastrar(this.form.value).subscribe(
        (dados) => this.snackBarSucesso(),
        (error) => this.snackBarErro()
      );
      this.dialogRef.close();
    }
  }

  private snackBarSucesso() {
    this.snackBar.open('Dados salvos com sucesso!', '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  private snackBarErro() {
    this.snackBar.open('Ocorreu um erro ao cadastrar o paciente!', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
