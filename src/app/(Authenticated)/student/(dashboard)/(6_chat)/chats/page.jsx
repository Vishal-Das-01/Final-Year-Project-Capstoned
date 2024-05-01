import React from "react";
import styles from "./StudentChatPage.module.css";

export const metadata = {
	title: "Chat",
	description: "Capstoned Student Chat | Final Year Project (FYP) Management Platform for College & University Students.",
}

function Chat() {

  return (
    <div>
  <div className="flex rounded-lg">
    <div className={`bg-blue-500 p-4 w-1/4`}>
      <h3 className="text-white text-lg font-semibold mb-4">Contacts</h3>
      <ul>
        <li><button className="text-white py-2 px-6 w-full text-left rounded-lg hover:bg-blue-800">Contact 1</button></li>
        <li><button className="text-white py-2 px-6 w-full text-left rounded-lg hover:bg-blue-800">Contact 2</button></li>
        <li><button className="text-white py-2 px-6 w-full text-left rounded-lg hover:bg-blue-800">Contact 3</button></li>
      </ul>
    </div>
    <div className={`${styles.chatContainer} bg-blue-500 p-4 shadow-md flex-grow h-full`}>
      <div className={`${styles.chatHeader} bg-blue-500 text-white p-2`}>
        <h2 className="text-xl font-semibold">Contact Name</h2>
      </div>
      <div className={`${styles.chatBody} bg-white overflow-auto p-2 h-96 rounded`}>
        {/* Messages will be dynamically inserted here */}
      </div>
      <div className={`${styles.chatFooter} bg-blue-500 p-2 flex justify-between items-center`}>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-lg mr-2"
        />
        <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded-lg flex items-center">
          Send
        </button>
      </div>
    </div>
  </div>
</div>
    
  );
}

export default Chat;
