import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../model/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private readonly apiUrl = 'http://localhost:8080/api/medico'

  constructor(private httpClient : HttpClient) { }

  listar(){
    return this.httpClient.get<Medico[]>(this.apiUrl);
  }

  cadastrar(medico: Medico){
    return this.httpClient.post<Medico>(this.apiUrl,medico);
  }

  atualizar(id: string, medico :Medico ){
    return this.httpClient.put<Medico>(`${this.apiUrl}/${id}`,medico);
  }

  buscaPorId(id: string){
    return this.httpClient.get<Medico>(`${this.apiUrl}/${id}`);
  }

  deletar(id: string){
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
