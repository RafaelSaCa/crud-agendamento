import { Paciente } from "../../pacientes/model/paciente";

export interface Agendamento {
  id: string,
  pacienteId: string,
  horario: string,
  hora: string,
  descricao: string
}
