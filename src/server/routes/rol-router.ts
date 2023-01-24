import express from 'express';
import RolController from '../controllers/rol-controller';
import container from './../../infraestructure/ioc/dependency-injection';
import useAuth from './../middlewares/use-auth';

const rolController = container.resolve('rolController') as RolController;
const router = express.Router();

router
    .get('/rol', useAuth, (req, res, next) => {
        /*#swagger.description = 'Lista roles con sus permisos'
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
                    "codigo": "ADMIN",
                    "nombre": "Administrador",
                    "permisos": [
                        {
                            "id": 1,
                            "codigo": "USUARIO_CREAR",
                            "nombre": "Crear usuario"
                        }
                    ]
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
        rolController.get(req, res, next);
    })
    .get('/rol/:id', useAuth, (req, res, next) => {
        /*#swagger.description = 'Muestra detalle de un rol con sus permisos'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de rol',
            required: true,
            schema: '1',
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 1,
                "codigo": "ADMIN",
                "nombre": "Administrador",
                "permisos": [
                    {
                        "id": 1,
                        "codigo": "USUARIO_CREAR",
                        "nombre": "Crear usuario"
                    }
                ]
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        rolController.getById(req, res, next);
    })
    .post('/rol', useAuth, (req, res, next) => {
        /*#swagger.description = 'Crea un nuevo rol'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Detalle de un rol',
            required: true,
            schema: {
                "codigo": "ADMIN",
                "nombre": "Administrador"
            }
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 1,
                "codigo": "ADMIN",
                "nombre": "Administrador",
                "permisos": []
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        rolController.post(req, res, next);
    })
    .put('/rol/:id', useAuth, (req, res, next) => {
        /*#swagger.description = 'Actualiza un rol'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de rol',
            required: true,
            schema: '1',
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Detalle de un rol',
            required: true,
            schema: {
                "codigo": "ADMIN",
                "nombre": "Administrador"
            }
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 1,
                "codigo": "ADMIN",
                "nombre": "Administrador",
                "permisos": []
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        rolController.put(req, res, next);
    })
    .put('/rol/:id/permisos/bind', useAuth, (req, res, next) => {
        /*#swagger.description = 'Agregar permisos a un rol'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de rol',
            required: true,
            schema: '1',
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Ids de permisos',
            required: true,
            schema: {
                "permisos": [1,2,3,4,5]
            }
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 1
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        rolController.putBindPermisos(req, res, next);
    })
    .put('/rol/:id/permisos/unbind', useAuth, (req, res, next) => {
        /*#swagger.description = 'Quitar permisos a un rol'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de rol',
            required: true,
            schema: '1',
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Ids de permisos',
            required: true,
            schema: {
                "permisos": [1,2,3,4,5]
            }
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 1
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        rolController.putUnindPermisos(req, res, next);
    })
    .delete('/rol/:id', useAuth, (req, res, next) => {
        /*#swagger.description = 'Borra un rol'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de rol',
            required: true,
            schema: '1',
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 1
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        rolController.delete(req, res, next);
    })

export default router;