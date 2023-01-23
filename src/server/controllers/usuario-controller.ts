import Usuario from '../../domain/entities/usuario';
import UsuarioService from '../../domain/services/usuario-service';
import ParameterError from '../../infraestructure/sdk/error/parameter-error';
import { isValidArray, isValidNumber, isValidObject } from '../../infraestructure/sdk/utils/validator';

export default class UsuarioController {

	usuarioService: UsuarioService;

	constructor(usuarioService: UsuarioService) {
		this.usuarioService = usuarioService;
	}

	get = (req, res, next) => {
		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.list()
			.then(data => res.send(data))
			.catch(next)
	}

	getById = (req, res, next) => {
		const id = req.params.id;
		if (!isValidNumber(id, true)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}

		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.findById(parseInt(id))
			.then(row => res.send(row))
			.catch(next)
	}

	post = (req, res, next) => {
		const dataBody = {...req.body};
		if (!isValidObject(dataBody)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}

		const usuario = new Usuario(); usuario.setFromObject(dataBody);
		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.add(usuario)
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

		const usuario = new Usuario(); usuario.setFromObject(dataBody);
		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.modify(parseInt(id), usuario)
			.then(row => res.send(row))
			.catch(next)
	}

	delete = (req, res, next) => {
		const id = req.params.id;
		if (!isValidNumber(id, true)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}

		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.remove(parseInt(id))
			.then(id => res.send(id))
			.catch(next)
	}


	putBindRoles = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		if (!isValidNumber(id, true) || !isValidObject(dataBody) || !isValidArray(dataBody.roles)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}
		const roles = dataBody.roles;

		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.bindRoles(parseInt(id), roles)
		  .then(row => res.send(row))
		  .catch(next)
	}
	
	putUnindRoles = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		if (!isValidNumber(id, true) || !isValidObject(dataBody) || !isValidArray(dataBody.roles)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}
		const roles = dataBody.roles;

		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.unbindRoles(parseInt(id), roles)
		  .then(row => res.send(row))
		  .catch(next)
	}

}
