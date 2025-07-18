import express from 'express';
import { getDevs } from '../controllers/devsController.js';

const router = express.Router();

router.get('/', getDevs);

export default router;
