
// // import classNames from "classnames/bind";
// // import styles from "./Chat.module.scss";
// // import { avatarIcon, videoIcon, plusIcon, minusIcon } from "../List/image";
// // import EmojiPicker from "emoji-picker-react";
// // import { useState } from "react";


// // const cx = classNames.bind(styles);

// // function Chat() {
// //     const [open, setOpen] = useState(false);
// //     const [text, setText] = useState("");

// //     const handleEmoji = (e) => {
// //         setText((prev) => prev + e.emoji);
// //         setOpen(false);
// //     };

// //     console.log(text);

// //     return (
// //         <div className={cx('chat')}>
// //             <div className={cx('top')}>
// //                 <div className={cx('user')}>
// //                     <img src={avatarIcon} alt=""/>
// //                     <div className={cx('text')}>
// //                         <span>Nguyen Dieu Lyng</span>
// //                         <p>Hello</p>
// //                     </div>
// //                 </div>
// //                 <div className={cx('icons')}>
// //                     <img src={plusIcon} alt=""/>
// //                     <img src={videoIcon} alt=""/>
// //                     <img src={minusIcon} alt=""/>
// //                 </div>
// //             </div>
// //             <div className={cx('center')}>
// //                 <div className={cx('message')}>
// //                     <img src={avatarIcon} alt=""/>
// //                     <div className={cx('texts')}>
// //                         <p>
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                         </p>
// //                         <span>1 min ago</span>1
// //                     </div>
// //                 </div>
// //                 <div className={cx('message own')}>
// //                     <img src={avatarIcon} alt=""/>
// //                     <div className={cx('texts')}>
// //                         <p>
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                         </p>
// //                         <span>1 min ago</span>1
// //                     </div>
// //                 </div>
// //                 <div className={cx('message')}>
// //                     <img src={avatarIcon} alt=""/>
// //                     <div className={cx('texts')}>
// //                         <p>
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                         </p>
// //                         <span>1 min ago</span>1
// //                     </div>
// //                 </div>
// //                 <div className={cx('message own')}>
// //                     <div className={cx('texts')}>
// //                         <img src="https://nld.mediacdn.vn/thumb_w/698/291774122806476800/2025/8/23/anh-chup-man-hinh-2025-08-23-luc-142107-1755934691472254736667.png"/>
// //                         <p>
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                         </p>
// //                         <span>1 min ago</span>1
// //                     </div>
// //                 </div>
// //                 <div className={cx('message')}>
// //                     <img src={avatarIcon} alt=""/>
// //                     <div className={cx('texts')}>
// //                         <p>
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
// //                         </p>
// //                         <span>1 min ago</span>1
// //                     </div>
// //                 </div>
// //             </div>
// //             <div className={cx('right')}>
// //                 <div className={cx('icons')}>
// //                     <img src={plusIcon} alt=""/>
// //                     <img src={videoIcon} alt=""/>
// //                     <img src={minusIcon} alt=""/>
// //                 </div>
// //                 <input type="text" placeholder="Type a message..."
// //                 value={text}
// //                 onChange={(e) => setText(e.target.value)}/>
// //                 <div className={cx('emoji')}>
// //                     <img src={videoIcon} alt=""
// //                     onClick={() => setOpen(prev => !prev)}/>
// //                     <div className={cx('picker')}>
// //                         <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
// //                     </div>
// //                 </div>
// //                 <button className={cx('sendButton')}Send></button>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Chat;



// import classNames from "classnames/bind";
// import styles from "./Chat.module.scss";
// import { avatarIcon, videoIcon, plusIcon, minusIcon } from "../List/image";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useState, useRef } from "react";

// const cx = classNames.bind(styles);

// function Chat() {
//     const [open, setOpen] = useState(false);
//     const [text, setText] = useState("");
//     const endRef = useRef(null);

//     useEffect(() => {
//         endRef.current?.scrollIntoView({ behavior : "smooth"})
//     }, []);

//     const handleEmoji = (e) => {
//         setText((prev) => prev + e.emoji);
//         setOpen(false);
//     };

//     console.log(text);

//     return (
//         <div className={cx('chat')}>
//             <div className={cx('top')}>
//                 <div className={cx('user')}>
//                     <img src={avatarIcon} alt=""/>
//                     <div className={cx('texts')}>
//                         <span>Nguyen Dieu Lyng</span>
//                         <p>Hello</p>
//                     </div>
//                 </div>
//                 <div className={cx('icon')}>
//                     <img src={plusIcon} alt=""/>
//                     <img src={videoIcon} alt=""/>
//                     <img src={minusIcon} alt=""/>
//                 </div>
//             </div>
//             <div className={cx('center')}>
//                 <div className={cx('message')}>
//                     <img src={avatarIcon} alt=""/>
//                     <div className={cx('texts')}>
//                         <p>
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                         </p>
//                         <span>1 min ago</span>
//                     </div>
//                 </div>
//                 <div className={cx('message', 'own')}>
//                     <div className={cx('texts')}>
//                         <p>
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                         </p>
//                         <span>1 min ago</span>
//                     </div>
//                 </div>
//                 <div className={cx('message')}>
//                     <img src={avatarIcon} alt=""/>
//                     <div className={cx('texts')}>
//                         <p>
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                         </p>
//                         <span>1 min ago</span>
//                     </div>
//                 </div>
//                 <div className={cx('message', 'own')}>
//                     <div className={cx('texts')}>
//                         <img src="https://nld.mediacdn.vn/thumb_w/698/291774122806476800/2025/8/23/anh-chup-man-hinh-2025-08-23-luc-142107-1755934691472254736667.png"/>
//                         <p>
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                         </p>
//                         <span>1 min ago</span>
//                     </div>
//                 </div>
//                 <div className={cx('message')}>
//                     <img src={avatarIcon} alt=""/>
//                     <div className={cx('texts')}>
//                         <p>
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                             Lorem ipsum doolaasdasdasdasdasdasdasdasdasd
//                         </p>
//                         <span>1 min ago</span>
//                     </div>
//                 </div>
//                 <div ref={endRef}></div>
//             </div>
//             <div className={cx('button')}>
//                 <div className={cx('icon')}>
//                     <img src={plusIcon} alt=""/>
//                 </div>
//                 <input type="text" placeholder="Type a message..."
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                 />
//                 <div className={cx('emoji')}>
//                     <img src={videoIcon} alt=""
//                         onClick={() => setOpen(prev => !prev)}
//                     />
//                     <div className={cx('picker')}>
//                         <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
//                     </div>
//                 </div>
//                 <button className={cx('sendButton')}>Send</button>
//             </div>
//         </div>
//     );
// }

// export default Chat;

import classNames from "classnames/bind";
import styles from "./Chat.module.scss";

const cx = classNames.bind(styles);
 
function Chat() {
    return (
        <div className={cx('chat')}></div>
    );
}

export default Chat;