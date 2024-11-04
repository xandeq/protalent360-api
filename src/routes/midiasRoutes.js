import express from "express";
import { getPresignedUrl, saveMidiaRecord } from "../controllers/midiasController.js";

const router = express.Router();

router.post("/get-presigned-url", getPresignedUrl);
router.post("/save-midia-record", saveMidiaRecord);

export default router;