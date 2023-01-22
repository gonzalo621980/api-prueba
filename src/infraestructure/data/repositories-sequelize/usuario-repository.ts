import IUsuarioRepository from '../../../domain/repositories/usuario-repository';
import Usuario from '../../../domain/entities/usuario';
import UsuarioModel from './models/usuario-model';
import RolUsuarioModel from './models/rol-usuario-model';
import { Op } from 'sequelize';

export default class UsuarioRepositorySequelize implements IUsuarioRepository {

	constructor() {

	}

	async list() {
		const data = await UsuarioModel.findAll();
		const result = data.map((row) => new Usuario(...row.getDataValues()));

		return result;
	}

	async listByFilter(usuario:Usuario) {

		let filters = {};
		if (usuario.correoElectronico.length > 0) filters["correoElectronico"] = usuario.correoElectronico;
		if (usuario.contrasena.length > 0) filters["contrasena"] = usuario.contrasena;
		if (usuario.dni.length > 0) filters["dni"] = usuario.dni;
		
		let data = null;
		if (usuario.correoElectronico.length === 0 &&
			usuario.correoElectronico.length === 0 &&
			usuario.dni.length === 0) {
			data = await UsuarioModel.findAll();
		}
		else {
			data = await UsuarioModel.findAll({ where: filters });
		}

		const result = data.map((row) => new Usuario(...row.getDataValues()));

		return result;
	}

	async findById(id:number) {
		const data = await UsuarioModel.findOne({ where: { id: id } });
		const result = (data) ? new Usuario(...data.getDataValues()) : null;

		return result;
	}

	async add(row:Usuario) {
		const data = await UsuarioModel.create({
			nombreCompleto: row.nombreCompleto,
			contrasena: row.contrasena,
			correoElectronico: row.correoElectronico,
			edad: row.edad,
			fechaNacimiento: row.fechaNacimiento,
			sexo: row.sexo,
			dni: row.dni,
			direccion: row.direccion,
			pais: row.pais,
			telefono: row.telefono
		});
		const result = new Usuario(...data.getDataValues());

		return result;
	}

	async modify(id:number, row:Usuario) {
		const affectedCount = await UsuarioModel.update({
			nombreCompleto: row.nombreCompleto,
			contrasena: row.contrasena,
			correoElectronico: row.correoElectronico,
			edad: row.edad,
			fechaNacimiento: row.fechaNacimiento,
			sexo: row.sexo,
			dni: row.dni,
			direccion: row.direccion,
			pais: row.pais,
			telefono: row.telefono
		},
		{ where: { id: id } });

		const data = (affectedCount[0] > 0) ? await UsuarioModel.findOne({ where: { id: id } }) : null;
		const result = (data) ? new Usuario(...data.getDataValues()) : null;

		return result;
	}

	async remove(id:number) {
		const affectedCount = await UsuarioModel.destroy({ where: { id: id } });
		const result = (affectedCount > 0) ? {id} : null;
		
		return result;
	}


    async bindRoles(id:number, roles:number[]) {
        const rows = roles.map(idRol => {
            return {
                idUsuario: id,
                idRol: idRol,
            }
        });

        const affectedCount = await RolUsuarioModel.bulkCreate(rows);

        const response = { id: id };
        const result = (affectedCount != null) ? response : null;
        return result;
    }

    async unbindRoles(id:number, roles:number[]) {
        const criteria = roles.map(idRol => {
            return {
                [Op.and]: [
                    {idUsuario: id}, 
                    {idRol: idRol}
                ]
            }
        });

        const affectedCount = await RolUsuarioModel.destroy({
            where: {
                [Op.or]: criteria
            }
        });

        const response = { id: id };
        const result = (affectedCount != null) ? response : null;
        return result;
    }

}
