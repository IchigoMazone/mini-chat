
const connectDB = require("./connectDB");
const User = require("./userModel");
const mongoose = require('mongoose');

const data = [
  {
    "id": "12b26abf-2857-4a4a-8662-3dc657fa0e9f",
    "username": "0389923024",
    "email": "ngu2@gmail.com",
    "password": "nhat1234",
    "avatar": "/uploads/default-avatar.png",
    "fullname": "hello world",
    "gender": "male",
    "birthday": "2025-09-07",
    "createdAt": "2025-09-07T03:12:34.397Z"
  },
  {
    "id": "855a39b4-a79d-4900-a6c7-cc5f3f6366fb",
    "username": "0487621578",
    "email": "thththt@gmail.com",
    "password": "45hoahong",
    "avatar": "/uploads/1757382572972-44608106.png",
    "fullname": "nguyen van tien",
    "gender": "male",
    "birthday": "2025-09-09",
    "createdAt": "2025-09-09T01:45:39.928Z"
  },
  {
    "id": "195a2669-f9a4-4b9a-8a60-35d9a3b787f6",
    "username": "0123456789",
    "email": "taikhoan1@gmail.com",
    "password": "nhat1234",
    "avatar": "/uploads/1757414681681-932601621.jpg",
    "fullname": "Cloud của tôi",
    "gender": "male",
    "birthday": "2025-09-09",
    "createdAt": "2025-09-09T10:43:01.983Z"
  },
  {
    "id": "5ec00654-c2ba-4ea6-bf55-2f4d2f3071f6",
    "username": "0123456788",
    "email": "nhat1@gmail.com",
    "password": "nhat1234",
    "avatar": "/uploads/default-avatar.png",
    "fullname": "Nguyễn Xuân Son",
    "gender": "male",
    "birthday": "2025-09-25",
    "createdAt": "2025-09-09T14:48:36.137Z"
  },
  {
    "id": "395355c5-6bfd-4e8a-bfed-1abbd625d0ce",
    "username": "0123456787",
    "email": "nhat12@gmail.com",
    "password": "nhat1234",
    "avatar": "/uploads/1757429766319-69731953.png",
    "fullname": "Nguyễn Duy Mạnh",
    "gender": "male",
    "birthday": "2025-09-13",
    "createdAt": "2025-09-09T14:51:07.013Z"
  },
  {
    "id": "39dd1a2e-e50e-40fc-8f61-9b1c0e39b426",
    "username": "0123456786",
    "email": "hello2@gmail.com",
    "password": "nhat1234",
    "avatar": "/uploads/1757429912440-47225677.png",
    "fullname": "Trà My",
    "gender": "male",
    "birthday": "2025-09-09",
    "createdAt": "2025-09-09T14:57:54.883Z"
  },
  {
    "id": "3ac88e2b-9ad4-4c42-b04b-25587e927941",
    "username": "0123456785",
    "email": "nhat#@gmail.com",
    "password": "nhat1234",
    "avatar": "/uploads/1757430223748-222704686.png",
    "fullname": "Mai Xuan Tu",
    "gender": "female",
    "birthday": "2025-09-05",
    "createdAt": "2025-09-09T15:03:16.298Z"
  },
  {
    "id": "778724a9-3565-486a-9619-d2b3e6461465",
    "username": "0123456784",
    "email": "nhat5@gmail.com",
    "password": "nhat1234",
    "avatar": "/uploads/1757430330279-830533054.png",
    "fullname": "Le Van Dat",
    "gender": "male",
    "birthday": "2025-09-19",
    "createdAt": "2025-09-09T15:04:59.315Z"
  },
  {
    "id": "add694e1-f826-40e7-a07a-0b3be329b417",
    "username": "0123456783",
    "email": "nhat6@gmail.com",
    "password": "nhat1234",
    "avatar": "/uploads/1757430439179-634217616.png",
    "fullname": "Ha Van Luong",
    "gender": "male",
    "birthday": "2025-09-09",
    "createdAt": "2025-09-09T15:06:46.159Z"
  }
];

// async function insertUser() {
//   // Kết nối MongoDB Atlas
//   await connectDB();

//   // Dữ liệu để chèn
//   const userData = {
//     username: "0389923023",
//     email: "ngu1@gmail.com",
//     password: "nhat1234",
//     avatar: "/uploads/1758101823134-787988915.png",
//     fullname: "Nguyễn Diệu Lynh",
//     gender: "female",
//     birthday: new Date("2025-09-04"),
//     createdAt: new Date("2025-09-06T07:18:23.669Z")
//   };

//   try {
//     // Chèn dữ liệu
//     const user = await User.create(userData);
//     console.log("User created with _id:", user._id);
//   } catch (err) {
//     console.error("Error creating user:", err);
//   } finally {
//     // Đóng kết nối
//     await mongoose.connection.close();
//     console.log("MongoDB connection closed");
//   }
// }

// // Chạy hàm
// insertUser();

async function insert () {
    const datax = data.map((m) => ({
        username: m.username,
        email: m.email,
        password: m.password,
        avatar: m.avatar,
        fullname: m.fullname,
        gender: m.gender,
        birthday: new Date("2025-09-04"),
        createdAt: new Date("2025-09-06T07:18:23.669Z")
    }))

    await connectDB ();

    for (const data of datax) {
        const user = await User.create (data);
        console.log(user._id);
    }

    await mongoose.connection.close();
    console.log("Moogo connect close");
}

insert ();



