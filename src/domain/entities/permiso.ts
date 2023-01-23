export default class Permiso {

    id: number = 0;
	codigo: string = "";
	nombre: string = "";

	constructor(row: any = null)
	{
        if (row) this.setFromObject(row);
	}

	setFromObject = (row) =>
	{
        this.id = row.id ?? 0;
		this.codigo = row.codigo ?? "";
		this.nombre = row.nombre ?? "";
	}

}
