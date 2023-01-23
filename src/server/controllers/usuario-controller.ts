import Usuario from '../../domain/entities/usuario';
import UsuarioService from '../../domain/services/usuario-service';

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
		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.findById(id)
			.then(row => res.send(row))
			.catch(next)
	}

	post = (req, res, next) => {
		const dataBody = {...req.body};
		const usuario = new Usuario(); usuario.setFromObject(dataBody);
		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.add(usuario)
			.then(row => res.send(row))
			.catch(next)
	}

	put = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		const usuario = new Usuario(); usuario.setFromObject(dataBody);
		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.modify(id, usuario)
			.then(row => res.send(row))
			.catch(next)
	}

	delete = (req, res, next) => {
		const id = req.params.id;
		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.remove(id)
			.then(id => res.send(id))
			.catch(next)
	}


	putBindRoles = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		const roles = dataBody.roles;
		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.bindRoles(id, roles)
		  .then(row => res.send(row))
		  .catch(next)
	}
	
	putUnindRoles = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		const roles = dataBody.roles;
		this.usuarioService.idUsuario = res.locals.sesion.idUsuario;
		this.usuarioService.unbindRoles(id, roles)
		  .then(row => res.send(row))
		  .catch(next)
	}

}
