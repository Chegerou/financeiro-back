import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import ReceiptController from './app/controller/ReceiptController';

import authenticationMiddleware from './app/middlewares/authentication';

const router = new Router();
const upload = multer(multerConfig);

// ROTAS DE INICIAIS
router.post('/session', SessionController.store);
router.post('/user', UserController.store);

// MIDLLEWARES
router.use(authenticationMiddleware);

// ROTAS DO USUARIO
router.put('/user', UserController.update);
router.delete('/user', UserController.delete);

// ROTAS PARA O UPLOAD DE COMPROVANTES
router.post('/receipt', upload.single('file'), ReceiptController.store);

router.delete('/receipt', ReceiptController.delete);
router.get('/receipt', ReceiptController.index);

export default router;
