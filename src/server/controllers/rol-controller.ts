import Rol from '../../domain/entities/rol';
import RolService from '../../domain/services/rol-service';
import ParameterError from '../../infraestructure/sdk/error/parameter-error';
import { isValidArray, isValidNumber, isValidObject } from '../../infraestructure/sdk/utils/validator';

export default class RolController {

	rolService: RolService;

	constructor(rolService: RolService) {
		this.rolService = rolService;
	}

	get = (req, res, next) => {
		this.rolService.idUsuario = res.locals.sesion.idUsuario;
		this.rolService.list()
			.then(data => res.send(data))
			.catch(next)
	}

	getById = (req, res, next) => {
		const id = req.params.id;
		if (!isValidNumber(id, true)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}

		this.rolService.idUsuario = res.locals.sesion.idUsuario;
		this.rolService.findById(parseInt(id))
			.then(row => res.send(row))
			.catch(next)
	}

	post = (req, res, next) => {
		const dataBody = {...req.body};
		if (!isValidObject(dataBody)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}

		const rol = new Rol(); rol.setFromObject(dataBody);
		this.rolService.idUsuario = res.locals.sesion.idUsuario;
		this.rolService.add(rol)
			.then(row => res.send(row))
			.catch(next)
	}

	put = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		if (!isValidNumber(id, true) || !isValidObject(dataBody)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}

		const rol = new Rol(); rol.setFromObject(dataBody);
		this.rolService.idUsuario = res.locals.sesion.idUsuario;
		this.rolService.modify(parseInt(id), rol)
			.then(row => res.send(row))
			.catch(next)
	}

	delete = (req, res, next) => {
		const id = req.params.id;
		if (!isValidNumber(id, true)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}

		this.rolService.idUsuario = res.locals.sesion.idUsuario;
		this.rolService.remove(parseInt(id))
			.then(id => res.send(id))
			.catch(next)
	}
	

	putBindPermisos = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		if (!isValidNumber(id, true) || !isValidObject(dataBody) || !isValidArray(dataBody.permisos)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}
		const permisos = dataBody.permisos;

		this.rolService.idUsuario = res.locals.sesion.idUsuario;
		this.rolService.bindPermisos(parseInt(id), permisos)
		  .then(row => res.send(row))
		  .catch(next)
	}
	
	putUnindPermisos = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		if (!isValidNumber(id, true) || !isValidObject(dataBody) || !isValidArray(dataBody.permisos)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}
		const permisos = dataBody.permisos;

		this.rolService.idUsuario = res.locals.sesion.idUsuario;
		this.rolService.unbindPermisos(parseInt(id), permisos)
		  .then(row => res.send(row))
		  .catch(next)
	}

}
