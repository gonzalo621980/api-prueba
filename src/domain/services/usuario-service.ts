import Usuario from '../entities/usuario';
import IUsuarioRepository from '../repositories/usuario-repository';
import PermisoService from './permiso-service';
import { isValidString, isValidInteger, isValidDate, isValidArray, isValidEmail, isValidPassword,  } from '../../infraestructure/sdk/utils/validator';
import ValidationError from '../../infraestructure/sdk/error/validation-error';
import ProcessError from '../../infraestructure/sdk/error/process-error';
import ReferenceError from '../../infraestructure/sdk/error/reference-error';
import { EncryptPassword } from '../../infraestructure/sdk/utils/cryptograph';
import BaseService from './base-service';
import UnauthorizedError from '../../infraestructure/sdk/error/unauthorized-error';

export default class UsuarioService extends BaseService {

	usuarioRepository: IUsuarioRepository;
	permisoService: PermisoService;

	constructor(usuarioRepository: IUsuarioRepository, permisoService: PermisoService) {
		super();
		this.usuarioRepository = usuarioRepository;
		this.permisoService = permisoService;
	}

	async list() {
		return new Promise( async (resolve, reject) => {
			try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "USUARIO_LISTAR");

				const usuarios = await this.usuarioRepository.list() as Usuario[];
				usuarios.forEach(usuario => usuario.contrasena = "");
				
				resolve(usuarios);
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
				await this.permisoService.checkByCodigo(this.idUsuario, "USUARIO_DETALLE");

				const usuario = await this.usuarioRepository.findById(id) as Usuario;
				if (!usuario) {
					reject(new ReferenceError('No existe el registro'));
					return;
				}
				usuario.contrasena = "";
				
				resolve(usuario);
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

	async add(usuario: Usuario) {
		return new Promise( async (resolve, reject) => {
			try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "USUARIO_CREAR");

				const menssge = this.validate(usuario);
				if (menssge.length > 0) {
					reject(new ValidationError(menssge));
					return;
				}

				usuario.correoElectronico = usuario.correoElectronico.toLocaleLowerCase();
				usuario.contrasena = EncryptPassword(usuario.contrasena);

				//validacion de correo electronico existente
				let usuarioValidate = new Usuario();
				usuarioValidate.correoElectronico = usuario.correoElectronico;
				let usuarios = await this.listByFilter(usuarioValidate) as Usuario[];
				if (usuarios.length > 0) {
					reject(new ValidationError('El correo electrónico ya fue utilizado, debe ingresar uno diferente'));
					return;
				}

				//validacion de DNI existente
				usuarioValidate.correoElectronico = "";
				usuarioValidate.dni = usuario.dni;
				usuarios = await this.listByFilter(usuarioValidate) as Usuario[];
				if (usuarios.length > 0) {
					reject(new ValidationError('El DNI ya fue utilizado, debe ingresar uno diferente'));
					return;
				}
				
				usuario.id = null;
				usuario = await this.usuarioRepository.add(usuario);
				usuario.contrasena = "";
				
				resolve(usuario);
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

	async modify(id: number, usuario: Usuario) {
		return new Promise( async (resolve, reject) => {
			try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "USUARIO_MODIFICAR");

				const menssge = this.validate(usuario);
				if (menssge.length > 0) {
					reject(new ValidationError(menssge));
					return;
				}

				usuario.correoElectronico = usuario.correoElectronico.toLocaleLowerCase();
				if (usuario.contrasena.length > 0) {
					usuario.contrasena = EncryptPassword(usuario.contrasena);
				}

				//validacion de correo electronico existente
				let usuarioValidate = new Usuario();
				usuarioValidate.correoElectronico = usuario.correoElectronico;
				let usuarios = (await this.listByFilter(usuarioValidate) as Usuario[]).filter(f => f.id !== id);
				if (usuarios.length > 0) {
					reject(new ValidationError('El correo electrónico ya fue utilizado, debe ingresar uno diferente'));
					return;
				}

				//validacion de DNI existente
				usuarioValidate.correoElectronico = "";
				usuarioValidate.dni = usuario.dni;
				usuarios = (await this.listByFilter(usuarioValidate) as Usuario[]).filter(f => f.id !== id);
				if (usuarios.length > 0) {
					reject(new ValidationError('El DNI ya fue utilizado, debe ingresar uno diferente'));
					return;
				}

				usuario = await this.usuarioRepository.modify(id, usuario);
				if (!usuario) {
					reject(new ReferenceError('No existe el registro'));
					return;
				}
				usuario.contrasena = "";
				
				resolve(usuario);
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

	async remove(id: number) {
		return new Promise( async (resolve, reject) => {
			try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "USUARIO_ELIMINAR");

				const result = await this.usuarioRepository.remove(id);
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


	async listByFilter(usuario: Usuario) {
		return new Promise( async (resolve, reject) => {
			try {
				usuario.correoElectronico = usuario.correoElectronico.toLocaleLowerCase();
				if (usuario.contrasena.length > 0) {
					usuario.contrasena = EncryptPassword(usuario.contrasena);
				}
				
				const usuarios = await this.usuarioRepository.listByFilter(usuario) as Usuario[];
				usuarios.forEach(usuario => usuario.contrasena = "");
				
				resolve(usuarios);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async bindRoles(id:number, roles:number[]) {
        return new Promise( async (resolve, reject) => {
            try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "USUARIO_MODIFICAR");

                if (!isValidArray(roles, true)) {
                    reject(new ValidationError('Existen campos incompletos'));
                    return;
                }
				if (roles.length > 1) {
					reject(new ValidationError('No se puede asignar más de un rol'));
                    return;
				}

				const usuario = await this.usuarioRepository.findById(id) as Usuario;
				if (usuario.roles.length > 0 || roles.length > 1) {
					reject(new ValidationError('El usuario ya tiene un rol asignado'));
                    return;
				}

                const result = await this.usuarioRepository.bindRoles(id, roles);
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

    async unbindRoles(id:number, roles:number[]) {
        return new Promise( async (resolve, reject) => {
            try {
				//verifico permisos
				await this.permisoService.checkByCodigo(this.idUsuario, "USUARIO_MODIFICAR");

                if (!isValidArray(roles, true)) {
                    reject(new ValidationError('Existen campos incompletos'));
                    return;
                }

                const result = await this.usuarioRepository.unbindRoles(id, roles);
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


	//other functions
	validate(usuario: Usuario) {
		if (!isValidString(usuario.nombreCompleto, true)) {
			return 'Debe ingresar el nombre completo';
		}
		if (!(usuario.contrasena.length === 0 || isValidPassword(usuario.contrasena))) {
			return 'Debe ingresar una contraseña correcto (mínimo 8 carácteres, máximo 15, 1 letra mayúscula, 1 minúscula, 1 dígito, 1 carácter especial, sin espacios en blanco)';
		}
		if (!isValidEmail(usuario.correoElectronico)) {
			return 'Debe ingresar un correo electrónico correcto';
		}
		if (!isValidInteger(usuario.edad, true)) {
			return 'Debe ingresar la edad';
		}
		if (!isValidDate(usuario.fechaNacimiento, true)) {
			return 'Debe ingresar una fecha de nacimiento correcta';
		}
		if (!(usuario.sexo === "M" || usuario.sexo === "F")) {
			return 'Debe ingresar el sexo (M o F)';
		}
		if (!isValidString(usuario.dni, true)) {
			return 'Debe ingresar el DNI';
		}
		if (!isValidString(usuario.direccion, true)) {
			return 'Debe ingresar la dirección';
		}
		if (!isValidString(usuario.pais, true)) {
			return 'Debe ingresar el país';
		}
		if (!isValidString(usuario.telefono, true)) {
			return 'Debe ingresar el teléfono';
		}

		return "";
	}

}
