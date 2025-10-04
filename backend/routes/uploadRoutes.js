
const express = require("express");
const multer = require("multer");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const router = express.Router();
require('dotenv').config();

// Cấu hình AWS S3
const s3Client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Cấu hình multer để lưu tệp vào bộ nhớ (memory storage)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const imageTypes = /jpeg|jpg|png|gif|webp/;
    const videoTypes = /mp4|avi|mov|wmv|flv|webm/;
    const fileTypes = /pdf|doc|docx|txt|xlsx|zip|rar/;
    
    const extname = path.extname(file.originalname).toLowerCase();
    const isImage = imageTypes.test(extname) && imageTypes.test(file.mimetype);
    const isVideo = videoTypes.test(extname) && file.mimetype.startsWith("video/");
    const isFile = fileTypes.test(extname);
    
    if (isImage || isVideo || isFile) {
      return cb(null, true);
    }
    cb(new Error("File type not allowed!"));
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // Tăng lên 100MB cho video
});

// API upload file (ảnh, video hoặc file khác)
router.post("/upload-file", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Không có file" });
  }

  const file = req.file;
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`;

  try {
    // Tải file lên S3
    const params = {
      Bucket: "ichigomazone",
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Tạo URL công khai
    const fileUrl = params.Key;
    console.log("✅ File đã upload:", fileUrl);
    
    res.json({ url: fileUrl });
    
  } catch (error) {
    console.error("Lỗi khi tải lên S3:", error);
    res.status(500).json({ error: "Lỗi khi tải file lên S3" });
  }
});

// Error handler cho multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File quá lớn (max 100MB)" });
    }
  }
  if (error.message) {
    return res.status(400).json({ error: error.message });
  }
  next(error);
});

module.exports = router;
