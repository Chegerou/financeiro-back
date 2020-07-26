import { Router } from 'express';

import UserController from './app/controller/UserController';

const router = new Router();

// ROTAS DO USUARIO
router.get('/user', UserController.index);
router.post('/user', UserController.store);

export default router;
