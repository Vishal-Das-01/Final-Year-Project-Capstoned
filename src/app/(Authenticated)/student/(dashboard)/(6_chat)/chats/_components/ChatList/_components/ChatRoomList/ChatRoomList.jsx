import styles from "./ChatRoomList.module.css";
import ChatRoomListItem from "../ChatRoomListItem/ChatRoomListItem";
import { useEffect } from "react";
import NotFound from "../../../NotFound/NotFound";

export default function ChatRoomList({ chats, chatID, setChatID }) {
  return (
    <div className={`${styles.chatListContainer} w-full h-full`}>
      <div
        className={`${styles.chatList} flex flex-col items-center justify-start w-full`}
      >
        {chats.map((chat, index) => (
          <ChatRoomListItem
            key={index}
            ID={chat._id}
            participants={chat.participants}
            message={chat.messages}
            chatID={chatID}
            setChatID={setChatID}
          />
        ))}
      </div>
    </div>
  );
}
