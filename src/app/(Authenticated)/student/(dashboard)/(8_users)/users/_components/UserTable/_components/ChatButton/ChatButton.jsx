import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function ChatButton({ id, type }) {
  const profileID = useSelector((state) => state.AuthDetails.profileID);
  const accessToken = useSelector((state) => state.AuthDetails.accessToken);
  const role = useSelector((state) => state.AuthDetails.role);

  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCreateChat = async () => {
    setLoading(true);
    const response = await callAPI(
      "POST",
      accessToken,
      BACKEND_ROUTES.createStudentChat,
      {
        participants: [
          {
            participant: id,
            participantRole: type,
          },
          {
            participant: profileID,
            participantRole: role,
          },
        ],
      }
    );
    if (response.status === HttpStatusCode.Ok) {
      router.push(FRONTEND_ROUTES.student_dashboard_chats_page);
    } else if (response.status === HttpStatusCode.Unauthorized) {
      dispatch(removeAuthDetails());
      router.push(FRONTEND_ROUTES.login_page);
    } else if (response.status === HttpStatusCode.BadRequest) {
      const responseData = await response.json();
      toast.error(responseData.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleCreateChat}
        disabled={id == profileID || loading}
        type="button"
        className="flex flex-row items-center justify-center w-full h-full p-1 text-sm font-semibold tracking-widest text-white bg-black border-4 border-black rounded-full font-montserrat hover:bg-white hover:border-4 hover:border-black hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:border-gray-300 disabled:text-black"
      >
        <p>Chat Now</p>
        <IoChatbubbleEllipses className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}

export default ChatButton;
