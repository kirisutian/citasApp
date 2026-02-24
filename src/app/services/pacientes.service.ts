import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { PacienteRequest, PacienteResponse } from '../models/Paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  
  private apiUrl: string = environment.apiUrl.concat('pacientes');

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<PacienteResponse[]> {
    return this.http.get<PacienteResponse[]>(this.apiUrl).pipe(
      map(pacientes => pacientes.sort()),
      catchError(error => {
        console.error('Error al obtener los pacientes: ', error);
        return of([]);
      })
    );
  }

  postPaciente(paciente: PacienteRequest): Observable<PacienteResponse> {
    return this.http.post<PacienteResponse>(this.apiUrl, paciente).pipe(
      catchError(error => {
        console.error('Error al registrar un paciente', error);
        throw error;
      })
    );
  }

  putPaciente(paciente: PacienteRequest, pacientedId: number): Observable<PacienteResponse> {
    return this.http.put<PacienteResponse>(`${this.apiUrl}/${pacientedId}`, paciente).pipe(
      catchError(error => {
        console.error('Error al actualizar un paciente', error);
        throw error;
      })
    );
  }

  deletePaciente(pacientedId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pacientedId}`).pipe(
      catchError(error => {
        console.error('Error al eliminar un paciente', error);
        throw error;
      })
    );
  }
}
