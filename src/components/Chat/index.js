
// // import classNames from "classnames/bind";
// // import styles from "./Chat.module.scss";
// // import { useState } from "react";

// // const cx = classNames.bind(styles);

// // function Chat() {
// //   const [open, setOpen] = useState(false);
// //   const [text, setText] = useState("");
// //   const [messages, setMessages] = useState([
// //     { id: 1, text: "Xin chào! Đây là tin nhắn test", type: "received" },
// //     { id: 2, text: "Chào bạn!", type: "sent" },
// //   ]);

// //   // Mock emoji data
// //   const emojis = ["😀", "😂", "😍", "🥰", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

// //   // Hàm xử lý chọn emoji
// //   const handleEmoji = (emoji) => {
// //     setText((prev) => prev + emoji);
// //     setOpen(false);
// //   };

// //   // Hàm xử lý gửi tin nhắn
// //   const handleSend = () => {
// //     if (text.trim()) {
// //       const newMessage = {
// //         id: Date.now(),
// //         text: text.trim(),
// //         type: "sent"
// //       };
// //       setMessages(prev => [...prev, newMessage]);
// //       setText("");
// //       console.log("Đã gửi tin nhắn:", text.trim());
// //     } else {
// //       // Gửi like khi không có text
// //       const likeMessage = {
// //         id: Date.now(),
// //         text: "👍",
// //         type: "sent"
// //       };
// //       setMessages(prev => [...prev, likeMessage]);
// //       console.log("Đã gửi like");
// //     }
// //   };

// //   // Hàm xử lý Enter key
// //   const handleKeyPress = (e) => {
// //     if (e.key === 'Enter') {
// //       handleSend();
// //     }
// //   };

// //   return (
// //     <div className={cx("chat")}>
// //       {/* Top - Header */}
// //       <div className={cx("top")}>
// //         <h2>💬 Chat Test Component</h2>
// //       </div>

// //       {/* Center - Messages */}
// //       <div className={cx("center")}>
// //         {messages.map((message) => (
// //           <div
// //             key={message.id}
// //             className={cx("message", message.type)}
// //           >
// //             <div className={cx("message-bubble")}>
// //               {message.text}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* CR - 3 nút: ảnh, file, sticker */}
// //       <div className={cx("cr")}>
// //         {/* Nút Ảnh */}
// //         <button
// //           className={cx("cr-button")}
// //           onClick={() => console.log('Chọn ảnh')}
// //           title="Chọn ảnh"
// //         >
// //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// //             <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
// //           </svg>
// //         </button>

// //         {/* Nút File */}
// //         <button
// //           className={cx("cr-button")}
// //           onClick={() => console.log('Chọn file')}
// //           title="Chọn file"
// //         >
// //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// //             <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
// //           </svg>
// //         </button>

// //         {/* Nút Sticker */}
// //         <button
// //           className={cx("cr-button")}
// //           onClick={() => console.log('Chọn sticker')}
// //           title="Chọn sticker"
// //         >
// //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// //             <path d="M18.5,12A6.5,6.5 0 0,1 12,18.5A6.5,6.5 0 0,1 5.5,12A6.5,6.5 0 0,1 12,5.5A6.5,6.5 0 0,1 18.5,12M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M15.5,9C15.8,9 16,9.2 16,9.5C16,9.8 15.8,10 15.5,10C15.2,10 15,9.8 15,9.5C15,9.2 15.2,9 15.5,9M8.5,9C8.8,9 9,9.2 9,9.5C9,9.8 8.8,10 8.5,10C8.2,10 8,9.8 8,9.5C8,9.2 8.2,9 8.5,9M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"/>
// //           </svg>
// //         </button>
// //       </div>

// //       {/* Input Area */}
// //       <div className={cx("input-area")}>
// //         {/* Input */}
// //         <input
// //           type="text"
// //           placeholder="Nhập tin nhắn..."
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           onKeyPress={handleKeyPress}
// //           className={cx("message-input")}
// //         />
        
// //         {/* Emoji Button */}
// //         <div className={cx("emoji-container")}>
// //           <button
// //             className={cx("emoji-button")}
// //             onClick={() => setOpen(prev => !prev)}
// //           >
// //             😊
// //           </button>
          
// //           {/* Emoji Picker */}
// //           {open && (
// //             <div className={cx("emoji-picker")}>
// //               {emojis.map((emoji, index) => (
// //                 <button
// //                   key={index}
// //                   onClick={() => handleEmoji(emoji)}
// //                   className={cx("emoji-item")}
// //                 >
// //                   {emoji}
// //                 </button>
// //               ))}
// //             </div>
// //           )}
// //         </div>
        
// //         {/* Send/Like Button */}
// //         <button 
// //           onClick={handleSend}
// //           className={cx("send-button", { "active": text.trim() })}
// //         >
// //           {text.trim() ? (
// //             // Send Icon
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// //               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
// //             </svg>
// //           ) : (
// //             // Like Icon
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// //               <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
// //             </svg>
// //           )}
// //         </button>
// //       </div>

// //       {/* Overlay để đóng emoji picker */}
// //       {open && (
// //         <div 
// //           className={cx("overlay")}
// //           onClick={() => setOpen(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // export default Chat;

// import classNames from "classnames/bind";
// import styles from "./Chat.module.scss";
// import { useState } from "react";
// import { avatarIcon, searchIcon } from "../List/image";

// const cx = classNames.bind(styles);

// function Chat() {
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Xin chào! Đây là tin nhắn test", type: "received" },
//     { id: 2, text: "Chào bạn!", type: "sent" },
//   ]);

//   // Mock emoji data
//   const emojis = ["😀", "😂", "😍", "🥰", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

//   // Hàm xử lý chọn emoji
//   const handleEmoji = (emoji) => {
//     setText((prev) => prev + emoji);
//     setOpen(false);
//   };

//   // Hàm xử lý gửi tin nhắn
//   const handleSend = () => {
//     if (text.trim()) {
//       const newMessage = {
//         id: Date.now(),
//         text: text.trim(),
//         type: "sent"
//       };
//       setMessages(prev => [...prev, newMessage]);
//       setText("");
//       console.log("Đã gửi tin nhắn:", text.trim());
//     } else {
//       // Gửi like khi không có text
//       const likeMessage = {
//         id: Date.now(),
//         text: "👍",
//         type: "sent"
//       };
//       setMessages(prev => [...prev, likeMessage]);
//       console.log("Đã gửi like");
//     }
//   };

//   // Hàm xử lý Enter key
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   return (
//     <div className={cx("chat")}>
//       {/* Top - Header */}
//       <div className={cx("top")}>
//         <img src={ avatarIcon } alt=""/>
//         <h2>Nguyen Dieu Lyng</h2>
//         <button className={cx('icon_1')}>
//           <img src={searchIcon} alt=""/>
//         </button>
//         <button className={cx('icon_2')}>
//           <img src={searchIcon} alt=""/>
//         </button>
//         <button className={cx('icon_3')}>
//           <img src={searchIcon} alt=""/>
//         </button>
//         <button className={cx('icon_4')}>
//           <img src={searchIcon} alt=""/>
//         </button>
//       </div>

//       {/* Center - Messages */}
//       <div className={cx("center")}>
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={cx("message", message.type)}
//           >
//             <div className={cx("message-bubble")}>
//               {message.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* CR - 3 nút: ảnh, file, sticker */}
//       <div className={cx("cr")}>
//         {/* Nút Ảnh */}
//         <button
//           className={cx("cr-button")}
//           onClick={() => console.log('Chọn ảnh')}
//           title="Chọn ảnh"
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
//           </svg>
//         </button>

//         {/* Nút File */}
//         <button
//           className={cx("cr-button")}
//           onClick={() => console.log('Chọn file')}
//           title="Chọn file"
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
//           </svg>
//         </button>

//         {/* Nút Sticker */}
//         <button
//           className={cx("cr-button")}
//           onClick={() => console.log('Chọn sticker')}
//           title="Chọn sticker"
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M18.5,12A6.5,6.5 0 0,1 12,18.5A6.5,6.5 0 0,1 5.5,12A6.5,6.5 0 0,1 12,5.5A6.5,6.5 0 0,1 18.5,12M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M15.5,9C15.8,9 16,9.2 16,9.5C16,9.8 15.8,10 15.5,10C15.2,10 15,9.8 15,9.5C15,9.2 15.2,9 15.5,9M8.5,9C8.8,9 9,9.2 9,9.5C9,9.8 8.8,10 8.5,10C8.2,10 8,9.8 8,9.5C8,9.2 8.2,9 8.5,9M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"/>
//           </svg>
//         </button>
//       </div>

//       {/* Input Area */}
//       <div className={cx("input-area")}>
//         {/* Input */}
//         <input
//           type="text"
//           placeholder="Nhập tin nhắn..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className={cx("message-input")}
//         />
        
//         {/* Emoji Button */}
//         <div className={cx("emoji-container")}>
//           <button
//             className={cx("emoji-button")}
//             onClick={() => setOpen(prev => !prev)}
//           >
//             😊
//           </button>
          
//           {/* Emoji Picker */}
//           {open && (
//             <div className={cx("emoji-picker")}>
//               {emojis.map((emoji, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleEmoji(emoji)}
//                   className={cx("emoji-item")}
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
        
//         {/* Send/Like Button */}
//         <button 
//           onClick={handleSend}
//           className={cx("send-button", { "active": text.trim() })}
//         >
//           {text.trim() ? (
//             // Send Icon
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
//             </svg>
//           ) : (
//             // Like Icon
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Overlay để đóng emoji picker */}
//       {open && (
//         <div 
//           className={cx("overlay")}
//           onClick={() => setOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default Chat;


import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import { useState } from "react";
import { avatarIcon, searchIcon } from "../List/image";

const cx = classNames.bind(styles);

function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Xin chào! Đây là tin nhắn test", 
      type: "received",
      timestamp: "10:30 AM"
    },
    { 
      id: 2, 
      text: "Chào bạn! Bạn có khỏe không?", 
      type: "sent",
      timestamp: "10:31 AM"
    },
    {
      id: 3,
      type: "received",
      timestamp: "10:32 AM",
      image: "https://picsum.photos/300/200?random=1"
    },
    {
      id: 4,
      text: "Ảnh đẹp quá!",
      type: "sent",
      timestamp: "10:33 AM"
    },
    {
      id: 5,
      type: "received",
      timestamp: "10:35 AM",
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 6,
      text: "Video hay đấy 😍",
      type: "sent",
      timestamp: "10:36 AM"
    }
  ]);

  // Mock emoji data
  const emojis = ["😀", "😂", "😍", "🥰", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

  // Hàm xử lý chọn emoji
  const handleEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    setOpen(false);
  };

  // Hàm xử lý gửi tin nhắn
  const handleSend = () => {
    if (text.trim()) {
      const newMessage = {
        id: Date.now(),
        text: text.trim(),
        type: "sent",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMessage]);
      setText("");
      console.log("Đã gửi tin nhắn:", text.trim());
    } else {
      // Gửi like khi không có text
      const likeMessage = {
        id: Date.now(),
        text: "👍",
        type: "sent",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, likeMessage]);
      console.log("Đã gửi like");
    }
  };

  // Hàm xử lý Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Render message content
  const renderMessageContent = (message) => {
    if (message.image) {
      return (
        <div className={cx("message-image")}>
          <img src={message.image} alt="Shared image" />
        </div>
      );
    }
    
    if (message.video) {
      return (
        <div className={cx("message-video")}>
          <video controls>
            <source src={message.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    
    return <span>{message.text}</span>;
  };

  return (
    <div className={cx("chat")}>
      {/* Top - Header */}
      <div className={cx("top")}>
        {/* Back Button */}
        <button className={cx("back-btn")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
          </svg>
        </button>

        {/* User Info */}
        <div className={cx("user-info")}>
          <div className={cx("avatar-container")}>
            <img src={avatarIcon} alt="Avatar" />
            <div className={cx("online-status")}></div>
          </div>
          
          <div className={cx("user-details")}>
            <h2>Nguyen Dieu Lyng</h2>
            <span className={cx("status")}>Đang hoạt động</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={cx("actions")}>
          <button className={cx("action-btn")} title="Cuộc gọi thoại">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
            </svg>
          </button>

          <button className={cx("action-btn")} title="Video call">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/>
            </svg>
          </button>

          <button className={cx("action-btn")} title="Thông tin cuộc trò chuyện">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
            </svg>
          </button>

          <button className={cx("action-btn")} title="Tùy chọn khác">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Center - Messages */}
      <div className={cx("center")}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={cx("message", message.type)}
          >
            <div className={cx("message-bubble", {
              'has-media': message.image || message.video
            })}>
              {renderMessageContent(message)}
              {message.text && (message.image || message.video) && (
                <div className={cx("message-text")}>
                  {message.text}
                </div>
              )}
            </div>
            <div className={cx("message-timestamp")}>
              {message.timestamp}
            </div>
          </div>
        ))}
      </div>

      {/* CR - 3 nút: ảnh, file, sticker */}
      <div className={cx("cr")}>
        {/* Nút Ảnh */}
        <button
          className={cx("cr-button")}
          onClick={() => console.log('Chọn ảnh')}
          title="Chọn ảnh"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </button>

        {/* Nút File */}
        <button
          className={cx("cr-button")}
          onClick={() => console.log('Chọn file')}
          title="Chọn file"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
          </svg>
        </button>

        {/* Nút Sticker */}
        <button
          className={cx("cr-button")}
          onClick={() => console.log('Chọn sticker')}
          title="Chọn sticker"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.5,12A6.5,6.5 0 0,1 12,18.5A6.5,6.5 0 0,1 5.5,12A6.5,6.5 0 0,1 12,5.5A6.5,6.5 0 0,1 18.5,12M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M15.5,9C15.8,9 16,9.2 16,9.5C16,9.8 15.8,10 15.5,10C15.2,10 15,9.8 15,9.5C15,9.2 15.2,9 15.5,9M8.5,9C8.8,9 9,9.2 9,9.5C9,9.8 8.8,10 8.5,10C8.2,10 8,9.8 8,9.5C8,9.2 8.2,9 8.5,9M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"/>
          </svg>
        </button>
      </div>

      {/* Input Area */}
      <div className={cx("input-area")}>
        {/* Input */}
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={cx("message-input")}
        />
        
        {/* Emoji Button */}
        <div className={cx("emoji-container")}>
          <button
            className={cx("emoji-button")}
            onClick={() => setOpen(prev => !prev)}
          >
            😊
          </button>
          
          {/* Emoji Picker */}
          {open && (
            <div className={cx("emoji-picker")}>
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmoji(emoji)}
                  className={cx("emoji-item")}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Send/Like Button */}
        <button 
          onClick={handleSend}
          className={cx("send-button", { "active": text.trim() })}
        >
          {text.trim() ? (
            // Send Icon
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          ) : (
            // Like Icon
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Overlay để đóng emoji picker */}
      {open && (
        <div 
          className={cx("overlay")}
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default Chat;