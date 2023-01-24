import express from 'express';
import PermisoController from '../controllers/permiso-controller';
import container from './../../infraestructure/ioc/dependency-injection';
import useAuth from './../middlewares/use-auth';

const permisoController = container.resolve('permisoController') as PermisoController;
const router = express.Router();

router
    .get('/permiso', useAuth, (req, res, next) => {
        /*#swagger.description = 'Lista permisos'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: [
                {
                    "id": 1,
                    "codigo": "USUARIO_CREAR",
                    "nombre": "Crear usuario"
                }
            ]
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        permisoController.get(req, res, next);
    })
    .get('/permiso/:id', useAuth, (req, res, next) => {
        /*#swagger.description = 'Muestra detalle de un permiso'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'id de Permiso',
            required: true,
            schema: '1',
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 1,
                "codigo": "USUARIO_CREAR",
                "nombre": "Crear usuario"
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        permisoController.getById(req, res, next);
    })

export default router;