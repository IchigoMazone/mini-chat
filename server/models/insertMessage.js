const mongoose = require("mongoose");
const Chat = require("./chatListModel");
const Message = require("./messageModel");
const connectDB = require("./connectDB");

async function insertMessages() {
    await connectDB();

    try {
        // Lấy 55 chat đầu tiên
        const chats = await Chat.find({}).limit(55);

        if (chats.length === 0) {
            console.log("No chats found to insert messages.");
            return;
        }

        // Tạo message cho mỗi chat
        const messages = chats.map(chat => {
            // Kiểm tra tính hợp lệ của members
            if (!mongoose.Types.ObjectId.isValid(chat.members[0]) || !mongoose.Types.ObjectId.isValid(chat.members[1])) {
                throw new Error(`Invalid ObjectId in members for chat ${chat._id}`);
            }

            return {
                conversation_id: chat._id,
                sender: chat.members[0],      // Đã là ObjectId
                recipient: chat.members[1],   // Đã là ObjectId
                content: "Hello World !",
                message_type: "text",
                timestamp: new Date("2025-10-01T04:22:54.310Z"),
                url: null
            };
        });

        // Chèn vào messages collection
        const inserted = await Message.insertMany(messages, { ordered: false });
        console.log("Inserted messages:", inserted.length);
    } catch (error) {
        console.error("Error inserting messages:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed.");
    }
}

// Gọi hàm
insertMessages();