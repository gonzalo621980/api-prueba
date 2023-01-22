import express from 'express';
import container from './../../infraestructure/ioc/dependency-injection';
import useAuth from './../middlewares/use-auth';

const rolController = container.resolve('rolController');
const router = express.Router();

router
    .get('/rol', useAuth('ROL_ADMIN'), rolController.get)
    .get('/rol/:id', useAuth('ROL_ADMIN'), rolController.getById)
    .post('/rol', useAuth('ROL_ADMIN'), rolController.post)
    .put('/rol/:id', useAuth('ROL_ADMIN'), rolController.put)
    .put('/rol/:id/permisos/bind', useAuth('ROL_ADMIN'), rolController.putBindPermisos)
    .put('/rol/:id/permisos/unbind', useAuth('ROL_ADMIN'), rolController.putUnindPermisos)
    .delete('/rol/:id', useAuth('ROL_ADMIN'), rolController.delete)

export default router;