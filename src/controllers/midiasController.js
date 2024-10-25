const AWS = require("aws-sdk");
const { createMidia } = require("../models/Midia");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


exports.uploadMidia = async (req, res) => {
  try {
    const { atletaId, tipo } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    // Cria a mídia no banco de dados
    const midiaId = await createMilinkdia(atletaId, tipo, req.file.location);

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

// Função para gerar URL pré-assinada para upload
exports.getPresignedUrl = async (req, res) => {
  try {
    const { atletaId, tipo, fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res
        .status(400)
        .json({ message: "Nome e tipo do arquivo são necessários." });
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `midias/${atletaId}/${fileName}`, // Diretório dentro do bucket
      Expires: 60, // URL válida por 60 segundos
      ContentType: fileType,
      ACL: "public-read", // Permissão de leitura pública
    };

    const presignedUrl = await s3.getSignedUrlPromise("putObject", params);

    res.status(200).json({ presignedUrl, atletaId, tipo, s3Url: params.Key });
  } catch (error) {
    console.error("Erro ao gerar URL pré-assinada: ", error);
    res
      .status(500)
      .json({ message: "Erro no servidor ao gerar a URL pré-assinada." });
  }
};

// Função para criar registro da mídia no banco de dados
exports.saveMidiaRecord = async (req, res) => {
  try {
    const { atletaId, tipo, s3Url } = req.body;

    // Criar a entrada de mídia no banco de dados
    const midiaId = await createMidia(
      atletaId,
      tipo,
      `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${s3Url}`
    );

    res.status(201).json({
      message: "Registro de mídia criado com sucesso.",
      midiaId,
      atletaId,
      tipo,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${s3Url}`,
    });
  } catch (error) {
    console.error("Erro ao salvar registro de mídia: ", error);
    res.status(500).json({ message: "Erro no servidor ao salvar a mídia." });
  }
};
