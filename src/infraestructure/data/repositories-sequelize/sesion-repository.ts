import { createDatabase } from './connections/db-create';
import ISesionRepository from '../../../domain/repositories/sesion-repository';
import Sesion from '../../../domain/entities/sesion';

import PermisoModel from './models/permiso-model';
import RolModel from './models/rol-model';
import UsuarioModel from './models/usuario-model';
import RolPermisoModel from './models/rol-permiso-model';
import RolUsuarioModel from './models/rol-usuario-model';
import SesionModel from './models/sesion-model';


export default class SesionRepositorySequelize implements ISesionRepository {

	constructor() {

	}

	async list() {
		const data = await SesionModel.findAll();
		const result = data.map((row) => new Sesion(row));

		return result;
	}

	async findById(id:number) {
		const data = await SesionModel.findOne({ where: { id: id } });
		const result = (data) ? new Sesion(data) : null;

		return result;
	}

	async add(row:Sesion) {
		const data = await SesionModel.create({
			fechaInicio: row.fechaInicio,
			fechaCierre: row.fechaCierre,
			idUsuario: row.idUsuario,
			activa: row.activa
		});
		const result = new Sesion(data);

		return result;
	}

	async modify(id:number, row:Sesion) {
		const affectedCount = await SesionModel.update({
			fechaInicio: row.fechaInicio,
			fechaCierre: row.fechaCierre,
			idUsuario: row.idUsuario,
			activa: row.activa
		},
		{ where: { id: id } });

		const data = (affectedCount[0] > 0) ? await SesionModel.findOne({ where: { id: id } }) : null;
		const result = (data) ? new Sesion(data) : null;

		return result;
	}

	async remove(id:number) {
		const affectedCount = await SesionModel.destroy({ where: { id: id } });
		const result = (affectedCount > 0) ? {id} : null;
		
		return result;
	}

	async init(rootUser: string, rootPassword: string) {
		const result = await createDatabase(rootUser, rootPassword);

		await PermisoModel.sync();
		await RolModel.sync();
		await UsuarioModel.sync();
		await RolPermisoModel.sync();
		await RolUsuarioModel.sync();
		await SesionModel.sync();

		return result;
	}

}
