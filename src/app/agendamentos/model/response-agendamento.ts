import { Paciente } from "../../pacientes/model/paciente";

export interface ResponseAgendamento {
  id: string;
  paciente:Paciente,
  hora: string;
  horario: string;
  descricao: string;
}
