const mongoose = require("mongoose");
const Chat = require("./chatListModel"); 
const connectDB = require("./connectDB"); 

const ids = [
    "68dce4109a0530c71f287624",
    "68dce73758f1e302f29657ec",
    "68dce8d40f88099a49c8cf09",
    "68dcecb72393ee235787b3e1",
    "68dcecb72393ee235787b3e3",
    "68dcecb72393ee235787b3e7",
    "68dcecb72393ee235787b3e9",
    "68dcecb72393ee235787b3eb",
    "68dcecb72393ee235787b3ed",
    "68dcecb72393ee235787b3ef",
    "68dcecb72393ee235787b3f1"
];

async function insert() {
    const per = [];

    for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) { // j > i để không trùng
            const chat = {
                type: "personal",
                members: [
                    new mongoose.Types.ObjectId(ids[i]),
                    new mongoose.Types.ObjectId(ids[j])
                ],
                last_message: {
                    content: "Hello World !",
                    sender: new mongoose.Types.ObjectId(ids[i]),
                    timestamp: new Date("2025-10-01T06:14:16.749Z"),
                    message_type: "text",
                },
                created_at: new Date("2025-09-07T02:00:00.000Z"),
                updated_at: new Date("2025-10-01T06:14:16.773Z"),
                active: true
            };

            per.push(chat);
        }
    }

    await connectDB();
    await Chat.insertMany(per);
    console.log("Inserted", per.length, "chats."); // sẽ là 55
    await mongoose.connection.close();
}

insert();
