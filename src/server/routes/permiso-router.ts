import express from 'express';
import container from './../../infraestructure/ioc/dependency-injection';
import useAuth from './../middlewares/use-auth';

const permisoController = container.resolve('permisoController');
const router = express.Router();

router
    .get('/permiso', useAuth('ROL_ADMIN'), permisoController.get)
    .get('/permiso/:id', useAuth('ROL_ADMIN'), permisoController.getById)

export default router;