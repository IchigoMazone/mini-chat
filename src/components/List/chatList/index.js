
import React, { useEffect } from 'react';
import classNames from "classnames/bind";
import styles from "./chatList.module.scss";
import { Pin, Users } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';


const cx = classNames.bind(styles);

function ChatList({ onSelectFriend, chatData1 }) { 

  console.log("Chat List :", chatData1);

  const [userChats, setUserChats] = useState([]);
  const [leakInfoList, setLeakInfoList] = useState([]);

  useEffect(() => {
    if (!chatData1) return;

    const fetchChats = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/chat/chat-list",
          { userId: chatData1 } // gửi userId trong body
        );

        if (res.status === 200) {
          setUserChats(res.data);
          console.log(res.data); // log dữ liệu trả về trực tiếp
        }
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    fetchChats();
  }, [chatData1]);

  console.log("Chat List1 : ", userChats)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const userIdsToFetch = userChats.map(chat =>
          chat.members.find(member => member !== chatData1)
        );

        if (userIdsToFetch.length === 0) return;

        const promises = userIdsToFetch.map(userId =>
          axios.post("http://localhost:5000/api/auth/leak-info1", { data: userId })
        );

        const results = await Promise.all(promises);
        setLeakInfoList(results.map(res => res.data));
        console.log(results.map(res => res.data)); // Sửa ở đây
      } catch (err) {
        console.log("Lỗi khi lấy dữ liệu:", err);
      }
    };

    fetchAll();
  }, [userChats, chatData1]);

  // B5: Duyệt qua từng cuộc trò chuyện và ghép dữ liệu
  const chatData = userChats.map((chat, index) => {
    const userInfo = leakInfoList && leakInfoList[index] ? leakInfoList[index] : {};

    console.log(userInfo.fullname)
    console.log(userChats[index].last_message.sender)
    console.log(chat.last_message.timestamp)
    console.log(userInfo.gender)

    const timel = chat.last_message.timestamp;
    const dateToCheck = new Date(timel);
    const now = new Date();
    const diffMs = now - dateToCheck;

    let tx = "";
    if (diffMs <= 0) tx = "Vài giây";
    else {
      const diffSeconds = Math.floor(diffMs / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 7) {
        const day = dateToCheck.getDate();
        const month = dateToCheck.getMonth() + 1;
        tx = `${day}/${month}`;
      } 
      else if (diffDays > 0) tx = `${diffDays} ngày`;
      else if (diffHours > 0) tx = `${diffHours} giờ`;
      else if (diffMinutes > 0) tx = `${diffMinutes} phút`;
      else tx = "Vài giây";
    }

    console.log(tx);
    
    let msg = "";
    if (chat.last_message.sender !== chatData1) {
      msg = chat.last_message.content;
    }
    else {
      msg ="Bạn: " + chat.last_message.content;
    }

    console.log(chat.members)

    return {
      id: chat.id,
      avatar: userInfo.avatar || "/default-avatar.png",
      name: userInfo.fullname || "Đang tải...",
      message: msg || "",
      time: tx,
      isPinned: true,
      unreadCount: 0,
      member: chat.members[0] === chatData1 ? chat.members[1] : chat.members[0], // Sửa lỗi ở đây
      gender: userInfo.gender,
      sender: chatData1,
    };
  });

  const renderGroupMembers = (chat) => {
    if (!chat.isGroup) return null;
    
    return (
      <div className={cx('group-info')}>
        <Users className={cx('group-icon')} />
        {chat.groupMembers && (
          <div className={cx('member-avatars')}>
            {chat.groupMembers.slice(0, 2).map((member, index) => (
              <div key={index} className={cx('member-avatar')}>
                <img src={member} alt="" />
              </div>
            ))}
          </div>
        )}
        {chat.memberCount && (
          <span className={cx('member-count')}>{chat.memberCount}</span>
        )}
      </div>
    );
  };

  return (
    <div className={cx('chatList')}>
      <div className={cx('chat-container')}>
        {chatData.map((chat) => (
          <div 
            key={chat.id} 
            className={cx('chat-item')} 
            onClick={() => onSelectFriend(chat)} // Thêm sự kiện onClick
            role="button" // Cải thiện khả năng truy cập
            tabIndex={0} // Cho phép focus bằng bàn phím
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { // Hỗ trợ nhấn Enter hoặc Space
                onSelectFriend(chat);
              }
            }}
          >
            {/* Avatar */}
            <div className={cx('avatar-section')}>
              <img 
                src={`http://localhost:5000${chat.avatar}`}
                alt={chat.name}
                className={cx('avatar')}
              />
              {chat.isOfficial && (
                <div className={cx('official-badge')}>
                  <span>Z</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className={cx('content')}>
              <div className={cx('header')}>
                <div className={cx('title-section')}>
                  {chat.isGroup && renderGroupMembers(chat)}
                  <h3 className={cx('name')}>{chat.name}</h3>
                </div>
                <div className={cx('meta')}>
                  {chat.isPinned && (
                    <Pin className={cx('pin-icon')} />
                  )}
                  <span className={cx('time')}>{chat.time}</span>
                </div>
              </div>
              
              <div className={cx('message-section')}>
                <p className={cx('message', 'custom-font')}>{chat.message}</p>
                {chat.unreadCount > 0 && (
                  <div className={cx('unread-badge')}>
                    {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;