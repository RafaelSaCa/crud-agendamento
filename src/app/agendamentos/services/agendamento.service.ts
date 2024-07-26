import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../model/agendamento';
import { ResponseAgendamento } from '../model/response-agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = "http://localhost:8080/api/agenda";

  constructor(private httpClient: HttpClient) { }

  lista(){
    return this.httpClient.get<ResponseAgendamento[]>(this.apiUrl);
  }
}
