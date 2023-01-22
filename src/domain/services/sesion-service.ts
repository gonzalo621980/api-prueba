import Usuario from '../entities/usuario';
import UsuarioService from './usuario-service';
import ValidationError from '../../infraestructure/sdk/error/validation-error';
import ProcessError from '../../infraestructure/sdk/error/process-error';
import ReferenceError from '../../infraestructure/sdk/error/reference-error';
import { isValidString } from '../../infraestructure/sdk/utils/validator';
import { EncryptPassword } from '../../infraestructure/sdk/utils/cryptograph';

export default class SesionService {

	usuarioService: UsuarioService;

	constructor(usuarioService: UsuarioService) {
		this.usuarioService = usuarioService;
	}

	async login(correoElectronico: string, contrasena: string) {
		return new Promise( async (resolve, reject) => {
			try {
				if (
					!isValidString(correoElectronico, true) ||
					!isValidString(contrasena, true)
				) {
					reject(new ValidationError('Existen campos incompletos'));
					return;
				}

				let usuario = new Usuario();
				usuario.correoElectronico = correoElectronico.toLocaleLowerCase();
				usuario.contrasena = EncryptPassword(contrasena);

				const usuarios = await this.usuarioService.listByFilter(usuario) as Usuario[];
				if (usuarios.length === 0) {
					reject(new ReferenceError('Correo electrónico o contraseña incorrectos'));
					return;
				}
				usuario = usuarios[0];

				

				resolve(usuario);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

}
