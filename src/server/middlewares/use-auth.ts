import Sesion from '../../domain/entities/sesion';
import SesionService from '../../domain/services/sesion-service';
import container from '../../infraestructure/ioc/dependency-injection';
import UnauthorizedError from '../../infraestructure/sdk/error/unauthorized-error';
import { verifyAccessToken } from '../authorization/token';


export default function useAuth (req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const dataToken = verifyAccessToken(token);
    if (!dataToken) {
        next(new UnauthorizedError('Token inválido'));
    }
    else {
		const idSesion = dataToken.idSesion;
        const sesionService = container.resolve("sesionService") as SesionService;
        sesionService.findById(idSesion)
        .then((sesion: Sesion) => {
            if (sesion.activa) {
                res.locals.sesion = dataToken;
                next();
            }
            else {
                next(new UnauthorizedError('Sesión vencida'));
            }
        })
        .catch(next)
    }
}

