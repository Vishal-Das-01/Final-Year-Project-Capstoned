import { useDispatch, useSelector } from "react-redux";
import styles from "./ChatMessageDisplayBox.module.css";
import ChatMessageBubble from "./_components/ChatMessageBubble/ChatMessageBubble";
import { useEffect, useState } from "react";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { useRouter } from "next/navigation";
import { callAPI } from "@/utils/helpers/callAPI";
import ScrollToBottom from "react-scroll-to-bottom";
import { set } from "mongoose";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import { useSocket } from "@/utils/helpers/socketProvider";

export default function ChatMessageDisplayBox({ chatID }) {
  const { socket, isConnected } = useSocket();

  const [profileID, setProfileID] = useState(
    useSelector((state) => state.AuthDetails.profileID)
  );
  const accessToken = useSelector((state) => state.AuthDetails.accessToken);

  const dispatch = useDispatch();
  const router = useRouter();

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(socket) {
      socket.on(`chat:${chatID}`, (message) => {
        console.log("Messages : ", message)
        setMessages(prevMessages => [...prevMessages, message]);
      })
    }

    return () => {
      if(socket) {
        socket.off(`chat:${chatID}`);
      }
    };
  }, [socket, chatID])

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      const response = await callAPI(
        "GET",
        accessToken,
        `${BACKEND_ROUTES.getMentorSingleChat}?id=${chatID}`
      );
      if (response.status === HttpStatusCode.Ok) {
        const responseData = await response.json();
        setMessages(responseData.data.messages);
      } else if (response.status === HttpStatusCode.Unauthorized) {
        dispatch(removeAuthDetails());
        router.push(FRONTEND_ROUTES.login_page);
      }
      setLoading(false);
    };
    if (chatID) getMessages();
  }, [chatID]);

  return (
    <div
      className={`${styles.chatMessageDisplayBoxPrimaryContainer} w-full bg-white`}
    >
      <div
        className={`${styles.chatMessageDisplayBox} w-full flex overflow-y-auto bg-white font-montserrat scroll`}
      >
        {loading && <Loader />}
        {!loading && chatID !== null && messages.length === 0 && <NotFound />}
        {!loading && messages.length > 0 && (
          <ScrollToBottom className="w-full">
            {messages.map((message, index) => (
              <ChatMessageBubble
                key={index}
                text={message.message}
                recipient={message.sender._id === profileID ? false : true}
                name={message.sender.firstName + " " + message.sender.lastName}
                role={message.senderRole}
                imageSrc={
                  message.sender.profileImage
                    ? message.sender.profileImage.image
                    : "/defaultProfile.jpg"
                }
              />
            ))}
          </ScrollToBottom>
        )}
      </div>
    </div>
  );
}
