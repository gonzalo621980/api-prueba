import IRolRepository from '../../../domain/repositories/rol-repository';
import Rol from '../../../domain/entities/rol';
import RolModel from './models/rol-model';
import RolPermisoModel from './models/rol-permiso-model';
import { Op } from 'sequelize';
import Permiso from '../../../domain/entities/permiso';
import PermisoModel from './models/permiso-model';

export default class RolRepositorySequelize implements IRolRepository {

	constructor() {

	}

	async list() {
		const data = await RolModel.findAll(
			{
                include: 
                [{
                    model: PermisoModel,
                    required: false,
                    as: 'Permisos'
                }]
            }
		);
		const result = data.map((row) => {
			let rol = new Rol(row);
			
			const permisos = row["Permisos"];
			if (permisos) {
				rol.permisos = permisos.map(permiso => new Permiso(permiso));
			}

			return rol;
		});

		return result;
	}

	async findById(id:number) {
		const data = await RolModel.findOne({
			include: 
			[{
				model: PermisoModel,
				required: false,
				as: 'Permisos'
			}],
			where: { id: id }
		});

		let rol: Rol = null;
		if (data) {
			rol = new Rol(data);
			
			const permisos = data["Permisos"];
			if (permisos) {
				rol.permisos = permisos.map(permiso => new Permiso(permiso));
			}
		}

		return rol;
	}

	async add(row:Rol) {
		const data = await RolModel.create({
			codigo: row.codigo,
			nombre: row.nombre
		});
		const result = new Rol(data);

		return result;
	}

	async modify(id:number, row:Rol) {
		const affectedCount = await RolModel.update({
			codigo: row.codigo,
			nombre: row.nombre
		},
		{ where: { id: id } });

		const data = (affectedCount[0] > 0) ? await RolModel.findOne({ where: { id: id } }) : null;
		const result = (data) ? new Rol(data) : null;

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
