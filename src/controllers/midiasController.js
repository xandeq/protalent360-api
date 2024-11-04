import pkg from "aws-sdk";
const { S3 } = pkg;
import { createMidia } from "../models/Midia.js";

// Função para salvar registro de mídia
export const saveMidiaRecord = async (req, res) => {
  try {
    console.log("Body:", req.body);
    const { atletaId, tipo, s3Url } = req.body;
    console.log("atletaId:", atletaId);
    console.log("tipo:", tipo);
    console.log("s3Url:", s3Url);

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

    res.status(201).json({ midiaId, message: "Registro de mídia salvo com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar registro de mídia: ", {
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
      cfId: error.cfId
    });

    res.status(500).json({
      message: "Erro no servidor ao salvar o registro de mídia.",
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        requestId: error.requestId
      }
    });
  }
};

// Função para obter URL pré-assinada
export const getPresignedUrl = async (req, res) => {
  try {
    const { atletaId, fileName, fileType } = req.body;

    if (!atletaId || !fileName || !fileType) {
      return res.status(400).json({ message: "Nome, tipo do arquivo e atletaId são necessários." });
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `midias/${atletaId}/${fileName}`, // Diretório dentro do bucket
      Expires: 60, // URL válida por 60 segundos
      ContentType: fileType,
      ACL: "public-read", // Permissão de leitura pública
    };

    const presignedUrl = await s3.getSignedUrlPromise("putObject", params);

    res.status(200).json({ presignedUrl, atletaId, tipo: fileType, s3Url: params.Key });
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
      cfId: error.cfId
    });

    res.status(500).json({
      message: "Erro no servidor ao gerar a URL pré-assinada.",
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        requestId: error.requestId
      }
    });
  }
};

// Função para fazer upload de mídia
export const uploadMidia = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Arquivo não enviado" });
    }

    res.status(200).json({ message: "Upload bem-sucedido", file: req.file });
  } catch (error) {
    console.error("Erro ao fazer upload de mídia: ", error);
    res.status(500).json({ message: "Erro no servidor ao fazer upload de mídia" });
  }
};