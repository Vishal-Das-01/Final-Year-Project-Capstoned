import React from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useSelector } from "react-redux";

function ChatButton({id}) {
  const profileID = useSelector((state) => state.AuthDetails.profileID);

  return (
    <div>
      <button
        disabled={id == profileID}
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
