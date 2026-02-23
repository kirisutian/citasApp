import { Component, ElementRef, ViewChild } from '@angular/core';
import { PacienteResponse } from '../../models/Paciente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { group } from '@angular/animations';

declare var bootstrap: any;

@Component({
  selector: 'app-pacientes',
  standalone: false,
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {

  listaPacientes: PacienteResponse[] = [
    {
      "id": 10,
      "nombre": "Juan Pérez Gómez",
      "edad": 30,
      "peso": 75.5,
      "estatura": 1.75,
      "imc": 24.653061224489797,
      "email": "juan.perez@gmail.com",
      "telefono": "5512345678",
      "direccion": "Av. Reforma 123, Colonia Centro, Ciudad de México",
      "numExpediente": "5X5X1X2X3X4X5X6X7X8X"
    },
    {
      "id": 11,
      "nombre": "Manuel Gómez Sánchez",
      "edad": 25,
      "peso": 85,
      "estatura": 1.75,
      "imc": 26.653061224489797,
      "email": "manuel.gomez@gmail.com",
      "telefono": "5512345679",
      "direccion": "Av. Reforma 124, Colonia Centro, Ciudad de México",
      "numExpediente": "5X5X1X2X3X4X5X6X7X9X"
    }
  ];

  isEditMode: boolean = false;
  selectedPaciente: PacienteResponse | null = null;
  showActions: boolean = false;

  @ViewChild('pacienteModalRef')
  pacienteModalEl!: ElementRef;
  pacienteForm: FormGroup;

  private modalInstance!: any;

  constructor(private fb: FormBuilder) {
    this.pacienteForm = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)], Validators.minLength(1)],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(50)], Validators.minLength(1)],
      apellidoMaterno: ['', [Validators.required, Validators.maxLength(50)], Validators.minLength(1)],
      edad: [null, [Validators.required, Validators.min(1)], Validators.max(100)],
      peso: [null, [Validators.required, Validators.min(0.1)], Validators.max(200)],
      estatura: [null, [Validators.required, Validators.min(1)], Validators.max(2)],
      email: ['', [Validators.required, Validators.maxLength(100)], Validators.minLength(1), Validators.email],
      telefono: ['', Validators.maxLength(10), Validators.minLength(10)],
      direccion: ['', Validators.maxLength(150), Validators.minLength(1)],
    });
  }
}
