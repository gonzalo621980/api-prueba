import express from 'express';
import container from '../../infraestructure/ioc/dependency-injection';
import useAuth from '../middlewares/use-auth';

const sesionController = container.resolve('sesionController');
const router = express.Router();

router
    .put('/sesion/init', sesionController.putInit)
    .put('/sesion/login', sesionController.putLogin)
    .put('/sesion/logout', useAuth, sesionController.putLogout)    

export default router;