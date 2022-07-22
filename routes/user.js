import express from 'express';
import userController from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/user/:id?', userController.get);
router.post('/user', userController.post);
router.put('/user/:id', userController.put);
router.delete('/user/:id', userController.delete);

export default router;