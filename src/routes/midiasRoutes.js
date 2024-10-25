const express = require("express");
const router = express.Router();
const midiasController = require("../controllers/midiasController");
const { upload } = require("../middleware/uploadMiddleware");

// Rota para upload de arquivos de mídia
router.post("/upload", upload.single("midia"), midiasController.uploadMidia);
// Rota para obter URL pré-assinada para upload
router.post("/get-presigned-url", midiasController.getPresignedUrl);
// Rota para salvar registro de mídia após upload para S3
router.post("/save-midia-record", midiasController.saveMidiaRecord);

module.exports = router;
