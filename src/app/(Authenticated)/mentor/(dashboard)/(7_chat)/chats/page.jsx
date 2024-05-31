'use client';
import { useState } from "react";
import styles from "./ChatPage.module.css";
import ChatHeadingCard from "./_components/ChatHeadingCard/ChatHeadingCard";
import ChatList from "./_components/ChatList/ChatList.jsx";
import ChatMessageDisplayBox from "./_components/ChatMessageDisplayBox/ChatMessageDisplayBox.jsx";
import ChatMessageInputField from "./_components/ChatMessageInputField/ChatMessageInputField.jsx";

export default function ChatPage() {
  const [chatID, setChatID] = useState(null);

  return (
    <div
      className={`${styles.mainContainer} w-full flex flex-col px-5 py-6 items-center justify-between`}
    >
      <div
        className={`${styles.contentCardTitleContainer} p-3 overflow-auto flex flex-row w-full rounded-xl`}
      >
        <ChatHeadingCard />
      </div>

      <div
        className={`${styles.secondaryContainer} flex flex-row items-center justify-between`}
      >

        <div className={`${styles.left}`}>
          <ChatList chatID={chatID} setChatID={setChatID}/>
        </div>

        <div
          className={`${styles.right} flex flex-col items-center justify-between`}
        >
          <ChatMessageDisplayBox chatID={chatID}/>

          <ChatMessageInputField chatID={chatID}/>
        </div>

      </div>
    </div>
  );
}
