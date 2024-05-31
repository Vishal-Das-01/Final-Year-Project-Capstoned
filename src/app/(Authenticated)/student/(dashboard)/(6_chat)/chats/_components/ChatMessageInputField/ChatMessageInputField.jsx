import { useState } from "react";
import styles from "./ChatMessageInputField.module.css";
import { FaPlay, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";

export default function ChatMessageInputField({ chatID }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const accessToken = useSelector((state) => state.AuthDetails.accessToken);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSendMessage = async () => {
    if (chatID === null) toast.error("Please select a chat to send a message");
    else if (message === "") toast.error("Please enter a message");
    else {
      setLoading(true);
      const response = await callAPI(
        "POST",
        accessToken,
        `${BACKEND_ROUTES.sendStudentMessage}?id=${chatID}`,
        {
          message,
        }
      );
      if (response.status === HttpStatusCode.Ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
      } else if (response.status === HttpStatusCode.Unauthorized) {
        dispatch(removeAuthDetails());
        router.push(FRONTEND_ROUTES.login_page);
      } else {
        const responseData = await response.json();
        toast.error(responseData.message);
      }
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.chatMessageInputFieldContainer} flex flex-row items-end justify-between w-full `}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className={`${styles.chatMessageInputField} w-full font-montserrat`}
        placeholder="Enter your message..."
      />

      <div
        className={`${styles.chatMessageSendButtonContainer} flex items-center justify-center mr-2`}
      >
        <button
          type="button"
          onClick={handleSendMessage}
          className={`${styles.chatMessageSendButton} flex flex-row bg-blue-500 items-center justify-center rounded-full`}
        >
          {loading ? (
            <FaSpinner className="animate-spin" style={{ color: "white" }} />
          ) : (
            <FaPlay style={{ color: "white" }} />
          )}
        </button>
      </div>
    </div>
  );
}
