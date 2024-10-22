const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
require("dotenv").config();

// Configurar o S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Configurar o multer para usar o S3 como armazenamento
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read", // Permissão de leitura pública para os arquivos
    key: (req, file, cb) => {
      cb(null, `midias/${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

module.exports = { upload };
