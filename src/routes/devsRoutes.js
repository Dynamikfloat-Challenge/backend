import express from 'express';
import { getDevById, getDevs, getDevsByTerms, createDev } from '../controllers/devsController.js';

const router = express.Router();

router.get("/", (req, res) => {
  if (req.query.terms !== undefined) {
    return getDevsByTerms(req, res);
  }
  return getDevs(req, res);
});

router.get('/:id', getDevById)
router.post('/', createDev)

export default router;
