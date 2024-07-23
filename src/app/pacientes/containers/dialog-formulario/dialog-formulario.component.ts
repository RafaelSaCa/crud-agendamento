import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PacienteService } from '../../services/paciente.service';



@Component({
  selector: 'app-dialog-formulario',
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
  templateUrl: './dialog-formulario.component.html',
  styleUrl: './dialog-formulario.component.scss',
})
export class DialogFormularioComponent {
  form: FormGroup =this.formBuilder.group({
      nome: [''],
      sobrenome: [''],
      cpf: [''],
      telefone: [''],
      email: [''],
    });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: PacienteService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogFormularioComponent>
  ) { }


  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (dados) => this.snackBarSucesso(),
      (error) => this.snackBarErro()
    );
    this.dialogRef.close();
  }

  private snackBarSucesso() {
    this.snackBar.open('Paciente cadastrado com sucesso!', '', {
      duration: 3000,
      horizontalPosition:'right',
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
