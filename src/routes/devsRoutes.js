import express from "express";
import {
  getDevById,
  getDevs,
  getDevsByTerms,
} from "../controllers/devsController.js";

const router = express.Router();

router.get("/", (req, res) => {
  if (req.query.terms !== undefined) {
    return getDevsByTerms(req, res);
  }
  return getDevs(req, res);
});

router.get("/:id", getDevById);

export default router;
