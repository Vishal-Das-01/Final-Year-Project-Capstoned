import { useSelector } from "react-redux";
import styles from "./ChatRecipientMessage.module.css";
import { useEffect, useState } from "react";
import { useSocket } from "@/utils/helpers/socketProvider";
import { FaCircle } from "react-icons/fa6";

export default function ChatRecipientMessage({ message, ID, chatID }) {
  const profileID = useSelector((state) => state.AuthDetails.profileID);
  const [text, setText] = useState("No Message");

  const [unread, setUnread] = useState(false);

  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (chatID === ID) {
      setUnread(false);
    }
  }, [ID, chatID]);

  useEffect(() => {
    if (socket) {
      socket.on(`chat:${ID}`, (message) => {
        if (message.sender._id === profileID) {
          setText("You : " + message.message);
        } else if (message.sender._id !== profileID) {
          setText(message.sender.firstName + " : " + message.message);
        }
        if (chatID === ID) {
          setUnread(false);
        } else {
          setUnread(true);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off(`chat:${ID}`);
      }
    };
  }, [socket, ID, profileID, chatID]);

  useEffect(() => {
    console.log(message)
    if (message.length === 0) {
      setText("No Message");
    } else if (message[0].sender._id === profileID) {
      setText("You : " + message[0].message);
    } else if (message[0].sender._id !== profileID) {
      setText(message[0].sender.firstName + " : " + message[0].message);
    }
  }, [message, profileID]);

  return (
    <div
      className={`${styles.recipientMessageContainer} w-full flex flex-row items-center justify-between`}
    >
      <p
        className={`${styles.recipientMessage} font-montserrat text-neutral-600`}
      >
        {text.length > 30 ? text.slice(0, 27) + "..." : text}
      </p>
      {unread && (
        <span>
          <FaCircle className="w-2 h-2 mr-5 text-red-500" />
        </span>
      )}
    </div>
  );
}
