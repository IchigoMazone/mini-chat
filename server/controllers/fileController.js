const fs = require('fs');
const path = require('path');

const mongoose = require("mongoose");
const Message = require("../models/messageModel")

// -------------------- Đọc file JSON --------------------
function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);

  // Luôn trả về mảng cho đồng nhất
  return Array.isArray(data) ? data : [data];
}

// -------------------- Lấy size file và format MB/KB --------------------
function formatFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const bytes = stats.size;
    if (bytes >= 1024 * 1024) {
      return +(bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return +(bytes / 1024).toFixed(2) + ' KB';
    }
  } catch (err) {
    return null; // file không tồn tại
  }
}

// -------------------- Đọc dữ liệu theo conversation_id --------------------
// async function readConversationData(conversationId) {
//   // const filePath = path.resolve(__dirname, '../models/message.json');
//   // const data = readJson(filePath);
  
//   const objectId = new mongoose.Types.ObjectId(conversationId);
//   const data = await Message.find({ conversation_id: objectId });

//   console.log (data)

//   const textLinks = [];
//   const files = [];
//   const imagesVideos = [];

//   // Duyệt từ dưới lên
//   // const messages = data
//   //   .slice()
//   //   .reverse()
//   //   .filter((m) => String(m.conversation_id) === String(new mongoose.Types.ObjectId(conversationId)));

//   for (const mes of messages) {
//     const { message_type, content, url, timestamp } = mes;

//     const date = new Date(timestamp);

//     const day = date.getUTCDate();
//     const month = date.getUTCMonth() + 1; // Tháng tính từ 0
//     const year = date.getUTCFullYear();

//     // ---- Text links ----
//     if (message_type === 'text' && typeof content === 'string') {
//       const links = content.match(/https?:\/\/[^\s]+/g);
//       if (links) {
//         links.forEach((link) => textLinks.push({ link, date: `${day}/${month}/${year}` }));
//       }
//     }

//     // ---- File ----
//     else if (message_type === 'file') {
//       let size = null;
//       if (url && typeof url === 'string') {
//         if (url.startsWith('http')) {
//           size = 'remote file';
//         } else {
//           const fullPath = path.resolve(__dirname, '../models', url);
//           console.log("Checking file:", fullPath);
//           size = formatFileSize(fullPath);
//         }
//       }

//       let ext = '';
//       if (typeof content === 'string') {
//         ext = path.extname(content).replace('.', '').toLowerCase() || 'unknown';
//       }

//       files.push({
//         content,
//         url,
//         type: ext,
//         size,
//         date: `${day}/${month}/${year}`,
//       });
//     }

//     // ---- Image / Video ----
//     else if (message_type === 'image' || message_type === 'video') {
//       imagesVideos.push({
//         type: message_type,
//         url,
//         date: `${day}/${month}/${year}`,
//       });
//     }
//   }

//   return { textLinks, files, imagesVideos };
// }

const connectDB = require("../models/connectDB")

async function readConversationData(conversationId) {
  try {
    // Đảm bảo kết nối
    await connectDB();

    // Chuyển conversationId thành ObjectId
    const objectId = new mongoose.Types.ObjectId(conversationId);

    // Truy vấn với điều kiện và timeout tùy chỉnh
    const messages = await Message.find({ conversation_id: objectId })
      .sort({ timestamp: -1 })
      .lean()
      .exec(); // Thêm .exec() để đảm bảo truy vấn chạy

    if (!messages || messages.length === 0) {
      console.log("Không tìm thấy tin nhắn cho conversationId:", conversationId);
      return { textLinks: [], files: [], imagesVideos: [] };
    }

    const textLinks = [];
    const files = [];
    const imagesVideos = [];

    for (const mes of messages) {
      const { message_type, content, url, timestamp } = mes;

      const date = new Date(timestamp);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getUTCFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      // ---- Text links ----
      if (message_type === "text" && typeof content === "string") {
        const links = content.match(/https?:\/\/[^\s]+/g);
        if (links) {
          links.forEach((link) => textLinks.push({ link, date: formattedDate }));
        }
      }

      // ---- File ----
      else if (message_type === "file") {
        let size = null;
        if (url && typeof url === "string") {
          if (url.startsWith("http")) {
            size = "remote file";
          } else {
            const fullPath = path.resolve(__dirname, "../uploads", url);
            if (fs.existsSync(fullPath)) {
              const stats = fs.statSync(fullPath);
              size = (stats.size / 1024).toFixed(2) + " KB";
            } else {
              size = "file not found";
            }
          }
        }

        let ext = "";
        if (typeof content === "string") {
          ext = path.extname(content).replace(".", "").toLowerCase() || "unknown";
        }

        files.push({
          content,
          url,
          type: ext,
          size,
          date: formattedDate,
        });
      }

      // ---- Image / Video ----
      else if (message_type === "image" || message_type === "video") {
        imagesVideos.push({
          type: message_type,
          url,
          date: formattedDate,
        });
      }
    }

    return { textLinks, files, imagesVideos };

  } catch (error) {
    console.error("Lỗi khi đọc dữ liệu cuộc hội thoại:", error);
    throw error;
  }
}

// -------------------- API handler --------------------
const functionx = async (req, res) => {
  const { object } = req.body;

  if (!object) {
    return res.status(400).json({ error: 'Missing object' });
  }

  try {
    const result = await readConversationData(object);

    console.log('Text links:', result.textLinks);
    console.log('Files:', result.files);
    console.log('Images/Videos:', result.imagesVideos);

    return res.json(result);
  } catch (err) {
    console.error('Error reading conversation data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { functionx };
