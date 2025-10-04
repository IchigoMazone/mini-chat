

import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './chatList.module.scss';
import { Pin, Users, File, Image, Video } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

const cx = classNames.bind(styles);

function ChatList({ onSelectFriend, chatData1, setUpdateChatList }) {
  const [userChats, setUserChats] = useState([]);
  const [leakInfoMap, setLeakInfoMap] = useState({});
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const socketRef = useRef(null);

  // Lấy danh sách chat
  useEffect(() => {
    if (!chatData1) return;

    const fetchChats = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/chat/chat-list', { userId: chatData1 });
        if (res.status === 200) {
          setUserChats(res.data.chats);
          console.log('[ChatList] Danh sách chat:', res.data);
        }
      } catch (err) {
        console.error('[ChatList] Lỗi khi lấy danh sách chat:', err);
      }
    };

    fetchChats();
  }, [chatData1]);

  // Lấy thông tin người dùng
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const userIdsToFetch = userChats.map((chat) =>
          chat.members.find((member) => member !== chatData1)
        );

        const uniqueUserIds = [...new Set(userIdsToFetch)].filter(userId => !(userId in leakInfoMap));

        if (uniqueUserIds.length === 0) return;

        const promises = uniqueUserIds.map((userId) =>
          axios.post('http://localhost:5000/api/auth/leak-info1', { data: userId })
        );

        const results = await Promise.all(promises);

        const newLeakInfoMap = { ...leakInfoMap };
        results.forEach((res, index) => {
          const userId = uniqueUserIds[index];
          newLeakInfoMap[userId] = res.data;
        });

        setLeakInfoMap(newLeakInfoMap);
        console.log('[ChatList] Thông tin người dùng (map):', newLeakInfoMap);
      } catch (err) {
        console.log('[ChatList] Lỗi khi lấy thông tin người dùng:', err);
      }
    };

    if (userChats.length > 0 && Object.keys(leakInfoMap).length < userChats.length) {
      fetchAll();
    }
  }, [userChats, chatData1, leakInfoMap]);

  // Xử lý WebSocket để lắng nghe tin nhắn
  useEffect(() => {
    if (!chatData1) return;

    socketRef.current = io("http://localhost:5000", {
      query: { userId: chatData1 },
    });

    // Lắng nghe tin nhắn từ người khác (receiveMessage hoặc privateMessage)
    socketRef.current.on("receiveMessage", (data) => {
      console.log("📩 Nhận receiveMessage trong ChatList:", data);
      if (data.message && data.message.conversation_id) {
        updateChatInList(data.message.conversation_id, {
          content: data.message.content,
          sender: data.message.sender,
          timestamp: data.message.timestamp,
          message_type: data.message.message_type,
          url: data.message.url || null,
        });
      } else {
        console.warn('[ChatList] Dữ liệu receiveMessage không hợp lệ:', data);
      }
    });

    socketRef.current.on("privateMessage", (data) => {
      console.log("📩 Nhận privateMessage trong ChatList:", data);
      if (data.message && data.message.conversation_id) {
        updateChatInList(data.message.conversation_id, {
          content: data.message.content,
          sender: data.message.sender,
          timestamp: data.message.timestamp,
          message_type: data.message.message_type,
          url: data.message.url || null,
        });
      } else {
        console.warn('[ChatList] Dữ liệu privateMessage không hợp lệ:', data);
      }
    });

    // Lắng nghe tin nhắn do chính mình gửi (selfMessage)
    socketRef.current.on("selfMessage", (data) => {
      console.log("📩 Tin nhắn do tôi gửi trong ChatList:", data);
      if (data.message && data.message.conversation_id) {
        updateChatInList(data.message.conversation_id, {
          content: data.message.content,
          sender: data.message.sender,
          timestamp: data.message.timestamp,
          message_type: data.message.message_type,
          url: data.message.url || null,
        });
      } else {
        console.warn('[ChatList] Dữ liệu selfMessage không hợp lệ:', data);
      }
    });

    // Lắng nghe cập nhật tin nhắn media (updateMessage)
    socketRef.current.on("updateMessage", (data) => {
      console.log("📩 Nhận updateMessage trong ChatList:", data);
      if (data.message && data.message.conversation_id) {
        updateChatInList(data.message.conversation_id, {
          content: data.message.content || data.message.message_type,
          sender: data.message.sender || chatData1,
          timestamp: data.message.timestamp || new Date().toISOString(),
          message_type: data.message.message_type,
          url: data.message.url || null,
        });
      } else {
        console.warn('[ChatList] Dữ liệu updateMessage không hợp lệ:', data);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [chatData1]);

  // Hàm cập nhật chat khi có tin nhắn mới
  const updateChatInList = (chatId, messageData) => {
    console.log('[ChatList] updateChatInList được gọi với:', { chatId, messageData });
    setUserChats((prevChats) => {
      const chatExists = prevChats.find((chat) => chat.id === chatId || chat._id === chatId);
      if (!chatExists) {
        console.warn('[ChatList] ChatId không tồn tại:', chatId);
        return prevChats;
      }

      const updatedChats = prevChats.map((chat) =>
        chat.id === chatId || chat._id === chatId
          ? {
              ...chat,
              last_message: {
                content:
                  messageData.message_type === 'text'
                    ? messageData.content
                    : messageData.url
                    ? decodeURIComponent(messageData.content)
                    : messageData.message_type,
                sender: messageData.sender,
                timestamp: messageData.timestamp,
                message_type: messageData.message_type,
                url: messageData.url,
              },
            }
          : chat
      );

      // Sắp xếp theo timestamp của last_message
      const sortedChats = [...updatedChats].sort((a, b) => {
        const timeA = new Date(a.last_message?.timestamp || 0).getTime();
        const timeB = new Date(b.last_message?.timestamp || 0).getTime();
        return timeB - timeA;
      });

      console.log('[ChatList] Cập nhật userChats (sorted):', sortedChats);
      return sortedChats;
    });
  };

  // Đăng ký hàm updateChatInList với Dashboard
  useEffect(() => {
    if (setUpdateChatList && typeof setUpdateChatList === 'function') {
      console.log('[ChatList] Đăng ký updateChatInList với Dashboard');
      setUpdateChatList(updateChatInList);
    } else {
      console.warn('[ChatList] setUpdateChatList không phải là hàm hoặc không được truyền:', setUpdateChatList);
    }
  }, [setUpdateChatList]);

  // Cập nhật thời gian real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Xử lý khi chọn một friend
  const handleSelectFriend = (chat) => {
    setSelectedChatId(chat.id);
    onSelectFriend(chat);
    console.log('[ChatList] Đã chọn chat:', { chatId: chat.id, name: chat.name });
  };

  // Logic xử lý dữ liệu chat
  const chatData = userChats.map((chat) => {
    const otherUserId = chat.members.find((member) => member !== chatData1);
    const userInfo = leakInfoMap[otherUserId] || {};

    const timel = chat.last_message?.timestamp;
    const dateToCheck = new Date(timel);
    const now = currentTime;
    const diffMs = now - dateToCheck;

    let tx = '';
    if (diffMs <= 0 || isNaN(diffMs)) tx = 'Vài giây';
    else {
      const diffSeconds = Math.floor(diffMs / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 7) {
        const day = dateToCheck.getDate();
        const month = dateToCheck.getMonth() + 1;
        tx = `${day}/${month}`;
      } else if (diffDays > 0) tx = `${diffDays} ngày`;
      else if (diffHours > 0) tx = `${diffHours} giờ`;
      else if (diffMinutes > 0) tx = `${diffMinutes} phút`;
      else tx = 'Vài giây';
    }

    let msg = '';
    const messageType = chat.last_message?.message_type;
    const prefix = chat.last_message?.sender !== chatData1 ? '' : 'Bạn: ';

    if (messageType === 'text') {
      msg = prefix + (chat.last_message?.content || '');
    } else if (messageType === 'image') {
      msg = prefix + 'Hình ảnh';
    } else if (messageType === 'video') {
      msg = prefix + 'Video';
    } else if (messageType === 'file') {
      msg = prefix + 'Tệp';
    } else {
      msg = prefix + (chat.last_message?.content || '');
    }

    return {
      id: chat._id,
      avatar: userInfo.avatar || '/default-avatar.png',
      name: userInfo.fullname || 'Đang tải...',
      message: msg,
      time: tx,
      unreadCount: 0,
      member: chat.members[0] === chatData1 ? chat.members[1] : chat.members[0],
      gender: userInfo.gender,
      sender: chatData1,
      messageType: messageType,
      timestamp: chat.last_message?.timestamp,
    };
  }).sort((a, b) => {
    const timeA = new Date(a.timestamp || 0).getTime();
    const timeB = new Date(b.timestamp || 0).getTime();
    return timeB - timeA;
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
        {chat.memberCount && <span className={cx('member-count')}>{chat.memberCount}</span>}
      </div>
    );
  };

  return (
    <div className={cx('chatList')}>
      <div className={cx('chat-container')}>
        {chatData.map((chat) => (
          <div
            key={chat.id}
            className={cx('chat-item', { 'selected': chat.id === selectedChatId })}
            onClick={() => handleSelectFriend(chat)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSelectFriend(chat);
              }
            }}
          >
            <div className={cx('avatar-section')}>
              <img 
                src={`https://ichigomazone.s3.amazonaws.com/${chat.avatar}`} 
                alt={chat.name} 
                className={cx('avatar')} 
              />
              {chat.isOfficial && (
                <div className={cx('official-badge')}>
                  <span>Z</span>
                </div>
              )}
            </div>
            <div className={cx('content')}>
              <div className={cx('header')}>
                <div className={cx('title-section')}>
                  {chat.isGroup && renderGroupMembers(chat)}
                  <h3 className={cx('name')}>{chat.name}</h3>
                </div>
                <div className={cx('meta')}>
                  {chat.isPinned && <Pin className={cx('pin-icon')} />}
                  <span className={cx('time')}>{chat.time}</span>
                </div>
              </div>
              <div className={cx('message-section')}>
                <div className={cx('message-wrapper')}>
                  {chat.messageType === 'image' && <Image className={cx('message-icon')} size={16} />}
                  {chat.messageType === 'video' && <Video className={cx('message-icon')} size={16} />}
                  {chat.messageType === 'file' && <File className={cx('message-icon')} size={16} />}
                  <p className={cx('message', 'custom-font')}>{chat.message}</p>
                </div>
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