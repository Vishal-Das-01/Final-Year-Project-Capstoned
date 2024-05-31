import React from "react";
import styles from "./ChatHeadingCard.module.css";

function ChatHeadingCard() {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row items-center">
        <h1
          className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}
        >
          My Chats
        </h1>
        <div
          className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
        />
      </div>
    </div>
  );
}

export default ChatHeadingCard;
