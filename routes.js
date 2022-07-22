import user from './routes/user.js';
import express from 'express';

const router = express.Router();

router.use(user);

export default router;