import express from 'express';
import container from './../../infraestructure/ioc/dependency-injection';
import useAuth from './../middlewares/use-auth';

const usuarioController = container.resolve('usuarioController');
const router = express.Router();

router
    .get('/usuario', useAuth('USUARIO_LISTAR'), usuarioController.get)
    .get('/usuario/:id', useAuth('USUARIO_DETALLE'), usuarioController.getById)
    .post('/usuario', useAuth('USUARIO_CREAR'), usuarioController.post)
    .put('/usuario/:id', useAuth('USUARIO_MODIFICAR'), usuarioController.put)
    .put('/usuario/:id/roles/bind', useAuth('USUARIO_MODIFICAR'), usuarioController.putBindRoles)
    .put('/usuario/:id/roles/unbind', useAuth('USUARIO_MODIFICAR'), usuarioController.putUnindRoles)
    .delete('/usuario/:id', useAuth('USUARIO_ELIMINAR'), usuarioController.delete)

export default router;