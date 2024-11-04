import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { getPresignedUrl, saveMidiaRecord, uploadMidia } from "../controllers/midiasController.js";

const router = express.Router();

router.post("/upload", upload.single("midia"), uploadMidia);
router.post("/get-presigned-url", getPresignedUrl);
router.post("/save-midia-record", saveMidiaRecord);

export default router;