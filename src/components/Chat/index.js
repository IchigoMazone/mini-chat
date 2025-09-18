


// // // // import classNames from "classnames/bind";
// // // // import styles from "./Chat.module.scss";
// // // // import { useState, useEffect, useRef } from "react";
// // // // import ProFile1 from "~/pages/ProFile1";
// // // // import ChatPreview from "./ChatPreview";
// // // // import FriendRequestBar from "./FriendRequestBar";
// // // // import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
// // // // import ChatHeader from "./ChatHeader";
// // // // import axios from "axios";
// // // // import { io } from "socket.io-client";

// // // // const cx = classNames.bind(styles);

// // // // function Chat({ friend, onToggleDetail }) {
// // // //   const [open, setOpen] = useState(false);
// // // //   const [text, setText] = useState("");
// // // //   const [showProfile, setShowProFile] = useState(false);
// // // //   const [previewImage, setPreviewImage] = useState(null);
// // // //   const messagesContainerRef = useRef(null);
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [showSendRequestBar, setShowSendRequestBar] = useState(false);
// // // //   const socketRef = useRef(null);

// // // //   // Hàm cuộn xuống cuối
// // // //   const scrollToBottom = () => {
// // // //     if (messagesContainerRef.current) {
// // // //       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
// // // //     }
// // // //   };

// // // //   // Cuộn xuống cuối khi messages thay đổi
// // // //   useEffect(() => {
// // // //     scrollToBottom();
// // // //   }, [messages]);

// // // //   // Kết nối WebSocket khi friend thay đổi
// // // //   useEffect(() => {
// // // //     if (friend?.sender) {
// // // //       socketRef.current = io("http://localhost:5000", {
// // // //         query: { userId: friend.sender },
// // // //       });

// // // //       socketRef.current.on("receiveMessage", (data) => {
// // // //         console.log("📩 Nhận từ", data.from, ":", data.message);

// // // //         const receivedMessage = {
// // // //           id: new Date() + Math.random(),
// // // //           text: data.message.message_type === "text" && typeof data.message.content === "string" ? data.message.content : "",
// // // //           type: data.message.sender !== friend.member ? "sent" : "received",
// // // //           timestamp: new Date(data.message.timestamp),
// // // //           image: data.message.message_type === "image" ? `http://localhost:5000${data.message.url}` : null,
// // // //           video: data.message.message_type === "video" ? `http://localhost:5000${data.message.url}` : null,
// // // //           file: data.message.message_type === "file" ? { name: data.message.content, url: `http://localhost:5000${data.message.url}` } : null,
// // // //         };

// // // //         setMessages((prev) => [...prev, receivedMessage]);

// // // //         console.log("Tin nhắn đã được xử lý:", receivedMessage);
// // // //       });

// // // //       return () => {
// // // //         if (socketRef.current) {
// // // //           socketRef.current.disconnect();
// // // //         }
// // // //       };
// // // //     }
// // // //   }, [friend?.sender]);

// // // //   // Fetch tin nhắn từ API
// // // //   useEffect(() => {
// // // //     console.log("useEffect fetchMessages chạy lại");
// // // //     const fetchMessages = async () => {
// // // //       if (!friend || !friend.id) {
// // // //         setMessages([]);
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       try {
// // // //         const response = await axios.post("http://localhost:5000/api/chat/messages/", {
// // // //           friendId: friend.id,
// // // //         });

// // // //         if (response.status === 200 && Array.isArray(response.data)) {
// // // //           // Transform dữ liệu để khớp cấu trúc component
// // // //           const transformedMessages = response.data
// // // //             .map((msg) => ({
// // // //               id: msg.id,
// // // //               text: msg.message_type === "text" && typeof msg.content === "string" ? msg.content : "",
// // // //               type: msg.sender !== friend.member ? "sent" : "received",
// // // //               timestamp: new Date(msg.timestamp),
// // // //               image: msg.message_type === "image" ? `http://localhost:5000${msg.url}` : null,
// // // //               video: msg.message_type === "video" ? `http://localhost:5000${msg.url}` : null,
// // // //               file: msg.message_type === "file" ? { name: msg.content, url: `http://localhost:5000${msg.url}` } : null,
// // // //             }))
// // // //             .filter((msg) => msg.text || msg.image || msg.video || msg.file);

// // // //           console.log("Tin nhắn đã chuyển đổi:", transformedMessages);
// // // //           setMessages(transformedMessages);
// // // //         } else {
// // // //           setError("Dữ liệu tin nhắn không hợp lệ.");
// // // //         }
// // // //       } catch (err) {
// // // //         setError("Lỗi khi tải tin nhắn: " + err.message);
// // // //         console.error("Lỗi khi lấy tin nhắn:", err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchMessages();
// // // //   }, [friend]);

// // // //   // Hàm toggle giữa RequestBar và ConfirmBar
// // // //   const toggleRequestBar = () => {
// // // //     setShowSendRequestBar((prev) => !prev);
// // // //   };

// // // //   const emojis = ["😀", "😂", "😍", "😊", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

// // // //   const handleEmoji = (emoji) => {
// // // //     setText((prev) => prev + emoji);
// // // //     setOpen(false);
// // // //   };

// // // //   const handleSend = async () => {
// // // //     if (text.trim()) {
// // // //       const newMessage = {
// // // //         id: Date.now(),
// // // //         text: text.trim(),
// // // //         type: "sent",
// // // //         timestamp: new Date(),
// // // //       };
// // // //       setMessages((prev) => [...prev, newMessage]);
// // // //       setText("");

// // // //       if (socketRef.current) {
// // // //         socketRef.current.emit("sendMessage", {
// // // //           toUserId: friend.member,
// // // //           message: {
// // // //             id: "",
// // // //             conversation_id: friend.id,
// // // //             sender: friend.sender,
// // // //             recipient: friend.member,
// // // //             content: newMessage.text,
// // // //             message_type: "text",
// // // //             timestamp: new Date().toISOString(),
// // // //             url: null,
// // // //           },
// // // //         });
// // // //         console.log("📤 Gửi đến", friend.member, ":", newMessage.text);
// // // //       }

// // // //       try {
// // // //         await axios.post("http://localhost:5000/api/chat/send-message/", {
// // // //           id: "",
// // // //           conversationId: friend.id,
// // // //           sender: friend.sender,
// // // //           content: text.trim(),
// // // //           message_type: "text",
// // // //           timestamp: new Date().toISOString(),
// // // //           recipient: friend.member,
// // // //         });
// // // //       } catch (error) {
// // // //         console.error("Lỗi gửi tin nhắn:", error);
// // // //       }
// // // //     } else {
// // // //       const likeMessage = {
// // // //         id: Date.now(),
// // // //         text: "👍",
// // // //         type: "sent",
// // // //         timestamp: new Date(),
// // // //       };
// // // //       setMessages((prev) => [...prev, likeMessage]);

// // // //       if (socketRef.current) {
// // // //         socketRef.current.emit("sendMessage", {
// // // //           toUserId: friend.member,
// // // //           message: {
// // // //             id: "",
// // // //             conversation_id: friend.id,
// // // //             sender: friend.sender,
// // // //             recipient: friend.member,
// // // //             content: "👍",
// // // //             message_type: "text",
// // // //             timestamp: new Date().toISOString(),
// // // //             url: null,
// // // //           },
// // // //         });
// // // //         console.log("📤 Gửi đến", friend.member, ": 👍");
// // // //       }

// // // //       try {
// // // //         await axios.post("http://localhost:5000/api/chat/send-message/", {
// // // //           id: "",
// // // //           conversationId: friend.id,
// // // //           sender: friend.sender,
// // // //           content: "👍",
// // // //           message_type: "text",
// // // //           timestamp: new Date().toISOString(),
// // // //           recipient: friend.member,
// // // //         });
// // // //       } catch (error) {
// // // //         console.error("Lỗi gửi tin nhắn like:", error);
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleKeyPress = (e) => {
// // // //     if (e.key === "Enter") {
// // // //       handleSend();
// // // //     }
// // // //   };

// // // //   const handleAvatarClick = () => {
// // // //     setShowProFile(true);
// // // //   };

// // // //   // Hàm xử lý chọn file media
// // // //   const handleMediaSelect = async (e, mediaType) => {
// // // //     const file = e.target.files[0];
// // // //     if (!file) {
// // // //       alert("Vui lòng chọn một tệp.");
// // // //       console.log("Không có tệp được chọn.");
// // // //       return;
// // // //     }

// // // //     if (file.size > 50 * 1024 * 1024) {
// // // //       alert("Tệp quá lớn. Kích thước tối đa là 50MB.");
// // // //       console.log("Tệp quá lớn:", file.size);
// // // //       return;
// // // //     }

// // // //     if (mediaType === "image" && !file.type.startsWith("image/")) {
// // // //       alert("Vui lòng chọn tệp hình ảnh.");
// // // //       console.log("Tệp không phải hình ảnh:", file.type);
// // // //       return;
// // // //     }

// // // //     if (mediaType === "video" && !file.type.startsWith("video/")) {
// // // //       alert("Vui lòng chọn tệp video.");
// // // //       console.log("Tệp không phải video:", file.type);
// // // //       return;
// // // //     }

// // // //     // HIỂN THỊ TRƯỚC - Tạo preview local
// // // //     const reader = new FileReader();
// // // //     reader.onload = () => {
// // // //       console.log("FileReader onload, preview URL:", reader.result.substring(0, 50) + "...");

// // // //       const tempMessage = {
// // // //         id: Date.now() + Math.random(),
// // // //         type: "sent",
// // // //         timestamp: new Date(),
// // // //         uploading: true,
// // // //         fileName: file.name,
// // // //       };

// // // //       if (mediaType === "image") {
// // // //         tempMessage.image = reader.result;
// // // //       } else if (mediaType === "video") {
// // // //         tempMessage.video = reader.result;
// // // //       } else if (mediaType === "file") {
// // // //         tempMessage.file = {
// // // //           name: file.name,
// // // //           url: reader.result,
// // // //         };
// // // //       }

// // // //       setMessages((prev) => {
// // // //         const newMessages = [...prev, tempMessage];
// // // //         console.log("Tin nhắn đã cập nhật:", newMessages);
// // // //         return newMessages;
// // // //       });

// // // //       // UPLOAD SAU - Async
// // // //       uploadFileToServer(file, mediaType, tempMessage.id);
// // // //     };

// // // //     reader.onerror = () => {
// // // //       alert("Lỗi khi đọc tệp.");
// // // //       console.error("FileReader lỗi:", reader.error);
// // // //     };
// // // //     reader.readAsDataURL(file);
// // // //   };

// // // //   // Hàm upload file lên server
// // // //   const uploadFileToServer = async (file, mediaType, messageId) => {
// // // //     const formData = new FormData();
// // // //     let endpoint;

// // // //     // Thêm file vào FormData với tên gốc để hỗ trợ tiếng Việt
// // // //     if (mediaType === "image") {
// // // //       formData.append("file", file, encodeURIComponent(file.name));
// // // //       endpoint = "/upload-file";
// // // //     } else if (mediaType === "video") {
// // // //       formData.append("video", file, encodeURIComponent(file.name));
// // // //       endpoint = "/upload-video";
// // // //     } else if (mediaType === "file") {
// // // //       formData.append("file", file, encodeURIComponent(file.name));
// // // //       endpoint = "/upload-file";
// // // //     }

// // // //     try {
// // // //       console.log("⏳ Bắt đầu upload tệp:", file.name);
// // // //       const uploadResponse = await axios.post(`http://localhost:5000${endpoint}`, formData, {
// // // //         headers: {
// // // //           "Content-Type": "multipart/form-data",
// // // //           "Accept": "application/json",
// // // //         },
// // // //       });

// // // //       if (uploadResponse.data.url) {
// // // //         const filePath = uploadResponse.data.url.replace("http://localhost:5000", "");

// // // //         // Cập nhật message với URL thật từ server
// // // //         setMessages((prev) =>
// // // //           prev.map((msg) => {
// // // //             if (msg.id === messageId) {
// // // //               const updatedMsg = { ...msg, uploading: false };

// // // //               if (mediaType === "image") {
// // // //                 updatedMsg.image = uploadResponse.data.url;
// // // //                 updatedMsg.fileName = decodeURIComponent(file.name);
// // // //               } else if (mediaType === "video") {
// // // //                 updatedMsg.video = uploadResponse.data.url;
// // // //                 updatedMsg.fileName = decodeURIComponent(file.name);
// // // //               } else if (mediaType === "file") {
// // // //                 updatedMsg.file = {
// // // //                   name: decodeURIComponent(file.name),
// // // //                   url: uploadResponse.data.url,
// // // //                 };
// // // //               }

// // // //               return updatedMsg;
// // // //             }
// // // //             return msg;
// // // //           })
// // // //         );

// // // //         console.log("Upload thành công, URL:", uploadResponse.data.url);

// // // //         // Gửi message qua WebSocket
// // // //         if (socketRef.current) {
// // // //         socketRef.current.emit("sendMessage", {
// // // //           toUserId: friend.member,
// // // //           message: {
// // // //             id: "",
// // // //             conversation_id: friend.id,
// // // //             sender: friend.sender,
// // // //             recipient: friend.member,
// // // //             content: file.name,
// // // //             message_type: mediaType,
// // // //             timestamp: new Date().toISOString(),
// // // //             url: filePath,
// // // //           },
// // // //         });

// // // //         console.log("📤 Gửi đến", friend.member);
// // // //         console.log("Dữ liệu gửi lên server:", {
// // // //           id: "",
// // // //           conversationId: friend.id,
// // // //           sender: friend.sender,
// // // //           content: decodeURIComponent(file.name),
// // // //           message_type: mediaType,
// // // //           timestamp: new Date().toISOString(),
// // // //           recipient: friend.member,
// // // //           url: filePath,
// // // //         });
// // // //       }


// // // //         // API 2: Gửi message lên server
// // // //         try {
// // // //           const messageResponse = await axios.post("http://localhost:5000/api/chat/send-message/", {
// // // //             id: "",
// // // //             conversationId: friend.id,
// // // //             sender: friend.sender,
// // // //             content: decodeURIComponent(file.name),
// // // //             message_type: mediaType,
// // // //             timestamp: new Date().toISOString(),
// // // //             recipient: friend.member,
// // // //             url: filePath,
// // // //           });
// // // //           console.log("Tin nhắn đã lưu server:", messageResponse.data);
// // // //         } catch (messageError) {
// // // //           console.error("Lỗi gửi tin nhắn:", messageError);
// // // //         }
// // // //       }
// // // //     } catch (uploadError) {
// // // //       console.error("Lỗi upload:", uploadError);

// // // //       setMessages((prev) =>
// // // //         prev.map((msg) => {
// // // //           if (msg.id === messageId) {
// // // //             return {
// // // //               ...msg,
// // // //               uploading: false,
// // // //               error: true,
// // // //             };
// // // //           }
// // // //           return msg;
// // // //         })
// // // //       );

// // // //       alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
// // // //     }
// // // //   };

// // // //   const handleSendFriendRequest = (friendId, friendName) => {
// // // //     console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
// // // //   };

// // // //   const handleConfirmFriendRequest = (friendId, friendName) => {
// // // //     console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
// // // //   };

// // // //   const handleRejectFriendRequest = (friendId, friendName) => {
// // // //     console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
// // // //   };

// // // //   const handleClosePreview = () => {
// // // //     setPreviewImage(null);
// // // //   };

// // // //   const isValidUrl = (url) => {
// // // //     try {
// // // //       new URL(url);
// // // //       return true;
// // // //     } catch {
// // // //       return false;
// // // //     }
// // // //   };

// // // //   const renderMessageContent = (message) => {

// // // //     console.log("Render nội dung tin nhắn:", message);
    
// // // //     if (message.image) {
// // // //       return (
// // // //         <div className={cx("message-image")} onClick={() => setPreviewImage(message.image)} aria-label="Xem trước hình ảnh">
// // // //           <img src={message.image} alt={message.fileName || "Hình ảnh được chia sẻ"} style={{ maxWidth: "100%", borderRadius: "8px" }} />
// // // //         </div>
// // // //       );
// // // //     }
// // // //     if (message.video) {
// // // //       return (
// // // //         <div className={cx("message-video")}>
// // // //           <video controls style={{ maxWidth: "100%", borderRadius: "8px" }}>
// // // //             <source src={message.video} type="video/mp4" />
// // // //             Trình duyệt của bạn không hỗ trợ thẻ video.
// // // //           </video>
// // // //         </div>
// // // //       );
// // // //     }
// // // //     if (message.file) {
// // // //       return (
// // // //         <div className={cx("message-file")}>
// // // //           <a href={message.file.url} download={message.file.name}>
// // // //             {message.file.name}
// // // //           </a>
// // // //         </div>
// // // //       );
// // // //     }
// // // //     if (typeof message.text === "string" && message.text) {
// // // //       const urlRegex = /(https?:\/\/[^\s]+)/g;
// // // //       const parts = message.text.split(urlRegex);
// // // //       return (
// // // //         <span>
// // // //           {parts.map((part, index) => {
// // // //             if (part.match(urlRegex) && isValidUrl(part)) {
// // // //               return (
// // // //                 <a
// // // //                   key={index}
// // // //                   href={part}
// // // //                   target="_blank"
// // // //                   rel="noopener noreferrer"
// // // //                   style={{ color: "blue", textDecoration: "underline" }}
// // // //                 >
// // // //                   {part}
// // // //                 </a>
// // // //               );
// // // //             }
// // // //             return part;
// // // //           })}
// // // //         </span>
// // // //       );
// // // //     }
// // // //     return <span>{message.text || ""}</span>;
// // // //   };

// // // //   const formatTime = (dateObj) => {
// // // //     return dateObj.toLocaleTimeString("vi-VN", {
// // // //       hour: "2-digit",
// // // //       minute: "2-digit",
// // // //       hour12: true,
// // // //     });
// // // //   };

// // // //   const formatSeparator = (dateObj) => {
// // // //     return (
// // // //       dateObj.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) +
// // // //       " " +
// // // //       formatTime(dateObj)
// // // //     );
// // // //   };

// // // //   if (!friend) {
// // // //     return (
// // // //       <div className={cx("chat")}>
// // // //         <div className={cx("empty-state")}>
// // // //           <div className={cx("empty-content")}>
// // // //             <div className={cx("empty-icon")}>
// // // //               <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
// // // //                 <path
// // // //                   d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
// // // //                   fill="currentColor"
// // // //                   opacity="0.3"
// // // //                 />
// // // //                 <circle cx="8" cy="12" r="1" fill="currentColor" />
// // // //                 <circle cx="12" cy="12" r="1" fill="currentColor" />
// // // //                 <circle cx="16" cy="12" r="1" fill="currentColor" />
// // // //               </svg>
// // // //             </div>
// // // //             <div className={cx("empty-text")}>
// // // //               <h2>Chọn một cuộc trò chuyện</h2>
// // // //               <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className={cx("chat")}>
// // // //       <ChatHeader 
// // // //         friend={friend} 
// // // //         onAvatarClick={handleAvatarClick}
// // // //         onToggleDetail={onToggleDetail}
// // // //       />

// // // //       {showSendRequestBar ? (
// // // //         <FriendRequestBar
// // // //           friend={friend}
// // // //           onSendRequest={handleSendFriendRequest}
// // // //           isVisible={false}
// // // //         />
// // // //       ) : (
// // // //         <FriendRequestConfirmationBar
// // // //           friend={friend}
// // // //           onConfirmRequest={handleConfirmFriendRequest}
// // // //           onRejectRequest={handleRejectFriendRequest}
// // // //           isVisible={false}
// // // //         />
// // // //       )}

// // // //       <div className={cx("center")} ref={messagesContainerRef}>
// // // //         {loading ? (
// // // //           <div>Đang tải...</div>
// // // //         ) : error ? (
// // // //           <div className={cx("error")}>{error}</div>
// // // //         ) : (
// // // //           messages.map((message, index) => {
// // // //             const prevMsg = messages[index - 1];
// // // //             const nextMsg = messages[index + 1];
// // // //             const currentTime = message.timestamp;

// // // //             let showSeparator = false;
// // // //             let showTime = false;

// // // //             if (!prevMsg) {
// // // //               showSeparator = true;
// // // //             } else {
// // // //               const diffMinutes = (currentTime - prevMsg.timestamp) / 1000 / 60;
// // // //               if (diffMinutes >= 10) {
// // // //                 showSeparator = true;
// // // //               }
// // // //             }

// // // //             if (!nextMsg) {
// // // //               showTime = true;
// // // //             } else {
// // // //               const sameMinute =
// // // //                 currentTime.getHours() === nextMsg.timestamp.getHours() &&
// // // //                 currentTime.getMinutes() === nextMsg.timestamp.getMinutes();
// // // //               if (!sameMinute) {
// // // //                 showTime = true;
// // // //               }
// // // //             }

// // // //             return (
// // // //               <div key={message.id}>
// // // //                 {showSeparator && (
// // // //                   <div className={cx("time-separator")}>
// // // //                     <div className={cx("time-separator-content")}>
// // // //                       {formatSeparator(message.timestamp)}
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //                 <div className={cx("message", message.type)}>
// // // //                   <div
// // // //                     className={cx("message-bubble", {
// // // //                       "has-media": message.image || message.video || message.file,
// // // //                     })}
// // // //                   >
// // // //                     {renderMessageContent(message)}
// // // //                     {message.text && (message.image || message.video || message.file) && (
// // // //                       <div className={cx("message-text")}>{message.text}</div>
// // // //                     )}
// // // //                   </div>
// // // //                   {showTime && (
// // // //                     <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             );
// // // //           })
// // // //         )}
// // // //       </div>

// // // //       {previewImage && (
// // // //         <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />
// // // //       )}

// // // //       <div className={cx("cr")}>
// // // //         <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
// // // //           <input
// // // //             type="file"
// // // //             accept="image/*"
// // // //             style={{ display: "none" }}
// // // //             onChange={(e) => handleMediaSelect(e, "image")}
// // // //           />
// // // //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// // // //             <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
// // // //           </svg>
// // // //         </label>
// // // //         <label className={cx("cr-button")} title="Chọn tệp" aria-label="Chọn tệp để gửi">
// // // //           <input
// // // //             type="file"
// // // //             accept=".pdf,.doc,.docx,.txt"
// // // //             style={{ display: "none" }}
// // // //             onChange={(e) => handleMediaSelect(e, "file")}
// // // //           />
// // // //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// // // //             <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
// // // //           </svg>
// // // //         </label>
// // // //         <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
// // // //           <input
// // // //             type="file"
// // // //             accept="video/*"
// // // //             style={{ display: "none" }}
// // // //             onChange={(e) => handleMediaSelect(e, "video")}
// // // //           />
// // // //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// // // //             <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
// // // //           </svg>
// // // //         </label>
// // // //       </div>

// // // //       <div className={cx("input-area")}>
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Nhập tin nhắn..."
// // // //           value={text}
// // // //           onChange={(e) => setText(e.target.value)}
// // // //           onKeyPress={handleKeyPress}
// // // //           className={cx("message-input")}
// // // //           aria-label="Nhập tin nhắn"
// // // //         />
// // // //         <div className={cx("emoji-container")}>
// // // //           <button 
// // // //             className={cx("emoji-button")} 
// // // //             onClick={() => setOpen((prev) => !prev)}
// // // //             aria-label="Mở bảng chọn biểu tượng cảm xúc"
// // // //           >
// // // //             😊
// // // //           </button>
// // // //           <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
// // // //             {emojis.map((emoji, index) => (
// // // //               <button
// // // //                 key={index}
// // // //                 onClick={() => handleEmoji(emoji)}
// // // //                 className={cx("emoji-item")}
// // // //                 aria-label={`Chọn biểu tượng ${emoji}`}
// // // //               >
// // // //                 {emoji}
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //         <button 
// // // //           onClick={handleSend} 
// // // //           className={cx("send-button", { active: text.trim() })}
// // // //           aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
// // // //         >
// // // //           {text.trim() ? (
// // // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// // // //               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
// // // //             </svg>
// // // //           ) : (
// // // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// // // //               <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
// // // //             </svg>
// // // //           )}
// // // //         </button>
// // // //       </div>

// // // //       {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
// // // //       {showProfile && 
// // // //         <ProFile1 
// // // //           onClose={() => setShowProFile(false)} 
// // // //           datax={friend}
// // // //         />}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Chat;


// // // import classNames from "classnames/bind";
// // // import styles from "./Chat.module.scss";
// // // import { useState, useEffect, useRef } from "react";
// // // import ProFile1 from "~/pages/ProFile1";
// // // import ChatPreview from "./ChatPreview";
// // // import FriendRequestBar from "./FriendRequestBar";
// // // import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
// // // import ChatHeader from "./ChatHeader";
// // // import axios from "axios";
// // // import { io } from "socket.io-client";

// // // const cx = classNames.bind(styles);

// // // function Chat({ friend, onToggleDetail }) {
// // //   const [open, setOpen] = useState(false);
// // //   const [text, setText] = useState("");
// // //   const [showProfile, setShowProFile] = useState(false);
// // //   const [previewImage, setPreviewImage] = useState(null);
// // //   const messagesContainerRef = useRef(null);
// // //   const [messages, setMessages] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [showSendRequestBar, setShowSendRequestBar] = useState(false);
// // //   const socketRef = useRef(null);

// // //   // Hàm cuộn xuống cuối
// // //   const scrollToBottom = () => {
// // //     if (messagesContainerRef.current) {
// // //       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
// // //     }
// // //   };

// // //   // Cuộn xuống cuối khi messages thay đổi
// // //   useEffect(() => {
// // //     scrollToBottom();
// // //   }, [messages]);

// // //   // Kết nối WebSocket khi friend thay đổi
// // //   useEffect(() => {
// // //     if (friend?.sender) {
// // //       socketRef.current = io("http://localhost:5000", {
// // //         query: { userId: friend.sender },
// // //       });

// // //       socketRef.current.on("receiveMessage", (data) => {
// // //         console.log("📩 Nhận từ", data.from, ":", data.message);

// // //         const receivedMessage = {
// // //           id: new Date() + Math.random(),
// // //           text: data.message.message_type === "text" && typeof data.message.content === "string" ? data.message.content : "",
// // //           type: data.message.sender !== friend.member ? "sent" : "received",
// // //           timestamp: new Date(data.message.timestamp),
// // //           // Xử lý media real-time với base64 nếu có
// // //           image: data.message.message_type === "image" ? (data.message.base64Data || `http://localhost:5000${data.message.url}`) : null,
// // //           video: data.message.message_type === "video" ? (data.message.base64Data || `http://localhost:5000${data.message.url}`) : null,
// // //           file: data.message.message_type === "file" ? { name: data.message.content, url: `http://localhost:5000${data.message.url}` } : null,
// // //           // Flag để biết đây là base64 tạm thời hay URL final
// // //           isTemporary: !!data.message.base64Data,
// // //         };

// // //         setMessages((prev) => [...prev, receivedMessage]);

// // //         console.log("Tin nhắn đã được xử lý:", receivedMessage);
// // //       });

// // //       return () => {
// // //         if (socketRef.current) {
// // //           socketRef.current.disconnect();
// // //         }
// // //       };
// // //     }
// // //   }, [friend?.sender]);

// // //   // Fetch tin nhắn từ API
// // //   useEffect(() => {
// // //     console.log("useEffect fetchMessages chạy lại");
// // //     const fetchMessages = async () => {
// // //       if (!friend || !friend.id) {
// // //         setMessages([]);
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       try {
// // //         const response = await axios.post("http://localhost:5000/api/chat/messages/", {
// // //           friendId: friend.id,
// // //         });

// // //         if (response.status === 200 && Array.isArray(response.data)) {
// // //           // Transform dữ liệu để khớp cấu trúc component
// // //           const transformedMessages = response.data
// // //             .map((msg) => ({
// // //               id: msg.id,
// // //               text: msg.message_type === "text" && typeof msg.content === "string" ? msg.content : "",
// // //               type: msg.sender !== friend.member ? "sent" : "received",
// // //               timestamp: new Date(msg.timestamp),
// // //               image: msg.message_type === "image" ? `http://localhost:5000${msg.url}` : null,
// // //               video: msg.message_type === "video" ? `http://localhost:5000${msg.url}` : null,
// // //               file: msg.message_type === "file" ? { name: msg.content, url: `http://localhost:5000${msg.url}` } : null,
// // //               isTemporary: false, // Tin nhắn từ database không phải tạm thời
// // //             }))
// // //             .filter((msg) => msg.text || msg.image || msg.video || msg.file);

// // //           console.log("Tin nhắn đã chuyển đổi:", transformedMessages);
// // //           setMessages(transformedMessages);
// // //         } else {
// // //           setError("Dữ liệu tin nhắn không hợp lệ.");
// // //         }
// // //       } catch (err) {
// // //         setError("Lỗi khi tải tin nhắn: " + err.message);
// // //         console.error("Lỗi khi lấy tin nhắn:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchMessages();
// // //   }, [friend]);

// // //   // Hàm toggle giữa RequestBar và ConfirmBar
// // //   const toggleRequestBar = () => {
// // //     setShowSendRequestBar((prev) => !prev);
// // //   };

// // //   const emojis = ["😀", "😂", "😍", "😊", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

// // //   const handleEmoji = (emoji) => {
// // //     setText((prev) => prev + emoji);
// // //     setOpen(false);
// // //   };

// // //   const handleSend = async () => {
// // //     if (text.trim()) {
// // //       const newMessage = {
// // //         id: Date.now(),
// // //         text: text.trim(),
// // //         type: "sent",
// // //         timestamp: new Date(),
// // //         isTemporary: false,
// // //       };
// // //       setMessages((prev) => [...prev, newMessage]);
// // //       setText("");

// // //       if (socketRef.current) {
// // //         socketRef.current.emit("sendMessage", {
// // //           toUserId: friend.member,
// // //           message: {
// // //             id: "",
// // //             conversation_id: friend.id,
// // //             sender: friend.sender,
// // //             recipient: friend.member,
// // //             content: newMessage.text,
// // //             message_type: "text",
// // //             timestamp: new Date().toISOString(),
// // //             url: null,
// // //           },
// // //         });
// // //         console.log("📤 Gửi đến", friend.member, ":", newMessage.text);
// // //       }

// // //       try {
// // //         await axios.post("http://localhost:5000/api/chat/send-message/", {
// // //           id: "",
// // //           conversationId: friend.id,
// // //           sender: friend.sender,
// // //           content: text.trim(),
// // //           message_type: "text",
// // //           timestamp: new Date().toISOString(),
// // //           recipient: friend.member,
// // //         });
// // //       } catch (error) {
// // //         console.error("Lỗi gửi tin nhắn:", error);
// // //       }
// // //     } else {
// // //       const likeMessage = {
// // //         id: Date.now(),
// // //         text: "👍",
// // //         type: "sent",
// // //         timestamp: new Date(),
// // //         isTemporary: false,
// // //       };
// // //       setMessages((prev) => [...prev, likeMessage]);

// // //       if (socketRef.current) {
// // //         socketRef.current.emit("sendMessage", {
// // //           toUserId: friend.member,
// // //           message: {
// // //             id: "",
// // //             conversation_id: friend.id,
// // //             sender: friend.sender,
// // //             recipient: friend.member,
// // //             content: "👍",
// // //             message_type: "text",
// // //             timestamp: new Date().toISOString(),
// // //             url: null,
// // //           },
// // //         });
// // //         console.log("📤 Gửi đến", friend.member, ": 👍");
// // //       }

// // //       try {
// // //         await axios.post("http://localhost:5000/api/chat/send-message/", {
// // //           id: "",
// // //           conversationId: friend.id,
// // //           sender: friend.sender,
// // //           content: "👍",
// // //           message_type: "text",
// // //           timestamp: new Date().toISOString(),
// // //           recipient: friend.member,
// // //         });
// // //       } catch (error) {
// // //         console.error("Lỗi gửi tin nhắn like:", error);
// // //       }
// // //     }
// // //   };

// // //   const handleKeyPress = (e) => {
// // //     if (e.key === "Enter") {
// // //       handleSend();
// // //     }
// // //   };

// // //   const handleAvatarClick = () => {
// // //     setShowProFile(true);
// // //   };

// // //   // Hàm xử lý chọn file media với real-time base64 rendering
// // //   const handleMediaSelect = async (e, mediaType) => {
// // //     const file = e.target.files[0];
// // //     if (!file) {
// // //       alert("Vui lòng chọn một tệp.");
// // //       console.log("Không có tệp được chọn.");
// // //       return;
// // //     }

// // //     if (file.size > 50 * 1024 * 1024) {
// // //       alert("Tệp quá lớn. Kích thước tối đa là 50MB.");
// // //       console.log("Tệp quá lớn:", file.size);
// // //       return;
// // //     }

// // //     if (mediaType === "image" && !file.type.startsWith("image/")) {
// // //       alert("Vui lòng chọn tệp hình ảnh.");
// // //       console.log("Tệp không phải hình ảnh:", file.type);
// // //       return;
// // //     }

// // //     if (mediaType === "video" && !file.type.startsWith("video/")) {
// // //       alert("Vui lòng chọn tệp video.");
// // //       console.log("Tệp không phải video:", file.type);
// // //       return;
// // //     }

// // //     // HIỂN THỊ TRƯỚC với base64 (Real-time)
// // //     const reader = new FileReader();
// // //     reader.onload = () => {
// // //       console.log("FileReader onload, preview URL:", reader.result.substring(0, 50) + "...");

// // //       const tempMessageId = Date.now() + Math.random();
// // //       const tempMessage = {
// // //         id: tempMessageId,
// // //         type: "sent",
// // //         timestamp: new Date(),
// // //         uploading: true,
// // //         fileName: file.name,
// // //         isTemporary: true, // Đánh dấu là temporary message
// // //       };

// // //       // Render ảnh/video ngay với base64 cho real-time experience
// // //       if (mediaType === "image") {
// // //         tempMessage.image = reader.result; // base64 URL
// // //       } else if (mediaType === "video") {
// // //         tempMessage.video = reader.result; // base64 URL
// // //       } else if (mediaType === "file") {
// // //         tempMessage.file = {
// // //           name: file.name,
// // //           url: reader.result, // base64 URL
// // //         };
// // //       }

// // //       // Thêm vào messages ngay lập tức
// // //       setMessages((prev) => {
// // //         const newMessages = [...prev, tempMessage];
// // //         console.log("Tin nhắn tạm thời đã thêm:", tempMessage);
// // //         return newMessages;
// // //       });

// // //       // Gửi base64 qua WebSocket cho real-time (chỉ ảnh và video)
// // //       if (socketRef.current && (mediaType === "image" || mediaType === "video")) {
// // //         socketRef.current.emit("sendMessage", {
// // //           toUserId: friend.member,
// // //           message: {
// // //             id: tempMessageId,
// // //             conversation_id: friend.id,
// // //             sender: friend.sender,
// // //             recipient: friend.member,
// // //             content: file.name,
// // //             message_type: mediaType,
// // //             timestamp: new Date().toISOString(),
// // //             url: null,
// // //             base64Data: reader.result, // Gửi base64 cho real-time
// // //           },
// // //         });
// // //         console.log(`📤 Gửi ${mediaType} base64 real-time đến ${friend.member}`);
// // //       }

// // //       // UPLOAD file lên server (background)
// // //       uploadFileToServer(file, mediaType, tempMessageId);
// // //     };

// // //     reader.onerror = () => {
// // //       alert("Lỗi khi đọc tệp.");
// // //       console.error("FileReader lỗi:", reader.error);
// // //     };
// // //     reader.readAsDataURL(file);
// // //   };

// // //   // Hàm upload file lên server
// // //   const uploadFileToServer = async (file, mediaType, messageId) => {
// // //     const formData = new FormData();
// // //     let endpoint;

// // //     // Thêm file vào FormData với tên gốc để hỗ trợ tiếng Việt
// // //     if (mediaType === "image") {
// // //       formData.append("file", file, encodeURIComponent(file.name));
// // //       endpoint = "/upload-file";
// // //     } else if (mediaType === "video") {
// // //       formData.append("video", file, encodeURIComponent(file.name));
// // //       endpoint = "/upload-video";
// // //     } else if (mediaType === "file") {
// // //       formData.append("file", file, encodeURIComponent(file.name));
// // //       endpoint = "/upload-file";
// // //     }

// // //     try {
// // //       console.log("⏳ Bắt đầu upload tệp:", file.name);
// // //       const uploadResponse = await axios.post(`http://localhost:5000${endpoint}`, formData, {
// // //         headers: {
// // //           "Content-Type": "multipart/form-data",
// // //           "Accept": "application/json",
// // //         },
// // //       });

// // //       if (uploadResponse.data.url) {
// // //         const filePath = uploadResponse.data.url.replace("http://localhost:5000", "");
// // //         const fullUrl = uploadResponse.data.url;

// // //         // Cập nhật message với URL thật từ server
// // //         setMessages((prev) =>
// // //           prev.map((msg) => {
// // //             if (msg.id === messageId) {
// // //               const updatedMsg = { 
// // //                 ...msg, 
// // //                 uploading: false,
// // //                 isTemporary: false, // Không còn tạm thời nữa
// // //               };

// // //               if (mediaType === "image") {
// // //                 updatedMsg.image = fullUrl; // Thay thế base64 bằng URL server
// // //                 updatedMsg.fileName = decodeURIComponent(file.name);
// // //               } else if (mediaType === "video") {
// // //                 updatedMsg.video = fullUrl; // Thay thế base64 bằng URL server
// // //                 updatedMsg.fileName = decodeURIComponent(file.name);
// // //               } else if (mediaType === "file") {
// // //                 updatedMsg.file = {
// // //                   name: decodeURIComponent(file.name),
// // //                   url: fullUrl,
// // //                 };
// // //               }

// // //               return updatedMsg;
// // //             }
// // //             return msg;
// // //           })
// // //         );

// // //         console.log("Upload thành công, URL:", uploadResponse.data.url);

// // //         // Gửi message với URL final qua WebSocket
// // //         if (socketRef.current) {
// // //           socketRef.current.emit("sendMessage", {
// // //             toUserId: friend.member,
// // //             message: {
// // //               id: "",
// // //               conversation_id: friend.id,
// // //               sender: friend.sender,
// // //               recipient: friend.member,
// // //               content: file.name,
// // //               message_type: mediaType,
// // //               timestamp: new Date().toISOString(),
// // //               url: filePath,
// // //               // Không gửi base64Data nữa vì đã có URL
// // //             },
// // //           });
// // //           console.log(`📤 Gửi ${mediaType} URL final đến ${friend.member}`);
// // //         }

// // //         // API: Lưu message vào server
// // //         try {
// // //           const messageResponse = await axios.post("http://localhost:5000/api/chat/send-message/", {
// // //             id: "",
// // //             conversationId: friend.id,
// // //             sender: friend.sender,
// // //             content: decodeURIComponent(file.name),
// // //             message_type: mediaType,
// // //             timestamp: new Date().toISOString(),
// // //             recipient: friend.member,
// // //             url: filePath,
// // //           });
// // //           console.log("Tin nhắn đã lưu server:", messageResponse.data);
// // //         } catch (messageError) {
// // //           console.error("Lỗi gửi tin nhắn:", messageError);
// // //         }
// // //       }
// // //     } catch (uploadError) {
// // //       console.error("Lỗi upload:", uploadError);

// // //       setMessages((prev) =>
// // //         prev.map((msg) => {
// // //           if (msg.id === messageId) {
// // //             return {
// // //               ...msg,
// // //               uploading: false,
// // //               error: true,
// // //               isTemporary: false,
// // //             };
// // //           }
// // //           return msg;
// // //         })
// // //       );

// // //       alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
// // //     }
// // //   };

// // //   const handleSendFriendRequest = (friendId, friendName) => {
// // //     console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
// // //   };

// // //   const handleConfirmFriendRequest = (friendId, friendName) => {
// // //     console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
// // //   };

// // //   const handleRejectFriendRequest = (friendId, friendName) => {
// // //     console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
// // //   };

// // //   const handleClosePreview = () => {
// // //     setPreviewImage(null);
// // //   };

// // //   const isValidUrl = (url) => {
// // //     try {
// // //       new URL(url);
// // //       return true;
// // //     } catch {
// // //       return false;
// // //     }
// // //   };

// // //   const renderMessageContent = (message) => {
// // //     console.log("Render nội dung tin nhắn:", message);
    
// // //     // Hiển thị trạng thái uploading
// // //     if (message.uploading) {
// // //       return (
// // //         <div className={cx("message-uploading")}>
// // //           <span>Đang tải {message.fileName}...</span>
// // //         </div>
// // //       );
// // //     }

// // //     // Hiển thị lỗi
// // //     if (message.error) {
// // //       return (
// // //         <div className={cx("message-error")}>
// // //           <span>Lỗi tải {message.fileName}</span>
// // //         </div>
// // //       );
// // //     }
    
// // //     if (message.image) {
// // //       return (
// // //         <div 
// // //           className={cx("message-image", { "temporary": message.isTemporary })} 
// // //           onClick={() => setPreviewImage(message.image)} 
// // //           aria-label="Xem trước hình ảnh"
// // //         >
// // //           <img 
// // //             src={message.image} 
// // //             alt={message.fileName || "Hình ảnh được chia sẻ"} 
// // //             style={{ 
// // //               maxWidth: "100%", 
// // //               borderRadius: "8px",
// // //               opacity: message.isTemporary ? 0.8 : 1, // Làm mờ một chút cho base64
// // //             }} 
// // //           />
// // //           {message.isTemporary && (
// // //             <div className={cx("temporary-indicator")}>
// // //               <span>Đang xử lý...</span>
// // //             </div>
// // //           )}
// // //         </div>
// // //       );
// // //     }
    
// // //     if (message.video) {
// // //       return (
// // //         <div className={cx("message-video", { "temporary": message.isTemporary })}>
// // //           <video 
// // //             controls 
// // //             style={{ 
// // //               maxWidth: "100%", 
// // //               borderRadius: "8px",
// // //               opacity: message.isTemporary ? 0.8 : 1, // Làm mờ một chút cho base64
// // //             }}
// // //           >
// // //             <source src={message.video} type="video/mp4" />
// // //             Trình duyệt của bạn không hỗ trợ thẻ video.
// // //           </video>
// // //           {message.isTemporary && (
// // //             <div className={cx("temporary-indicator")}>
// // //               <span>Đang xử lý...</span>
// // //             </div>
// // //           )}
// // //         </div>
// // //       );
// // //     }
    
// // //     if (message.file) {
// // //       return (
// // //         <div className={cx("message-file")}>
// // //           <a href={message.file.url} download={message.file.name}>
// // //             {message.file.name}
// // //           </a>
// // //         </div>
// // //       );
// // //     }
    
// // //     if (typeof message.text === "string" && message.text) {
// // //       const urlRegex = /(https?:\/\/[^\s]+)/g;
// // //       const parts = message.text.split(urlRegex);
// // //       return (
// // //         <span>
// // //           {parts.map((part, index) => {
// // //             if (part.match(urlRegex) && isValidUrl(part)) {
// // //               return (
// // //                 <a
// // //                   key={index}
// // //                   href={part}
// // //                   target="_blank"
// // //                   rel="noopener noreferrer"
// // //                   style={{ color: "blue", textDecoration: "underline" }}
// // //                 >
// // //                   {part}
// // //                 </a>
// // //               );
// // //             }
// // //             return part;
// // //           })}
// // //         </span>
// // //       );
// // //     }
// // //     return <span>{message.text || ""}</span>;
// // //   };

// // //   const formatTime = (dateObj) => {
// // //     return dateObj.toLocaleTimeString("vi-VN", {
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //       hour12: true,
// // //     });
// // //   };

// // //   const formatSeparator = (dateObj) => {
// // //     return (
// // //       dateObj.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) +
// // //       " " +
// // //       formatTime(dateObj)
// // //     );
// // //   };

// // //   if (!friend) {
// // //     return (
// // //       <div className={cx("chat")}>
// // //         <div className={cx("empty-state")}>
// // //           <div className={cx("empty-content")}>
// // //             <div className={cx("empty-icon")}>
// // //               <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
// // //                 <path
// // //                   d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
// // //                   fill="currentColor"
// // //                   opacity="0.3"
// // //                 />
// // //                 <circle cx="8" cy="12" r="1" fill="currentColor" />
// // //                 <circle cx="12" cy="12" r="1" fill="currentColor" />
// // //                 <circle cx="16" cy="12" r="1" fill="currentColor" />
// // //               </svg>
// // //             </div>
// // //             <div className={cx("empty-text")}>
// // //               <h2>Chọn một cuộc trò chuyện</h2>
// // //               <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className={cx("chat")}>
// // //       <ChatHeader 
// // //         friend={friend} 
// // //         onAvatarClick={handleAvatarClick}
// // //         onToggleDetail={onToggleDetail}
// // //       />

// // //       {showSendRequestBar ? (
// // //         <FriendRequestBar
// // //           friend={friend}
// // //           onSendRequest={handleSendFriendRequest}
// // //           isVisible={false}
// // //         />
// // //       ) : (
// // //         <FriendRequestConfirmationBar
// // //           friend={friend}
// // //           onConfirmRequest={handleConfirmFriendRequest}
// // //           onRejectRequest={handleRejectFriendRequest}
// // //           isVisible={false}
// // //         />
// // //       )}

// // //       <div className={cx("center")} ref={messagesContainerRef}>
// // //         {loading ? (
// // //           <div>Đang tải...</div>
// // //         ) : error ? (
// // //           <div className={cx("error")}>{error}</div>
// // //         ) : (
// // //           messages.map((message, index) => {
// // //             const prevMsg = messages[index - 1];
// // //             const nextMsg = messages[index + 1];
// // //             const currentTime = message.timestamp;

// // //             let showSeparator = false;
// // //             let showTime = false;

// // //             if (!prevMsg) {
// // //               showSeparator = true;
// // //             } else {
// // //               const diffMinutes = (currentTime - prevMsg.timestamp) / 1000 / 60;
// // //               if (diffMinutes >= 10) {
// // //                 showSeparator = true;
// // //               }
// // //             }

// // //             if (!nextMsg) {
// // //               showTime = true;
// // //             } else {
// // //               const sameMinute =
// // //                 currentTime.getHours() === nextMsg.timestamp.getHours() &&
// // //                 currentTime.getMinutes() === nextMsg.timestamp.getMinutes();
// // //               if (!sameMinute) {
// // //                 showTime = true;
// // //               }
// // //             }

// // //             return (
// // //               <div key={message.id}>
// // //                 {showSeparator && (
// // //                   <div className={cx("time-separator")}>
// // //                     <div className={cx("time-separator-content")}>
// // //                       {formatSeparator(message.timestamp)}
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //                 <div className={cx("message", message.type)}>
// // //                   <div
// // //                     className={cx("message-bubble", {
// // //                       "has-media": message.image || message.video || message.file,
// // //                       "temporary": message.isTemporary,
// // //                     })}
// // //                   >
// // //                     {renderMessageContent(message)}
// // //                     {message.text && (message.image || message.video || message.file) && (
// // //                       <div className={cx("message-text")}>{message.text}</div>
// // //                     )}
// // //                   </div>
// // //                   {showTime && (
// // //                     <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             );
// // //           })
// // //         )}
// // //       </div>

// // //       {previewImage && (
// // //         <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />
// // //       )}

// // //       <div className={cx("cr")}>
// // //         <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
// // //           <input
// // //             type="file"
// // //             accept="image/*"
// // //             style={{ display: "none" }}
// // //             onChange={(e) => handleMediaSelect(e, "image")}
// // //           />
// // //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// // //             <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
// // //           </svg>
// // //         </label>
// // //         <label className={cx("cr-button")} title="Chọn tệp" aria-label="Chọn tệp để gửi">
// // //           <input
// // //             type="file"
// // //             accept=".pdf,.doc,.docx,.txt"
// // //             style={{ display: "none" }}
// // //             onChange={(e) => handleMediaSelect(e, "file")}
// // //           />
// // //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// // //             <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
// // //           </svg>
// // //         </label>
// // //         <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
// // //           <input
// // //             type="file"
// // //             accept="video/*"
// // //             style={{ display: "none" }}
// // //             onChange={(e) => handleMediaSelect(e, "video")}
// // //           />
// // //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// // //             <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
// // //           </svg>
// // //         </label>
// // //       </div>

// // //       <div className={cx("input-area")}>
// // //         <input
// // //           type="text"
// // //           placeholder="Nhập tin nhắn..."
// // //           value={text}
// // //           onChange={(e) => setText(e.target.value)}
// // //           onKeyPress={handleKeyPress}
// // //           className={cx("message-input")}
// // //           aria-label="Nhập tin nhắn"
// // //         />
// // //         <div className={cx("emoji-container")}>
// // //           <button 
// // //             className={cx("emoji-button")} 
// // //             onClick={() => setOpen((prev) => !prev)}
// // //             aria-label="Mở bảng chọn biểu tượng cảm xúc"
// // //           >
// // //             😊
// // //           </button>
// // //           <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
// // //             {emojis.map((emoji, index) => (
// // //               <button
// // //                 key={index}
// // //                 onClick={() => handleEmoji(emoji)}
// // //                 className={cx("emoji-item")}
// // //                 aria-label={`Chọn biểu tượng ${emoji}`}
// // //               >
// // //                 {emoji}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //         <button 
// // //           onClick={handleSend} 
// // //           className={cx("send-button", { active: text.trim() })}
// // //           aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
// // //         >
// // //           {text.trim() ? (
// // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// // //               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
// // //             </svg>
// // //           ) : (
// // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// // //               <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
// // //             </svg>
// // //           )}
// // //         </button>
// // //       </div>

// // //       {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
// // //       {showProfile && 
// // //         <ProFile1 
// // //           onClose={() => setShowProFile(false)} 
// // //           datax={friend}
// // //         />}
// // //     </div>
// // //   );
// // // }

// // // export default Chat;


// // // import classNames from "classnames/bind";
// // // import styles from "./Chat.module.scss";
// // // import { useState, useEffect, useRef, useCallback } from "react";
// // // import ProFile1 from "~/pages/ProFile1";
// // // import ChatPreview from "./ChatPreview";
// // // import FriendRequestBar from "./FriendRequestBar";
// // // import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
// // // import ChatHeader from "./ChatHeader";
// // // import axios from "axios";
// // // import { io } from "socket.io-client";

// // // const cx = classNames.bind(styles);

// // // function Chat({ friend, onToggleDetail }) {
// // //   const [open, setOpen] = useState(false);
// // //   const [text, setText] = useState("");
// // //   const [showProfile, setShowProFile] = useState(false);
// // //   const [previewImage, setPreviewImage] = useState(null);
// // //   const messagesContainerRef = useRef(null);
// // //   const [messages, setMessages] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [showSendRequestBar, setShowSendRequestBar] = useState(false);
// // //   const socketRef = useRef(null);

// // //   // Hàm cuộn xuống cuối
// // //   const scrollToBottom = useCallback(() => {
// // //     if (messagesContainerRef.current) {
// // //       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
// // //     }
// // //   }, []);

// // //   // Cuộn xuống cuối khi messages thay đổi
// // //   useEffect(() => {
// // //     scrollToBottom();
// // //   }, [messages, scrollToBottom]);

// // //   // Kết nối WebSocket khi friend thay đổi
// // //   useEffect(() => {
// // //     if (friend?.sender) {
// // //       socketRef.current = io("http://localhost:5000", {
// // //         query: { userId: friend.sender },
// // //       });

// // //       socketRef.current.on("receiveMessage", (data) => {
// // //         const receivedMessage = {
// // //           id: new Date().getTime() + Math.random(),
// // //           text: data.message.message_type === "text" && typeof data.message.content === "string" ? data.message.content : "",
// // //           type: data.message.sender === friend.sender ? "sent" : "received",
// // //           timestamp: new Date(data.message.timestamp),
// // //           image: data.message.message_type === "image" ? (data.message.base64Data || `http://localhost:5000${data.message.url}`) : null,
// // //           video: data.message.message_type === "video" ? (data.message.base64Data || `http://localhost:5000${data.message.url}`) : null,
// // //           file: data.message.message_type === "file" ? { name: data.message.content, url: `http://localhost:5000${data.message.url}` } : null,
// // //           isTemporary: !!data.message.base64Data,
// // //         };

// // //         setMessages((prev) => [...prev, receivedMessage]);
// // //         scrollToBottom();
// // //       });

// // //       return () => {
// // //         if (socketRef.current) {
// // //           socketRef.current.disconnect();
// // //         }
// // //       };
// // //     }
// // //   }, [friend, scrollToBottom]);

// // //   // Fetch tin nhắn từ API
// // //   useEffect(() => {
// // //     const fetchMessages = async () => {
// // //       if (!friend || !friend.id) {
// // //         setMessages([]);
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       try {
// // //         const response = await axios.post("http://localhost:5000/api/chat/messages/", {
// // //           friendId: friend.id,
// // //         });

// // //         if (response.status === 200 && Array.isArray(response.data)) {
// // //           const transformedMessages = response.data
// // //             .map((msg) => ({
// // //               id: msg.id,
// // //               text: msg.message_type === "text" && typeof msg.content === "string" ? msg.content : "",
// // //               type: msg.sender === friend.sender ? "sent" : "received",
// // //               timestamp: new Date(msg.timestamp),
// // //               image: msg.message_type === "image" ? `http://localhost:5000${msg.url}` : null,
// // //               video: msg.message_type === "video" ? `http://localhost:5000${msg.url}` : null,
// // //               file: msg.message_type === "file" ? { name: msg.content, url: `http://localhost:5000${msg.url}` } : null,
// // //               isTemporary: false,
// // //             }))
// // //             .filter((msg) => msg.text || msg.image || msg.video || msg.file);

// // //           setMessages(transformedMessages);
// // //         } else {
// // //           setError("Dữ liệu tin nhắn không hợp lệ.");
// // //         }
// // //       } catch (err) {
// // //         setError("Lỗi khi tải tin nhắn: " + err.message);
// // //         console.error("Lỗi khi lấy tin nhắn:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchMessages();
// // //   }, [friend]);

// // //   const toggleRequestBar = useCallback(() => {
// // //     setShowSendRequestBar((prev) => !prev);
// // //   }, []);

// // //   const emojis = ["😀", "😂", "😍", "😊", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

// // //   const handleEmoji = useCallback((emoji) => {
// // //     setText((prev) => prev + emoji);
// // //     setOpen(false);
// // //   }, []);

// // //   const handleSend = useCallback(async () => {
// // //     if (text.trim()) {
// // //       const newMessage = {
// // //         id: Date.now(),
// // //         text: text.trim(),
// // //         type: "sent",
// // //         timestamp: new Date(),
// // //         isTemporary: false,
// // //       };
// // //       setMessages((prev) => [...prev, newMessage]);
// // //       setText("");

// // //       if (socketRef.current) {
// // //         socketRef.current.emit("sendMessage", {
// // //           toUserId: friend.member,
// // //           message: {
// // //             id: "",
// // //             conversation_id: friend.id,
// // //             sender: friend.sender,
// // //             recipient: friend.member,
// // //             content: newMessage.text,
// // //             message_type: "text",
// // //             timestamp: new Date().toISOString(),
// // //             url: null,
// // //           },
// // //         });
// // //       }

// // //       try {
// // //         await axios.post("http://localhost:5000/api/chat/send-message/", {
// // //           id: "",
// // //           conversationId: friend.id,
// // //           sender: friend.sender,
// // //           content: text.trim(),
// // //           message_type: "text",
// // //           timestamp: new Date().toISOString(),
// // //           recipient: friend.member,
// // //         });
// // //       } catch (error) {
// // //         console.error("Lỗi gửi tin nhắn:", error);
// // //       }
// // //     } else {
// // //       const likeMessage = {
// // //         id: Date.now(),
// // //         text: "👍",
// // //         type: "sent",
// // //         timestamp: new Date(),
// // //         isTemporary: false,
// // //       };
// // //       setMessages((prev) => [...prev, likeMessage]);

// // //       if (socketRef.current) {
// // //         socketRef.current.emit("sendMessage", {
// // //           toUserId: friend.member,
// // //           message: {
// // //             id: "",
// // //             conversation_id: friend.id,
// // //             sender: friend.sender,
// // //             recipient: friend.member,
// // //             content: "👍",
// // //             message_type: "text",
// // //             timestamp: new Date().toISOString(),
// // //             url: null,
// // //           },
// // //         });
// // //       }

// // //       try {
// // //         await axios.post("http://localhost:5000/api/chat/send-message/", {
// // //           id: "",
// // //           conversationId: friend.id,
// // //           sender: friend.sender,
// // //           content: "👍",
// // //           message_type: "text",
// // //           timestamp: new Date().toISOString(),
// // //           recipient: friend.member,
// // //         });
// // //       } catch (error) {
// // //         console.error("Lỗi gửi tin nhắn like:", error);
// // //       }
// // //     }
// // //   }, [text, friend]);

// // //   const handleKeyPress = useCallback((e) => {
// // //     if (e.key === "Enter") {
// // //       handleSend();
// // //     }
// // //   }, [handleSend]);

// // //   const handleAvatarClick = useCallback(() => {
// // //     setShowProFile(true);
// // //   }, []);

// // //   const handleMediaSelect = useCallback(async (e, mediaType) => {
// // //     const file = e.target.files[0];
// // //     if (!file) {
// // //       alert("Vui lòng chọn một tệp.");
// // //       return;
// // //     }

// // //     if (file.size > 50 * 1024 * 1024) {
// // //       alert("Tệp quá lớn. Kích thước tối đa là 50MB.");
// // //       return;
// // //     }

// // //     if (mediaType === "image" && !file.type.startsWith("image/")) {
// // //       alert("Vui lòng chọn tệp hình ảnh.");
// // //       return;
// // //     }

// // //     if (mediaType === "video" && !file.type.startsWith("video/")) {
// // //       alert("Vui lòng chọn tệp video.");
// // //       return;
// // //     }

// // //     const reader = new FileReader();
// // //     reader.onload = () => {
// // //       const tempMessageId = Date.now() + Math.random();
// // //       const tempMessage = {
// // //         id: tempMessageId,
// // //         type: "sent",
// // //         timestamp: new Date(),
// // //         uploading: true,
// // //         fileName: file.name,
// // //         isTemporary: true,
// // //       };

// // //       if (mediaType === "image") {
// // //         tempMessage.image = reader.result;
// // //       } else if (mediaType === "video") {
// // //         tempMessage.video = reader.result;
// // //       } else if (mediaType === "file") {
// // //         tempMessage.file = {
// // //           name: file.name,
// // //           url: reader.result,
// // //         };
// // //       }

// // //       setMessages((prev) => [...prev, tempMessage]);
// // //       scrollToBottom();

// // //       if (socketRef.current && (mediaType === "image" || mediaType === "video")) {
// // //         socketRef.current.emit("sendMessage", {
// // //           toUserId: friend.member,
// // //           message: {
// // //             id: tempMessageId,
// // //             conversation_id: friend.id,
// // //             sender: friend.sender,
// // //             recipient: friend.member,
// // //             content: file.name,
// // //             message_type: mediaType,
// // //             timestamp: new Date().toISOString(),
// // //             url: null,
// // //             base64Data: reader.result,
// // //           },
// // //         });
// // //       }

// // //       uploadFileToServer(file, mediaType, tempMessageId);
// // //     };

// // //     reader.onerror = () => {
// // //       alert("Lỗi khi đọc tệp.");
// // //     };
// // //     reader.readAsDataURL(file);
// // //   }, [friend, scrollToBottom]);

// // //   const uploadFileToServer = async (file, mediaType, messageId) => {
// // //     const formData = new FormData();
// // //     let endpoint;

// // //     if (mediaType === "image") {
// // //       formData.append("file", file, encodeURIComponent(file.name));
// // //       endpoint = "/upload-file";
// // //     } else if (mediaType === "video") {
// // //       formData.append("video", file, encodeURIComponent(file.name));
// // //       endpoint = "/upload-video";
// // //     } else if (mediaType === "file") {
// // //       formData.append("file", file, encodeURIComponent(file.name));
// // //       endpoint = "/upload-file";
// // //     }

// // //     try {
// // //       const uploadResponse = await axios.post(`http://localhost:5000${endpoint}`, formData, {
// // //         headers: {
// // //           "Content-Type": "multipart/form-data",
// // //           "Accept": "application/json",
// // //         },
// // //       });

// // //       if (uploadResponse.data.url) {
// // //         const filePath = uploadResponse.data.url.replace("http://localhost:5000", "");
// // //         const fullUrl = uploadResponse.data.url;

// // //         // Cập nhật tin nhắn với URL mới và xóa base64
// // //         setMessages((prev) =>
// // //           prev.map((msg) => {
// // //             if (msg.id === messageId) {
// // //               const updatedMsg = {
// // //                 ...msg,
// // //                 uploading: false,
// // //                 isTemporary: false,
// // //                 image: mediaType === "image" ? fullUrl : msg.image, // Chỉ cập nhật image nếu là ảnh
// // //                 video: mediaType === "video" ? fullUrl : msg.video,
// // //                 file: mediaType === "file" ? { name: decodeURIComponent(file.name), url: fullUrl } : msg.file,
// // //               };
// // //               // Xóa base64 tạm thời để tránh xung đột
// // //               if (mediaType === "image" && updatedMsg.image) delete updatedMsg.image.base64Data;
// // //               if (mediaType === "video" && updatedMsg.video) delete updatedMsg.video.base64Data;
// // //               return updatedMsg;
// // //             }
// // //             return msg;
// // //           })
// // //         );

// // //         if (socketRef.current) {
// // //           socketRef.current.emit("sendMessage", {
// // //             toUserId: friend.member,
// // //             message: {
// // //               id: "",
// // //               conversation_id: friend.id,
// // //               sender: friend.sender,
// // //               recipient: friend.member,
// // //               content: file.name,
// // //               message_type: mediaType,
// // //               timestamp: new Date().toISOString(),
// // //               url: filePath,
// // //             },
// // //           });
// // //         }

// // //         try {
// // //           await axios.post("http://localhost:5000/api/chat/send-message/", {
// // //             id: "",
// // //             conversationId: friend.id,
// // //             sender: friend.sender,
// // //             content: decodeURIComponent(file.name),
// // //             message_type: mediaType,
// // //             timestamp: new Date().toISOString(),
// // //             recipient: friend.member,
// // //             url: filePath,
// // //           });
// // //         } catch (messageError) {
// // //           console.error("Lỗi gửi tin nhắn:", messageError);
// // //         }
// // //       }
// // //     } catch (uploadError) {
// // //       setMessages((prev) =>
// // //         prev.map((msg) => {
// // //           if (msg.id === messageId) {
// // //             return {
// // //               ...msg,
// // //               uploading: false,
// // //               error: true,
// // //               isTemporary: false,
// // //             };
// // //           }
// // //           return msg;
// // //         })
// // //       );
// // //       alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
// // //     }
// // //   };

// // //   const handleSendFriendRequest = useCallback((friendId, friendName) => {
// // //     console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
// // //   }, []);

// // //   const handleConfirmFriendRequest = useCallback((friendId, friendName) => {
// // //     console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
// // //   }, []);

// // //   const handleRejectFriendRequest = useCallback((friendId, friendName) => {
// // //     console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
// // //   }, []);

// // //   const handleClosePreview = useCallback(() => {
// // //     setPreviewImage(null);
// // //   }, []);

// // //   const isValidUrl = (url) => {
// // //     try {
// // //       new URL(url);
// // //       return true;
// // //     } catch {
// // //       return false;
// // //     }
// // //   };

// // //   const renderMessageContent = (message) => {
// // //     if (message.uploading) {
// // //       return (
// // //         <div className={cx("message-uploading")}>
// // //           <span>Đang tải {message.fileName}...</span>
// // //         </div>
// // //       );
// // //     }

// // //     if (message.error) {
// // //       return (
// // //         <div className={cx("message-error")}>
// // //           <span>Lỗi tải {message.fileName}</span>
// // //         </div>
// // //       );
// // //     }

// // //     // if (message.image) {
// // //     //   return (
// // //     //     <div
// // //     //       className={cx("message-image", { temporary: message.isTemporary })}
// // //     //       onClick={() => setPreviewImage(message.image)}
// // //     //       aria-label="Xem trước hình ảnh"
// // //     //     >
// // //     //       <img
// // //     //         src={message.isTemporary ? message.image : (message.image.startsWith("http") ? message.image : `http://localhost:5000${message.image}`)}
// // //     //         //alt={message.fileName || "Hình ảnh được chia sẻ"}
// // //     //         className={cx("image-content")}
// // //     //         onError={(e) => console.error("Lỗi tải hình ảnh:", e.target.src)}
// // //     //       />
// // //     //       {/*{message.isTemporary && (
// // //     //         <div className={cx("temporary-indicator")}>
// // //     //           <span>Đang xử lý...</span>
// // //     //         </div>
// // //     //       )}*/}
// // //     //     </div>
// // //     //   );
// // //     // }

// // //    // Chỉ render ảnh khi có ảnh hợp lệ
// // // if (message.image) {
// // //   const isBase64 = message.image.startsWith('data:image/');
// // //   const isValidImage = isBase64 ||
// // //     message.image.startsWith('http://') ||
// // //     message.image.startsWith('https://') ||
// // //     message.image.startsWith('/');

// // //   // Sửa logic: chỉ không render nếu không phải ảnh hợp lệ
// // //   // Bỏ điều kiện (message.isTemporary && !isBase64) vì nó chặn ảnh tạm thời
// // //   if (!isValidImage) {
// // //     console.log('Invalid image format:', message.image); // Debug
// // //     return null;
// // //   }

// // //   return (
// // //     <div
// // //       className={cx("message-image")}
// // //       onClick={() => setPreviewImage(message.image)}
// // //       aria-label="Xem trước hình ảnh"
// // //     >
// // //       <img
// // //         src={isBase64 ? message.image : (message.image.startsWith("http") ? message.image : `http://localhost:5000${message.image}`)}
// // //         alt={message.fileName || "Hình ảnh được chia sẻ"}
// // //         className={cx("image-content")}
// // //         onError={(e) => {
// // //           console.error("Lỗi tải hình ảnh:", e.target.src);
// // //           e.target.parentElement.style.display = 'none';
// // //         }}
// // //       />
// // //       {/* Hiển thị indicator khi đang upload */}
// // //       {message.uploading && (
// // //         <div className={cx("uploading-indicator")}>
// // //           Đang tải...
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // //     if (message.video) {
// // //       return (
// // //         <div className={cx("message-video", { temporary: message.isTemporary })}>
// // //           <video controls className={cx("video-content")}>
// // //             <source src={message.isTemporary ? message.video : (message.video.startsWith("http") ? message.video : `http://localhost:5000${message.video}`)} type="video/mp4" />
// // //             Trình duyệt của bạn không hỗ trợ thẻ video.
// // //           </video>
// // //           {message.isTemporary && (
// // //             <div className={cx("temporary-indicator")}>
// // //               <span>Đang xử lý...</span>
// // //             </div>
// // //           )}
// // //         </div>
// // //       );
// // //     }

// // //     if (message.file) {
// // //       return (
// // //         <div className={cx("message-file")}>
// // //           <a href={message.file.url.startsWith("http") ? message.file.url : `http://localhost:5000${message.file.url}`} download={message.file.name}>
// // //             {message.file.name}
// // //           </a>
// // //         </div>
// // //       );
// // //     }

// // //     if (typeof message.text === "string" && message.text) {
// // //       const urlRegex = /(https?:\/\/[^\s]+)/g;
// // //       const parts = message.text.split(urlRegex);
// // //       return (
// // //         <span>
// // //           {parts.map((part, index) => {
// // //             if (part.match(urlRegex) && isValidUrl(part)) {
// // //               return (
// // //                 <a
// // //                   key={index}
// // //                   href={part}
// // //                   target="_blank"
// // //                   rel="noopener noreferrer"
// // //                   className={cx("message-link")}
// // //                 >
// // //                   {part}
// // //                 </a>
// // //               );
// // //             }
// // //             return part;
// // //           })}
// // //         </span>
// // //       );
// // //     }
// // //     return <span>{message.text || ""}</span>;
// // //   };

// // //   const formatTime = (dateObj) => {
// // //     return dateObj.toLocaleTimeString("vi-VN", {
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //       hour12: true,
// // //     });
// // //   };

// // //   const formatSeparator = (dateObj) => {
// // //     return (
// // //       dateObj.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) +
// // //       " " +
// // //       formatTime(dateObj)
// // //     );
// // //   };

// // //   if (!friend) {
// // //     return (
// // //       <div className={cx("chat")}>
// // //         <div className={cx("empty-state")}>
// // //           <div className={cx("empty-content")}>
// // //             <div className={cx("empty-icon")}>
// // //               <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
// // //                 <path
// // //                   d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
// // //                   fill="currentColor"
// // //                   opacity="0.3"
// // //                 />
// // //                 <circle cx="8" cy="12" r="1" fill="currentColor" />
// // //                 <circle cx="12" cy="12" r="1" fill="currentColor" />
// // //                 <circle cx="16" cy="12" r="1" fill="currentColor" />
// // //               </svg>
// // //             </div>
// // //             <div className={cx("empty-text")}>
// // //               <h2>Chọn một cuộc trò chuyện</h2>
// // //               <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className={cx("chat")}>
// // //       <ChatHeader friend={friend} onAvatarClick={handleAvatarClick} onToggleDetail={onToggleDetail} />

// // //       {showSendRequestBar ? (
// // //         <FriendRequestBar friend={friend} onSendRequest={handleSendFriendRequest} isVisible={false} />
// // //       ) : (
// // //         <FriendRequestConfirmationBar
// // //           friend={friend}
// // //           onConfirmRequest={handleConfirmFriendRequest}
// // //           onRejectRequest={handleRejectFriendRequest}
// // //           isVisible={false}
// // //         />
// // //       )}

// // //       <div className={cx("center")} ref={messagesContainerRef}>
// // //         {loading ? (
// // //           <div>Đang tải...</div>
// // //         ) : error ? (
// // //           <div className={cx("error")}>{error}</div>
// // //         ) : (
// // //           messages.map((message, index) => {
// // //             const prevMsg = messages[index - 1];
// // //             const nextMsg = messages[index + 1];
// // //             const currentTime = message.timestamp;

// // //             let showSeparator = false;
// // //             let showTime = false;

// // //             if (!prevMsg) {
// // //               showSeparator = true;
// // //             } else {
// // //               const diffMinutes = (currentTime - prevMsg.timestamp) / 1000 / 60;
// // //               if (diffMinutes >= 10) {
// // //                 showSeparator = true;
// // //               }
// // //             }

// // //             if (!nextMsg) {
// // //               showTime = true;
// // //             } else {
// // //               const sameMinute =
// // //                 currentTime.getHours() === nextMsg.timestamp.getHours() &&
// // //                 currentTime.getMinutes() === nextMsg.timestamp.getMinutes();
// // //               if (!sameMinute) {
// // //                 showTime = true;
// // //               }
// // //             }

// // //             return (
// // //               <div key={message.id} className={cx("message-wrapper", message.type)}>
// // //                 {showSeparator && (
// // //                   <div className={cx("time-separator")}>
// // //                     <div className={cx("time-separator-content")}>
// // //                       {formatSeparator(message.timestamp)}
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //                 <div className={cx("message", message.type)}>
// // //                   <div
// // //                     className={cx("message-bubble", {
// // //                       "has-media": message.image || message.video || message.file,
// // //                       temporary: message.isTemporary,
// // //                     })}
// // //                   >
// // //                     {renderMessageContent(message)}
// // //                   </div>
// // //                   {showTime && (
// // //                     <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             );
// // //           })
// // //         )}
// // //       </div>

// // //       {previewImage && <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />}

// // //       <div className={cx("cr")}>
// // //         <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
// // //           <input
// // //             type="file"
// // //             accept="image/*"
// // //             style={{ display: "none" }}
// // //             onChange={(e) => handleMediaSelect(e, "image")}
// // //           />
// // //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// // //             <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
// // //           </svg>
// // //         </label>
// // //         <label className={cx("cr-button")} title="Chọn tệp" aria-label="Chọn tệp để gửi">
// // //           <input
// // //             type="file"
// // //             accept=".pdf,.doc,.docx,.txt"
// // //             style={{ display: "none" }}
// // //             onChange={(e) => handleMediaSelect(e, "file")}
// // //           />
// // //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// // //             <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
// // //           </svg>
// // //         </label>
// // //         <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
// // //           <input
// // //             type="file"
// // //             accept="video/*"
// // //             style={{ display: "none" }}
// // //             onChange={(e) => handleMediaSelect(e, "video")}
// // //           />
// // //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// // //             <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
// // //           </svg>
// // //         </label>
// // //       </div>

// // //       <div className={cx("input-area")}>
// // //         <input
// // //           type="text"
// // //           placeholder="Nhập tin nhắn..."
// // //           value={text}
// // //           onChange={(e) => setText(e.target.value)}
// // //           onKeyPress={handleKeyPress}
// // //           className={cx("message-input")}
// // //           aria-label="Nhập tin nhắn"
// // //         />
// // //         <div className={cx("emoji-container")}>
// // //           <button
// // //             className={cx("emoji-button")}
// // //             onClick={() => setOpen((prev) => !prev)}
// // //             aria-label="Mở bảng chọn biểu tượng cảm xúc"
// // //           >
// // //             😊
// // //           </button>
// // //           <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
// // //             {emojis.map((emoji, index) => (
// // //               <button
// // //                 key={index}
// // //                 onClick={() => handleEmoji(emoji)}
// // //                 className={cx("emoji-item")}
// // //                 aria-label={`Chọn biểu tượng ${emoji}`}
// // //               >
// // //                 {emoji}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //         <button
// // //           onClick={handleSend}
// // //           className={cx("send-button", { active: text.trim() })}
// // //           aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
// // //         >
// // //           {text.trim() ? (
// // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// // //               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
// // //             </svg>
// // //           ) : (
// // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// // //               <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
// // //             </svg>
// // //           )}
// // //         </button>
// // //       </div>

// // //       {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
// // //       {showProfile && <ProFile1 onClose={() => setShowProFile(false)} datax={friend} />}
// // //     </div>
// // //   );
// // // }

// // // export default Chat;


// // import classNames from "classnames/bind";
// // import styles from "./Chat.module.scss";
// // import { useState, useEffect, useRef, useCallback } from "react";
// // import ProFile1 from "~/pages/ProFile1";
// // import ChatPreview from "./ChatPreview";
// // import FriendRequestBar from "./FriendRequestBar";
// // import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
// // import ChatHeader from "./ChatHeader";
// // import axios from "axios";
// // import { io } from "socket.io-client";

// // const cx = classNames.bind(styles);

// // function Chat({ friend, onToggleDetail }) {
// //   const [open, setOpen] = useState(false);
// //   const [text, setText] = useState("");
// //   const [showProfile, setShowProFile] = useState(false);
// //   const [previewImage, setPreviewImage] = useState(null);
// //   const messagesContainerRef = useRef(null);
// //   const [messages, setMessages] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showSendRequestBar, setShowSendRequestBar] = useState(false);
// //   const socketRef = useRef(null);

// //   // Hàm cuộn xuống cuối
// //   const scrollToBottom = useCallback(() => {
// //     if (messagesContainerRef.current) {
// //       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
// //     }
// //   }, []);

// //   // Cuộn xuống cuối khi messages thay đổi
// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages, scrollToBottom]);

// //   // Kết nối WebSocket khi friend thay đổi
// //   useEffect(() => {
// //     if (friend?.sender) {
// //       socketRef.current = io("http://localhost:5000", {
// //         query: { userId: friend.sender },
// //       });

// //       socketRef.current.on("receiveMessage", (data) => {
// //         const receivedMessage = {
// //           id: new Date().getTime() + Math.random(),
// //           text: data.message.message_type === "text" && typeof data.message.content === "string" ? data.message.content : "",
// //           type: data.message.sender === friend.sender ? "sent" : "received",
// //           timestamp: new Date(data.message.timestamp),
// //           temporaryImage: data.message.message_type === "image" && data.message.base64Data ? data.message.base64Data : null,
// //           image: data.message.message_type === "image" && data.message.url ? `http://localhost:5000${data.message.url}` : null,
// //           video: data.message.message_type === "video" ? (data.message.base64Data || `http://localhost:5000${data.message.url}`) : null,
// //           file: data.message.message_type === "file" ? { name: data.message.content, url: `http://localhost:5000${data.message.url}` } : null,
// //           isTemporary: !!data.message.base64Data,
// //         };

// //         setMessages((prev) => [...prev, receivedMessage]);
// //         scrollToBottom();
// //       });

// //       return () => {
// //         if (socketRef.current) {
// //           socketRef.current.disconnect();
// //         }
// //       };
// //     }
// //   }, [friend, scrollToBottom]);

// //   // Fetch tin nhắn từ API
// //   useEffect(() => {
// //     const fetchMessages = async () => {
// //       if (!friend || !friend.id) {
// //         setMessages([]);
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const response = await axios.post("http://localhost:5000/api/chat/messages/", {
// //           friendId: friend.id,
// //         });

// //         if (response.status === 200 && Array.isArray(response.data)) {
// //           const transformedMessages = response.data
// //             .map((msg) => ({
// //               id: msg.id,
// //               text: msg.message_type === "text" && typeof msg.content === "string" ? msg.content : "",
// //               type: msg.sender === friend.sender ? "sent" : "received",
// //               timestamp: new Date(msg.timestamp),
// //               image: msg.message_type === "image" ? `http://localhost:5000${msg.url}` : null,
// //               video: msg.message_type === "video" ? `http://localhost:5000${msg.url}` : null,
// //               file: msg.message_type === "file" ? { name: msg.content, url: `http://localhost:5000${msg.url}` } : null,
// //               isTemporary: false,
// //             }))
// //             .filter((msg) => msg.text || msg.image || msg.video || msg.file);

// //           setMessages(transformedMessages);
// //         } else {
// //           setError("Dữ liệu tin nhắn không hợp lệ.");
// //         }
// //       } catch (err) {
// //         setError("Lỗi khi tải tin nhắn: " + err.message);
// //         console.error("Lỗi khi lấy tin nhắn:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchMessages();
// //   }, [friend]);

// //   const toggleRequestBar = useCallback(() => {
// //     setShowSendRequestBar((prev) => !prev);
// //   }, []);

// //   const emojis = ["😀", "😂", "😍", "😊", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

// //   const handleEmoji = useCallback((emoji) => {
// //     setText((prev) => prev + emoji);
// //     setOpen(false);
// //   }, []);

// //   const handleSend = useCallback(async () => {
// //     if (text.trim()) {
// //       const newMessage = {
// //         id: Date.now(),
// //         text: text.trim(),
// //         type: "sent",
// //         timestamp: new Date(),
// //         isTemporary: false,
// //       };
// //       setMessages((prev) => [...prev, newMessage]);
// //       setText("");

// //       if (socketRef.current) {
// //         socketRef.current.emit("sendMessage", {
// //           toUserId: friend.member,
// //           message: {
// //             id: "",
// //             conversation_id: friend.id,
// //             sender: friend.sender,
// //             recipient: friend.member,
// //             content: newMessage.text,
// //             message_type: "text",
// //             timestamp: new Date().toISOString(),
// //             url: null,
// //           },
// //         });
// //       }

// //       try {
// //         await axios.post("http://localhost:5000/api/chat/send-message/", {
// //           id: "",
// //           conversationId: friend.id,
// //           sender: friend.sender,
// //           content: text.trim(),
// //           message_type: "text",
// //           timestamp: new Date().toISOString(),
// //           recipient: friend.member,
// //         });
// //       } catch (error) {
// //         console.error("Lỗi gửi tin nhắn:", error);
// //       }
// //     } else {
// //       const likeMessage = {
// //         id: Date.now(),
// //         text: "👍",
// //         type: "sent",
// //         timestamp: new Date(),
// //         isTemporary: false,
// //       };
// //       setMessages((prev) => [...prev, likeMessage]);

// //       if (socketRef.current) {
// //         socketRef.current.emit("sendMessage", {
// //           toUserId: friend.member,
// //           message: {
// //             id: "",
// //             conversation_id: friend.id,
// //             sender: friend.sender,
// //             recipient: friend.member,
// //             content: "👍",
// //             message_type: "text",
// //             timestamp: new Date().toISOString(),
// //             url: null,
// //           },
// //         });
// //       }

// //       try {
// //         await axios.post("http://localhost:5000/api/chat/send-message/", {
// //           id: "",
// //           conversationId: friend.id,
// //           sender: friend.sender,
// //           content: "👍",
// //           message_type: "text",
// //           timestamp: new Date().toISOString(),
// //           recipient: friend.member,
// //         });
// //       } catch (error) {
// //         console.error("Lỗi gửi tin nhắn like:", error);
// //       }
// //     }
// //   }, [text, friend]);

// //   const handleKeyPress = useCallback((e) => {
// //     if (e.key === "Enter") {
// //       handleSend();
// //     }
// //   }, [handleSend]);

// //   const handleAvatarClick = useCallback(() => {
// //     setShowProFile(true);
// //   }, []);

// //   const handleMediaSelect = useCallback(async (e, mediaType) => {
// //     const file = e.target.files[0];
// //     if (!file) {
// //       alert("Vui lòng chọn một tệp.");
// //       return;
// //     }

// //     if (file.size > 50 * 1024 * 1024) {
// //       alert("Tệp quá lớn. Kích thước tối đa là 50MB.");
// //       return;
// //     }

// //     if (mediaType === "image" && !file.type.startsWith("image/")) {
// //       alert("Vui lòng chọn tệp hình ảnh.");
// //       return;
// //     }

// //     if (mediaType === "video" && !file.type.startsWith("video/")) {
// //       alert("Vui lòng chọn tệp video.");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       const tempMessageId = Date.now() + Math.random();
// //       const tempMessage = {
// //         id: tempMessageId,
// //         type: "sent",
// //         timestamp: new Date(),
// //         uploading: true,
// //         fileName: file.name,
// //         isTemporary: true,
// //       };

// //       let base64Data = null;
// //       if (mediaType === "image") {
// //         tempMessage.temporaryImage = reader.result; // Lưu base64 vào temporaryImage
// //         base64Data = reader.result;
// //       } else if (mediaType === "video") {
// //         tempMessage.video = reader.result;
// //         base64Data = reader.result;
// //       } else if (mediaType === "file") {
// //         tempMessage.file = {
// //           name: file.name,
// //           url: reader.result,
// //         };
// //       }

// //       setMessages((prev) => [...prev, tempMessage]);
// //       scrollToBottom();

// //       if (socketRef.current && (mediaType === "image" || mediaType === "video")) {
// //         socketRef.current.emit("sendMessage", {
// //           toUserId: friend.member,
// //           message: {
// //             id: tempMessageId,
// //             conversation_id: friend.id,
// //             sender: friend.sender,
// //             recipient: friend.member,
// //             content: file.name,
// //             message_type: mediaType,
// //             timestamp: new Date().toISOString(),
// //             url: null,
// //             base64Data: base64Data,
// //           },
// //         });
// //       }

// //       uploadFileToServer(file, mediaType, tempMessageId, base64Data);
// //     };

// //     reader.onerror = () => {
// //       alert("Lỗi khi đọc tệp.");
// //     };
// //     reader.readAsDataURL(file);
// //   }, [friend, scrollToBottom]);

// //   const uploadFileToServer = async (file, mediaType, messageId, base64Data = null) => {
// //     const formData = new FormData();
// //     let endpoint;

// //     if (mediaType === "image") {
// //       formData.append("file", file, encodeURIComponent(file.name));
// //       endpoint = "/upload-file";
// //     } else if (mediaType === "video") {
// //       formData.append("video", file, encodeURIComponent(file.name));
// //       endpoint = "/upload-video";
// //     } else if (mediaType === "file") {
// //       formData.append("file", file, encodeURIComponent(file.name));
// //       endpoint = "/upload-file";
// //     }

// //     try {
// //       const uploadResponse = await axios.post(`http://localhost:5000${endpoint}`, formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //           "Accept": "application/json",
// //         },
// //       });

// //       if (uploadResponse.data.url) {
// //         const filePath = uploadResponse.data.url.replace("http://localhost:5000", "");
// //         const fullUrl = uploadResponse.data.url;

// //         setMessages((prev) =>
// //           prev.map((msg) => {
// //             if (msg.id === messageId) {
// //               const updatedMsg = {
// //                 ...msg,
// //                 uploading: false,
// //                 isTemporary: false,
// //                 image: mediaType === "image" ? fullUrl : msg.image,
// //                 video: mediaType === "video" ? fullUrl : msg.video,
// //                 file: mediaType === "file" ? { name: decodeURIComponent(file.name), url: fullUrl } : msg.file,
// //               };
// //               return updatedMsg;
// //             }
// //             return msg;
// //           })
// //         );

// //         if (socketRef.current && (mediaType === "image" || mediaType === "video")) {
// //           socketRef.current.emit("sendMessage", {
// //             toUserId: friend.member,
// //             message: {
// //               id: "",
// //               conversation_id: friend.id,
// //               sender: friend.sender,
// //               recipient: friend.member,
// //               content: file.name,
// //               message_type: mediaType,
// //               timestamp: new Date().toISOString(),
// //               url: filePath,
// //               base64Data: base64Data,
// //             },
// //           });
// //         }

// //         try {
// //           await axios.post("http://localhost:5000/api/chat/send-message/", {
// //             id: "",
// //             conversationId: friend.id,
// //             sender: friend.sender,
// //             content: decodeURIComponent(file.name),
// //             message_type: mediaType,
// //             timestamp: new Date().toISOString(),
// //             recipient: friend.member,
// //             url: filePath,
// //           });
// //         } catch (messageError) {
// //           console.error("Lỗi gửi tin nhắn:", messageError);
// //         }
// //       }
// //     } catch (uploadError) {
// //       setMessages((prev) =>
// //         prev.map((msg) => {
// //           if (msg.id === messageId) {
// //             return {
// //               ...msg,
// //               uploading: false,
// //               error: true,
// //               isTemporary: false,
// //             };
// //           }
// //           return msg;
// //         })
// //       );
// //       alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
// //     }
// //   };

// //   const handleSendFriendRequest = useCallback((friendId, friendName) => {
// //     console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
// //   }, []);

// //   const handleConfirmFriendRequest = useCallback((friendId, friendName) => {
// //     console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
// //   }, []);

// //   const handleRejectFriendRequest = useCallback((friendId, friendName) => {
// //     console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
// //   }, []);

// //   const handleClosePreview = useCallback(() => {
// //     setPreviewImage(null);
// //   }, []);

// //   const isValidUrl = (url) => {
// //     try {
// //       new URL(url);
// //       return true;
// //     } catch {
// //       return false;
// //     }
// //   };

// //   const renderMessageContent = (message) => {
// //     if (message.uploading) {
// //       return (
// //         <div className={cx("message-uploading")}>
// //           <span>Đang tải {message.fileName}...</span>
// //         </div>
// //       );
// //     }

// //     if (message.error) {
// //       return (
// //         <div className={cx("message-error")}>
// //           <span>Lỗi tải {message.fileName}</span>
// //         </div>
// //       );
// //     }

// //     if (message.temporaryImage || message.image) {
// //       const imageSource = message.temporaryImage || message.image;
// //       const isBase64 = imageSource && imageSource.startsWith("data:image/");

// //       return (
// //         <div
// //           className={cx("message-image", { temporary: message.isTemporary })}
// //           onClick={() => setPreviewImage(imageSource)}
// //           aria-label="Xem trước hình ảnh"
// //         >
// //           <img
// //             src={
// //               isBase64
// //                 ? imageSource
// //                 : imageSource && imageSource.startsWith("http")
// //                 ? imageSource
// //                 : `http://localhost:5000${imageSource}`
// //             }
// //             alt={message.fileName || "Hình ảnh được chia sẻ"}
// //             className={cx("image-content")}
// //             onError={(e) => {
// //               console.error("Lỗi tải:", e.target.src);
// //               e.target.parentElement.style.display = "none";
// //             }}
// //           />
// //           {message.uploading && (
// //             <div className={cx("uploading-indicator")}>
// //               Đang tải...
// //             </div>
// //           )}
// //         </div>
// //       );
// //     }

// //     if (message.video) {
// //       return (
// //         <div className={cx("message-video", { temporary: message.isTemporary })}>
// //           <video controls className={cx("video-content")}>
// //             <source
// //               src={
// //                 message.isTemporary
// //                   ? message.video
// //                   : message.video.startsWith("http")
// //                   ? message.video
// //                   : `http://localhost:5000${message.video}`
// //               }
// //               type="video/mp4"
// //             />
// //             Trình duyệt của bạn không hỗ trợ thẻ video.
// //           </video>
// //           {message.isTemporary && (
// //             <div className={cx("temporary-indicator")}>
// //               <span>Đang xử lý...</span>
// //             </div>
// //           )}
// //         </div>
// //       );
// //     }

// //     if (message.file) {
// //       return (
// //         <div className={cx("message-file")}>
// //           <a
// //             href={
// //               message.file.url.startsWith("http")
// //                 ? message.file.url
// //                 : `http://localhost:5000${message.file.url}`
// //             }
// //             download={message.file.name}
// //           >
// //             {message.file.name}
// //           </a>
// //         </div>
// //       );
// //     }

// //     if (typeof message.text === "string" && message.text) {
// //       const urlRegex = /(https?:\/\/[^\s]+)/g;
// //       const parts = message.text.split(urlRegex);
// //       return (
// //         <span>
// //           {parts.map((part, index) => {
// //             if (part.match(urlRegex) && isValidUrl(part)) {
// //               return (
// //                 <a
// //                   key={index}
// //                   href={part}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className={cx("message-link")}
// //                 >
// //                   {part}
// //                 </a>
// //               );
// //             }
// //             return part;
// //           })}
// //         </span>
// //       );
// //     }
// //     return <span>{message.text || ""}</span>;
// //   };

// //   const formatTime = (dateObj) => {
// //     return dateObj.toLocaleTimeString("vi-VN", {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hour12: true,
// //     });
// //   };

// //   const formatSeparator = (dateObj) => {
// //     return (
// //       dateObj.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) +
// //       " " +
// //       formatTime(dateObj)
// //     );
// //   };

// //   if (!friend) {
// //     return (
// //       <div className={cx("chat")}>
// //         <div className={cx("empty-state")}>
// //           <div className={cx("empty-content")}>
// //             <div className={cx("empty-icon")}>
// //               <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
// //                 <path
// //                   d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
// //                   fill="currentColor"
// //                   opacity="0.3"
// //                 />
// //                 <circle cx="8" cy="12" r="1" fill="currentColor" />
// //                 <circle cx="12" cy="12" r="1" fill="currentColor" />
// //                 <circle cx="16" cy="12" r="1" fill="currentColor" />
// //               </svg>
// //             </div>
// //             <div className={cx("empty-text")}>
// //               <h2>Chọn một cuộc trò chuyện</h2>
// //               <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={cx("chat")}>
// //       <ChatHeader friend={friend} onAvatarClick={handleAvatarClick} onToggleDetail={onToggleDetail} />

// //       {showSendRequestBar ? (
// //         <FriendRequestBar friend={friend} onSendRequest={handleSendFriendRequest} isVisible={false} />
// //       ) : (
// //         <FriendRequestConfirmationBar
// //           friend={friend}
// //           onConfirmRequest={handleConfirmFriendRequest}
// //           onRejectRequest={handleRejectFriendRequest}
// //           isVisible={false}
// //         />
// //       )}

// //       <div className={cx("center")} ref={messagesContainerRef}>
// //         {loading ? (
// //           <div>Đang tải...</div>
// //         ) : error ? (
// //           <div className={cx("error")}>{error}</div>
// //         ) : (
// //           messages.map((message, index) => {
// //             const prevMsg = messages[index - 1];
// //             const nextMsg = messages[index + 1];
// //             const currentTime = message.timestamp;

// //             let showSeparator = false;
// //             let showTime = false;

// //             if (!prevMsg) {
// //               showSeparator = true;
// //             } else {
// //               const diffMinutes = (currentTime - prevMsg.timestamp) / 1000 / 60;
// //               if (diffMinutes >= 10) {
// //                 showSeparator = true;
// //               }
// //             }

// //             if (!nextMsg) {
// //               showTime = true;
// //             } else {
// //               const sameMinute =
// //                 currentTime.getHours() === nextMsg.timestamp.getHours() &&
// //                 currentTime.getMinutes() === nextMsg.timestamp.getMinutes();
// //               if (!sameMinute) {
// //                 showTime = true;
// //               }
// //             }

// //             return (
// //               <div key={message.id} className={cx("message-wrapper", message.type)}>
// //                 {showSeparator && (
// //                   <div className={cx("time-separator")}>
// //                     <div className={cx("time-separator-content")}>
// //                       {formatSeparator(message.timestamp)}
// //                     </div>
// //                   </div>
// //                 )}
// //                 <div className={cx("message", message.type)}>
// //                   <div
// //                     className={cx("message-bubble", {
// //                       "has-media": message.temporaryImage || message.image || message.video || message.file,
// //                       temporary: message.isTemporary,
// //                     })}
// //                   >
// //                     {renderMessageContent(message)}
// //                   </div>
// //                   {showTime && (
// //                     <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
// //                   )}
// //                 </div>
// //               </div>
// //             );
// //           })
// //         )}
// //       </div>

// //       {previewImage && <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />}

// //       <div className={cx("cr")}>
// //         <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
// //           <input
// //             type="file"
// //             accept="image/*"
// //             style={{ display: "none" }}
// //             onChange={(e) => handleMediaSelect(e, "image")}
// //           />
// //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// //             <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
// //           </svg>
// //         </label>
// //         <label className={cx("cr-button")} title="Chọn tệp" aria-label="Chọn tệp để gửi">
// //           <input
// //             type="file"
// //             accept=".pdf,.doc,.docx,.txt"
// //             style={{ display: "none" }}
// //             onChange={(e) => handleMediaSelect(e, "file")}
// //           />
// //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// //             <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
// //           </svg>
// //         </label>
// //         <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
// //           <input
// //             type="file"
// //             accept="video/*"
// //             style={{ display: "none" }}
// //             onChange={(e) => handleMediaSelect(e, "video")}
// //           />
// //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// //             <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
// //           </svg>
// //         </label>
// //       </div>

// //       <div className={cx("input-area")}>
// //         <input
// //           type="text"
// //           placeholder="Nhập tin nhắn..."
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           onKeyPress={handleKeyPress}
// //           className={cx("message-input")}
// //           aria-label="Nhập tin nhắn"
// //         />
// //         <div className={cx("emoji-container")}>
// //           <button
// //             className={cx("emoji-button")}
// //             onClick={() => setOpen((prev) => !prev)}
// //             aria-label="Mở bảng chọn biểu tượng cảm xúc"
// //           >
// //             😊
// //           </button>
// //           <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
// //             {emojis.map((emoji, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => handleEmoji(emoji)}
// //                 className={cx("emoji-item")}
// //                 aria-label={`Chọn biểu tượng ${emoji}`}
// //               >
// //                 {emoji}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //         <button
// //           onClick={handleSend}
// //           className={cx("send-button", { active: text.trim() })}
// //           aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
// //         >
// //           {text.trim() ? (
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// //               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
// //             </svg>
// //           ) : (
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// //               <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
// //             </svg>
// //           )}
// //         </button>
// //       </div>

// //       {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
// //       {showProfile && <ProFile1 onClose={() => setShowProFile(false)} datax={friend} />}
// //     </div>
// //   );
// // }

// // export default Chat;
// //Perfect

// import classNames from "classnames/bind";
// import styles from "./Chat.module.scss";
// import { useState, useEffect, useRef, useCallback } from "react";
// import ProFile1 from "~/pages/ProFile1";
// import ChatPreview from "./ChatPreview";
// import FriendRequestBar from "./FriendRequestBar";
// import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
// import ChatHeader from "./ChatHeader";
// import axios from "axios";
// import { io } from "socket.io-client";

// const cx = classNames.bind(styles);

// function Chat({ friend, onToggleDetail }) {
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [showProfile, setShowProFile] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const messagesContainerRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showSendRequestBar, setShowSendRequestBar] = useState(false);
//   const socketRef = useRef(null);

//   // Hàm cuộn xuống cuối
//   const scrollToBottom = useCallback(() => {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//     }
//   }, []);

//   // Cuộn xuống cuối khi messages thay đổi
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, scrollToBottom]);

//   // Kết nối WebSocket khi friend thay đổi
//   useEffect(() => {
//     if (friend?.sender) {
//       socketRef.current = io("http://localhost:5000", {
//         query: { userId: friend.sender },
//       });

//       socketRef.current.on("receiveMessage", (data) => {
//         const receivedMessage = {
//           id: data.message.id || new Date().getTime() + Math.random(),
//           text: data.message.message_type === "text" && typeof data.message.content === "string" ? data.message.content : "",
//           type: data.message.sender === friend.sender ? "sent" : "received",
//           timestamp: new Date(data.message.timestamp),
//           temporaryImage: data.message.message_type === "image" && data.message.base64Data ? data.message.base64Data : null,
//           image: data.message.message_type === "image" && data.message.url ? `http://localhost:5000${data.message.url}` : null,
//           video: data.message.message_type === "video" ? (data.message.base64Data || `http://localhost:5000${data.message.url}`) : null,
//           file: data.message.message_type === "file" ? { name: data.message.content, url: `http://localhost:5000${data.message.url}` } : null,
//           isTemporary: !!data.message.base64Data,
//         };

//         setMessages((prev) => {
//           // Kiểm tra nếu tin nhắn đã tồn tại (dựa trên id)
//           const existingMessageIndex = prev.findIndex((msg) => msg.id === receivedMessage.id);
//           if (existingMessageIndex !== -1) {
//             // Cập nhật tin nhắn hiện có
//             const updatedMessages = [...prev];
//             updatedMessages[existingMessageIndex] = {
//               ...updatedMessages[existingMessageIndex],
//               image: receivedMessage.image || updatedMessages[existingMessageIndex].image,
//               video: receivedMessage.video || updatedMessages[existingMessageIndex].video,
//               isTemporary: false,
//             };
//             return updatedMessages;
//           }
//           // Thêm tin nhắn mới
//           return [...prev, receivedMessage];
//         });
//         scrollToBottom();
//       });

//       socketRef.current.on("updateMessage", (data) => {
//         setMessages((prev) =>
//           prev.map((msg) => {
//             if (msg.id === data.message.id) {
//               return {
//                 ...msg,
//                 image: data.message.url ? `http://localhost:5000${data.message.url}` : msg.image,
//                 video: data.message.url ? `http://localhost:5000${data.message.url}` : msg.video,
//                 isTemporary: false,
//               };
//             }
//             return msg;
//           })
//         );
//         scrollToBottom();
//       });

//       return () => {
//         if (socketRef.current) {
//           socketRef.current.disconnect();
//         }
//       };
//     }
//   }, [friend, scrollToBottom]);

//   // Fetch tin nhắn từ API
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!friend || !friend.id) {
//         setMessages([]);
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.post("http://localhost:5000/api/chat/messages/", {
//           friendId: friend.id,
//         });

//         if (response.status === 200 && Array.isArray(response.data)) {
//           const transformedMessages = response.data
//             .map((msg) => ({
//               id: msg.id,
//               text: msg.message_type === "text" && typeof msg.content === "string" ? msg.content : "",
//               type: msg.sender === friend.sender ? "sent" : "received",
//               timestamp: new Date(msg.timestamp),
//               image: msg.message_type === "image" ? `http://localhost:5000${msg.url}` : null,
//               video: msg.message_type === "video" ? `http://localhost:5000${msg.url}` : null,
//               file: msg.message_type === "file" ? { name: msg.content, url: `http://localhost:5000${msg.url}` } : null,
//               isTemporary: false,
//             }))
//             .filter((msg) => msg.text || msg.image || msg.video || msg.file);

//           setMessages(transformedMessages);
//         } else {
//           setError("Dữ liệu tin nhắn không hợp lệ.");
//         }
//       } catch (err) {
//         setError("Lỗi khi tải tin nhắn: " + err.message);
//         console.error("Lỗi khi lấy tin nhắn:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [friend]);

//   const toggleRequestBar = useCallback(() => {
//     setShowSendRequestBar((prev) => !prev);
//   }, []);

//   const emojis = ["😀", "😂", "😍", "😊", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

//   const handleEmoji = useCallback((emoji) => {
//     setText((prev) => prev + emoji);
//     setOpen(false);
//   }, []);

//   const handleSend = useCallback(async () => {
//     if (text.trim()) {
//       const newMessage = {
//         id: Date.now(),
//         text: text.trim(),
//         type: "sent",
//         timestamp: new Date(),
//         isTemporary: false,
//       };
//       setMessages((prev) => [...prev, newMessage]);
//       setText("");

//       if (socketRef.current) {
//         socketRef.current.emit("sendMessage", {
//           toUserId: friend.member,
//           message: {
//             id: newMessage.id,
//             conversation_id: friend.id,
//             sender: friend.sender,
//             recipient: friend.member,
//             content: newMessage.text,
//             message_type: "text",
//             timestamp: new Date().toISOString(),
//             url: null,
//           },
//         });
//       }

//       try {
//         await axios.post("http://localhost:5000/api/chat/send-message/", {
//           id: newMessage.id,
//           conversationId: friend.id,
//           sender: friend.sender,
//           content: text.trim(),
//           message_type: "text",
//           timestamp: new Date().toISOString(),
//           recipient: friend.member,
//         });
//       } catch (error) {
//         console.error("Lỗi gửi tin nhắn:", error);
//       }
//     } else {
//       const likeMessage = {
//         id: Date.now(),
//         text: "👍",
//         type: "sent",
//         timestamp: new Date(),
//         isTemporary: false,
//       };
//       setMessages((prev) => [...prev, likeMessage]);

//       if (socketRef.current) {
//         socketRef.current.emit("sendMessage", {
//           toUserId: friend.member,
//           message: {
//             id: likeMessage.id,
//             conversation_id: friend.id,
//             sender: friend.sender,
//             recipient: friend.member,
//             content: "👍",
//             message_type: "text",
//             timestamp: new Date().toISOString(),
//             url: null,
//           },
//         });
//       }

//       try {
//         await axios.post("http://localhost:5000/api/chat/send-message/", {
//           id: likeMessage.id,
//           conversationId: friend.id,
//           sender: friend.sender,
//           content: "👍",
//           message_type: "text",
//           timestamp: new Date().toISOString(),
//           recipient: friend.member,
//         });
//       } catch (error) {
//         console.error("Lỗi gửi tin nhắn like:", error);
//       }
//     }
//   }, [text, friend]);

//   const handleKeyPress = useCallback((e) => {
//     if (e.key === "Enter") {
//       handleSend();
//     }
//   }, [handleSend]);

//   const handleAvatarClick = useCallback(() => {
//     setShowProFile(true);
//   }, []);

//   const handleMediaSelect = useCallback(async (e, mediaType) => {
//     const file = e.target.files[0];
//     if (!file) {
//       alert("Vui lòng chọn một tệp.");
//       return;
//     }

//     if (file.size > 50 * 1024 * 1024) {
//       alert("Tệp quá lớn. Kích thước tối đa là 50MB.");
//       return;
//     }

//     if (mediaType === "image" && !file.type.startsWith("image/")) {
//       alert("Vui lòng chọn tệp hình ảnh.");
//       return;
//     }

//     if (mediaType === "video" && !file.type.startsWith("video/")) {
//       alert("Vui lòng chọn tệp video.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       const tempMessageId = Date.now() + Math.random();
//       const tempMessage = {
//         id: tempMessageId,
//         type: "sent",
//         timestamp: new Date(),
//         uploading: true,
//         fileName: file.name,
//         isTemporary: true,
//       };

//       let base64Data = null;
//       if (mediaType === "image") {
//         tempMessage.temporaryImage = reader.result;
//         base64Data = reader.result;
//       } else if (mediaType === "video") {
//         tempMessage.video = reader.result;
//         base64Data = reader.result;
//       } else if (mediaType === "file") {
//         tempMessage.file = {
//           name: file.name,
//           url: reader.result,
//         };
//       }

//       setMessages((prev) => [...prev, tempMessage]);
//       scrollToBottom();

//       if (socketRef.current && (mediaType === "image" || mediaType === "video")) {
//         socketRef.current.emit("sendMessage", {
//           toUserId: friend.member,
//           message: {
//             id: tempMessageId,
//             conversation_id: friend.id,
//             sender: friend.sender,
//             recipient: friend.member,
//             content: file.name,
//             message_type: mediaType,
//             timestamp: new Date().toISOString(),
//             url: null,
//             base64Data: base64Data,
//           },
//         });
//       }

//       uploadFileToServer(file, mediaType, tempMessageId, base64Data);
//     };

//     reader.onerror = () => {
//       alert("Lỗi khi đọc tệp.");
//     };
//     reader.readAsDataURL(file);
//   }, [friend, scrollToBottom]);

//   const uploadFileToServer = async (file, mediaType, messageId, base64Data = null) => {
//     const formData = new FormData();
//     let endpoint;

//     if (mediaType === "image") {
//       formData.append("file", file, encodeURIComponent(file.name));
//       endpoint = "/upload-file";
//     } else if (mediaType === "video") {
//       formData.append("video", file, encodeURIComponent(file.name));
//       endpoint = "/upload-video";
//     } else if (mediaType === "file") {
//       formData.append("file", file, encodeURIComponent(file.name));
//       endpoint = "/upload-file";
//     }

//     try {
//       const uploadResponse = await axios.post(`http://localhost:5000${endpoint}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "Accept": "application/json",
//         },
//       });

//       if (uploadResponse.data.url) {
//         const filePath = uploadResponse.data.url.replace("http://localhost:5000", "");
//         const fullUrl = uploadResponse.data.url;

//         setMessages((prev) =>
//           prev.map((msg) => {
//             if (msg.id === messageId) {
//               const updatedMsg = {
//                 ...msg,
//                 uploading: false,
//                 isTemporary: false,
//                 image: mediaType === "image" ? fullUrl : msg.image,
//                 video: mediaType === "video" ? fullUrl : msg.video,
//                 file: mediaType === "file" ? { name: decodeURIComponent(file.name), url: fullUrl } : msg.file,
//               };
//               return updatedMsg;
//             }
//             return msg;
//           })
//         );

//         if (socketRef.current && (mediaType === "image" || mediaType === "video")) {
//           socketRef.current.emit("updateMessage", {
//             toUserId: friend.member,
//             message: {
//               id: messageId,
//               conversation_id: friend.id,
//               url: filePath,
//             },
//           });
//         }

//         try {
//           await axios.post("http://localhost:5000/api/chat/send-message/", {
//             id: messageId,
//             conversationId: friend.id,
//             sender: friend.sender,
//             content: decodeURIComponent(file.name),
//             message_type: mediaType,
//             timestamp: new Date().toISOString(),
//             recipient: friend.member,
//             url: filePath,
//           });
//         } catch (messageError) {
//           console.error("Lỗi gửi tin nhắn:", messageError);
//         }
//       }
//     } catch (uploadError) {
//       setMessages((prev) =>
//         prev.map((msg) => {
//           if (msg.id === messageId) {
//             return {
//               ...msg,
//               uploading: false,
//               error: true,
//               isTemporary: false,
//             };
//           }
//           return msg;
//         })
//       );
//       alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
//     }
//   };

//   const handleSendFriendRequest = useCallback((friendId, friendName) => {
//     console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
//   }, []);

//   const handleConfirmFriendRequest = useCallback((friendId, friendName) => {
//     console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
//   }, []);

//   const handleRejectFriendRequest = useCallback((friendId, friendName) => {
//     console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
//   }, []);

//   const handleClosePreview = useCallback(() => {
//     setPreviewImage(null);
//   }, []);

//   const isValidUrl = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const renderMessageContent = (message) => {
//     if (message.uploading) {
//       return (
//         <div className={cx("message-uploading")}>
//           <span>Đang tải {message.fileName}...</span>
//         </div>
//       );
//     }

//     if (message.error) {
//       return (
//         <div className={cx("message-error")}>
//         <span>Lỗi tải {message.fileName}</span>
//       </div>
//     );
//   }

//   if (message.temporaryImage || message.image) {
//     const imageSource = message.temporaryImage || message.image;
//     const isBase64 = imageSource && imageSource.startsWith("data:image/");

//     return (
//       <div
//         className={cx("message-image", { temporary: message.isTemporary })}
//         onClick={() => setPreviewImage(imageSource)}
//         aria-label="Xem trước hình ảnh"
//       >
//         <img
//           src={
//             isBase64
//               ? imageSource
//               : imageSource && imageSource.startsWith("http")
//               ? imageSource
//               : `http://localhost:5000${imageSource}`
//           }
//           alt={message.fileName || "Hình ảnh được chia sẻ"}
//           className={cx("image-content")}
//           onError={(e) => {
//             console.error("Lỗi tải:", e.target.src);
//             e.target.parentElement.style.display = "none";
//           }}
//         />
//         {message.uploading && (
//           <div className={cx("uploading-indicator")}>
//             Đang tải...
//           </div>
//         )}
//       </div>
//     );
//   }

//   if (message.video) {
//     return (
//       <div className={cx("message-video", { temporary: message.isTemporary })}>
//         <video controls className={cx("video-content")}>
//           <source
//             src={
//               message.isTemporary
//                 ? message.video
//                 : message.video.startsWith("http")
//                 ? message.video
//                 : `http://localhost:5000${message.video}`
//             }
//             type="video/mp4"
//           />
//           Trình duyệt của bạn không hỗ trợ thẻ video.
//         </video>
//         {message.isTemporary && (
//           <div className={cx("temporary-indicator")}>
//             <span>Đang xử lý...</span>
//           </div>
//         )}
//       </div>
//     );
//   }

//   if (message.file) {
//     return (
//       <div className={cx("message-file")}>
//         <a
//           href={
//             message.file.url.startsWith("http")
//               ? message.file.url
//               : `http://localhost:5000${message.file.url}`
//           }
//           download={message.file.name}
//         >
//           {message.file.name}
//         </a>
//       </div>
//     );
//   }

//   if (typeof message.text === "string" && message.text) {
//     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     const parts = message.text.split(urlRegex);
//     return (
//       <span>
//         {parts.map((part, index) => {
//           if (part.match(urlRegex) && isValidUrl(part)) {
//             return (
//               <a
//                 key={index}
//                 href={part}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={cx("message-link")}
//               >
//                 {part}
//               </a>
//             );
//           }
//           return part;
//         })}
//       </span>
//     );
//   }
//   return <span>{message.text || ""}</span>;
// };

// const formatTime = (dateObj) => {
//   return dateObj.toLocaleTimeString("vi-VN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// const formatSeparator = (dateObj) => {
//   return (
//     dateObj.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) +
//     " " +
//     formatTime(dateObj)
//   );
// };

// if (!friend) {
//   return (
//     <div className={cx("chat")}>
//       <div className={cx("empty-state")}>
//         <div className={cx("empty-content")}>
//           <div className={cx("empty-icon")}>
//             <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
//                 fill="currentColor"
//                 opacity="0.3"
//               />
//               <circle cx="8" cy="12" r="1" fill="currentColor" />
//               <circle cx="12" cy="12" r="1" fill="currentColor" />
//               <circle cx="16" cy="12" r="1" fill="currentColor" />
//             </svg>
//           </div>
//           <div className={cx("empty-text")}>
//             <h2>Chọn một cuộc trò chuyện</h2>
//             <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// return (
//   <div className={cx("chat")}>
//     <ChatHeader friend={friend} onAvatarClick={handleAvatarClick} onToggleDetail={onToggleDetail} />

//     {showSendRequestBar ? (
//       <FriendRequestBar friend={friend} onSendRequest={handleSendFriendRequest} isVisible={false} />
//     ) : (
//       <FriendRequestConfirmationBar
//         friend={friend}
//         onConfirmRequest={handleConfirmFriendRequest}
//         onRejectRequest={handleRejectFriendRequest}
//         isVisible={false}
//       />
//     )}

//     <div className={cx("center")} ref={messagesContainerRef}>
//       {loading ? (
//         <div>Đang tải...</div>
//       ) : error ? (
//         <div className={cx("error")}>{error}</div>
//       ) : (
//         messages.map((message, index) => {
//           const prevMsg = messages[index - 1];
//           const nextMsg = messages[index + 1];
//           const currentTime = message.timestamp;

//           let showSeparator = false;
//           let showTime = false;

//           if (!prevMsg) {
//             showSeparator = true;
//           } else {
//             const diffMinutes = (currentTime - prevMsg.timestamp) / 1000 / 60;
//             if (diffMinutes >= 10) {
//               showSeparator = true;
//             }
//           }

//           if (!nextMsg) {
//             showTime = true;
//           } else {
//             const sameMinute =
//               currentTime.getHours() === nextMsg.timestamp.getHours() &&
//               currentTime.getMinutes() === nextMsg.timestamp.getMinutes();
//             if (!sameMinute) {
//               showTime = true;
//             }
//           }

//           return (
//             <div key={message.id} className={cx("message-wrapper", message.type)}>
//               {showSeparator && (
//                 <div className={cx("time-separator")}>
//                   <div className={cx("time-separator-content")}>
//                     {formatSeparator(message.timestamp)}
//                   </div>
//                 </div>
//               )}
//               <div className={cx("message", message.type)}>
//                 <div
//                   className={cx("message-bubble", {
//                     "has-media": message.temporaryImage || message.image || message.video || message.file,
//                     temporary: message.isTemporary,
//                   })}
//                 >
//                   {renderMessageContent(message)}
//                 </div>
//                 {showTime && (
//                   <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
//                 )}
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>

//     {previewImage && <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />}

//     <div className={cx("cr")}>
//       <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
//         <input
//           type="file"
//           accept="image/*"
//           style={{ display: "none" }}
//           onChange={(e) => handleMediaSelect(e, "image")}
//         />
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
//         </svg>
//       </label>
//       <label className={cx("cr-button")} title="Chọn tệp" aria-label="Chọn tệp để gửi">
//         <input
//           type="file"
//           accept=".pdf,.doc,.docx,.txt"
//           style={{ display: "none" }}
//           onChange={(e) => handleMediaSelect(e, "file")}
//         />
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
//         </svg>
//       </label>
//       <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
//         <input
//           type="file"
//           accept="video/*"
//           style={{ display: "none" }}
//           onChange={(e) => handleMediaSelect(e, "video")}
//         />
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
//         </svg>
//       </label>
//     </div>

//     <div className={cx("input-area")}>
//       <input
//         type="text"
//         placeholder="Nhập tin nhắn..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onKeyPress={handleKeyPress}
//         className={cx("message-input")}
//         aria-label="Nhập tin nhắn"
//       />
//       <div className={cx("emoji-container")}>
//         <button
//           className={cx("emoji-button")}
//           onClick={() => setOpen((prev) => !prev)}
//           aria-label="Mở bảng chọn biểu tượng cảm xúc"
//         >
//           😊
//         </button>
//         <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
//           {emojis.map((emoji, index) => (
//             <button
//               key={index}
//               onClick={() => handleEmoji(emoji)}
//               className={cx("emoji-item")}
//               aria-label={`Chọn biểu tượng ${emoji}`}
//             >
//               {emoji}
//             </button>
//           ))}
//         </div>
//       </div>
//       <button
//         onClick={handleSend}
//         className={cx("send-button", { active: text.trim() })}
//         aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
//       >
//         {text.trim() ? (
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//           </svg>
//         ) : (
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
//           </svg>
//         )}
//       </button>
//     </div>

//     {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
//     {showProfile && <ProFile1 onClose={() => setShowProFile(false)} datax={friend} />}
//   </div>
// );
// }

// export default Chat;
//Xin nhat 


import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import ProFile1 from "~/pages/ProFile1";
import ChatPreview from "./ChatPreview";
import FriendRequestBar from "./FriendRequestBar";
import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
import ChatHeader from "./ChatHeader";
import axios from "axios";
import { io } from "socket.io-client";

const cx = classNames.bind(styles);

function Chat({ friend, onToggleDetail }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [showProfile, setShowProFile] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSendRequestBar, setShowSendRequestBar] = useState(false);
  const socketRef = useRef(null);

  // Hàm cuộn xuống cuối
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  // Cuộn xuống cuối khi messages thay đổi
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Kết nối WebSocket khi friend thay đổi
  useEffect(() => {
    if (friend?.sender) {
      socketRef.current = io("http://localhost:5000", {
        query: { userId: friend.sender },
      });

      socketRef.current.on("receiveMessage", (data) => {
        const receivedMessage = {
          id: data.message.id || new Date().getTime() + Math.random(),
          text: data.message.message_type === "text" && typeof data.message.content === "string" ? data.message.content : "",
          type: data.message.sender === friend.sender ? "sent" : "received",
          timestamp: new Date(data.message.timestamp),
          temporaryImage: data.message.message_type === "image" && data.message.base64Data ? data.message.base64Data : null,
          image: data.message.message_type === "image" && data.message.url ? `http://localhost:5000${data.message.url}` : null,
          temporaryVideo: data.message.message_type === "video" && data.message.base64Data ? data.message.base64Data : null,
          video: data.message.message_type === "video" && data.message.url ? `http://localhost:5000${data.message.url}` : null,
          file: data.message.message_type === "file" ? { name: data.message.content, url: `http://localhost:5000${data.message.url}` } : null,
          isTemporary: !!data.message.base64Data,
        };

        setMessages((prev) => {
          // Kiểm tra nếu tin nhắn đã tồn tại (dựa trên id)
          const existingMessageIndex = prev.findIndex((msg) => msg.id === receivedMessage.id);
          if (existingMessageIndex !== -1) {
            // Cập nhật tin nhắn hiện có
            const updatedMessages = [...prev];
            updatedMessages[existingMessageIndex] = {
              ...updatedMessages[existingMessageIndex],
              temporaryImage: receivedMessage.temporaryImage || updatedMessages[existingMessageIndex].temporaryImage,
              image: receivedMessage.image || updatedMessages[existingMessageIndex].image,
              temporaryVideo: receivedMessage.temporaryVideo || updatedMessages[existingMessageIndex].temporaryVideo,
              video: receivedMessage.video || updatedMessages[existingMessageIndex].video,
              isTemporary: false,
            };
            return updatedMessages;
          }
          // Thêm tin nhắn mới
          return [...prev, receivedMessage];
        });
        scrollToBottom();
      });

      socketRef.current.on("updateMessage", (data) => {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === data.message.id) {
              return {
                ...msg,
                image: data.message.url && data.message.message_type === "image" ? `http://localhost:5000${data.message.url}` : msg.image,
                video: data.message.url && data.message.message_type === "video" ? `http://localhost:5000${data.message.url}` : msg.video,
                isTemporary: false,
                // Giữ nguyên temporaryImage và temporaryVideo để tiếp tục dùng base64
              };
            }
            return msg;
          })
        );
        scrollToBottom();
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [friend, scrollToBottom]);

  // Fetch tin nhắn từ API
  useEffect(() => {
    const fetchMessages = async () => {
      if (!friend || !friend.id) {
        setMessages([]);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/api/chat/messages/", {
          friendId: friend.id,
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          const transformedMessages = response.data
            .map((msg) => ({
              id: msg.id,
              text: msg.message_type === "text" && typeof msg.content === "string" ? msg.content : "",
              type: msg.sender === friend.sender ? "sent" : "received",
              timestamp: new Date(msg.timestamp),
              image: msg.message_type === "image" ? `http://localhost:5000${msg.url}` : null,
              video: msg.message_type === "video" ? `http://localhost:5000${msg.url}` : null,
              file: msg.message_type === "file" ? { name: msg.content, url: `http://localhost:5000${msg.url}` } : null,
              isTemporary: false,
            }))
            .filter((msg) => msg.text || msg.image || msg.video || msg.file);

          setMessages(transformedMessages);
        } else {
          setError("Dữ liệu tin nhắn không hợp lệ.");
        }
      } catch (err) {
        setError("Lỗi khi tải tin nhắn: " + err.message);
        console.error("Lỗi khi lấy tin nhắn:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [friend]);

  const toggleRequestBar = useCallback(() => {
    setShowSendRequestBar((prev) => !prev);
  }, []);

  const emojis = ["😀", "😂", "😍", "😊", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

  const handleEmoji = useCallback((emoji) => {
    setText((prev) => prev + emoji);
    setOpen(false);
  }, []);

  const handleSend = useCallback(async () => {
    if (text.trim()) {
      const newMessage = {
        id: Date.now(),
        text: text.trim(),
        type: "sent",
        timestamp: new Date(),
        isTemporary: false,
      };
      setMessages((prev) => [...prev, newMessage]);
      setText("");

      if (socketRef.current) {
        socketRef.current.emit("sendMessage", {
          toUserId: friend.member,
          message: {
            id: newMessage.id,
            conversation_id: friend.id,
            sender: friend.sender,
            recipient: friend.member,
            content: newMessage.text,
            message_type: "text",
            timestamp: new Date().toISOString(),
            url: null,
          },
        });
      }

      try {
        await axios.post("http://localhost:5000/api/chat/send-message/", {
          id: newMessage.id,
          conversationId: friend.id,
          sender: friend.sender,
          content: text.trim(),
          message_type: "text",
          timestamp: new Date().toISOString(),
          recipient: friend.member,
        });
      } catch (error) {
        console.error("Lỗi gửi tin nhắn:", error);
      }
    } else {
      const likeMessage = {
        id: Date.now(),
        text: "👍",
        type: "sent",
        timestamp: new Date(),
        isTemporary: false,
      };
      setMessages((prev) => [...prev, likeMessage]);

      if (socketRef.current) {
        socketRef.current.emit("sendMessage", {
          toUserId: friend.member,
          message: {
            id: likeMessage.id,
            conversation_id: friend.id,
            sender: friend.sender,
            recipient: friend.member,
            content: "👍",
            message_type: "text",
            timestamp: new Date().toISOString(),
            url: null,
          },
        });
      }

      try {
        await axios.post("http://localhost:5000/api/chat/send-message/", {
          id: likeMessage.id,
          conversationId: friend.id,
          sender: friend.sender,
          content: "👍",
          message_type: "text",
          timestamp: new Date().toISOString(),
          recipient: friend.member,
        });
      } catch (error) {
        console.error("Lỗi gửi tin nhắn like:", error);
      }
    }
  }, [text, friend]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  }, [handleSend]);

  const handleAvatarClick = useCallback(() => {
    setShowProFile(true);
  }, []);

  const handleMediaSelect = useCallback(async (e, mediaType) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Vui lòng chọn một tệp.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("Tệp quá lớn. Kích thước tối đa là 50MB.");
      return;
    }

    if (mediaType === "image" && !file.type.startsWith("image/")) {
      alert("Vui lòng chọn tệp hình ảnh.");
      return;
    }

    if (mediaType === "video" && !file.type.startsWith("video/")) {
      alert("Vui lòng chọn tệp video.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const tempMessageId = Date.now() + Math.random();
      const tempMessage = {
        id: tempMessageId,
        type: "sent",
        timestamp: new Date(),
        uploading: true,
        fileName: file.name,
        isTemporary: true,
      };

      let base64Data = null;
      if (mediaType === "image") {
        tempMessage.temporaryImage = reader.result; // Lưu base64 vào temporaryImage
        base64Data = reader.result;
      } else if (mediaType === "video") {
        tempMessage.temporaryVideo = reader.result; // Lưu base64 vào temporaryVideo
        base64Data = reader.result;
      } else if (mediaType === "file") {
        tempMessage.file = {
          name: file.name,
          url: reader.result,
        };
      }

      setMessages((prev) => [...prev, tempMessage]);
      scrollToBottom();

      if (socketRef.current && (mediaType === "image" || mediaType === "video")) {
        socketRef.current.emit("sendMessage", {
          toUserId: friend.member,
          message: {
            id: tempMessageId,
            conversation_id: friend.id,
            sender: friend.sender,
            recipient: friend.member,
            content: file.name,
            message_type: mediaType,
            timestamp: new Date().toISOString(),
            url: null,
            base64Data: base64Data,
          },
        });
      }

      uploadFileToServer(file, mediaType, tempMessageId, base64Data);
    };

    reader.onerror = () => {
      alert("Lỗi khi đọc tệp.");
    };
    reader.readAsDataURL(file);
  }, [friend, scrollToBottom]);

  const uploadFileToServer = async (file, mediaType, messageId, base64Data = null) => {
    const formData = new FormData();
    let endpoint;

    if (mediaType === "image") {
      formData.append("file", file, encodeURIComponent(file.name));
      endpoint = "/upload-file";
    } else if (mediaType === "video") {
      formData.append("video", file, encodeURIComponent(file.name));
      endpoint = "/upload-video";
    } else if (mediaType === "file") {
      formData.append("file", file, encodeURIComponent(file.name));
      endpoint = "/upload-file";
    }

    try {
      const uploadResponse = await axios.post(`http://localhost:5000${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      });

      if (uploadResponse.data.url) {
        const filePath = uploadResponse.data.url.replace("http://localhost:5000", "");
        const fullUrl = uploadResponse.data.url;

        // Cập nhật tin nhắn với URL, giữ nguyên temporaryImage/temporaryVideo
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === messageId) {
              const updatedMsg = {
                ...msg,
                uploading: false,
                isTemporary: false,
                image: mediaType === "image" ? fullUrl : msg.image,
                video: mediaType === "video" ? fullUrl : msg.video,
                file: mediaType === "file" ? { name: decodeURIComponent(file.name), url: fullUrl } : msg.file,
                // Không xóa temporaryImage/temporaryVideo để giữ base64
              };
              return updatedMsg;
            }
            return msg;
          })
        );

        if (socketRef.current && (mediaType === "image" || mediaType === "video")) {
          socketRef.current.emit("updateMessage", {
            toUserId: friend.member,
            message: {
              id: messageId,
              conversation_id: friend.id,
              message_type: mediaType,
              url: filePath,
            },
          });
        }

        try {
          await axios.post("http://localhost:5000/api/chat/send-message/", {
            id: messageId,
            conversationId: friend.id,
            sender: friend.sender,
            content: decodeURIComponent(file.name),
            message_type: mediaType,
            timestamp: new Date().toISOString(),
            recipient: friend.member,
            url: filePath,
          });
        } catch (messageError) {
          console.error("Lỗi gửi tin nhắn:", messageError);
        }
      }
    } catch (uploadError) {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              uploading: false,
              error: true,
              isTemporary: false,
            };
          }
          return msg;
        })
      );
      alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
    }
  };

  const handleSendFriendRequest = useCallback((friendId, friendName) => {
    console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
  }, []);

  const handleConfirmFriendRequest = useCallback((friendId, friendName) => {
    console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
  }, []);

  const handleRejectFriendRequest = useCallback((friendId, friendName) => {
    console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewImage(null);
  }, []);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const renderMessageContent = (message) => {
    if (message.uploading) {
      return (
        <div className={cx("message-uploading")}>
          <span>Đang tải {message.fileName}...</span>
        </div>
      );
    }

    if (message.error) {
      return (
        <div className={cx("message-error")}>
          <span>Lỗi tải {message.fileName}</span>
        </div>
      );
    }

    // Hiển thị ảnh: Ưu tiên temporaryImage (base64) nếu có
    if (message.temporaryImage || message.image) {
      const imageSource = message.temporaryImage || message.image;
      const isBase64 = imageSource && imageSource.startsWith("data:image/");

      return (
        <div
          className={cx("message-image", { temporary: message.isTemporary })}
          onClick={() => setPreviewImage(imageSource)}
          aria-label="Xem trước hình ảnh"
        >
          <img
            src={
              isBase64
                ? imageSource
                : imageSource && imageSource.startsWith("http")
                ? imageSource
                : `http://localhost:5000${imageSource}`
            }
            alt={message.fileName || "Hình ảnh được chia sẻ"}
            className={cx("image-content")}
            onError={(e) => {
              console.error("Lỗi tải:", e.target.src);
              e.target.parentElement.style.display = "none";
            }}
          />
          {message.uploading && (
            <div className={cx("uploading-indicator")}>
              Đang tải...
            </div>
          )}
        </div>
      );
    }

    // Hiển thị video: Ưu tiên temporaryVideo (base64) nếu có
    if (message.temporaryVideo || message.video) {
      const videoSource = message.temporaryVideo || message.video;
      const isBase64 = videoSource && videoSource.startsWith("data:video/");

      return (
        <div className={cx("message-video", { temporary: message.isTemporary })}>
          <video controls className={cx("video-content")}>
            <source
              src={
                isBase64
                  ? videoSource
                  : videoSource && videoSource.startsWith("http")
                  ? videoSource
                  : `http://localhost:5000${videoSource}`
              }
              type="video/mp4"
            />
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
          {message.uploading && (
            <div className={cx("uploading-indicator")}>
              Đang tải...
            </div>
          )}
        </div>
      );
    }

    if (message.file) {
      return (
        <div className={cx("message-file")}>
          <a
            href={
              message.file.url.startsWith("http")
                ? message.file.url
                : `http://localhost:5000${message.file.url}`
            }
            download={message.file.name}
          >
            {message.file.name}
          </a>
        </div>
      );
    }

    if (typeof message.text === "string" && message.text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = message.text.split(urlRegex);
      return (
        <span>
          {parts.map((part, index) => {
            if (part.match(urlRegex) && isValidUrl(part)) {
              return (
                <a
                  key={index}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx("message-link")}
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
        </span>
      );
    }
    return <span>{message.text || ""}</span>;
  };

  const formatTime = (dateObj) => {
    return dateObj.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatSeparator = (dateObj) => {
    return (
      dateObj.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) +
      " " +
      formatTime(dateObj)
    );
  };

  if (!friend) {
    return (
      <div className={cx("chat")}>
        <div className={cx("empty-state")}>
          <div className={cx("empty-content")}>
            <div className={cx("empty-icon")}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <circle cx="8" cy="12" r="1" fill="currentColor" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <circle cx="16" cy="12" r="1" fill="currentColor" />
              </svg>
            </div>
            <div className={cx("empty-text")}>
              <h2>Chọn một cuộc trò chuyện</h2>
              <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("chat")}>
      <ChatHeader friend={friend} onAvatarClick={handleAvatarClick} onToggleDetail={onToggleDetail} />

      {showSendRequestBar ? (
        <FriendRequestBar friend={friend} onSendRequest={handleSendFriendRequest} isVisible={false} />
      ) : (
        <FriendRequestConfirmationBar
          friend={friend}
          onConfirmRequest={handleConfirmFriendRequest}
          onRejectRequest={handleRejectFriendRequest}
          isVisible={false}
        />
      )}

      <div className={cx("center")} ref={messagesContainerRef}>
        {loading ? (
          <div>Đang tải...</div>
        ) : error ? (
          <div className={cx("error")}>{error}</div>
        ) : (
          messages.map((message, index) => {
            const prevMsg = messages[index - 1];
            const nextMsg = messages[index + 1];
            const currentTime = message.timestamp;

            let showSeparator = false;
            let showTime = false;

            if (!prevMsg) {
              showSeparator = true;
            } else {
              const diffMinutes = (currentTime - prevMsg.timestamp) / 1000 / 60;
              if (diffMinutes >= 10) {
                showSeparator = true;
              }
            }

            if (!nextMsg) {
              showTime = true;
            } else {
              const sameMinute =
                currentTime.getHours() === nextMsg.timestamp.getHours() &&
                currentTime.getMinutes() === nextMsg.timestamp.getMinutes();
              if (!sameMinute) {
                showTime = true;
              }
            }

            return (
              <div key={message.id} className={cx("message-wrapper", message.type)}>
                {showSeparator && (
                  <div className={cx("time-separator")}>
                    <div className={cx("time-separator-content")}>
                      {formatSeparator(message.timestamp)}
                    </div>
                  </div>
                )}
                <div className={cx("message", message.type)}>
                  <div
                    className={cx("message-bubble", {
                      "has-media": message.temporaryImage || message.image || message.temporaryVideo || message.video || message.file,
                      temporary: message.isTemporary,
                    })}
                  >
                    {renderMessageContent(message)}
                  </div>
                  {showTime && (
                    <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {previewImage && <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />}

      <div className={cx("cr")}>
        <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleMediaSelect(e, "image")}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        </label>
        <label className={cx("cr-button")} title="Chọn tệp" aria-label="Chọn tệp để gửi">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: "none" }}
            onChange={(e) => handleMediaSelect(e, "file")}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
          </svg>
        </label>
        <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={(e) => handleMediaSelect(e, "video")}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
        </label>
      </div>

      <div className={cx("input-area")}>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={cx("message-input")}
          aria-label="Nhập tin nhắn"
        />
        <div className={cx("emoji-container")}>
          <button
            className={cx("emoji-button")}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Mở bảng chọn biểu tượng cảm xúc"
          >
            😊
          </button>
          <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmoji(emoji)}
                className={cx("emoji-item")}
                aria-label={`Chọn biểu tượng ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSend}
          className={cx("send-button", { active: text.trim() })}
          aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
        >
          {text.trim() ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
            </svg>
          )}
        </button>
      </div>

      {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
      {showProfile && <ProFile1 onClose={() => setShowProFile(false)} datax={friend} />}
    </div>
  );
}

export default Chat;
