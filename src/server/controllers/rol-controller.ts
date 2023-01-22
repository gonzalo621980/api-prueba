import Rol from '../../domain/entities/rol';
import RolService from '../../domain/services/rol-service';

export default class RolController {

	rolService: RolService;

	constructor(rolService: RolService) {
		this.rolService = rolService;
	}

	get = async (req, res, next) => {
		this.rolService.list()
			.then(data => res.send(data))
			.catch(next)
	}

	getById = async (req, res, next) => {
		const id = req.params.id;
		this.rolService.findById(id)
			.then(row => res.send(row))
			.catch(next)
	}

	post = async (req, res, next) => {
		const dataBody = {...req.body};
		const rol = new Rol(); rol.setFromObject(dataBody);
		this.rolService.add(rol)
			.then(row => res.send(row))
			.catch(next)
	}

	put = async (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		const rol = new Rol(); rol.setFromObject(dataBody);
		this.rolService.modify(id, rol)
			.then(row => res.send(row))
			.catch(next)
	}

	delete = async (req, res, next) => {
		const id = req.params.id;
		this.rolService.remove(id)
			.then(id => res.send(id))
			.catch(next)
	}
	

	putBindPermisos = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		const permisos = dataBody.permisos;
		this.rolService.bindPermisos(id, permisos)
		  .then(row => res.send(row))
		  .catch(next)
	}
	
	putUnindPermisos = (req, res, next) => {
		const id = req.params.id;
		const dataBody = {...req.body};
		const permisos = dataBody.permisos;
		this.rolService.unbindPermisos(id, permisos)
		  .then(row => res.send(row))
		  .catch(next)
	}

}
