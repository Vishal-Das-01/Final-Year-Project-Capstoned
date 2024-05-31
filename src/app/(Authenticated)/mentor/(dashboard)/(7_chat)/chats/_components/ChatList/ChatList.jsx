import { useEffect, useState } from "react";
import styles from "./ChatList.module.css";
import ChatRoomList from "./_components/ChatRoomList/ChatRoomList";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { callAPI } from "@/utils/helpers/callAPI";
import { HttpStatusCode } from "axios";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";

export default function ChatList({ chatID, setChatID }) {
  
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const authDetails = useSelector((state) => state.AuthDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const { accessToken } = authDetails;

  
  useEffect(() => {
    const getChats = async () => {
      setLoading(true);
      const response = await callAPI(
        "GET",
        accessToken,
        BACKEND_ROUTES.getStudentChatRooms
      );
      if (response.status === HttpStatusCode.Ok) {
        const responseData = await response.json();
        setChats(responseData.data);
        console.log(responseData);
      } else if (response.status === HttpStatusCode.Unauthorized) {
        dispatch(removeAuthDetails());
        router.push(FRONTEND_ROUTES.login_page);
      }
      setLoading(false);
    };

    getChats();
  }, []);

  return (
    <div
      className={`${styles.primaryContainer} flex flex-col items-center justify-start`}
    >
      <div
        className={`${styles.secondaryContainer} flex flex-col items-center justify-start`}
      >
        <div
          className={`${styles.tertiaryContainer} flex flex-col items-center justify-start overflow-y-auto my-10`}
        >
          {loading && <Loader />}
          {!loading && chats.length === 0 && <NotFound/>}
          {!loading && chats.length > 0 && (
            <ChatRoomList chats={chats} chatID={chatID} setChatID={setChatID} />
          )}
        </div>
      </div>
    </div>
  );
}
