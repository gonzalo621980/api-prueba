import Permiso from '../../domain/entities/permiso';
import PermisoService from '../../domain/services/permiso-service';

export default class PermisoController {

	permisoService: PermisoService;

	constructor(permisoService: PermisoService) {
		this.permisoService = permisoService;
	}

	get = async (req, res, next) => {
		this.permisoService.list()
			.then(data => res.send(data))
			.catch(next)
	}

	getById = async (req, res, next) => {
		const id = req.params.id;
		this.permisoService.findById(id)
			.then(row => res.send(row))
			.catch(next)
	}

}
