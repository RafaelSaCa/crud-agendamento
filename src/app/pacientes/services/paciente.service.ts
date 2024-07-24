import { Injectable } from '@angular/core';
import { Paciente } from '../model/paciente';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private readonly apiUrl = 'http://localhost:8080/api/paciente';

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Paciente[]>(this.apiUrl).pipe(
      first(),
      delay(10),
      tap((pacientes) => console.log(pacientes))
    );
  }

  save(paciente: Partial<Paciente>) {
    return this.httpClient.post<Paciente>(this.apiUrl, paciente);
  }

  update(id: string, paciente: Partial<Paciente>){
    return this.httpClient.put<Paciente>(` ${this.apiUrl}/${id}` ,paciente);
  }

  delete(id: string){
    return this.httpClient.delete( ` ${this.apiUrl}/${id}` );
  }
}
