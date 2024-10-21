const Midia = require("../models/Midia"); // Assumindo que você tenha um modelo de Mídia para o banco de dados

// Função para fazer o upload da mídia
exports.uploadMidia = async (req, res) => {
  try {
    const { atletaId, tipo } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    // Criar o registro da mídia no banco de dados
    const midia = await Midia.create({
      atletaId,
      tipo,
      url: req.file.location, // URL do arquivo no S3
    });

    res.status(201).json({
      message: "Mídia enviada com sucesso.",
      midia,
    });
  } catch (error) {
    console.error("Erro ao enviar mídia: ", error);
    res.status(500).json({ message: "Erro no servidor ao enviar a mídia." });
  }
};
