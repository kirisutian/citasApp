export interface PacienteRequest {
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    edad: number,
    peso: number,
    estatura: number,
    email: string,
    telefono: string,
    direccion: string
}

export interface PacienteResponse {
    id: number,
    nombre: string,
    edad: number,
    peso: number,
    estatura: number,
    imc: number,
    email: string,
    telefono: string,
    direccion: string,
    numExpediente: string
}