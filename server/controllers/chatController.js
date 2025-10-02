// const fsx = require("fs").promises;
// const fs = require("fs");
// const path = require("path");


// // Lấy danh sách chat theo userId
// // const chatList = (req, res) => {
// //   const { userId } = req.body; // nhận từ client

// //   if (!userId) {
// //     return res.status(400).json({ error: "userId is required" });
// //   }

// //   try {
// //     const filePath = path.join(__dirname, "../models/chatList.json");
// //     const rawData = fs.readFileSync(filePath, "utf-8");
// //     const chats = JSON.parse(rawData);

// //     // Lọc các chat mà user tham gia
// //     const userChats = chats.filter(chat => chat.members.includes(userId));

// //     return res.status(200).json(userChats);
// //   } catch (error) {
// //     console.error("Error reading chatList.json:", error);
// //     return res.status(500).json({ error: "Internal server error" });
// //   }
// // };




// const mongoose = require('mongoose');
// const Chat = require('../models/chatListModel'); // Assuming you have a Chat model

// const chatList = async (req, res) => {
//   const { userId } = req.body; // Changed from datax to userId to match original

//   // Check if userId is provided
//   if (!userId) {
//     return res.status(400).json({ error: "userId is required" });
//   }

//   // Check if userId is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ error: "Invalid userId format" });
//   }

//   try {
//     const userObjectId = new mongoose.Types.ObjectId(userId);
    
//     // Find all chats where userId is in the members array
//     const userChats = await Chat.find({ 
//       members: userObjectId 
//     }).lean();

//     // Check if any chats were found
//     if (!userChats.length) {
//       return res.status(200).json({ 
//         message: "No chats found for this user",
//         chats: []
//       });
//     }

//     return res.status(200).json({
//       chats: userChats
//     });
//   } catch (err) {
//     console.error("Error fetching chat list:", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// // const message = async (req, res) => {
// //   const { friendId } = req.body; // Lấy friendId từ req.body

// //   // Kiểm tra nếu friendId không tồn tại
// //   if (!friendId) {
// //     return res.status(400).json({ error: "friendId is required" });
// //   }

// //   try {
// //     // Đường dẫn tới file message.json
// //     const filePath = path.join(__dirname, "../models/message.json");

// //     // Đọc file JSON
// //     const data = await fsx.readFile(filePath, "utf8");
// //     const messages = JSON.parse(data); // Parse dữ liệu JSON

// //     // Kiểm tra xem messages có phải là mảng không
// //     if (!Array.isArray(messages)) {
// //       return res.status(500).json({ error: "Invalid message data format" });
// //     }

// //     // Lọc các tin nhắn có sender hoặc recipient khớp với friendId
// //     let filteredMessages = messages.filter(
// //       (msg) => msg.conversation_id === friendId);

// //     // Nếu không tìm thấy tin nhắn nào
// //     if (filteredMessages.length === 0) {
// //       return res.status(404).json({ message: `No messages found for friendId: ${friendId}` });
// //     }

// //     // Sắp xếp tin nhắn theo timestamp (tăng dần)
// //     filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

// //     // Ánh xạ dữ liệu sang định dạng phù hợp với frontend
    
// //     // Trả về danh sách tin nhắn khớp
// //     return res.status(200).json(filteredMessages);
// //   } catch (error) {
// //     // Xử lý lỗi khi đọc file hoặc parse JSON
// //     console.error("Error reading messages:", error);
// //     return res.status(500).json({ error: "Internal server error" });
// //   }
// // };

// const Message = require("../models/messageModel");

// const message = async (req, res) => {
//   const { friendId } = req.body; // Nhận conversation_id từ request body

//   // Kiểm tra conversation_id
//   if (!friendId) {
//     return res.status(400).json({ error: 'conversation_id is required' });
//   }

//   try {
//     // Chuyển conversation_id thành ObjectId
//     const conversationObjectId = new mongoose.Types.ObjectId(friendId);

//     // Lấy danh sách tin nhắn theo conversation_id, sắp xếp theo timestamp
//     const messages = await Message.find({ conversation_id: conversationObjectId })
//       .sort({ timestamp: 1 }) // Sắp xếp tăng dần theo thời gian
//       .lean();

//     if (messages.length === 0) {
//       return res.status(404).json({
//         message: `No messages found for conversation_id: ${conversation_id}`,
//       });
//     }

//     return res.status(200).json({
//       message: 'Messages retrieved successfully',
//       data: messages,
//     });
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };





// // const messages = async (req, res) => {
// //   const { conversationId, sender, recipient, content, message_type, url } = req.body;

// //   if (!conversationId) {
// //     return res.status(400).json({ error: "conversationId is required" });
// //   }

// //   try {
// //     const filePath = path.join(__dirname, "../models/message.json");
// //     const lastPath = path.join(__dirname, "../models/chatList.json");

// //     // Đọc dữ liệu cũ
// //     let messages = [];
// //     try {
// //       const data = await fsx.readFile(filePath, "utf8");
// //       messages = JSON.parse(data || "[]");
// //     } catch (err) {
// //       console.warn("message.json chưa tồn tại hoặc rỗng, sẽ tạo mới.");
// //     }

// //     let conversations = [];
// //     try {
// //       const data = await fsx.readFile(lastPath, "utf8")
// //       conversations = JSON.parse(data || "[]")
// //     } catch (err) {
// //       console.warn("chatList.json chưa tồn tại hoặc rỗng, sẽ tạo mới.");
// //     }

// //     // Nếu có content (nghĩa là client gửi tin nhắn mới) thì thêm vào file
// //     if (content) {
// //       const newMessage = {
// //         id: Date.now().toString(), // id tạm
// //         conversation_id: conversationId,
// //         sender,
// //         recipient,
// //         content,
// //         message_type: message_type || "text",
// //         timestamp: new Date().toISOString(),
// //         url: url || null, // Lưu url nếu có, nếu không thì để null
// //       };

// //       messages.push(newMessage);

// //       // Lưu lại vào file JSON
// //       await fsx.writeFile(filePath, JSON.stringify(messages, null, 2), "utf8");
// //       console.log("✅ Tin nhắn mới đã được lưu:", newMessage);
// //     }

// //     // Lọc tin nhắn theo conversationId
// //     const filteredMessages = messages.filter(
// //       (msg) => msg.conversation_id === conversationId
// //     );

// //     const conversation = conversations.find((m) => m.id === conversationId)

// //     if (conversation) {
// //       conversation.last_message = {
// //         content: newMessage.content,
// //         sender: newMessage.sender,
// //         timestamp: newMessage.timestamp,
// //         message_type: newMessage.message_type,
// //       };
// //       conversation.updated_at = new Date().toISOString(); // Cập nhật thời gian chỉnh sửa
// //       await fsx.writeFile(conversationFilePath, JSON.stringify(conversations, null, 2), "utf8");
// //         console.log("✅ Last message updated for conversation:", conversationId);
// //     } else {
// //       console.warn("⚠️ Không tìm thấy conversation với ID:", conversationId);
// //     }


// //     // Trả về danh sách tin nhắn
// //     return res.status(200).json(filteredMessages);
// //   } catch (error) {
// //     console.error("Error handling messages:", error);
// //     return res.status(500).json({ error: "Internal server error" });
// //   }
// // };


// const messages = async (req, res) => {
//   const { conversationId, sender, recipient, content, message_type, url } = req.body;

//   // Kiểm tra conversationId
//   if (!conversationId) {
//     return res.status(400).json({ error: "conversationId is required" });
//   }

//   // Kiểm tra khi thêm tin nhắn mới
//   if (content && (!sender || !recipient)) {
//     return res.status(400).json({ error: "sender and recipient are required when adding a new message" });
//   }

//   try {
//     // Đường dẫn đến file message.json và chatList.json
//     const filePath = path.join(__dirname, "../models/message.json");
//     const lastPath = path.join(__dirname, "../models/chatList.json");

//     // Đọc dữ liệu tin nhắn cũ
//     let messages = [];
//     try {
//       const data = await fsx.readFile(filePath, "utf8");
//       messages = JSON.parse(data || "[]");
//       if (!Array.isArray(messages)) {
//         console.error("Invalid message.json format: not an array");
//         return res.status(500).json({ error: "Invalid message data format" });
//       }
//     } catch (err) {
//       console.warn("⚠️ message.json chưa tồn tại hoặc rỗng, sẽ tạo mới.");
//     }

//     // Đọc dữ liệu cuộc trò chuyện
//     let conversations = [];
//     try {
//       const data = await fsx.readFile(lastPath, "utf8");
//       conversations = JSON.parse(data || "[]");
//       if (!Array.isArray(conversations)) {
//         console.error("Invalid chatList.json format: not an array");
//         return res.status(500).json({ error: "Invalid conversation data format" });
//       }
//     } catch (err) {
//       console.warn("⚠️ chatList.json chưa tồn tại hoặc rỗng, sẽ tạo mới.");
//     }

//     // Nếu có content (nghĩa là client gửi tin nhắn mới) thì thêm vào file
//     if (content) {
//       const newMessage = {
//         id: Date.now().toString(), // id tạm
//         conversation_id: conversationId,
//         sender,
//         recipient,
//         content,
//         message_type: message_type || "text",
//         timestamp: new Date().toISOString(),
//         url: url || null, // Lưu url nếu có, nếu không thì để null
//       };

//       messages.push(newMessage);

//       // Lưu lại vào file message.json
//       await fsx.writeFile(filePath, JSON.stringify(messages, null, 2), "utf8");
//       console.log("✅ Tin nhắn mới đã được lưu:", newMessage);

//       // Cập nhật last_message trong chatList.json
//       const conversation = conversations.find((m) => m.id === conversationId);
//       if (conversation) {
//         conversation.last_message = {
//           content: newMessage.content,
//           sender: newMessage.sender,
//           timestamp: newMessage.timestamp,
//           message_type: newMessage.message_type,
//           url: newMessage.url, // Bao gồm url
//         };
//         conversation.updated_at = new Date().toISOString(); // Cập nhật thời gian chỉnh sửa
//         await fsx.writeFile(lastPath, JSON.stringify(conversations, null, 2), "utf8");
//         console.log("✅ Last message updated for conversation:", conversationId);
//       } else {
//         console.warn("⚠️ Không tìm thấy conversation với ID:", conversationId);
//       }
//     }

//     // Lọc tin nhắn theo conversationId
//     const filteredMessages = messages.filter(
//       (msg) => msg.conversation_id === conversationId
//     );

//     // Nếu không tìm thấy tin nhắn
//     if (filteredMessages.length === 0) {
//       return res.status(404).json({ message: `No messages found for conversationId: ${conversationId}` });
//     }

//     // Sắp xếp tin nhắn theo timestamp (tăng dần)
//     filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

//     // Trả về danh sách tin nhắn
//     return res.status(200).json(filteredMessages);
//   } catch (error) {
//     console.error("Error handling messages:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };


// module.exports = { chatList, message, messages };





const mongoose = require('mongoose');
const Chat = require('../models/chatListModel');
const Message = require('../models/messageModel');

const chatList = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const userChats = await Chat.find({ members: userObjectId }).lean();

    if (!userChats.length) {
      return res.status(200).json({ message: 'No chats found for this user', chats: [] });
    }

    return res.status(200).json({ chats: userChats });
  } catch (err) {
    console.error('Error fetching chat list:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const message = async (req, res) => {
  const { friendId } = req.body; // Giả định friendId là conversation_id

  // Kiểm tra friendId
  if (!friendId) {
    return res.status(400).json({ error: 'friendId is required' });
  }

  console.log('[DEBUG] Received friendId:', friendId, 'at', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));

  // Kiểm tra và ép friendId thành ObjectId
  let conversationObjectId;
  try {
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      console.error('[DEBUG] Invalid ObjectId format for friendId:', friendId, 'at', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));
      return res.status(400).json({ error: 'Invalid friendId format' });
    }
    conversationObjectId = new mongoose.Types.ObjectId(friendId);
    console.log('[DEBUG] Successfully converted friendId to ObjectId:', conversationObjectId, 'at', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));
  } catch (idError) {
    console.error('[DEBUG] Error converting friendId to ObjectId:', idError, 'at', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));
    return res.status(500).json({ error: 'Failed to convert friendId to ObjectId' });
  }

  try {
    // Thực hiện truy vấn dựa trên conversation_id
    console.log('[DEBUG] Querying messages for conversation_id:', conversationObjectId, 'at', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const messages = await Message.find({ conversation_id: conversationObjectId })
      .sort({ timestamp: 1 })
      .lean();

    console.log('[DEBUG] Query result length:', messages.length, 'at', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));
    console.log('[DEBUG] Query result:', messages, 'at', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));

    if (messages.length === 0) {
      return res.status(404).json({
        message: `No messages found for conversation_id: ${friendId}`,
      });
    }

    return res.status(200).json({
      message: 'Messages retrieved successfully',
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error, 'at', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerError') {
      return res.status(503).json({ error: 'Database temporarily unavailable, please try again later' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};











const messages = async (req, res) => {
  const { conversationId, sender, recipient, content, message_type, url } = req.body;

  if (!conversationId) {
    return res.status(400).json({ error: 'conversationId is required' });
  }

  if (content && (!sender || !recipient)) {
    return res.status(400).json({ error: 'sender and recipient are required when adding a new message' });
  }

  try {
    const conversationObjectId = new mongoose.Types.ObjectId(conversationId);

    // Nếu có content, thêm tin nhắn mới
    if (content) {
      const newMessage = await Message.create({
        conversation_id: conversationObjectId,
        sender: new mongoose.Types.ObjectId(sender),
        recipient: new mongoose.Types.ObjectId(recipient),
        content,
        message_type: message_type || 'text',
        timestamp: new Date(),
        url: url || null,
      });

      // Cập nhật last_message trong Chat
      const chat = await Chat.findOne({ _id: conversationObjectId });
      if (chat) {
        chat.last_message = {
          content: newMessage.content,
          sender: newMessage.sender,
          timestamp: newMessage.timestamp,
          message_type: newMessage.message_type,
          url: newMessage.url,
        };
        chat.updated_at = new Date();
        await chat.save();
        console.log('✅ Last message updated for conversation:', conversationId);
      } else {
        console.warn('⚠️ Không tìm thấy conversation với ID:', conversationId);
      }
    }

    // Lấy danh sách tin nhắn
    const messages = await Message.find({ conversation_id: conversationObjectId })
      .sort({ timestamp: 1 })
      .lean();

    if (messages.length === 0) {
      return res.status(404).json({ message: `No messages found for conversationId: ${conversationId}` });
    }

    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error handling messages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { chatList, message, messages };