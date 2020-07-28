import { Router } from 'express';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

import authenticationMiddleware from './app/middlewares/authentication';

const router = new Router();

// ROTAS DE INICIAIS
router.post('/session', SessionController.store);
router.post('/user', UserController.store);

// MIDLLEWARES
router.use(authenticationMiddleware);

// ROTAS DO USUARIO
router.put('/user', UserController.update);
router.delete('/user', UserController.delete);

export default router;
