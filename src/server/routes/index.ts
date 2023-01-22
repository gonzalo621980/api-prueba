import express from 'express';

import UsuarioRouter from './usuario-router';
import RolRouter from './rol-router';
import PermisoRouter from './permiso-router';

const router = express.Router();

const getRoutes = () => {
    router.use('/api', UsuarioRouter);
    router.use('/api', RolRouter);
    router.use('/api', PermisoRouter);

}

getRoutes();

export default router;