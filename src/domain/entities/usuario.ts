export default class Usuario {

    id: number;
	nombreCompleto: string;
	contrasena: string;
	correoElectronico: string;
	edad: number;
	fechaNacimiento: Date;
	sexo: string;
	dni: string;
	direccion: string;
	pais: string;
	telefono: string;

	constructor(
        id: number = 0,
		nombreCompleto: string = "",
		contrasena: string = "",
		correoElectronico: string = "",
		edad: number = 0,
		fechaNacimiento: Date = null,
		sexo: string = "",
		dni: string = "",
		direccion: string = "",
		pais: string = "",
		telefono: string = ""
	)
	{
        this.id = id;
		this.nombreCompleto = nombreCompleto;
		this.contrasena = contrasena;
		this.correoElectronico = correoElectronico;
		this.edad = edad;
		this.fechaNacimiento = fechaNacimiento;
		this.sexo = sexo;
		this.dni = dni;
		this.direccion = direccion;
		this.pais = pais;
		this.telefono = telefono;
	}

	setFromObject = (row) =>
	{
        this.id = row.id ?? 0;
		this.nombreCompleto = row.nombreCompleto ?? "";
		this.contrasena = row.contrasena ?? "";
		this.correoElectronico = row.correoElectronico ?? "";
		this.edad = row.edad ?? 0;
		this.fechaNacimiento = row.fechaNacimiento ?? null;
		this.sexo = row.sexo ?? "";
		this.dni = row.dni ?? "";
		this.direccion = row.direccion ?? "";
		this.pais = row.pais ?? "";
		this.telefono = row.telefono ?? "";
	}

}
