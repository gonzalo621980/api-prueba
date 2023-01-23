import Rol from '../entities/rol';
import IRolRepository from '../repositories/rol-repository';
import PermisoService from './permiso-service';
import { isValidArray, isValidInteger, isValidString,  } from '../../infraestructure/sdk/utils/validator';
import ValidationError from '../../infraestructure/sdk/error/validation-error';
import ProcessError from '../../infraestructure/sdk/error/process-error';
import ReferenceError from '../../infraestructure/sdk/error/reference-error';
import BaseService from './base-service';

export default class RolService extends BaseService {

	rolRepository: IRolRepository;
	permisoService: PermisoService;

	constructor(rolRepository: IRolRepository, permisoService: PermisoService) {
		super();
		this.rolRepository = rolRepository;
		this.permisoService = permisoService;
	}

	async list() {
		return new Promise( async (resolve, reject) => {
			try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "ROL_ADMIN");

				const result = await this.rolRepository.list();
				resolve(result);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async findById(id: number) {
		return new Promise( async (resolve, reject) => {
			try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "ROL_ADMIN");

				const result = await this.rolRepository.findById(id);
				if (!result) {
					reject(new ReferenceError('No existe el registro'));
					return;
				}
				resolve(result);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async add(rol: Rol) {
		return new Promise( async (resolve, reject) => {
			try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "ROL_ADMIN");

				if (
					!isValidString(rol.codigo, true) ||
					!isValidString(rol.nombre, true)
				) {
					reject(new ValidationError('Existen campos incompletos'));
					return;
				}

				rol.id = null;
				const result = await this.rolRepository.add(rol);
				resolve(result);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async modify(id: number, rol: Rol) {
		return new Promise( async (resolve, reject) => {
			try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "ROL_ADMIN");

				if (
					!isValidString(rol.codigo, true) ||
					!isValidString(rol.nombre, true)
				) {
					reject(new ValidationError('Existen campos incompletos'));
					return;
				}

				const result = await this.rolRepository.modify(id, rol);
				if (!result) {
					reject(new ReferenceError('No existe el registro'));
					return;
				}
				resolve(result);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async remove(id: number) {
		return new Promise( async (resolve, reject) => {
			try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "ROL_ADMIN");

				const result = await this.rolRepository.remove(id);
				if (!result) {
					reject(new ReferenceError('No existe el registro'));
					return;
				}
				resolve(result);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}


	async bindPermisos(id:number, permisos:number[]) {
        return new Promise( async (resolve, reject) => {
            try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "ROL_ADMIN");

                if (!isValidArray(permisos, true)) {
                    reject(new ValidationError('Existen campos incompletos'));
                    return;
                }

                const result = await this.rolRepository.bindPermisos(id, permisos);
                resolve(result);
            }
            catch(error) {
                reject(new ProcessError('Error procesando datos', error));
            }
        });
    }

    async unbindPermisos(id:number, permisos:number[]) {
        return new Promise( async (resolve, reject) => {
            try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "ROL_ADMIN");
				
                if (!isValidArray(permisos, true)) {
                    reject(new ValidationError('Existen campos incompletos'));
                    return;
                }

                const result = await this.rolRepository.unbindPermisos(id, permisos);
                resolve(result);
            }
            catch(error) {
                reject(new ProcessError('Error procesando datos', error));
            }
        });
    }

}
