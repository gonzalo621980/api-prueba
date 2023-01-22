import IPermisoRepository from '../../../domain/repositories/permiso-repository';
import PermisoModel from './models/permiso-model';
import Permiso from '../../../domain/entities/permiso';

export default class PermisoRepositorySequelize implements IPermisoRepository {

	constructor() {

	}

	async list() {
		const data = await PermisoModel.findAll();
		const result = data.map((row) => new Permiso(...row.getDataValues()));

		return result;
	}

	async findById(id:number) {
		const data = await PermisoModel.findOne({ where: { id: id } });
		const result = (data) ? new Permiso(...data.getDataValues()) : null;

		return result;
	}

}
