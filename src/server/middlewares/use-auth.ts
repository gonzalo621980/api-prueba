import express from 'express';
import UnauthorizedError from '../../infraestructure/sdk/error/unauthorized-error';
import { verifyAccessToken } from '../authorization/token';


export default function useAuth (permiso = null) {
    return (req, res, next) => {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        const data = verifyAccessToken(token);
        if (!data) {
            next(new UnauthorizedError('Token inválido'));
        }
        else {
            if (permiso) {
                const permisos: number[] = data.permisos;
                if (permisos && permisos.includes(permiso)) {
                    next();
                }
                else {
                    next(new UnauthorizedError('Acción no autorizada'));
                }
            }
            else {
                next();
            }
        }
    }
}

