
import classNames from "classnames/bind";
import styles from "./List.module.scss";
import UserInfo from "./userInfo";
import ChatList from "./chatList";

const cx = classNames.bind(styles);

function List() {
    return ( 
        <div className={cx('list')}>
            <UserInfo/>
            <ChatList/>
        </div>
    );
}

export default List;
