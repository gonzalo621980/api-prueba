import Permiso from '../../domain/entities/permiso';
import PermisoService from '../../domain/services/permiso-service';

export default class PermisoController {

	permisoService: PermisoService;

	constructor(permisoService: PermisoService) {
		this.permisoService = permisoService;
	}

	get = (req, res, next) => {
		this.permisoService.idUsuario = res.locals.sesion.idUsuario;
		this.permisoService.list()
			.then(data => res.send(data))
			.catch(next)
	}

	getById = (req, res, next) => {
		const id = req.params.id;
		this.permisoService.idUsuario = res.locals.sesion.idUsuario;
		this.permisoService.findById(id)
			.then(row => res.send(row))
			.catch(next)
	}

}
