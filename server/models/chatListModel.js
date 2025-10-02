const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true 
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId, // Sửa từ String thành ObjectId
    ref: "User", // Tham chiếu đến collection User (nếu có)
    required: true
  }],
  last_message: {
    content: { 
      type: String 
    },
    sender: { 
      type: mongoose.Schema.Types.ObjectId, // Sửa từ String thành ObjectId
      ref: "User", // Tham chiếu đến collection User
    },
    timestamp: { 
      type: Date 
    },
    message_type: { 
      type: String 
    },
    url: { 
      type: String, 
      default: null 
    }
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  },
  active: { 
    type: Boolean, 
    default: true 
  }
});

// Tạo model
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;