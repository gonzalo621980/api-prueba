import Sesion from '../../domain/entities/sesion';
import SesionService from '../../domain/services/sesion-service';
import ParameterError from '../../infraestructure/sdk/error/parameter-error';
import UnauthorizedError from '../../infraestructure/sdk/error/unauthorized-error';
import { isValidNumber } from '../../infraestructure/sdk/utils/validator';
import { generateAccessToken, getTokenFromRequest, verifyAccessToken } from '../authorization/token';

export default class SesionController {

	sesionService: SesionService;

	constructor(sesionService: SesionService) {
		this.sesionService = sesionService;
	}

	putLogin = (req, res, next) => {
		const dataBody = {...req.body};
		const correoElectronico = dataBody.correoElectronico;
		const contrasena = dataBody.contrasena;

		this.sesionService.login(correoElectronico, contrasena)
		.then((sesion: Sesion) => {
			
			const data = {
				idUsuario: sesion.idUsuario,
				idSesion: sesion.id
			}
			const token = generateAccessToken(data);
			if (token) {
				res.send(token);
			}
			else {
				next(new UnauthorizedError('Error generando Token'));
			}

		})
		.catch(next);
	}

	putLogout = (req, res, next) => {
		const dataToken = res.locals.sesion;
		const idSesion = dataToken.idSesion;
		if (!isValidNumber(idSesion, true)) {
			next(new ParameterError('Error de parámetros'));
			return;
		}

		this.sesionService.logout(parseInt(idSesion))
		.then(row => res.send(row))
		.catch(next);
	}

}
