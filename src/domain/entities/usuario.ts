import Rol from "./rol";

export default class Usuario {

    id: number = 0;
	nombreCompleto: string = "";
	contrasena: string = "";
	correoElectronico: string = "";
	edad: number = 0;
	fechaNacimiento: Date = null;
	sexo: string = "";
	dni: string = "";
	direccion: string = "";
	pais: string = "";
	telefono: string = "";

	roles: Rol[];

	constructor(row: any = null)
	{
        if (row) this.setFromObject(row);
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

		if (row.roles) {
			this.roles = row.roles.map(x => {
				let item = new Rol();
				item.setFromObject(x);
				return item;
			});
		}
		else {
			this.roles = [];
		}
	}

}
