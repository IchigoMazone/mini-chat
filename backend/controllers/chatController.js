

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