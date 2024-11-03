import multer from "multer";
import multerS3 from "multer-s3";
import { S3 } from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

// Configurar AWS SDK
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Middleware de upload usando multer e multer-s3
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME, // Certifique-se de que o bucket esteja definido no .env
    acl: "public-read", // Permissões de leitura pública
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

export default { upload };
