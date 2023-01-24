import IPermisoRepository from '../../../domain/repositories/permiso-repository';
import PermisoModel from './models/permiso-model';
import Permiso from '../../../domain/entities/permiso';

export default class PermisoRepositorySequelize implements IPermisoRepository {

	constructor() {

	}

	async list() {
		const data = await PermisoModel.findAll();
		const result = data.map(row => new Permiso(row));

		return result;
	}

	async findById(id:number) {
		const data = await PermisoModel.findOne({ raw: true, where: { id: id } });
		const result = (data) ? new Permiso(data) : null;

		return result;
	}

	async add(row:Permiso) {
		const data = await PermisoModel.create({
			codigo: row.codigo,
			nombre: row.nombre
		});
		const result = new Permiso(data);

		return result;
	}

}
