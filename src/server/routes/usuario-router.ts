import express from 'express';
import container from './../../infraestructure/ioc/dependency-injection';
import useAuth from './../middlewares/use-auth';

const usuarioController = container.resolve('usuarioController');
const router = express.Router();

router
    .get('/usuario', useAuth, usuarioController.get)
    .get('/usuario/:id', useAuth, usuarioController.getById)
    .post('/usuario', useAuth, usuarioController.post)
    .put('/usuario/:id', useAuth, usuarioController.put)
    .put('/usuario/:id/roles/bind', useAuth, usuarioController.putBindRoles)
    .put('/usuario/:id/roles/unbind', useAuth, usuarioController.putUnindRoles)
    .delete('/usuario/:id', useAuth, usuarioController.delete)

export default router;