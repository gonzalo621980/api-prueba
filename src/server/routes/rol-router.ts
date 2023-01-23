import express from 'express';
import container from './../../infraestructure/ioc/dependency-injection';
import useAuth from './../middlewares/use-auth';

const rolController = container.resolve('rolController');
const router = express.Router();

router
    .get('/rol', useAuth, rolController.get)
    .get('/rol/:id', useAuth, rolController.getById)
    .post('/rol', useAuth, rolController.post)
    .put('/rol/:id', useAuth, rolController.put)
    .put('/rol/:id/permisos/bind', useAuth, rolController.putBindPermisos)
    .put('/rol/:id/permisos/unbind', useAuth, rolController.putUnindPermisos)
    .delete('/rol/:id', useAuth, rolController.delete)

export default router;