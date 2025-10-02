const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    conversation_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Chat", 
        required: true 
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    recipient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    message_type: { 
        type: String, 
        default: "text" 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    url: { 
        type: String, 
        default: null 
    }
});

// Tạo model
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;