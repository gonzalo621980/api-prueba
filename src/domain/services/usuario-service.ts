import Usuario from '../entities/usuario';
import IUsuarioRepository from '../repositories/usuario-repository';
import { isValidString, isValidInteger, isValidDate, isValidArray,  } from '../../infraestructure/sdk/utils/validator';
import ValidationError from '../../infraestructure/sdk/error/validation-error';
import ProcessError from '../../infraestructure/sdk/error/process-error';
import ReferenceError from '../../infraestructure/sdk/error/reference-error';
import { EncryptPassword } from '../../infraestructure/sdk/utils/cryptograph';

export default class UsuarioService {

	usuarioRepository: IUsuarioRepository;

	constructor(usuarioRepository: IUsuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}

	async list() {
		return new Promise( async (resolve, reject) => {
			try {
				const usuarios = await this.usuarioRepository.list() as Usuario[];
				usuarios.forEach(usuario => usuario.contrasena = "");
				
				resolve(usuarios);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async listByFilter(usuario: Usuario) {
		return new Promise( async (resolve, reject) => {
			try {
				const usuarios = await this.usuarioRepository.listByFilter(usuario) as Usuario[];
				usuarios.forEach(usuario => usuario.contrasena = "");
				
				resolve(usuarios);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async findById(id: number) {
		return new Promise( async (resolve, reject) => {
			try {			   
				const usuario = await this.usuarioRepository.findById(id) as Usuario;
				if (!usuario) {
					reject(new ReferenceError('No existe el registro'));
					return;
				}
				usuario.contrasena = "";
				
				resolve(usuario);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async add(usuario: Usuario) {
		return new Promise( async (resolve, reject) => {
			try {
				if (
					!isValidString(usuario.nombreCompleto, true) ||
					!isValidString(usuario.contrasena, true) ||
					!isValidString(usuario.correoElectronico, true) ||
					!isValidInteger(usuario.edad, true) ||
					!isValidDate(usuario.fechaNacimiento, true) ||
					!isValidString(usuario.sexo, true) ||
					!isValidString(usuario.dni, true) ||
					!isValidString(usuario.direccion, true) ||
					!isValidString(usuario.pais, true) ||
					!isValidString(usuario.telefono, true)
				) {
					reject(new ValidationError('Existen campos incompletos'));
					return;
				}

				usuario.correoElectronico = usuario.correoElectronico.toLocaleLowerCase();
				usuario.contrasena = EncryptPassword(usuario.contrasena);
				
				usuario.id = null;
				const result = await this.usuarioRepository.add(usuario);
				resolve(result);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async modify(id: number, usuario: Usuario) {
		return new Promise( async (resolve, reject) => {
			try {
				if (
					!isValidString(usuario.nombreCompleto, true) ||
					!isValidString(usuario.contrasena, true) ||
					!isValidString(usuario.correoElectronico, true) ||
					!isValidInteger(usuario.edad, true) ||
					!isValidDate(usuario.fechaNacimiento, true) ||
					!isValidString(usuario.sexo, true) ||
					!isValidString(usuario.dni, true) ||
					!isValidString(usuario.direccion, true) ||
					!isValidString(usuario.pais, true) ||
					!isValidString(usuario.telefono, true)
				) {
					reject(new ValidationError('Existen campos incompletos'));
					return;
				}

				usuario.correoElectronico = usuario.correoElectronico.toLocaleLowerCase();
				if (usuario.contrasena.length > 0) {
					usuario.contrasena = EncryptPassword(usuario.contrasena);
				}

				const result = await this.usuarioRepository.modify(id, usuario);
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
				const result = await this.usuarioRepository.remove(id);
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


	async bindRoles(id:number, roles:number[]) {
        return new Promise( async (resolve, reject) => {
            try {
                if (!isValidArray(roles, true)) {
                    reject(new ValidationError('Existen campos incompletos'));
                    return;
                }

                const result = await this.usuarioRepository.bindRoles(id, roles);
                resolve(result);
            }
            catch(error) {
                reject(new ProcessError('Error procesando datos', error));
            }
        });
    }

    async unbindRoles(id:number, roles:number[]) {
        return new Promise( async (resolve, reject) => {
            try {
                if (!isValidArray(roles, true)) {
                    reject(new ValidationError('Existen campos incompletos'));
                    return;
                }

                const result = await this.usuarioRepository.unbindRoles(id, roles);
                resolve(result);
            }
            catch(error) {
                reject(new ProcessError('Error procesando datos', error));
            }
        });
    }

}
