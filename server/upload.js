const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// API copy avatar.png sang uploads/ và trả link
app.get("/upload-avatar", (req, res) => {
  const sourceFile = path.join(__dirname, "avatar.png");
  if (!fs.existsSync(sourceFile)) {
    return res.status(404).json({ error: "Không tìm thấy avatar.png trong thư mục" });
  }

  const fileName = Date.now() + "-avatar.png";
  const destFile = path.join(uploadDir, fileName);

  fs.copyFileSync(sourceFile, destFile);

  const fileUrl = `http://localhost:${PORT}/uploads/${fileName}`;
  console.log("✅ Ảnh đã copy:", fileUrl);

  // Trả về JSON
  res.json({ url: fileUrl });
});

// Cho phép truy cập trực tiếp thư mục uploads
app.use("/uploads", express.static(uploadDir));

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  console.log(`👉 Gọi thử: http://localhost:${PORT}/upload-avatar`);
});


// [
//   {
//     "id": "ctc_1",
//     "type": "personal",
//     "members": [
//       "12053cae-9ca7-4cb0-b546-56d7070d216f",
//       "1678b960-7ad1-43ff-8837-42477418b8f9"
//     ],
//     "last_message": {
//       "content": "Hello!",
//       "sender": "12053cae-9ca7-4cb0-b546-56d7070d216f",
//       "timestamp": "2025-09-07T02:00:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-09-07T02:00:00.000Z",
//     "updated_at": "2025-09-07T02:00:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_4",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "2b3e4f50-9c2f-4e8b-8d3a-7f1c2e6a5b4d"
//     ],
//     "last_message": {
//       "content": "Hẹn gặp lúc 5 giờ nhé",
//       "sender": "2b3e4f50-9c2f-4e8b-8d3a-7f1c2e6a5b4d",
//       "timestamp": "2025-09-05T17:00:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-09-05T16:00:00.000Z",
//     "updated_at": "2025-09-05T17:00:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_5",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "7d2e5c90-5c32-4b67-b5c6-3f2a1a9e7b12"
//     ],
//     "last_message": {
//       "content": "Mai đi cafe nhé?",
//       "sender": "7d2e5c90-5c32-4b67-b5c6-3f2a1a9e7b12",
//       "timestamp": "2025-09-04T10:30:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-09-04T10:00:00.000Z",
//     "updated_at": "2025-09-04T10:30:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_6",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "98b4e1d0-1f45-4c82-9b31-6d7f2a8b9c44"
//     ],
//     "last_message": {
//       "content": "Nhớ gửi file cho mình nhé",
//       "sender": "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "timestamp": "2025-09-03T21:15:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-09-03T20:45:00.000Z",
//     "updated_at": "2025-09-03T21:15:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_7",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "ab3c2f70-8d9a-4d2c-9f4b-5e1f6c7a2d3e"
//     ],
//     "last_message": {
//       "content": "Ok, cảm ơn nhiều nha!",
//       "sender": "ab3c2f70-8d9a-4d2c-9f4b-5e1f6c7a2d3e",
//       "timestamp": "2025-09-02T08:00:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-09-02T07:30:00.000Z",
//     "updated_at": "2025-09-02T08:00:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_8",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "c1d2e3f4-5a6b-7c8d-9e0f-1a2b3c4d5e6f"
//     ],
//     "last_message": {
//       "content": "Đi xem phim cuối tuần không?",
//       "sender": "c1d2e3f4-5a6b-7c8d-9e0f-1a2b3c4d5e6f",
//       "timestamp": "2025-09-01T19:45:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-09-01T19:00:00.000Z",
//     "updated_at": "2025-09-01T19:45:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_9",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "d7e8f9a0-1b2c-3d4e-5f6a-7b8c9d0e1f2a"
//     ],
//     "last_message": {
//       "content": "File báo cáo gửi qua mail rồi nhé.",
//       "sender": "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "timestamp": "2025-08-31T15:20:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-31T15:00:00.000Z",
//     "updated_at": "2025-08-31T15:20:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_10",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "e1234567-89ab-cdef-0123-456789abcdef"
//     ],
//     "last_message": {
//       "content": "Chiều nay có họp team đó.",
//       "sender": "e1234567-89ab-cdef-0123-456789abcdef",
//       "timestamp": "2025-08-30T13:00:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-30T12:30:00.000Z",
//     "updated_at": "2025-08-30T13:00:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_11",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "f1f2f3f4-f5f6-f7f8-f9fa-fbfcfdfeff01"
//     ],
//     "last_message": {
//       "content": "Ăn trưa chưa?",
//       "sender": "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "timestamp": "2025-08-29T11:30:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-29T11:00:00.000Z",
//     "updated_at": "2025-08-29T11:30:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_12",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "11223344-5566-7788-99aa-bbccddeeff00"
//     ],
//     "last_message": {
//       "content": "Gửi tài liệu giúp mình với.",
//       "sender": "11223344-5566-7788-99aa-bbccddeeff00",
//       "timestamp": "2025-08-28T18:00:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-28T17:30:00.000Z",
//     "updated_at": "2025-08-28T18:00:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_13",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "22334455-6677-8899-aabb-ccddeeff0011"
//     ],
//     "last_message": {
//       "content": "Ok mai gặp nha!",
//       "sender": "22334455-6677-8899-aabb-ccddeeff0011",
//       "timestamp": "2025-08-27T20:15:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-27T20:00:00.000Z",
//     "updated_at": "2025-08-27T20:15:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_14",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "33445566-7788-99aa-bbcc-ddeeff001122"
//     ],
//     "last_message": {
//       "content": "Nhớ mang tài liệu theo nhé.",
//       "sender": "33445566-7788-99aa-bbcc-ddeeff001122",
//       "timestamp": "2025-08-26T09:40:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-26T09:00:00.000Z",
//     "updated_at": "2025-08-26T09:40:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_15",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "44556677-8899-aabb-ccdd-eeff00112233"
//     ],
//     "last_message": {
//       "content": "Thứ 7 rảnh không?",
//       "sender": "44556677-8899-aabb-ccdd-eeff00112233",
//       "timestamp": "2025-08-25T14:10:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-25T13:45:00.000Z",
//     "updated_at": "2025-08-25T14:10:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_16",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "55667788-99aa-bbcc-ddee-ff0011223344"
//     ],
//     "last_message": {
//       "content": "Đi ăn chè không?",
//       "sender": "55667788-99aa-bbcc-ddee-ff0011223344",
//       "timestamp": "2025-08-24T16:30:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-24T16:00:00.000Z",
//     "updated_at": "2025-08-24T16:30:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_13",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "22334455-6677-8899-aabb-ccddeeff0011"
//     ],
//     "last_message": {
//       "content": "Ok mai gặp nha!",
//       "sender": "22334455-6677-8899-aabb-ccddeeff0011",
//       "timestamp": "2025-08-27T20:15:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-27T20:00:00.000Z",
//     "updated_at": "2025-08-27T20:15:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_14",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "33445566-7788-99aa-bbcc-ddeeff001122"
//     ],
//     "last_message": {
//       "content": "Nhớ mang tài liệu theo nhé.",
//       "sender": "33445566-7788-99aa-bbcc-ddeeff001122",
//       "timestamp": "2025-08-26T09:40:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-26T09:00:00.000Z",
//     "updated_at": "2025-08-26T09:40:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_15",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "44556677-8899-aabb-ccdd-eeff00112233"
//     ],
//     "last_message": {
//       "content": "Thứ 7 rảnh không?",
//       "sender": "44556677-8899-aabb-ccdd-eeff00112233",
//       "timestamp": "2025-08-25T14:10:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-25T13:45:00.000Z",
//     "updated_at": "2025-08-25T14:10:00.000Z",
//     "active": true
//   },
//   {
//     "id": "ctc_16",
//     "type": "personal",
//     "members": [
//       "1678b960-7ad1-43ff-8837-42477418b8f9",
//       "55667788-99aa-bbcc-ddee-ff0011223344"
//     ],
//     "last_message": {
//       "content": "Đi ăn chè không?",
//       "sender": "55667788-99aa-bbcc-ddee-ff0011223344",
//       "timestamp": "2025-08-24T16:30:00.000Z",
//       "message_type": "text"
//     },
//     "created_at": "2025-08-24T16:00:00.000Z",
//     "updated_at": "2025-08-24T16:30:00.000Z",
//     "active": true
//   }
// ]
