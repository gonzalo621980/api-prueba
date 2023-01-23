export default class Sesion {

    id: number = 0;
	fechaInicio: Date = null;
	fechaCierre: Date = null;
	idUsuario: number = 0;
	activa: boolean = false;

	constructor(row: any = null)
	{
        if (row) this.setFromObject(row);
	}

	setFromObject = (row) =>
	{
        this.id = row.id ?? 0;
		this.fechaInicio = row.fechaInicio ?? null;
		this.fechaCierre = row.fechaCierre ?? null;
		this.idUsuario = row.idUsuario ?? 0;
		this.activa = row.activa ?? false;
	}

}
