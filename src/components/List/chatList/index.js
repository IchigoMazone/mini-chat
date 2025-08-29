
import React from 'react';
import classNames from "classnames/bind";
import styles from "./chatList.module.scss";
import { Pin, Users } from 'lucide-react';
import { avatarIcon } from '../image';

const cx = classNames.bind(styles);

function ChatList() {
  const chatData = [
    {
      id: 1,
      avatar: avatarIcon,
      name: "IF KOHOC RETURN 0",
      message: "Trần Đức Minh: @Trần Nhật quá m...",
      time: "12 giờ",
      isPinned: true,
      isGroup: false,
      unreadCount: 0
    },
    {
      id: 2,
      avatar: avatarIcon,
      name: "XT_01/01 Sau Hàng - Lại Xá ...",
      message: "Qeenlin: Dạ vâng a",
      time: "4 ngày",
      isPinned: true,
      isGroup: false,
      unreadCount: 0
    },
    {
      id: 3,
      avatar: avatarIcon,
      name: "Cloud của tôi",
      message: "Bạn: 👍",
      time: "2 ngày",
      isPinned: true,
      isGroup: false,
      unreadCount: 0
    },
    {
      id: 4,
      avatar: avatarIcon,
      name: "K17-KHMT (AI n KHDL)",
      message: "Cntt Pka: Ngó Minh Quân nhé",
      time: "4 ngày",
      isPinned: true,
      isGroup: true,
      unreadCount: 0,
      groupMembers: ["https://via.placeholder.com/16x16/6b7280/ffffff", "https://via.placeholder.com/16x16/ef4444/ffffff"]
    },
    {
      id: 5,
      avatar: avatarIcon,
      name: "🎓 Hỗ trợ sinh viên học trẻ...",
      message: "Hieu: @Trang Nguyễn Có ơi có re...",
      time: "2 phút",
      isPinned: false,
      isGroup: true,
      unreadCount: 1,
      groupMembers: ["https://via.placeholder.com/16x16/6b7280/ffffff", "https://via.placeholder.com/16x16/ef4444/ffffff"],
      memberCount: "99+"
    },
    {
      id: 6,
      avatar: avatarIcon,
      name: "Trịnh Như Chuyển",
      message: "ủa ngập ghé thất",
      time: "22 phút",
      isPinned: false,
      isGroup: false,
      unreadCount: 0
    },
    {
      id: 7,
      avatar: avatarIcon,
      name: "🎓 [NN-TH6] NGOẠI NGỮ, ...",
      message: "🗣️ tham gia cuộc bình chọn Trun...",
      time: "13 giờ",
      isPinned: false,
      isGroup: true,
      unreadCount: 2,
      groupMembers: ["https://via.placeholder.com/16x16/6b7280/ffffff", "https://via.placeholder.com/16x16/ef4444/ffffff"],
      memberCount: "99+"
    },
    {
      id: 8,
      avatar: avatarIcon,
      name: "Bố",
      message: "📞 Cuộc gọi video nhỏ",
      time: "13 giờ",
      isPinned: false,
      isGroup: false,
      unreadCount: 0
    },
    {
      id: 9,
      avatar: avatarIcon,
      name: "Zalo",
      message: "Chào mừng bạn quay trở lại Zalo P...",
      time: "2 ngày",
      isPinned: false,
      isGroup: false,
      unreadCount: 0,
      isOfficial: true
    },
    {
      id: 10,
      avatar: avatarIcon,
      name: "🎓 E-learning Phenikaa (H...",
      message: "Huyền My: E có sửa nnayr rồi mà v...",
      time: "2 ngày",
      isPinned: false,
      isGroup: true,
      unreadCount: 37,
      groupMembers: ["https://via.placeholder.com/16x16/6b7280/ffffff", "https://via.placeholder.com/16x16/ef4444/ffffff"],
      memberCount: "99+"
    },
    {
      id: 11,
      avatar: avatarIcon,
      name: "🎓 CLB Yêu An Toàn Thông ...",
      message: "Đỗ Duy: Họp nội bộ nhanh 👋",
      time: "2 ngày",
      isPinned: false,
      isGroup: true,
      unreadCount: 0,
      groupMembers: ["https://via.placeholder.com/16x16/6b7280/ffffff", "https://via.placeholder.com/16x16/ef4444/ffffff"],
      memberCount: "99+"
    },
    {
      id: 12,
      avatar: avatarIcon,
      name: "🎓 Thông báo tổng hợp KI...",
      message: "Cntt Pka: @All",
      time: "3 ngày",
      isPinned: false,
      isGroup: true,
      unreadCount: 0,
      groupMembers: ["https://via.placeholder.com/16x16/6b7280/ffffff", "https://via.placeholder.com/16x16/ef4444/ffffff"],
      memberCount: "99+"
    },
    // Thêm một số item để test cuộn
    {
      id: 13,
      avatar: avatarIcon,
      name: "Test Chat 1",
      message: "Test message để kiểm tra cuộn",
      time: "1 ngày",
      isPinned: false,
      isGroup: false,
      unreadCount: 5
    },
    {
      id: 14,
      avatar: avatarIcon,
      name: "Test Chat 2",
      message: "Tin nhắn test thêm nữa",
      time: "2 ngày",
      isPinned: false,
      isGroup: true,
      unreadCount: 0,
      groupMembers: ["https://via.placeholder.com/16x16/6b7280/ffffff"],
      memberCount: "50+"
    },
    {
      id: 15,
      avatar: avatarIcon,
      name: "Test Chat 3",
      message: "Cuộn xuống để xem chat này",
      time: "3 ngày",
      isPinned: false,
      isGroup: false,
      unreadCount: 1
    },
    {
      id: 16,
      avatar: avatarIcon,
      name: "Test Chat 4",
      message: "Item cuối cùng để test",
      time: "4 ngày",
      isPinned: false,
      isGroup: false,
      unreadCount: 0
    }
  ];

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
          <div key={chat.id} className={cx('chat-item')}>
            {/* Avatar */}
            <div className={cx('avatar-section')}>
              <img 
                src={chat.avatar} 
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
// //Danh sach Tin nhan






// import React, { useState } from 'react';
// import classNames from "classnames/bind";
// import styles from "./chatList.module.scss";
// import { Users, UserPlus, UsersRound, UserCheck } from 'lucide-react';

// const cx = classNames.bind(styles);

// function ChatList() {
//   const [selectedItem, setSelectedItem] = useState(1);

//   const menuItems = [
//     {
//       id: 1,
//       icon: <Users size={20} />,
//       title: "Danh sách bạn bè"
//     },
//     {
//       id: 2,
//       icon: <UsersRound size={20} />,
//       title: "Danh sách nhóm và cộng đồng"
//     },
//     {
//       id: 3,
//       icon: <UserPlus size={20} />,
//       title: "Lời mời kết bạn"
//     },
//     {
//       id: 4,
//       icon: <UserCheck size={20} />,
//       title: "Lời mời vào nhóm và cộng đồng"
//     }
//   ];

//   const handleItemClick = (itemId) => {
//     setSelectedItem(itemId);
//   };

//   return (
//     <div className={cx('chatList')}>
//       <div className={cx('menu-container')}>
//         {menuItems.map((item) => (
//           <div 
//             key={item.id} 
//             className={cx('menu-item', { 'selected': selectedItem === item.id })}
//             onClick={() => handleItemClick(item.id)}
//           >
//             <div className={cx('icon-wrapper')}>
//               {item.icon}
//             </div>
//             <span className={cx('menu-title')}>{item.title}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ChatList;
// // Menu 2



// import React from 'react';
// import classNames from "classnames/bind";
// import styles from "./chatList.module.scss";
// import { avatarIcon } from '../image';

// const cx = classNames.bind(styles);

// function ChatList() {
//   const chatData = [
//     {
//       id: 1,
//       avatar: avatarIcon,
//       name: "Cục Quản lý đề điều và PCTT"
//     },
//     {
//       id: 2,
//       avatar: avatarIcon,
//       name: "Minh Dương"
//     },
//     {
//       id: 3,
//       avatar: avatarIcon,
//       name: "Tuấn Huy"
//     },
//     {
//       id: 4,
//       avatar: avatarIcon,
//       name: "Giáp Vân Trang"
//     },
//     {
//       id: 5,
//       avatar: avatarIcon,
//       name: "IF KOHOC RETURN 0"
//     },
//     {
//       id: 6,
//       avatar: avatarIcon,
//       name: "SS-NHẬT"
//     },
//     {
//       id: 7,
//       avatar: avatarIcon,
//       name: "Huy Hoàn"
//     },
//     {
//       id: 8,
//       avatar: avatarIcon,
//       name: "Kiều Quân"
//     },
//     {
//       id: 9,
//       avatar: avatarIcon,
//       name: "Quốc Thiện"
//     },
//     {
//       id: 6,
//       avatar: avatarIcon,
//       name: "SS-NHẬT"
//     },
//     {
//       id: 7,
//       avatar: avatarIcon,
//       name: "Huy Hoàn"
//     },
//     {
//       id: 8,
//       avatar: avatarIcon,
//       name: "Kiều Quân"
//     },
//     {
//       id: 9,
//       avatar: avatarIcon,
//       name: "Quốc Thiện"
//     }
//   ];

//   return (
//     <div className={cx('chatList')}>
//       <div className={cx('chat-container')}>
//         {chatData.map((chat) => (
//           <div key={chat.id} className={cx('chat-item')}>
//             <div className={cx('avatar-section')}>
//               <img 
//                 src={chat.avatar} 
//                 alt={chat.name}
//                 className={cx('avatar')}
//               />
//             </div>

//             <div className={cx('content')}>
//               <h3 className={cx('name')}>{chat.name}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ChatList;
// //Danh sach ban be






