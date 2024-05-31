import { useSelector } from "react-redux";
import styles from "./ChatRecipientMessage.module.css";
import { useEffect, useState } from "react";

export default function ChatRecipientMessage({ message }) {
  const profileID = useSelector((state) => state.AuthDetails.profileID);
  const [text, setText] = useState("No Message");

  useEffect(() => {
    if (message.length === 0) {
      setText("No Message");
    } else if (message[0].sender._id === profileID) {
      setText("You : " + message[0].message);
    } else if (message[0].sender._id !== profileID) {
      setText(message[0].sender.firstName + " : " + message[0].message);
    }
  }, [message, profileID]);

  return (
    <div className={`${styles.recipientMessageContainer}`}>
      <p
        className={`${styles.recipientMessage} font-montserrat text-neutral-600`}
      >
        {text}
      </p>
    </div>
  );
}
