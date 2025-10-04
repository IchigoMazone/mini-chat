
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

// Khởi tạo S3 client
const s3 = new S3Client({
  region: "ap-southeast-1", // thay bằng region bucket
  credentials: {
    
  },
});

// Hàm upload file
async function uploadFile() {
  const bucketName = "ichigomazone";
  const filePath = "rotten.png";
  const fileContent = fs.readFileSync(filePath);

  const uploadParams = {
    Bucket: bucketName,
    Key: "b.png", // tên file trong bucket
    Body: fileContent,
    ContentType: "image/png",
  };

  try {
    const result = await s3.send(new PutObjectCommand(uploadParams));
    console.log("✅ Upload thành công:", result);

    // URL public nếu bucket cho phép public-read
    const url = `https://${bucketName}.s3.amazonaws.com/${uploadParams.Key}`;
    console.log("🌍 File URL:", url);
  } catch (err) {
    console.error("❌ Upload lỗi:", err);
  }
}

uploadFile();