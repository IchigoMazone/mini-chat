
// import { useState, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import classNames from "classnames/bind";
// import styles from "./Dashboard.module.scss";
// import Sidebar from "~/components/Sidebar";
// import List from "~/components/List";
// import List2 from "~/components/List2";
// import Content2 from "~/components/Content2";
// import Content3 from "~/components/Content3";
// import Content4 from "~/components/Content4";
// import Content5 from "~/components/Content5";
// import Chat from "~/components/Chat";
// import Detail from "~/components/Detail";
// import ProFile from "../ProFile";
// import Logout from "../Logout";
// import axios from "axios";

// const cx = classNames.bind(styles);

// function DashBoard() {
//   const [mainIndex, setMainIndex] = useState(1); // 1 = List, 2 = List2
//   const [overlayIndex, setOverlayIndex] = useState(null); // 0,3,4 = overlay
//   const [showDetail, setShowDetail] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(1);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const location = useLocation();
//   const username = location.state?.username;
//   const [userId, setUserId] = useState("");
//   const updateChatListRef = useRef(null); // Ref để lưu hàm updateChatInList từ ChatList

//   console.log("[Dashboard] Dữ liệu từ Dashboard: ", selectedFriend);
//   console.log (`Dashboard ${username}`);

//   // Fetch userId từ username
//   useEffect(() => {
//     if (!username) return;

//     const fetchUserId = async () => {
//       try {
//         const res = await axios.post("http://localhost:5000/api/auth/leak-id", {
//           username,
//         });
//         if (res.status === 200) {
//           setUserId(res.data.userId);
//           console.log('[Dashboard] User ID:', res.data.userId);
//         }
//       } catch (error) {
//         console.error('[Dashboard] Error fetching user ID:', error);
//       }
//     };

//     fetchUserId();
//   }, [username]);

//   // Callback để xử lý cập nhật tin nhắn
//   const handleUpdateChat = (chatId, message) => {
//     console.log(`[Dashboard] Nhận dữ liệu từ Chat: Chat ${chatId} được cập nhật với tin nhắn:`, message);
//     if (typeof updateChatListRef.current === 'function') {
//       console.log('[Dashboard] Gọi updateChatInList để truyền dữ liệu đến ChatList');
//       updateChatListRef.current(chatId, message); // Gọi hàm updateChatInList từ ChatList
//     } else {
//       console.warn('[Dashboard] updateChatListRef.current không phải là hàm hoặc chưa được gán:', updateChatListRef.current);
//     }
//   };

//   // Hàm để lưu hàm updateChatInList từ ChatList
//   const setUpdateChatList = (updateFn) => {
//     //console.log('[Dashboard] Đã lưu hàm updateChatInList từ ChatList:', updateFn);
//     updateChatListRef.current = updateFn;
//   };

//   const handleToggleDetail = () => setShowDetail((prev) => !prev);

//   const handleSidebarClick = (index) => {
//     if (index === 1 || index === 2) {
//       setMainIndex(index);
//       setOverlayIndex(null);
//     } else if (index === 0 || index === 4) {
//       setOverlayIndex((prev) => (prev === index ? null : index));
//     }
//   };

//   const currentSidebarIndex = overlayIndex ?? mainIndex;

//   const handleSelectFriend = (friend) => {
//     setSelectedFriend(friend);
//     console.log("[Dashboard] Selected friend:", friend);
//   };

//   useEffect(() => {
//     if (mainIndex === 2 && !selectedFriend) {
//       setSelectedItem(1);
//     }
//   }, [mainIndex, selectedFriend]);

//   return (
//     <div className={cx("container")}>
//       {/* Sidebar */}
//       <Sidebar 
//         activeIndex={currentSidebarIndex}
//         setActiveIndex={handleSidebarClick}
//         datax={userId} 
//       />

//       {/* Main Content */}
//       <div className={cx("content")}>
//         {mainIndex === 1 && (
//           <>
//             <List 
//               onSelectFriend={handleSelectFriend}
//               selectedFriend={selectedFriend} 
//               datax={userId}
//               onUpdateChat={handleUpdateChat}
//               setUpdateChatList={setUpdateChatList} // Truyền hàm để lưu updateChatInList
//             />
//             <Chat 
//               friend={selectedFriend}
//               onToggleDetail={handleToggleDetail}
//               onUpdateChat={handleUpdateChat}
//             />
//             {showDetail && 
//               <Detail 
//                 friend={selectedFriend}
//               />}
//           </>
//         )}

//         {mainIndex === 2 && (
//           <>
//             <List2
//               selectedItem={selectedItem}
//               onSelect={(item) => {
//                 setSelectedItem(item);
//                 setSelectedFriend(null);
//               }}
//               onSelectFriend={handleSelectFriend}
//             />
//             <div className={cx("content1")}>
//               {selectedFriend ? (
//                 <>
//                   <Chat 
//                     friend={selectedFriend} 
//                     onToggleDetail={handleToggleDetail} 
//                     onUpdateChat={handleUpdateChat}
//                   />
//                   {showDetail && <Detail />}
//                 </>
//               ) : (
//                 <>
//                   {selectedItem === 1 && <Content3 onSelectFriend={handleSelectFriend} />}
//                   {selectedItem === 2 && <Content5 />}
//                   {selectedItem === 3 && <Content2 onSelectFriend={handleSelectFriend} />}
//                   {selectedItem === 4 && <Content4 />}
//                 </>
//               )}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Overlays */}
//       {overlayIndex === 0 && 
//         <ProFile 
//           onClose={() => setOverlayIndex(null)} 
//           datax={userId}
//         />}
//       {/* {overlayIndex === 3 && <ProfileOverlay />} */}
//       {overlayIndex === 4 && (
//         <Logout
//           onClose={() => setOverlayIndex(null)}
//           onLogout={() => setOverlayIndex(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default DashBoard;






import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import Sidebar from "~/components/Sidebar";
import List from "~/components/List";
import List2 from "~/components/List2";
import Content2 from "~/components/Content2";
import Content3 from "~/components/Content3";
import Content4 from "~/components/Content4";
import Content5 from "~/components/Content5";
import Chat from "~/components/Chat";
import Detail from "~/components/Detail";
import ProFile from "../ProFile";
import Logout from "../Logout";
import axios from "axios";

const cx = classNames.bind(styles);

function DashBoard() {
  const [mainIndex, setMainIndex] = useState(1);
  const [overlayIndex, setOverlayIndex] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(1);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const location = useLocation();
  const username = location.state?.username;
  const [userId, setUserId] = useState("");
  const updateChatListRef = useRef(null);

  console.log("[Dashboard] Dữ liệu từ Dashboard: ", selectedFriend);
  console.log(`Dashboard ${username}`);

  useEffect(() => {
    if (!username) return;

    const fetchUserId = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/leak-id", {
          username,
        });
        if (res.status === 200) {
          setUserId(res.data.userId);
          console.log('[Dashboard] User ID:', res.data.userId);
        }
      } catch (error) {
        console.error('[Dashboard] Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, [username]);

  const handleUpdateChat = (chatId, message) => {
    console.log(`[Dashboard] Nhận dữ liệu từ Chat: Chat ${chatId} được cập nhật với tin nhắn:`, message);
    if (typeof updateChatListRef.current === 'function') {
      console.log('[Dashboard] Gọi updateChatInList để truyền dữ liệu đến ChatList');
      updateChatListRef.current(chatId, message);
    } else {
      console.warn('[Dashboard] updateChatListRef.current không phải là hàm hoặc chưa được gán:', updateChatListRef.current);
    }
  };

  const setUpdateChatList = (updateFn) => {
    updateChatListRef.current = updateFn;
  };

  const handleToggleDetail = () => setShowDetail((prev) => !prev);

  const handleSidebarClick = (index) => {
    if (index === 1 || index === 2) {
      setMainIndex(index);
      setOverlayIndex(null);
    } else if (index === 0 || index === 4) {
      setOverlayIndex((prev) => (prev === index ? null : index));
    }
  };

  const currentSidebarIndex = overlayIndex ?? mainIndex;

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    console.log("[Dashboard] Selected friend:", friend);
  };

  useEffect(() => {
    if (mainIndex === 2 && !selectedFriend) {
      setSelectedItem(1);
    }
  }, [mainIndex, selectedFriend]);

  return (
    <div className={cx("container")}>
      {/* Sidebar - THÊM className */}
      <div className={cx("sidebar")}>
        <Sidebar 
          activeIndex={currentSidebarIndex}
          setActiveIndex={handleSidebarClick}
          datax={userId} 
        />
      </div>

      {/* Main Content */}
      <div className={cx("content")}>
        {mainIndex === 1 && (
          <>
            <div className={cx("list")}>
              <List 
                onSelectFriend={handleSelectFriend}
                selectedFriend={selectedFriend} 
                datax={userId}
                onUpdateChat={handleUpdateChat}
                setUpdateChatList={setUpdateChatList}
              />
            </div>

            <div className={cx("chat")}>
              <Chat 
                friend={selectedFriend}
                onToggleDetail={handleToggleDetail}
                onUpdateChat={handleUpdateChat}
              />
            </div>

            {showDetail && (
              <div className={cx("detail")}>
                <Detail friend={selectedFriend} />
              </div>
            )}
          </>
        )}

        {mainIndex === 2 && (
          <>
            {/* List2 - THÊM className */}
            <div className={cx("list")}>
              <List2
                selectedItem={selectedItem}
                onSelect={(item) => {
                  setSelectedItem(item);
                  setSelectedFriend(null);
                }}
                onSelectFriend={handleSelectFriend}
              />
            </div>

            <div className={cx("content1")}>
              {selectedFriend ? (
                <>
                  {/* Chat - THÊM className */}
                  <div className={cx("chat")}>
                    <Chat 
                      friend={selectedFriend} 
                      onToggleDetail={handleToggleDetail} 
                      onUpdateChat={handleUpdateChat}
                    />
                  </div>

                  {/* Detail - THÊM className */}
                  {showDetail && (
                    <div className={cx("detail")}>
                      <Detail />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {selectedItem === 1 && <Content3 onSelectFriend={handleSelectFriend} />}
                  {selectedItem === 2 && <Content5 />}
                  {selectedItem === 3 && <Content2 onSelectFriend={handleSelectFriend} />}
                  {selectedItem === 4 && <Content4 />}
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Overlays */}
      {overlayIndex === 0 && 
        <ProFile 
          onClose={() => setOverlayIndex(null)} 
          datax={userId}
        />}
      {overlayIndex === 4 && (
        <Logout
          onClose={() => setOverlayIndex(null)}
          onLogout={() => setOverlayIndex(null)}
        />
      )}
    </div>
  );
}

export default DashBoard;