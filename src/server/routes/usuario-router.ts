import express from 'express';
import UsuarioController from '../controllers/usuario-controller';
import container from './../../infraestructure/ioc/dependency-injection';
import useAuth from './../middlewares/use-auth';

const usuarioController = container.resolve('usuarioController') as UsuarioController;
const router = express.Router();

router
    .get('/usuario', useAuth, (req, res, next) => {
        /*#swagger.description = 'Lista usuarios con sus roles y permisos'
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
                    "nombreCompleto": "admin",
                    "contrasena": "",
                    "correoElectronico": "admin@prueba.com",
                    "edad": 23,
                    "fechaNacimiento": "2000-01-23T00:00:00.000Z",
                    "sexo": "M",
                    "dni": "123456789",
                    "direccion": "-",
                    "pais": "-",
                    "telefono": "-",
                    "roles": [
                        {
                            "id": 1,
                            "codigo": "TEST",
                            "nombre": "Tester",
                            "permisos": [
                                {
                                    "id": 5,
                                    "codigo": "USUARIO_DETALLE",
                                    "nombre": "Ver detalle de usuario"
                                }
                            ]
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
        usuarioController.get(req, res, next);
    })
    .get('/usuario/:id', useAuth, (req, res, next) => {
        /*#swagger.description = 'Muestra detalle de un usuario con sus roles y permisos'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de usuario',
            required: true,
            schema: '1',
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 1,
                "nombreCompleto": "admin",
                "contrasena": "",
                "correoElectronico": "admin@prueba.com",
                "edad": 23,
                "fechaNacimiento": "2000-01-23T00:00:00.000Z",
                "sexo": "M",
                "dni": "123456789",
                "direccion": "-",
                "pais": "-",
                "telefono": "-",
                "roles": [
                    {
                        "id": 1,
                        "codigo": "TEST",
                        "nombre": "Tester",
                        "permisos": [
                            {
                                "id": 5,
                                "codigo": "USUARIO_DETALLE",
                                "nombre": "Ver detalle de usuario"
                            }
                        ]
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
        usuarioController.getById(req, res, next);
    })
    .post('/usuario', useAuth, (req, res, next) => {
        /*#swagger.description = 'Crea un nuevo usuario'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Detalle de un usuario',
            required: true,
            schema: {
                "nombreCompleto": "admin",
                "contrasena": "",
                "correoElectronico": "admin@prueba.com",
                "edad": 23,
                "fechaNacimiento": "2000-01-23T00:00:00.000Z",
                "sexo": "M",
                "dni": "123456789",
                "direccion": "-",
                "pais": "-",
                "telefono": "-"
            }
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 1,
                "nombreCompleto": "admin",
                "contrasena": "",
                "correoElectronico": "admin@prueba.com",
                "edad": 23,
                "fechaNacimiento": "2000-01-23T00:00:00.000Z",
                "sexo": "M",
                "dni": "123456789",
                "direccion": "-",
                "pais": "-",
                "telefono": "-",
                "roles": []
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        usuarioController.post(req, res, next);
    })
    .put('/usuario/:id', useAuth, (req, res, next) => {
        /*#swagger.description = 'Actualiza un usuario'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de usuario',
            required: true,
            schema: '1',
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Detalle de un usuario',
            required: true,
            schema: {
                "nombreCompleto": "admin",
                "contrasena": "",
                "correoElectronico": "admin@prueba.com",
                "edad": 23,
                "fechaNacimiento": "2000-01-23T00:00:00.000Z",
                "sexo": "M",
                "dni": "123456789",
                "direccion": "-",
                "pais": "-",
                "telefono": "-"
            }
        }
        /#swagger.responses[200] = {
            description: 'json',
            schema: {
                "id": 1,
                "nombreCompleto": "admin",
                "contrasena": "",
                "correoElectronico": "admin@prueba.com",
                "edad": 23,
                "fechaNacimiento": "2000-01-23T00:00:00.000Z",
                "sexo": "M",
                "dni": "123456789",
                "direccion": "-",
                "pais": "-",
                "telefono": "-",
                "roles": []
            }
        }
        #swagger.responses[500] = {
            description: 'json',
            schema: {
                statusCode: 500,
                message: 'Error...'
            }
        }*/
        usuarioController.put(req, res, next);
    })
    .put('/usuario/:id/roles/bind', useAuth, (req, res, next) => {
        /*#swagger.description = 'Agregar roles a un usuario'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de usuario',
            required: true,
            schema: '1',
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Ids de roles',
            required: true,
            schema: {
                "roles": [1]
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
        usuarioController.putBindRoles(req, res, next);
    })
    .put('/usuario/:id/roles/unbind', useAuth, (req, res, next) => {
        /*#swagger.description = 'Quitar roles a un usuario'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de usuario',
            required: true,
            schema: '1',
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Ids de roles',
            required: true,
            schema: {
                "roles": [1]
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
        usuarioController.putUnindRoles(req, res, next);
    })
    .delete('/usuario/:id', useAuth, (req, res, next) => {
        /*#swagger.description = 'Borra un usuario'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'Token autenticación',
            required: true,
            schema: 'Bearer <token>',
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de usuario',
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
        usuarioController.delete(req, res, next);
    })

export default router;