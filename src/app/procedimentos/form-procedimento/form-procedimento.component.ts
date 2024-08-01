import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Procedimento } from '../model/procedimento';
import { ProcedimentoService } from '../service/procedimento.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-procedimento',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-procedimento.component.html',
  styleUrl: './form-procedimento.component.scss',
})
export class FormProcedimentoComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilber: NonNullableFormBuilder,
    private service: ProcedimentoService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormProcedimentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Procedimento
  ) {}



  ngOnInit(){
    this.builForm();

  }

  builForm() {
    this.form = this.formBuilber.group({
      descricao: [''],
    });

    if (this.data && this.data.descricao) {
      this.carregaDadosForm();
    }
  }

  carregaDadosForm() {
    this.form.patchValue({
      descricao: this.data.descricao,
    });
  }

  onSubmit() {
    const procedimento: Procedimento = this.form.getRawValue();

    if (this.data && this.data.descricao) {
      this.service.atualizar(this.data.id, procedimento).subscribe(
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
    this.snackBar.open('Ocorreu um erro ao cadastrar o procedimento!', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
