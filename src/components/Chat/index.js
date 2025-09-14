
// import classNames from "classnames/bind";
// import styles from "./Chat.module.scss";
// import { useState, useEffect, useRef } from "react";
// import ProFile1 from "~/pages/ProFile1";

// const cx = classNames.bind(styles);

// // ChatPreview component
// function ChatPreview({ imageUrl, onClose }) {
//   return (
//     <div className={cx("image-preview")} onClick={onClose}>
//       <img src={imageUrl} alt="preview" />
//     </div>
//   );
// }

// // FriendRequestBar component
// function FriendRequestBar({ friend, onSendRequest, isVisible }) {
//   const [isRequestSent, setIsRequestSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendRequest = async () => {
//     setIsLoading(true);
//     try {
//       // Giả lập gọi API gửi lời mời kết bạn
//       setTimeout(() => {
//         onSendRequest(friend.id, friend.name);
//         setIsRequestSent(true);
//         setIsLoading(false);
//       }, 1000);
//     } catch (error) {
//       console.error("Lỗi khi gửi lời mời:", error);
//       setIsLoading(false);
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div className={cx("friend-request-bar")}>
//       <div className={cx("request-content")}>
//         <div className={cx("user-icon")}>
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//           </svg>
//         </div>
//         <span className={cx("request-text")}>
//           {isRequestSent 
//             ? "Bạn đã gửi yêu cầu kết bạn và đang chờ người này đồng ý"
//             : `Gửi yêu cầu kết bạn tới ${friend.name || "Người dùng"} `}
//         </span>
//       </div>
//       <div className={cx("request-actions")}>
//         {!isRequestSent && (
//           <button 
//             className={cx("send-request-btn", { loading: isLoading })}
//             onClick={handleSendRequest}
//             disabled={isLoading}
//             aria-label="Gửi yêu cầu kết bạn"
//           >
//             {isLoading ? "Đang gửi..." : "Gửi kết bạn"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// // FriendRequestConfirmationBar
// function FriendRequestConfirmationBar({ friend, onConfirmRequest, onRejectRequest, isVisible }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [feedback, setFeedback] = useState(null); // { type: "success" | "reject", message: string }
//   const [show, setShow] = useState(isVisible); // kiểm soát hiển thị thanh

//   const handleConfirmRequest = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       onConfirmRequest(friend.id, friend.name);
//       setIsLoading(false);
//       setFeedback({ type: "success", message: `Kết bạn thành công với ${friend.name || "Người dùng"}!` });

//       // Ẩn toàn bộ thanh sau 3 giây
//       setTimeout(() => setShow(false), 3000);
//     }, 1000);
//   };

//   const handleRejectRequest = () => {
//     setTimeout(() => {
//       onRejectRequest(friend.id, friend.name);
//       setFeedback({ type: "reject", message: `Đã từ chối lời mời kết bạn của ${friend.name || "Người dùng"}!` });

//       // Ẩn toàn bộ thanh sau 3 giây
//       setTimeout(() => setShow(false), 3000);
//     }, 500);
//   };

//   if (!show) return null;

//   // Nếu đang hiển thị feedback
//   if (feedback) {
//     const isReject = feedback.type === "reject";
//     return (
//       <div className={cx("friend-request-bar", isReject ? "reject" : "success")}>
//         <div className={cx("request-content")}>
//           <div className={cx("user-icon", isReject ? "reject-icon" : "success-icon")}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               {isReject ? (
//                 <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L12 14.83l-6.29 6.3-1.42-1.41L10.59 12 4.29 5.71 5.71 4.3 12 10.59l6.29-6.3z"/>
//               ) : (
//                 <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
//               )}
//             </svg>
//           </div>
//           <span className={cx("request-text", isReject ? "reject-text" : "success-text")}>
//             {feedback.message}
//           </span>
//         </div>
//       </div>
//     );
//   }

//   // Thanh mặc định trước khi xác nhận/từ chối
//   return (
//     <div className={cx("friend-request-bar")}>
//       <div className={cx("request-content")}>
//         <div className={cx("user-icon")}>
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//           </svg>
//         </div>
//         <span className={cx("request-text")}>
//           {friend.name || "Người dùng"} đã gửi lời mời kết bạn tới bạn
//         </span>
//       </div>
//       <div className={cx("request-actions")}>
//         <button 
//           className={cx("reject-request-btn")}
//           onClick={handleRejectRequest}
//           aria-label="Từ chối yêu cầu kết bạn"
//         >
//           Từ chối
//         </button>
//         <button 
//           className={cx("confirm-request-btn", { loading: isLoading })}
//           onClick={handleConfirmRequest}
//           disabled={isLoading}
//           aria-label="Xác nhận yêu cầu kết bạn"
//         >
//           {isLoading ? "Đang xác nhận..." : "Xác nhận"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // ChatHeader component
// function ChatHeader({ friend, onAvatarClick, onToggleDetail }) {
//   return (
//     <div className={cx("top")}>
//       <div className={cx("user-info")}>
//         <button 
//           className={cx("avatar-button")} 
//           onClick={onAvatarClick} 
//           title="Xem thông tin người dùng" 
//           aria-label="Xem thông tin người dùng"
//         >
//           <div className={cx("avatar-container")}>
//             <img 
//               src={friend.avatar
//                 ? `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${friend.avatar}`
//                 : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/Uploads/default-avatar.png`}
//               alt={friend.name ? `${friend.name}'s avatar` : "Ảnh đại diện người dùng"}
//             />
//             <div className={cx("online-status")}></div>
//           </div>
//         </button>
//         <div className={cx("user-details")}>
//           <h2>{friend.name || "Người dùng"}</h2>
//           <span className={cx("status")}>Đang hoạt động</span>
//         </div>
//       </div>
//       <div className={cx("actions")}>
//         <button className={cx("action-btn")} title="Cuộc gọi thoại" aria-label="Cuộc gọi thoại">📞</button>
//         <button className={cx("action-btn")} title="Video call" aria-label="Video call">🎥</button>
//         <button className={cx("action-btn")} title="Thông tin cuộc trò chuyện" aria-label="Thông tin cuộc trò chuyện">ℹ️</button>
//         <button className={cx("action-btn")} title="Tùy chọn khác" onClick={onToggleDetail} aria-label="Tùy chọn khác">⋮</button>
//       </div>
//     </div>
//   );
// }

// function Chat({ friend, onToggleDetail }) {
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [showProfile, setShowProFile] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null); // State for image preview
//   const messagesContainerRef = useRef(null);

//   // State để kiểm soát: true = hiện RequestBar, false = hiện ConfirmBar
//   const [showSendRequestBar, setShowSendRequestBar] = useState(true); // Mặc định Confirm

//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Chat nhu loz",
//       type: "received",
//       timestamp: new Date("2025-09-12T14:55:00"),
//     },
//     {
//       id: 2,
//       text: "Chào bạn! Bạn có khỏe không? Check this out: https://example.com",
//       type: "sent",
//       timestamp: new Date("2025-09-12T14:55:10"),
//     },
//     {
//       id: 3,
//       type: "received",
//       timestamp: new Date("2025-09-12T14:57:00"),
//       image: "https://picsum.photos/300/200?random=1",
//     },
//     {
//       id: 4,
//       text: "Ảnh đẹp quá!",
//       type: "sent",
//       timestamp: new Date("2025-09-12T14:58:00"),
//     },
//     {
//       id: 5,
//       type: "received",
//       timestamp: new Date("2025-09-12T15:05:00"),
//       video: `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/Uploads/HelloScene.mp4`,
//     },
//     {
//       id: 6,
//       text: "Video hay đấy 😍",
//       type: "sent",
//       timestamp: new Date("2025-09-12T15:07:00"),
//     },
//   ]);

//   const emojis = ["😀", "😂", "😍", "🥰", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

//   // Hàm cuộn xuống cuối
//   const scrollToBottom = () => {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     scrollToBottom();
//   }, []);

//   const handleEmoji = (emoji) => {
//     setText((prev) => prev + emoji);
//     setOpen(false);
//   };

//   const handleSend = () => {
//     if (text.trim()) {
//       const newMessage = {
//         id: Date.now(),
//         text: text.trim(),
//         type: "sent",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, newMessage]);
//       setText("");
//     } else {
//       const likeMessage = {
//         id: Date.now(),
//         text: "👍",
//         type: "sent",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, likeMessage]);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSend();
//     }
//   };

//   const handleAvatarClick = () => {
//     setShowProFile(true);
//   };

//   const handleMediaSelect = (e, mediaType) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) {
//       alert("Tệp quá lớn. Kích thước tối đa là 5MB.");
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
//     try {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const newMessage = {
//           id: Date.now(),
//           type: "sent",
//           timestamp: new Date(),
//         };
//         if (mediaType === "image") {
//           newMessage.image = reader.result;
//         } else if (mediaType === "video") {
//           newMessage.video = reader.result;
//         } else if (mediaType === "file") {
//           newMessage.file = {
//             name: file.name,
//             url: reader.result,
//           };
//         }
//         setMessages((prev) => [...prev, newMessage]);
//       };
//       reader.onerror = () => alert("Lỗi khi đọc tệp.");
//       reader.readAsDataURL(file);
//     } catch (error) {
//       alert("Lỗi khi xử lý tệp.");
//     }
//   };

//   const handleSendFriendRequest = (friendId, friendName) => {
//     console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
//   };

//   const handleConfirmFriendRequest = (friendId, friendName) => {
//     console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
//   };

//   const handleRejectFriendRequest = (friendId, friendName) => {
//     console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
//   };

//   const handleClosePreview = () => {
//     setPreviewImage(null);
//   };

//   const isValidUrl = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const renderMessageContent = (message) => {
//     if (message.image) {
//       return (
//         <div className={cx("message-image")} onClick={() => setPreviewImage(message.image)}>
//           <img src={message.image} alt="Nội dung được chia sẻ" style={{ maxWidth: "100%", borderRadius: "8px" }} />
//         </div>
//       );
//     }
//     if (message.video) {
//       return (
//         <div className={cx("message-video")}>
//           <video controls style={{ maxWidth: "100%", borderRadius: "8px" }}>
//             <source src={message.video} type="video/mp4" />
//             Trình duyệt của bạn không hỗ trợ thẻ video.
//           </video>
//         </div>
//       );
//     }
//     if (message.file) {
//       return (
//         <div className={cx("message-file")}>
//           <a href={message.file.url} download={message.file.name}>
//             {message.file.name}
//           </a>
//         </div>
//       );
//     }
//     if (message.text) {
//       const urlRegex = /(https?:\/\/[^\s]+)/g;
//       const parts = message.text.split(urlRegex);
//       return (
//         <span>
//           {parts.map((part, index) => {
//             if (part.match(urlRegex) && isValidUrl(part)) {
//               return (
//                 <a
//                   key={index}
//                   href={part}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ color: "blue", textDecoration: "underline" }}
//                 >
//                   {part}
//                 </a>
//               );
//             }
//             return part;
//           })}
//         </span>
//       );
//     }
//     return <span>{message.text}</span>;
//   };

//   const formatTime = (dateObj) => {
//     return dateObj.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatSeparator = (dateObj) => {
//     return (
//       dateObj.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" }) +
//       " " +
//       formatTime(dateObj)
//     );
//   };

//   if (!friend) {
//     return (
//       <div className={cx("chat")}>
//         <div className={cx("empty-state")}>
//           <div className={cx("empty-content")}>
//             <div className={cx("empty-icon")}>
//               <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
//                   fill="currentColor"
//                   opacity="0.3"
//                 />
//                 <circle cx="8" cy="12" r="1" fill="currentColor" />
//                 <circle cx="12" cy="12" r="1" fill="currentColor" />
//                 <circle cx="16" cy="12" r="1" fill="currentColor" />
//               </svg>
//             </div>
//             <div className={cx("empty-text")}>
//               <h2>Chọn một cuộc trò chuyện</h2>
//               <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={cx("chat")}>
//       <ChatHeader 
//         friend={friend} 
//         onAvatarClick={handleAvatarClick}
//         onToggleDetail={onToggleDetail}
//       />

//       {/* Conditional: Chỉ hiện 1 bar tại vị trí này */}
//       {showSendRequestBar ? (
//         <FriendRequestBar
//           friend={friend}
//           onSendRequest={handleSendFriendRequest}
//           isVisible={false}
//         />
//       ) : (
//         <FriendRequestConfirmationBar
//           friend={friend}
//           onConfirmRequest={handleConfirmFriendRequest}
//           onRejectRequest={handleRejectFriendRequest}
//           isVisible={false}
//         />
//       )}

//       <div className={cx("center")} ref={messagesContainerRef}>
//         {messages.map((message, index) => {
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
//             <div key={message.id}>
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
//                     "has-media": message.image || message.video || message.file,
//                   })}
//                 >
//                   {renderMessageContent(message)}
//                   {message.text && (message.image || message.video || message.file) && (
//                     <div className={cx("message-text")}>{message.text}</div>
//                   )}
//                 </div>
//                 {showTime && (
//                   <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {previewImage && (
//         <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />
//       )}

//       <div className={cx("cr")}>
//         <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
//           <input
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={(e) => handleMediaSelect(e, "image")}
//           />
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
//           </svg>
//         </label>
//         <label className={cx("cr-button")} title="Chọn file" aria-label="Chọn tệp để gửi">
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.txt"
//             style={{ display: "none" }}
//             onChange={(e) => handleMediaSelect(e, "file")}
//           />
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
//           </svg>
//         </label>
//         <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
//           <input
//             type="file"
//             accept="video/*"
//             style={{ display: "none" }}
//             onChange={(e) => handleMediaSelect(e, "video")}
//           />
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
//           </svg>
//         </label>
//       </div>

//       <div className={cx("input-area")}>
//         <input
//           type="text"
//           placeholder="Nhập tin nhắn..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className={cx("message-input")}
//           aria-label="Nhập tin nhắn"
//         />
//         <div className={cx("emoji-container")}>
//           <button 
//             className={cx("emoji-button")} 
//             onClick={() => setOpen((prev) => !prev)}
//             aria-label="Mở bảng chọn emoji"
//           >
//             😊
//           </button>
//           <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
//             {emojis.map((emoji, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleEmoji(emoji)}
//                 className={cx("emoji-item")}
//                 aria-label={`Chọn emoji ${emoji}`}
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//         </div>
//         <button 
//           onClick={handleSend} 
//           className={cx("send-button", { active: text.trim() })}
//           aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
//         >
//           {text.trim() ? (
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//             </svg>
//           ) : (
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
//       {showProfile && <ProFile1 onClose={() => setShowProFile(false)} />}
//     </div>
//   );
// }

// export default Chat;





// import classNames from "classnames/bind";
// import styles from "./Chat.module.scss";
// import { useState, useEffect, useRef, use } from "react";
// import ProFile1 from "~/pages/ProFile1";
// import ChatPreview from "./ChatPreview";
// import FriendRequestBar from "./FriendRequestBar";
// import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
// import ChatHeader from "./ChatHeader";
// import axios from "axios";

// const cx = classNames.bind(styles);

// function Chat({ friend, onToggleDetail }) {
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [showProfile, setShowProFile] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null); // State for image preview
//   const messagesContainerRef = useRef(null);
  
//   console.log("Rendering Chat component", friend);
//   //console.log("Friend data in Chat component:", friend.id);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  
//   console.log("Friend:", friend);
//   console.log("Friend ID:", friend.id);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!friend || !friend.id) return;

//       try {
//         const messagesApiUrl = await axios.post("http://localhost:5000/api/chat/messages/", {
//           friendId: friend.id,
//         });

//         if (messagesApiUrl.status === 200) {
//           setMessages(messagesApiUrl.data);
//         } else {
//           setError("Lỗi khi tải tin nhắn.");
//         }
//       } catch (err) {
//         setError("Lỗi khi tải tin nhắn.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [friend]);

//   // State để kiểm soát: true = hiện RequestBar, false = hiện ConfirmBar
//   const [showSendRequestBar, setShowSendRequestBar] = useState(false); // Mặc định Confirm

//   // Hàm toggle (gọi để switch giữa 2 bar, fix ESLint)
//   const toggleRequestBar = () => {
//     setShowSendRequestBar(prev => !prev);
//   };

//   // const [messages, setMessages] = useState([
//   //   {
//   //     id: 1,
//   //     text: "Chat nhu loz",
//   //     type: "received",
//   //     timestamp: new Date("2025-09-12T14:55:00"),
//   //   },
//   //   {
//   //     id: 2,
//   //     text: "Chào bạn! Bạn có khỏe không? Check this out: https://example.com",
//   //     type: "sent",
//   //     timestamp: new Date("2025-09-12T14:55:10"),
//   //   },
//   //   {
//   //     id: 3,
//   //     type: "received",
//   //     timestamp: new Date("2025-09-12T14:57:00"),
//   //     image: "https://picsum.photos/300/200?random=1",
//   //     video: null,
//   //     file: null,
//   //   },
//   //   {
//   //     id: 4,
//   //     text: "Ảnh đẹp quá!",
//   //     type: "sent",
//   //     timestamp: new Date("2025-09-12T14:58:00"),
//   //   },
//   //   {
//   //     id: 5,
//   //     type: "received",
//   //     timestamp: new Date("2025-09-12T15:05:00"),
//   //     video: `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/Uploads/HelloScene.mp4`,
//   //   },
//   //   {
//   //     id: 6,
//   //     text: "Video hay đấy 😍",
//   //     type: "sent",
//   //     timestamp: new Date("2025-09-12T15:07:00"),
//   //   },
//   // ]);

//   const emojis = ["😀", "😂", "😍", "�0", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

//   // Hàm cuộn xuống cuối
//   const scrollToBottom = () => {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     scrollToBottom();
//   }, []);

//   const handleEmoji = (emoji) => {
//     setText((prev) => prev + emoji);
//     setOpen(false);
//   };

//   const handleSend = () => {
//     if (text.trim()) {
//       const newMessage = {
//         id: Date.now(),
//         text: text.trim(),
//         type: "sent",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, newMessage]);
//       setText("");
//     } else {
//       const likeMessage = {
//         id: Date.now(),
//         text: "👍",
//         type: "sent",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, likeMessage]);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSend();
//     }
//   };

//   const handleAvatarClick = () => {
//     setShowProFile(true);
//   };

//   const handleMediaSelect = (e, mediaType) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) {
//       alert("Tệp quá lớn. Kích thước tối đa là 5MB.");
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
//     try {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const newMessage = {
//           id: Date.now(),
//           type: "sent",
//           timestamp: new Date(),
//         };
//         if (mediaType === "image") {
//           newMessage.image = reader.result;
//         } else if (mediaType === "video") {
//           newMessage.video = reader.result;
//         } else if (mediaType === "file") {
//           newMessage.file = {
//             name: file.name,
//             url: reader.result,
//           };
//         }
//         setMessages((prev) => [...prev, newMessage]);
//       };
//       reader.onerror = () => alert("Lỗi khi đọc tệp.");
//       reader.readAsDataURL(file);
//     } catch (error) {
//       alert("Lỗi khi xử lý tệp.");
//     }
//   };

//   const handleSendFriendRequest = (friendId, friendName) => {
//     console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
//   };

//   const handleConfirmFriendRequest = (friendId, friendName) => {
//     console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
//   };

//   const handleRejectFriendRequest = (friendId, friendName) => {
//     console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
//   };

//   const handleClosePreview = () => {
//     setPreviewImage(null);
//   };

//   const isValidUrl = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const renderMessageContent = (message) => {
//     if (message.image) {
//       return (
//         <div className={cx("message-image")} onClick={() => setPreviewImage(message.image)} aria-label="Xem trước hình ảnh">
//           <img src={message.image} alt="Nội dung được chia sẻ" style={{ maxWidth: "100%", borderRadius: "8px" }} />
//         </div>
//       );
//     }
//     if (message.video) {
//       return (
//         <div className={cx("message-video")}>
//           <video controls style={{ maxWidth: "100%", borderRadius: "8px" }}>
//             <source src={message.video} type="video/mp4" />
//             Trình duyệt của bạn không hỗ trợ thẻ video.
//           </video>
//         </div>
//       );
//     }
//     if (message.file) {
//       return (
//         <div className={cx("message-file")}>
//           <a href={message.file.url} download={message.file.name}>
//             {message.file.name}
//           </a>
//         </div>
//       );
//     }
//     if (message.text) {
//       const urlRegex = /(https?:\/\/[^\s]+)/g;
//       const parts = message.text.split(urlRegex);
//       return (
//         <span>
//           {parts.map((part, index) => {
//             if (part.match(urlRegex) && isValidUrl(part)) {
//               return (
//                 <a
//                   key={index}
//                   href={part}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ color: "blue", textDecoration: "underline" }}
//                 >
//                   {part}
//                 </a>
//               );
//             }
//             return part;
//           })}
//         </span>
//       );
//     }
//     return <span>{message.text}</span>;
//   };

//   const formatTime = (dateObj) => {
//     return dateObj.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatSeparator = (dateObj) => {
//     return (
//       dateObj.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" }) +
//       " " +
//       formatTime(dateObj)
//     );
//   };

//   if (!friend) {
//     return (
//       <div className={cx("chat")}>
//         <div className={cx("empty-state")}>
//           <div className={cx("empty-content")}>
//             <div className={cx("empty-icon")}>
//               <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
//                   fill="currentColor"
//                   opacity="0.3"
//                 />
//                 <circle cx="8" cy="12" r="1" fill="currentColor" />
//                 <circle cx="12" cy="12" r="1" fill="currentColor" />
//                 <circle cx="16" cy="12" r="1" fill="currentColor" />
//               </svg>
//             </div>
//             <div className={cx("empty-text")}>
//               <h2>Chọn một cuộc trò chuyện</h2>
//               <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={cx("chat")}>
//       <ChatHeader 
//         friend={friend} 
//         onAvatarClick={handleAvatarClick}
//         onToggleDetail={onToggleDetail}
//       />

//       {/* Conditional: Chỉ hiện 1 bar tại vị trí này */}
//       {showSendRequestBar ? (
//         <FriendRequestBar
//           friend={friend}
//           onSendRequest={handleSendFriendRequest}
//           isVisible={false}
//         />
//       ) : (
//         <FriendRequestConfirmationBar
//           friend={friend}
//           onConfirmRequest={handleConfirmFriendRequest}
//           onRejectRequest={handleRejectFriendRequest}
//           isVisible={false}
//         />
//       )}

//       <div className={cx("center")} ref={messagesContainerRef}>
//         {messages.map((message, index) => {
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
//             <div key={message.id}>
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
//                     "has-media": message.image || message.video || message.file,
//                   })}
//                 >
//                   {renderMessageContent(message)}
//                   {message.text && (message.image || message.video || message.file) && (
//                     <div className={cx("message-text")}>{message.text}</div>
//                   )}
//                 </div>
//                 {showTime && (
//                   <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {previewImage && (
//         <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />
//       )}

//       <div className={cx("cr")}>
//         <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
//           <input
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={(e) => handleMediaSelect(e, "image")}
//           />
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
//           </svg>
//         </label>
//         <label className={cx("cr-button")} title="Chọn file" aria-label="Chọn tệp để gửi">
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.txt"
//             style={{ display: "none" }}
//             onChange={(e) => handleMediaSelect(e, "file")}
//           />
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
//           </svg>
//         </label>
//         <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
//           <input
//             type="file"
//             accept="video/*"
//             style={{ display: "none" }}
//             onChange={(e) => handleMediaSelect(e, "video")}
//           />
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
//           </svg>
//         </label>
//       </div>

//       <div className={cx("input-area")}>
//         <input
//           type="text"
//           placeholder="Nhập tin nhắn..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className={cx("message-input")}
//           aria-label="Nhập tin nhắn"
//         />
//         <div className={cx("emoji-container")}>
//           <button 
//             className={cx("emoji-button")} 
//             onClick={() => setOpen((prev) => !prev)}
//             aria-label="Mở bảng chọn emoji"
//           >
//             😊
//           </button>
//           <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
//             {emojis.map((emoji, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleEmoji(emoji)}
//                 className={cx("emoji-item")}
//                 aria-label={`Chọn emoji ${emoji}`}
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//         </div>
//         <button 
//           onClick={handleSend} 
//           className={cx("send-button", { active: text.trim() })}
//           aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
//         >
//           {text.trim() ? (
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//             </svg>
//           ) : (
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
//       {showProfile && <ProFile1 onClose={() => setShowProFile(false)} />}
//     </div>
//   );
// }

// export default Chat;




// import classNames from "classnames/bind";
// import styles from "./Chat.module.scss";
// import { useState, useEffect, useRef } from "react";
// import ProFile1 from "~/pages/ProFile1";
// import ChatPreview from "./ChatPreview";
// import FriendRequestBar from "./FriendRequestBar";
// import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
// import ChatHeader from "./ChatHeader";
// import axios from "axios";

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
//   const isInitialMount = useRef(true); // Dùng để kiểm tra mount lần đầu

//   // Hàm cuộn xuống cuối
//   const scrollToBottom = () => {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//     }
//   };

//   // Gộp hai useEffect thành một
//   useEffect(() => {
//     // Cuộn xuống cuối khi component mount lần đầu hoặc khi messages thay đổi
//     scrollToBottom();
//   }, [messages]);

//   // Fetch tin nhắn từ API
// useEffect(() => {
//   const fetchMessages = async () => {
//     if (!friend || !friend.id) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/chat/messages/", {
//         friendId: friend.id,
//       });

//       //console.log("Response from messages API:", response.data);

//       if (response.status === 200 && Array.isArray(response.data)) {
//         // Transform dữ liệu để khớp cấu trúc component
//         const transformedMessages = response.data.map((msg) => ({
//           id: msg.id,  // msg_5
//           text: msg.message_type === "text" ? msg.content : null,  // Map content -> text cho text message
//           type: msg.sender === "global-id" ? "sent" : "received",  // Map sender để quyết định type (giả sử global-id là user hiện tại)
//           timestamp: new Date(msg.timestamp),  // Convert string ISO sang Date object
//           // Thêm sau nếu API hỗ trợ media: image/video/file từ msg nếu message_type khác
//         })).filter(msg => msg.text || msg.image || msg.video || msg.file);  // Lọc bỏ msg rỗng nếu cần

//         setMessages(transformedMessages);
//       } else {
//         setError("Dữ liệu tin nhắn không hợp lệ.");
//       }
//     } catch (err) {
//       setError("Lỗi khi tải tin nhắn: " + err.message);
//       console.error("Error fetching messages:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchMessages();
// }, [friend]);

//   console.log("messages:", messages);

//   // State để kiểm soát: true = hiện RequestBar, false = hiện ConfirmBar
//   const [showSendRequestBar, setShowSendRequestBar] = useState(false);

//   // Hàm toggle giữa RequestBar và ConfirmBar
//   const toggleRequestBar = () => {
//     setShowSendRequestBar((prev) => !prev);
//   };

//   const emojis = ["😀", "😂", "😍", "😊", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

//   const handleEmoji = (emoji) => {
//     setText((prev) => prev + emoji);
//     setOpen(false);
//   };

//   const handleSend = () => {
//     if (text.trim()) {
//       const newMessage = {
//         id: Date.now(),
//         text: text.trim(),
//         type: "sent",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, newMessage]);
//       setText("");
//     } else {
//       const likeMessage = {
//         id: Date.now(),
//         text: "👍",
//         type: "sent",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, likeMessage]);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSend();
//     }
//   };

//   const handleAvatarClick = () => {
//     setShowProFile(true);
//   };

//   const handleMediaSelect = (e, mediaType) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) {
//       alert("Tệp quá lớn. Kích thước tối đa là 5MB.");
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
//     try {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const newMessage = {
//           id: Date.now(),
//           type: "sent",
//           timestamp: new Date(),
//         };
//         if (mediaType === "image") {
//           newMessage.image = reader.result;
//         } else if (mediaType === "video") {
//           newMessage.video = reader.result;
//         } else if (mediaType === "file") {
//           newMessage.file = {
//             name: file.name,
//             url: reader.result,
//           };
//         }
//         setMessages((prev) => [...prev, newMessage]);
//       };
//       reader.onerror = () => alert("Lỗi khi đọc tệp.");
//       reader.readAsDataURL(file);
//     } catch (error) {
//       alert("Lỗi khi xử lý tệp.");
//     }
//   };

//   const handleSendFriendRequest = (friendId, friendName) => {
//     console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
//   };

//   const handleConfirmFriendRequest = (friendId, friendName) => {
//     console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
//   };

//   const handleRejectFriendRequest = (friendId, friendName) => {
//     console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
//   };

//   const handleClosePreview = () => {
//     setPreviewImage(null);
//   };

//   const isValidUrl = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const renderMessageContent = (message) => {
//     if (message.image) {
//       return (
//         <div className={cx("message-image")} onClick={() => setPreviewImage(message.image)} aria-label="Xem trước hình ảnh">
//           <img src={message.image} alt="Nội dung được chia sẻ" style={{ maxWidth: "100%", borderRadius: "8px" }} />
//         </div>
//       );
//     }
//     if (message.video) {
//       return (
//         <div className={cx("message-video")}>
//           <video controls style={{ maxWidth: "100%", borderRadius: "8px" }}>
//             <source src={message.video} type="video/mp4" />
//             Trình duyệt của bạn không hỗ trợ thẻ video.
//           </video>
//         </div>
//       );
//     }
//     if (message.file) {
//       return (
//         <div className={cx("message-file")}>
//           <a href={message.file.url} download={message.file.name}>
//             {message.file.name}
//           </a>
//         </div>
//       );
//     }
//     if (message.text) {
//       const urlRegex = /(https?:\/\/[^\s]+)/g;
//       const parts = message.text.split(urlRegex);
//       return (
//         <span>
//           {parts.map((part, index) => {
//             if (part.match(urlRegex) && isValidUrl(part)) {
//               return (
//                 <a
//                   key={index}
//                   href={part}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ color: "blue", textDecoration: "underline" }}
//                 >
//                   {part}
//                 </a>
//               );
//             }
//             return part;
//           })}
//         </span>
//       );
//     }
//     return <span>{message.text}</span>;
//   };

//   const formatTime = (dateObj) => {
//     return dateObj.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatSeparator = (dateObj) => {
//     return (
//       dateObj.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" }) +
//       " " +
//       formatTime(dateObj)
//     );
//   };

//   if (!friend) {
//     return (
//       <div className={cx("chat")}>
//         <div className={cx("empty-state")}>
//           <div className={cx("empty-content")}>
//             <div className={cx("empty-icon")}>
//               <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
//                   fill="currentColor"
//                   opacity="0.3"
//                 />
//                 <circle cx="8" cy="12" r="1" fill="currentColor" />
//                 <circle cx="12" cy="12" r="1" fill="currentColor" />
//                 <circle cx="16" cy="12" r="1" fill="currentColor" />
//               </svg>
//             </div>
//             <div className={cx("empty-text")}>
//               <h2>Chọn một cuộc trò chuyện</h2>
//               <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={cx("chat")}>
//       <ChatHeader 
//         friend={friend} 
//         onAvatarClick={handleAvatarClick}
//         onToggleDetail={onToggleDetail}
//       />

//       {showSendRequestBar ? (
//         <FriendRequestBar
//           friend={friend}
//           onSendRequest={handleSendFriendRequest}
//           isVisible={false}
//         />
//       ) : (
//         <FriendRequestConfirmationBar
//           friend={friend}
//           onConfirmRequest={handleConfirmFriendRequest}
//           onRejectRequest={handleRejectFriendRequest}
//           isVisible={false}
//         />
//       )}

//       <div className={cx("center")} ref={messagesContainerRef}>
//         {loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div className={cx("error")}>{error}</div>
//         ) : (
//           messages.map((message, index) => {
//             const prevMsg = messages[index - 1];
//             const nextMsg = messages[index + 1];
//             const currentTime = message.timestamp;

//             let showSeparator = false;
//             let showTime = false;

//             if (!prevMsg) {
//               showSeparator = true;
//             } else {
//               const diffMinutes = (currentTime - prevMsg.timestamp) / 1000 / 60;
//               if (diffMinutes >= 10) {
//                 showSeparator = true;
//               }
//             }

//             if (!nextMsg) {
//               showTime = true;
//             } else {
//               const sameMinute =
//                 currentTime.getHours() === nextMsg.timestamp.getHours() &&
//                 currentTime.getMinutes() === nextMsg.timestamp.getMinutes();
//               if (!sameMinute) {
//                 showTime = true;
//               }
//             }

//             return (
//               <div key={message.id}>
//                 {showSeparator && (
//                   <div className={cx("time-separator")}>
//                     <div className={cx("time-separator-content")}>
//                       {formatSeparator(message.timestamp)}
//                     </div>
//                   </div>
//                 )}
//                 <div className={cx("message", message.type)}>
//                   <div
//                     className={cx("message-bubble", {
//                       "has-media": message.image || message.video || message.file,
//                     })}
//                   >
//                     {renderMessageContent(message)}
//                     {message.text && (message.image || message.video || message.file) && (
//                       <div className={cx("message-text")}>{message.text}</div>
//                     )}
//                   </div>
//                   {showTime && (
//                     <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {previewImage && (
//         <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />
//       )}

//       <div className={cx("cr")}>
//         <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
//           <input
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={(e) => handleMediaSelect(e, "image")}
//           />
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
//           </svg>
//         </label>
//         <label className={cx("cr-button")} title="Chọn file" aria-label="Chọn tệp để gửi">
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.txt"
//             style={{ display: "none" }}
//             onChange={(e) => handleMediaSelect(e, "file")}
//           />
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
//           </svg>
//         </label>
//         <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
//           <input
//             type="file"
//             accept="video/*"
//             style={{ display: "none" }}
//             onChange={(e) => handleMediaSelect(e, "video")}
//           />
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
//           </svg>
//         </label>
//       </div>

//       <div className={cx("input-area")}>
//         <input
//           type="text"
//           placeholder="Nhập tin nhắn..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className={cx("message-input")}
//           aria-label="Nhập tin nhắn"
//         />
//         <div className={cx("emoji-container")}>
//           <button 
//             className={cx("emoji-button")} 
//             onClick={() => setOpen((prev) => !prev)}
//             aria-label="Mở bảng chọn emoji"
//           >
//             😊
//           </button>
//           <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
//             {emojis.map((emoji, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleEmoji(emoji)}
//                 className={cx("emoji-item")}
//                 aria-label={`Chọn emoji ${emoji}`}
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//         </div>
//         <button 
//           onClick={handleSend} 
//           className={cx("send-button", { active: text.trim() })}
//           aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
//         >
//           {text.trim() ? (
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//             </svg>
//           ) : (
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
//       {showProfile && <ProFile1 onClose={() => setShowProFile(false)} />}
//     </div>
//   );
// }

// export default Chat;



import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import { useState, useEffect, useRef } from "react";
import ProFile1 from "~/pages/ProFile1";
import ChatPreview from "./ChatPreview";
import FriendRequestBar from "./FriendRequestBar";
import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
import ChatHeader from "./ChatHeader";
import axios from "axios";

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

  // Hàm cuộn xuống cuối
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Cuộn xuống cuối khi messages thay đổi
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch tin nhắn từ API

  console.log("Fetching messages for friend:", friend);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!friend || !friend.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/api/chat/messages/", {
          friendId: friend.id,
        });
       
        if (response.status === 200 && Array.isArray(response.data)) {
          // Transform dữ liệu để khớp cấu trúc component
          const transformedMessages = response.data.map((msg) => ({
            id: msg.id, 
            text: msg.message_type === "text" ? msg.content : null, // Map content -> text cho text message
            type: msg.sender !== friend.member ? "sent" : "received", // Map sender để quyết định type
            timestamp: new Date(msg.timestamp), // Convert string ISO sang Date object
            image: msg.message_type === "image" ? `http://localhost:5000${msg.url}` : null, // Thêm host cho URL
            video: msg.message_type === "video" ? `http://localhost:5000${msg.url}` : null, // Thêm host cho URL
            file: msg.message_type === "file" ? { name: msg.content, url: `http://localhost:5000${msg.url}` } : null, // name từ content, url từ msg.url
          })).filter(msg => msg.text || msg.image || msg.video || msg.file); // Lọc bỏ msg rỗng

          console.log("Transformed messages:", transformedMessages);
          console.log(friend.member)

          setMessages(transformedMessages);
        } else {
          setError("Dữ liệu tin nhắn không hợp lệ.");
        }
      } catch (err) {
        setError("Lỗi khi tải tin nhắn: " + err.message);
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [friend]);

  // State để kiểm soát: true = hiện RequestBar, false = hiện ConfirmBar
  const [showSendRequestBar, setShowSendRequestBar] = useState(false);

  // Hàm toggle giữa RequestBar và ConfirmBar
  const toggleRequestBar = () => {
    setShowSendRequestBar((prev) => !prev);
  };

  const emojis = ["😀", "😂", "😍", "😊", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

  const handleEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if (text.trim()) {
      const newMessage = {
        id: Date.now(),
        text: text.trim(),
        type: "sent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setText("");

      console.log("Sending message to API:", {
        friendId: friend.id,
      })

      try {
        await axios.post("http://localhost:5000/api/chat/send-message/", {
          id: "",
          conversationId: friend.id,
          sender: friend.sender,
          content: text.trim(),
          message_type: "text",
          timestamp: new Date().toISOString(),
          recipient: friend.member,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      const likeMessage = {
        id: Date.now(),
        text: "👍",
        type: "sent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, likeMessage]);

      try {
        await axios.post("http://localhost:5000/api/chat/send-message/", {
          id: "",
          conversationId: friend.id,
          sender: friend.sender,
          content: "👍",
          message_type: "text",
          timestamp: new Date().toISOString(),
          recipient: friend.member,
        });
      } catch (error) {
        console.error("Error sending like message:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleAvatarClick = () => {
    setShowProFile(true);
  };

  // Hàm xử lý chọn file media
  const handleMediaSelect = async (e, mediaType) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("Không có file được chọn");
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) {
      alert("Tệp quá lớn. Kích thước tối đa là 50MB.");
      console.log("File quá lớn:", file.size);
      return;
    }
    
    if (mediaType === "image" && !file.type.startsWith("image/")) {
      alert("Vui lòng chọn tệp hình ảnh.");
      console.log("File không phải hình ảnh:", file.type);
      return;
    }
    
    if (mediaType === "video" && !file.type.startsWith("video/")) {
      alert("Vui lòng chọn tệp video.");
      console.log("File không phải video:", file.type);
      return;
    }
    
    // HIỂN THỊ TRƯỚC - Tạo preview local
    const reader = new FileReader();
    reader.onload = () => {
      console.log("FileReader onload, preview URL:", reader.result.substring(0, 50) + "..."); // Log base64 (giới hạn để tránh dài)
        
      const tempMessage = {
        id: Date.now() + Math.random(),
        type: "sent",
        timestamp: new Date(),
        uploading: true, // Flag để show loading
        fileName: file.name, // Lưu tên file gốc
      };
        
      if (mediaType === "image") {
        tempMessage.image = reader.result; // Local preview (base64)
      } else if (mediaType === "video") {
        tempMessage.video = reader.result; // Local preview (base64)
      } else if (mediaType === "file") {
        tempMessage.file = {
          name: file.name, // Giữ tên file gốc
          url: reader.result, // Local preview (base64)
        };
      }
        
      // Hiển thị ngay
      setMessages((prev) => {
        const newMessages = [...prev, tempMessage];
        console.log("Messages updated:", newMessages); // Log state mới
        return newMessages;
      });
        
      // UPLOAD SAU - Async
      uploadFileToServer(file, mediaType, tempMessage.id);
    };
    
    reader.onerror = () => {
      alert("Lỗi khi đọc tệp.");
      console.error("FileReader lỗi:", reader.error);
    };
    reader.readAsDataURL(file);
  };

// Hàm upload file lên server
  const uploadFileToServer = async (file, mediaType, messageId) => {
    const formData = new FormData();
    let endpoint;

    // Thêm file vào FormData với tên gốc để hỗ trợ tiếng Việt
    if (mediaType === "image") {
      formData.append("file", file, file.name); // Gửi tên file gốc
      endpoint = "/upload-file";
    } else if (mediaType === "video") {
      formData.append("video", file, file.name); // Gửi tên file gốc
      endpoint = "/upload-video";
    } else if (mediaType === "file") {
      formData.append("file", file, file.name); // Gửi tên file gốc
      endpoint = "/upload-file";
    }

    try {
        // API 1: Upload file
      console.log("⏳ Bắt đầu upload file:", file.name);
      const uploadResponse = await axios.post(`http://localhost:5000${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json", // Đảm bảo response là JSON
        },
      });

      if (uploadResponse.data.url) {
        const filePath = uploadResponse.data.url.replace("http://localhost:5000", ""); // Lấy đường dẫn tương đối

        // Cập nhật message với URL thật từ server
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === messageId) {
              const updatedMsg = { ...msg, uploading: false }; // Xóa flag loading

              if (mediaType === "image") {
                updatedMsg.image = uploadResponse.data.url; // URL đầy đủ cho preview
                updatedMsg.fileName = file.name; // Lưu tên file gốc
              } else if (mediaType === "video") {
                updatedMsg.video = uploadResponse.data.url; // URL đầy đủ cho preview
                updatedMsg.fileName = file.name; // Lưu tên file gốc
              } else if (mediaType === "file") {
                updatedMsg.file = {
                  name: file.name, // Giữ tên file gốc
                  url: uploadResponse.data.url, // URL đầy đủ cho preview
                };
              }

              return updatedMsg;
            }
            return msg;
          })
        );

        console.log("Upload thành công, URL:", uploadResponse.data.url);

        // API 2: Gửi message lên server
        try {
          const messageResponse = await axios.post("http://localhost:5000/api/chat/send-message/", {
            id: "",
            conversationId: friend.id,
            sender: friend.sender,
            content: file.name, // Tên file gốc (ví dụ: "Hình ảnh đẹp.jpg")
            message_type: mediaType,
            timestamp: new Date().toISOString(),
            recipient: friend.member,
            url: filePath, // Đường dẫn tương đối (ví dụ: "/uploads/1231231232.jpg")
          });
          console.log("Message đã lưu server:", messageResponse.data);
        } catch (messageError) {
          console.error("Lỗi gửi message:", messageError);
        }
      }
    } catch (uploadError) {
      console.error("Upload lỗi:", uploadError);

      // Đánh dấu message lỗi
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              uploading: false,
              error: true, // Flag lỗi
            };
          }
          return msg;
        })
      );

      alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
    }
  };

  const handleSendFriendRequest = (friendId, friendName) => {
    console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
  };

  const handleConfirmFriendRequest = (friendId, friendName) => {
    console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
  };

  const handleRejectFriendRequest = (friendId, friendName) => {
    console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const renderMessageContent = (message) => {
    if (message.image) {
      return (
        <div className={cx("message-image")} onClick={() => setPreviewImage(message.image)} aria-label="Xem trước hình ảnh">
          <img src={message.image} alt="Nội dung được chia sẻ" style={{ maxWidth: "100%", borderRadius: "8px" }} />
        </div>
      );
    }
    if (message.video) {
      return (
        <div className={cx("message-video")}>
          <video controls style={{ maxWidth: "100%", borderRadius: "8px" }}>
            <source src={message.video} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
        </div>
      );
    }
    if (message.file) {
      return (
        <div className={cx("message-file")}>
          <a href={message.file.url} download={message.file.name}>
            {message.file.name}
          </a>
        </div>
      );
    }
    if (message.text) {
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
                  style={{ color: "blue", textDecoration: "underline" }}
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
    return <span>{message.text}</span>;
  };

  const formatTime = (dateObj) => {
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatSeparator = (dateObj) => {
    return (
      dateObj.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" }) +
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
      <ChatHeader 
        friend={friend} 
        onAvatarClick={handleAvatarClick}
        onToggleDetail={onToggleDetail}
      />

      {showSendRequestBar ? (
        <FriendRequestBar
          friend={friend}
          onSendRequest={handleSendFriendRequest}
          isVisible={false}
        />
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
          <div>Loading...</div>
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
              <div key={message.id}>
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
                      "has-media": message.image || message.video || message.file,
                    })}
                  >
                    {renderMessageContent(message)}
                    {message.text && (message.image || message.video || message.file) && (
                      <div className={cx("message-text")}>{message.text}</div>
                    )}
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

      {previewImage && (
        <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />
      )}

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
        <label className={cx("cr-button")} title="Chọn file" aria-label="Chọn tệp để gửi">
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
            aria-label="Mở bảng chọn emoji"
          >
            😊
          </button>
          <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmoji(emoji)}
                className={cx("emoji-item")}
                aria-label={`Chọn emoji ${emoji}`}
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
      {showProfile && 
        <ProFile1 
          onClose={() => setShowProFile(false)} 
          datax={friend}
        />}
    </div>
  );
}

export default Chat;