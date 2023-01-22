import Rol from '../entities/rol';
import IRolRepository from '../repositories/rol-repository';
import { isValidArray, isValidInteger, isValidString,  } from '../../infraestructure/sdk/utils/validator';
import ValidationError from '../../infraestructure/sdk/error/validation-error';
import ProcessError from '../../infraestructure/sdk/error/process-error';
import ReferenceError from '../../infraestructure/sdk/error/reference-error';

export default class RolService {

	rolRepository: IRolRepository;

	constructor(rolRepository: IRolRepository) {
		this.rolRepository = rolRepository;
	}

	async list() {
		return new Promise( async (resolve, reject) => {
			try {
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
