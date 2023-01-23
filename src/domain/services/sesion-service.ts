import Sesion from '../entities/sesion';
import Usuario from '../entities/usuario';
import ISesionRepository from '../repositories/sesion-repository';
import UsuarioService from './usuario-service';
import { isValidString, isValidDate, isValidInteger, isValidBoolean } from '../../infraestructure/sdk/utils/validator';
import ValidationError from '../../infraestructure/sdk/error/validation-error';
import ProcessError from '../../infraestructure/sdk/error/process-error';
import ReferenceError from '../../infraestructure/sdk/error/reference-error';
import BaseService from './base-service';

export default class SesionService extends BaseService {

	sesionRepository: ISesionRepository;
	usuarioService: UsuarioService;

	constructor(sesionRepository: ISesionRepository, usuarioService: UsuarioService) {
		super();
		this.sesionRepository = sesionRepository;
		this.usuarioService = usuarioService;
	}

	async list() {
		return new Promise( async (resolve, reject) => {
			try {
				const result = await this.sesionRepository.list();
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
				const result = await this.sesionRepository.findById(id);
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

	async add(sesion: Sesion) {
		return new Promise( async (resolve, reject) => {
			try {
				if (
					!isValidDate(sesion.fechaInicio, true) ||
					!isValidDate(sesion.fechaCierre, false) ||
					!isValidInteger(sesion.idUsuario, true) ||
					!isValidBoolean(sesion.activa)
				) {
					reject(new ValidationError('Existen campos incompletos'));
					return;
				}

				sesion.id = null;
				const result = await this.sesionRepository.add(sesion);
				resolve(result);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async modify(id: number, sesion: Sesion) {
		return new Promise( async (resolve, reject) => {
			try {
				if (
					!isValidDate(sesion.fechaInicio, true) ||
					!isValidDate(sesion.fechaCierre, false) ||
					!isValidInteger(sesion.idUsuario, true) ||
					!isValidBoolean(sesion.activa)
				) {
					reject(new ValidationError('Existen campos incompletos'));
					return;
				}

				const result = await this.sesionRepository.modify(id, sesion);
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
				const result = await this.sesionRepository.remove(id);
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


	async init(rootUser: string, rootPassword: string) {
		return new Promise( async (resolve, reject) => {
			try {
				if (
					!isValidString(rootUser, true) ||
					!isValidString(rootPassword, true)
				) {
					reject(new ValidationError('Existen campos incompletos'));
					return;
				}

				const result = await this.sesionRepository.init(rootUser, rootPassword);
				resolve(result);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
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
				usuario.correoElectronico = correoElectronico;
				usuario.contrasena = contrasena;

				const usuarios = await this.usuarioService.listByFilter(usuario) as Usuario[];
				if (usuarios.length === 0) {
					reject(new ReferenceError('Correo electrónico o contraseña incorrectos'));
					return;
				}
				if (usuarios.length > 1) { //no deberia ocurrir nunca
					reject(new ReferenceError('Usuario indeterminado'));
					return;
				}
				const idUsuario = usuarios[0].id;

				let sesion = new Sesion();
				sesion.idUsuario = idUsuario;
				sesion.fechaInicio = new Date();
				sesion.activa = true;
				sesion = await this.add(sesion) as Sesion;

				resolve(sesion);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

	async logout(id: number) {
		return new Promise( async (resolve, reject) => {
			try {
				let sesion = await this.findById(id) as Sesion;
				sesion.fechaCierre = new Date();
				sesion.activa = false;
				sesion = await this.modify(id, sesion) as Sesion;

				resolve(sesion);
			}
			catch(error) {
				reject(new ProcessError('Error procesando datos', error));
			}
		});
	}

}
