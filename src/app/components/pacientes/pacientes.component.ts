import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PacienteRequest, PacienteResponse } from '../../models/Paciente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { group } from '@angular/animations';
import { PacientesService } from '../../services/pacientes.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-pacientes',
  standalone: false,
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent implements OnInit, AfterViewInit {

  listaPacientes: PacienteResponse[] = [];

  isEditMode: boolean = false;
  selectedPaciente: PacienteResponse | null = null;
  showActions: boolean = false;
  modalText: string = 'Registrar Paciente';

  @ViewChild('pacienteModalRef')
  pacienteModalEl!: ElementRef;
  pacienteForm: FormGroup;

  private modalInstance!: any;

  constructor(private fb: FormBuilder, private pacienteService: PacientesService) {
    this.pacienteForm = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
      apellidoMaterno: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
      edad: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      peso: [null, [Validators.required, Validators.min(0.1), Validators.max(200)]],
      estatura: [null, [Validators.required, Validators.min(1), Validators.max(2)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(1), Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      direccion: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.listarPacientes();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.pacienteModalEl.nativeElement, { keyboard: false });
    this.pacienteModalEl.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.resetForm()
    });
  }

  listarPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: resp => {
        this.listaPacientes = resp;
      }
    });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedPaciente = null;
    this.pacienteForm.reset();
  }

  toggleForm(): void {
    this.resetForm();
    this.modalText = 'Registrar Paciente';
    this.modalInstance.show();
  }

  editPaciente(paciente: PacienteResponse): void {
    this.isEditMode = true;
    this.selectedPaciente = paciente;
    this.modalText = 'Editando Paciente: ' + paciente.nombre;

    this.pacienteForm.patchValue({...paciente});
    this.modalInstance.show();
  }

  onSubmit(): void {
    if(this.pacienteForm.invalid) return;

    const pacienteData: PacienteRequest = this.pacienteForm.value;

    if(this.isEditMode && this.selectedPaciente) {
      // ACTUALIZANDO
      this.pacienteService.putPaciente(pacienteData, this.selectedPaciente.id).subscribe({
        next: registro => {
          const index: number = this.listaPacientes.findIndex(p => p.id === this.selectedPaciente!.id);
          if(index !== -1) this.listaPacientes[index] = registro;
          Swal.fire('Actualizado', 'Paciente actualizado correctamente', 'success');
          this.modalInstance.hide();
        }
      });
    } else {
      // REGISTRANDO
      this.pacienteService.postPaciente(pacienteData).subscribe({
        next: registro => {
          this.listaPacientes.push(registro);
          Swal.fire('Registrado', 'Paciente registrado correctamente', 'success');
          this.modalInstance.hide();
        }
      });
    }
  }

  deletePaciente(idPaciente: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El paciente será eliminado permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.isConfirmed) {
        this.pacienteService.deletePaciente(idPaciente).subscribe({
          next: () => {
            this.listaPacientes = this.listaPacientes.filter(p => p.id !== idPaciente);
            Swal.fire('Eliminado', 'Paciente eliminado correctamente', 'success');
          }
        });
      }
    });
  }
}
