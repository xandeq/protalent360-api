import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { getPresignedUrl } from "../controllers/midiasController.js";

const router = express.Router();

// Rota para upload de arquivos de mídia
router.post("/upload", upload.single("midia"), uploadMidia);
// Rota para obter URL pré-assinada para upload
router.post("/get-presigned-url", getPresignedUrl);
// Rota para salvar registro de mídia após upload para S3
router.post("/save-midia-record", saveMidiaRecord);

export default router;
