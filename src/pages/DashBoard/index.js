
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss"
import Chat from "~/components/Chat";
import Detail from "~/components/Detail";
import List from "~/components/List";
import Sidebar from "~/components/Sidebar";
import Content from "~/components/Content";
import Request from "~/components/Request"

const cx = classNames.bind(styles);

function DashBoard() {
    return (
        <div className={cx('container')}>
            <Sidebar/>
            <div className={cx('content')}>
                <List/>
                {/*<Chat/>
                <Detail/> */}
                <Content/>
            </div>
        </div>
    );
}

export default DashBoard;