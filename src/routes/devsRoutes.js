import express from 'express';
import { getDevById, getDevs } from '../controllers/devsController.js';

const router = express.Router();

router.get('/', getDevs);

router.get('/:id', getDevById)

export default router;
