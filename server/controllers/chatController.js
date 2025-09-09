const fs = require("fs");
const path = require("path");

// Lấy danh sách chat theo userId
const chatList = (req, res) => {
  const { userId } = req.body; // nhận từ client

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const filePath = path.join(__dirname, "../models/chatList.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const chats = JSON.parse(rawData);

    // Lọc các chat mà user tham gia
    const userChats = chats.filter(chat => chat.members.includes(userId));

    return res.status(200).json(userChats);
  } catch (error) {
    console.error("Error reading chatList.json:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { chatList };
