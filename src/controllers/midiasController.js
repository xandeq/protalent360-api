import pkg from "aws-sdk";
const { S3 } = pkg;
import { createMidia } from "../models/Midia.js";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function uploadMidia(req, res) {
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
}

// Função para gerar URL pré-assinada para upload
export async function getPresignedUrl(req, res) {
  try {
    const { atletaId, tipo, fileName, fileType } = req.body;
    console.log("atletaId:", atletaId);
    console.log("tipo:", tipo);
    console.log("fileName:", fileName);
    console.log("fileType:", fileType);
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
    console.log("Params Bucket:", params);
    const presignedUrl = await s3.getSignedUrlPromise("putObject", params);

    res.status(200).json({ presignedUrl, atletaId, tipo, s3Url: params.Key });
  } catch (error) {
    console.error("Erro ao gerar URL pré-assinada: ", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      time: error.time,
      region: error.region,
      hostname: error.hostname,
      retryable: error.retryable,
      statusCode: error.statusCode,
      requestId: error.requestId,
      extendedRequestId: error.extendedRequestId,
      cfId: error.cfId,
    });

    res.status(500).json({
      message: "Erro no servidor ao gerar a URL pré-assinada.",
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        requestId: error.requestId,
      },
    });
  }
}

// Função para criar registro da mídia no banco de dados
export async function saveMidiaRecord(req, res) {
  try {
    console.log("Body:", req.body);
    const { atletaId, tipo, s3Url } = req.body;
    console.log("atletaId:", atletaId);
    console.log("tipo:", tipo);
    console.log("s3Url:", s3Url);

    // Verificar se os campos necessários estão presentes
    // Verificar se o campo atletaId está presente
    if (!atletaId) {
      return res.status(400).json({ error: "Campo 'atletaId' está faltando" });
    }

    // Verificar se o campo tipo está presente
    if (!tipo) {
      return res.status(400).json({ error: "Campo 'tipo' está faltando" });
    }

    // Verificar se o campo s3Url está presente
    if (!s3Url) {
      return res.status(400).json({ error: "Campo 's3Url' está faltando" });
    }

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
}
