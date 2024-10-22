const { createMidia, getMidiaById } = require("../models/Midia");

exports.uploadMidia = async (req, res) => {
  try {
    const { atletaId, tipo } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    // Cria a mídia no banco de dados
    const midiaId = await createMidia(atletaId, tipo, req.file.location);

    res.status(201).json({
      message: "Mídia enviada com sucesso.",
      midiaId,
      atletaId,
      tipo,
      url: req.file.location,
    });
  } catch (error) {
    console.error("Erro ao enviar mídia: ", error);
    res.status(500).json({ message: "Erro no servidor ao enviar a mídia." });
  }
};
