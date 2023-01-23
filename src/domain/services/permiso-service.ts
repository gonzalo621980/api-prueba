import IPermisoRepository from '../repositories/permiso-repository';
import IUsuarioRepository from '../repositories/usuario-repository';
import ProcessError from '../../infraestructure/sdk/error/process-error';
import ReferenceError from '../../infraestructure/sdk/error/reference-error';
import BaseService from './base-service';
import UnauthorizedError from '../../infraestructure/sdk/error/unauthorized-error';
import Usuario from '../entities/usuario';

export default class PermisoService extends BaseService {

	permisoRepository: IPermisoRepository;
	usuarioRepository: IUsuarioRepository;

	constructor(permisoRepository: IPermisoRepository, usuarioRepository: IUsuarioRepository) {
		super();
		this.permisoRepository = permisoRepository;
		this.usuarioRepository = usuarioRepository;
	}

	async list() {
		return new Promise( async (resolve, reject) => {
			try {
				//verifico permisos
				await this.checkByCodigo(this.idUsuario, "ROL_ADMIN");

				const result = await this.permisoRepository.list();
				resolve(result);
			}
			catch(error) {
				if (error instanceof UnauthorizedError) {
					reject(error);
				}
				else {
					reject(new ProcessError('Error procesando datos', error));
				}
			}
		});
	}

	async findById(id: number) {
		return new Promise( async (resolve, reject) => {
			try {			
				//verifico permisos
				await this.checkByCodigo(this.idUsuario, "ROL_ADMIN");
				   
				const result = await this.permisoRepository.findById(id);
				if (!result) {
					reject(new ReferenceError('No existe el registro'));
					return;
				}
				resolve(result);
			}
			catch(error) {
				if (error instanceof UnauthorizedError) {
					reject(error);
				}
				else {
					reject(new ProcessError('Error procesando datos', error));
				}
			}
		});
	}

	async checkByCodigo(idUsuario: number, codigo: string) {
		return new Promise( async (resolve, reject) => {
			try {			   
				const usuarioRegistrado = await this.usuarioRepository.findById(idUsuario) as Usuario;
				if (!usuarioRegistrado) {
					reject(new UnauthorizedError('Usuario no registrado'));
					return;
				}

				let checked = false;
				for (let r=0; r < usuarioRegistrado.roles.length; r++) {
					const rol = usuarioRegistrado.roles[r];
					for (let p=0; p < rol.permisos.length; p++) {
						const permiso = rol.permisos[p];
						if (permiso.codigo === codigo) {
							checked = true;
							break;
						}
					}
					if (checked) break;
				}

				if (!checked) {
					reject(new UnauthorizedError('Usuario sin permisos'));
					return;	
				}

				resolve(usuarioRegistrado);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

}
