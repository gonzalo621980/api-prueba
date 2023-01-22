import IRolRepository from '../../../domain/repositories/rol-repository';
import Rol from '../../../domain/entities/rol';
import RolModel from './models/rol-model';
import RolUsuarioModel from './models/rol-usuario-model';
import RolPermisoModel from './models/rol-permiso-model';
import { Op } from 'sequelize';

export default class RolRepositorySequelize implements IRolRepository {

	constructor() {

	}

	async list() {
		const data = await RolModel.findAll();
		const result = data.map((row) => new Rol(...row.getDataValues()));

		return result;
	}

	async findById(id:number) {
		const data = await RolModel.findOne({ where: { id: id } });
		const result = (data) ? new Rol(...data.getDataValues()) : null;

		return result;
	}

	async add(row:Rol) {
		const data = await RolModel.create({
			codigo: row.codigo,
			nombre: row.nombre
		});
		const result = new Rol(...data.getDataValues());

		return result;
	}

	async modify(id:number, row:Rol) {
		const affectedCount = await RolModel.update({
			codigo: row.codigo,
			nombre: row.nombre
		},
		{ where: { id: id } });

		const data = (affectedCount[0] > 0) ? await RolModel.findOne({ where: { id: id } }) : null;
		const result = (data) ? new Rol(...data.getDataValues()) : null;

		return result;
	}

	async remove(id:number) {
		const affectedCount = await RolModel.destroy({ where: { id: id } });
		const result = (affectedCount > 0) ? {id} : null;
		
		return result;
	}
	

    async bindPermisos(id:number, permisos:number[]) {
        const rows = permisos.map(idPermiso => {
            return {
                idRol: id,
                idPermiso: idPermiso,
            }
        });

        const affectedCount = await RolPermisoModel.bulkCreate(rows);

        const response = { id: id };
        const result = (affectedCount != null) ? response : null;
        return result;
    }

    async unbindPermisos(id:number, permisos:number[]) {
        const criteria = permisos.map(idPermiso => {
            return {
                [Op.and]: [
                    {idRol: id}, 
                    {idPermiso: idPermiso}
                ]
            }
        });

        const affectedCount = await RolPermisoModel.destroy({
            where: {
                [Op.or]: criteria
            }
        });

        const response = { id: id };
        const result = (affectedCount != null) ? response : null;
        return result;
    }

}
