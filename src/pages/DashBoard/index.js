
import { useState, useEffect } from "react";
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
import { io } from "socket.io-client";

const cx = classNames.bind(styles);

function ProfileOverlay() {
  return (
    <div className={cx("overlay-panel")}>
      <h3>Hồ sơ / Tài khoản</h3>
      <p>Nội dung overlay cho nút 3.</p>
    </div>
  );
}

function DashBoard() {
  const [mainIndex, setMainIndex] = useState(1); // 1 = List, 2 = List2
  const [overlayIndex, setOverlayIndex] = useState(null); // 0,3,4 = overlay
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(1);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const location = useLocation();
  const username = location.state?.username;
  const [userId, setUserId] = useState("");

  console.log("Du lieu tu Dashboard: ", selectedFriend)

  useEffect(() => {
    if (!username) return;

    const fetchUserId = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/leak-id", {
          username
        });
        if (res.status === 200) {
          setUserId(res.data.userId);
          console.log('User ID:', res.data.userId);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, [username]); // gọi lại nếu use

  console.log("Username:", username); // Sửa lại cho đúng

  const handleToggleDetail = () => setShowDetail((prev) => !prev);

  const handleSidebarClick = (index) => {
    if (index === 1 || index === 2) {
      setMainIndex(index);
      setOverlayIndex(null);
    } else if (index === 0 || index === 3 || index === 4) {
      setOverlayIndex((prev) => (prev === index ? null : index));
    }
  };

  const currentSidebarIndex = overlayIndex ?? mainIndex;

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    console.log("Dashboard", friend)
  };

  useEffect(() => {
    if (mainIndex === 2 && !selectedFriend) {
      setSelectedItem(1);
    }
  }, [mainIndex, selectedFriend]);

  return (
    <div className={cx("container")}>
      {/* Sidebar */}
      <Sidebar 
        activeIndex={currentSidebarIndex}
        setActiveIndex={handleSidebarClick}
        datax={userId} 
      />

      {/* Main Content */}
      <div className={cx("content")}>
        {mainIndex === 1 && (
          <>
            <List 
              onSelectFriend={handleSelectFriend}
              selectedFriend={selectedFriend} 
              datax={userId} 
            />
            <Chat 
              friend={selectedFriend}
              onToggleDetail={handleToggleDetail}
            />
            {showDetail && 
              <Detail 
                friend={selectedFriend}
              />}
          </>
        )}

        {mainIndex === 2 && (
          <>
            <List2
              selectedItem={selectedItem}
              onSelect={(item) => {
                setSelectedItem(item);
                setSelectedFriend(null);
              }}
              onSelectFriend={handleSelectFriend}
            />
            <div className={cx("content1")}>
              {selectedFriend ? (
                <>
                  <Chat friend={selectedFriend} onToggleDetail={handleToggleDetail} />
                  {showDetail && <Detail />}
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
      {overlayIndex === 3 && <ProfileOverlay />}
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

