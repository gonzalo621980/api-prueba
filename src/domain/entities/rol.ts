import Permiso from "./permiso";

export default class Rol {

    id: number = 0;
	codigo: string = "";
	nombre: string = "";

	permisos: Permiso[];

	constructor(row: any = null)
	{
        if (row) this.setFromObject(row);
	}

	setFromObject = (row) =>
	{
        this.id = row.id ?? 0;
		this.codigo = row.codigo ?? "";
		this.nombre = row.nombre ?? "";

		if (row.permisos) {
			this.permisos = row.permisos.map(x => {
				let item = new Permiso();
				item.setFromObject(x);
				return item;
			});
		}
		else {
			this.permisos = [];
		}
	}

}
