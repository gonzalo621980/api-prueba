import Usuario from '../../domain/entities/usuario';
import UsuarioService from '../../domain/services/usuario-service';

export default class UsuarioController {

	usuarioService: UsuarioService;

	constructor(usuarioService: UsuarioService) {
		this.usuarioService = usuarioService;
	}

	get = async (req, res, next) => {
		this.usuarioService.list()
			.then(data => res.send(data))
			.catch(next)
	}

	getById = async (req, res, next) => {
		const id = req.params.id;
		this.usuarioService.findById(id)
			.then(row => res.send(row))
			.catch(next)
	}

	post = async (req, res, next) => {
		const dataBody = {...req.body};
		const usuario = new Usuario(); usuario.setFromObject(dataBody);
		this.usuarioService.add(usuario)
			.then(row => res.send(row))
			.catch(next)
	}

	put = async (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		const usuario = new Usuario(); usuario.setFromObject(dataBody);
		this.usuarioService.modify(id, usuario)
			.then(row => res.send(row))
			.catch(next)
	}

	delete = async (req, res, next) => {
		const id = req.params.id;
		this.usuarioService.remove(id)
			.then(id => res.send(id))
			.catch(next)
	}


	putBindRoles = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		const roles = dataBody.roles;
		this.usuarioService.bindRoles(id, roles)
		  .then(row => res.send(row))
		  .catch(next)
	}
	
	putUnindRoles = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		const roles = dataBody.roles;
		this.usuarioService.unbindRoles(id, roles)
		  .then(row => res.send(row))
		  .catch(next)
	}

}
