
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import Chat from "~/components/Chat";
import Detail from "~/components/Detail";
import List from "~/components/List";
import List2 from "~/components/List2";
import Sidebar from "~/components/Sidebar";
import Content3 from "~/components/Content3";
import Content2 from "~/components/Content2";
import Content4 from "~/components/Content4";
import Content5 from "~/components/Content5";
import ProFile from "../ProFile";

const cx = classNames.bind(styles);

//Placeholder overlay cho index = 0 (có thể thay bằng component riêng của bạn)
function ProfileOverlay() {
  return (
    <div className={cx("overlay-panel")}>
      <h3>Hồ sơ / Tài khoản</h3>
      <p>Nội dung overlay cho nút 0.</p>
    </div>
  );
}

function Content1() {
  return <div>Danh sách bạn bè</div>;
}

function DashBoard() {
  // 1 = List + Chat (+Detail), 2 = List2 + Content2
  const [mainIndex, setMainIndex] = useState(1);

  // null | 0 | 3 | 4  (0,3,4 là overlay)
  const [overlayIndex, setOverlayIndex] = useState(null);

  // detail trong mainIndex = 1
  const [showDetail, setShowDetail] = useState(false);
  const handleToggleDetail = () => setShowDetail((prev) => !prev);

  // Click từ Sidebar
  const handleSidebarClick = (index) => {
    if (index === 1 || index === 2) {
      // chuyển trang chính -> đóng overlay
      setMainIndex(index);
      setOverlayIndex(null);
    } else if (index === 0 || index === 3 || index === 4) {
      // toggle overlay (0,3,4)
      setOverlayIndex((prev) => (prev === index ? null : index));
    }
  };

  // Sidebar highlight: nếu có overlay -> highlight overlay; không thì highlight main
  const currentSidebarIndex = overlayIndex ?? mainIndex;

  const [selectedItem, setSelectedItem] = useState(1);

  useEffect(() => {
    if (mainIndex === 2) {
      setSelectedItem(1);
    }
  }, [mainIndex]);

  return (
    <div className={cx("container")}>
      <Sidebar
        activeIndex={currentSidebarIndex}
        setActiveIndex={handleSidebarClick}
      />

      <div className={cx("content")}>
        {/* MAIN 1: List + Chat (+Detail) */}
        {mainIndex === 1 && (
          <>
            <List />
            <Chat onToggleDetail={handleToggleDetail} />
            {showDetail && <Detail />}
          </>
        )}

        {/* MAIN 2: List2 + Content2 */}
        {mainIndex === 2 && (
          <>
            <List2 selectedItem={selectedItem} onSelect={setSelectedItem} />
            <div className={cx("content1")}>
              {selectedItem === 1 && <Content3 />}
              {selectedItem === 2 && <Content5 />}
              {selectedItem === 3 && <Content2 />}
              {selectedItem === 4 && <Content4 />}
            </div>
          </>
        )}

      </div>

      {/* OVERLAYS: 0, 3, 4 */}

      {overlayIndex === 0 && <ProFile onClose={() => setOverlayIndex(null)} />}

      {overlayIndex !== null && overlayIndex !== 0 && (
        <div className={cx("floating-overlay")}>
          <div className={cx("overlay-content")}>
            <button
              className={cx("close-btn")}
              onClick={() => setOverlayIndex(null)}
              aria-label="Đóng overlay"
            >
             ×
            </button>

            {overlayIndex === 3 && <ProfileOverlay />}
            {overlayIndex === 4 && <ProFile />}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
