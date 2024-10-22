const express = require("express");
const router = express.Router();
const midiasController = require("../controllers/midiasController");
const { upload } = require("../middleware/uploadMiddleware");

// Rota para upload de arquivos de mídia
router.post("/upload", upload.single("midia"), midiasController.uploadMidia);

module.exports = router;
