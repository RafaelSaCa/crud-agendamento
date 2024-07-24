import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../model/paciente';



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
export class DialogFormularioComponent implements OnInit{

  form!: FormGroup;
  constructor(  private formBuilder: NonNullableFormBuilder, private service: PacienteService,
                       private snackBar: MatSnackBar,public dialogRef: MatDialogRef<DialogFormularioComponent>,
                      @Inject(MAT_DIALOG_DATA) public data: Paciente) { }

  ngOnInit(): void {
      this.buildForm();
    }

  buildForm(){
      this.form = this.formBuilder.group({
        nome: [''],
        sobrenome: [''],
        cpf: [''],
        telefone: [''],
        email: [''],
      });

      if ( this.data && this.data.nome){
        this.carregaDadosForm();
      }
  }

  carregaDadosForm() {
      this.form.patchValue({
        nome: this.data.nome,
        sobrenome: this.data.sobrenome,
        cpf: this.data.cpf,
        telefone: this.data.telefone,
        email: this.data.email,
      });
  }

  onSubmit() {
    const paciente : Paciente = this.form.getRawValue();


    if ( this.data && this.data.nome){

      this.service.update(this.data.id, paciente ).subscribe(
        (dados) => this.snackBarSucesso(),
        (error) => this.snackBarErro()
      );
      this.dialogRef.close();

    } else{

    this.service.save(this.form.value).subscribe(
        (dados) => this.snackBarSucesso(),
        (error) => this.snackBarErro()
      );
      this.dialogRef.close();
    }
 }

  private snackBarSucesso() {
    this.snackBar.open('Dados salvos com sucesso!', '', {
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
