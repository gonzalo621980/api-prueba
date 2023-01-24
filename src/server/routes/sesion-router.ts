import express from 'express';
import container from '../../infraestructure/ioc/dependency-injection';
import SesionController from '../controllers/sesion-controller';
import useAuth from '../middlewares/use-auth';

const sesionController = container.resolve('sesionController') as SesionController;
const router = express.Router();

router
    .put('/sesion/init', (req, res, next) => {
        /*#swagger.description = 'Crea la base de datos desde cero con toda su estructura'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Credenciales del usuario administrador',
            required: true,
            schema: {
                rootUser: 'admin',
                rootPassword: '1234'
            }
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                message: 'Base de datos creada exitosamente'
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        sesionController.putInit(req, res, next);
    })
    .put('/sesion/login', (req, res, next) => {
        /*#swagger.description = 'Inicia sesión en el sistema'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Credenciales del usuario de aplicación',
            required: true,
            schema: {
                "correoElectronico": "admin@prueba.com",
                "contrasena": "Prueb@2023"
            }
        }
        /#swagger.responses[200] = {
            description: 'token',
            type: "string",
            schema: "<token>"
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        sesionController.putLogin(req, res, next);
    })
    .put('/sesion/logout', useAuth,  (req, res, next) => {
        /*#swagger.description = 'Cierra sesión en el sistema'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 2,
                "fechaInicio": "2023-01-24T04:11:14.233Z",
                "fechaCierre": "2023-01-24T04:11:23.526Z",
                "idUsuario": 1,
                "activa": false
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        sesionController.putLogout(req, res, next);
    })

export default router;