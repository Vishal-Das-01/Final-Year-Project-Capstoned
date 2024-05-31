"use client";

import styles from "./ChatRoomListItem.module.css";
import ChatRecipientAvatar from "./_components/ChatRecipientAvatar/ChatRecipientAvatar";
import ChatRecipientName from "./_components/ChatRecipientName/ChatRecipientName";
import ChatRecipientMessage from "./_components/ChatRecipientMessage/ChatRecipientMessage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { get } from "mongoose";

export default function ChatRoomListItem({
  ID,
  participants,
  message,
  chatID,
  setChatID,
}) {
  const [profileID, setProfileID] = useState(
    useSelector((state) => state.AuthDetails.profileID)
  );

  const [isThisChat, setIsThisChat] = useState(false);

  const getName = (participants) => {
    if (participants.length > 2) {
      return "Group Chat";
    }
    const participant = participants.find(
      (participant) => participant.participant._id != profileID
    );
    return (
      participant.participant.firstName + " " + participant.participant.lastName
    );
  };

  const getProfileImage = (participants) => {
    if (participants.length > 2) {
      return "/defaultProfile.jpg";
    }
    const participant = participants.find(
      (participant) => participant.participant._id != profileID
    );
    if (participant.participant.profileImage)
      return participant.participant.profileImage.image;
    else return "/defaultProfile.jpg";
  };

  useEffect(() => {
    if (chatID === ID) {
      setIsThisChat(true);
    } else {
      setIsThisChat(false);
    }
  }, [chatID, ID]);

  return (
    <div
      className={`${styles.chatListItemContainer} flex flex-row items-center w-full relative`}
    >
      <div
        className={`${
          styles.chatListItem
        } flex flex-row items-center w-full mx-2 ${
          isThisChat ? "bg-blue-200" : "bg-white"
        } rounded-lg h-full`}
      >
        <ChatRecipientAvatar avatar={getProfileImage(participants)} />

        <div
          className={`${styles.chatRecipientNameAndMsgContainer} flex flex-col items-start justify-center w-full h-full  border-neutral-200`}
        >
          <ChatRecipientName name={getName(participants)} />

          <ChatRecipientMessage
            message={message.length === 0 ? "No message" : message[0].message}
          />
        </div>
      </div>

      {!isThisChat && (
        <div
          onClick={() => {
            setChatID(ID);
            console.log(chatID);
          }}
          className={`${styles.chatListItemOverlay} cursor-pointer flex flex-row items-center w-full h-full absolute bg-transparent hover:bg-neutral-200 hover:opacity-30`}
        />
      )}
    </div>
  );
}
