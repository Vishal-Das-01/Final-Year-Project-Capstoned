import styles from "./ChatMessageDisplayBox.module.css";
import ChatMessageBubble from "./_components/ChatMessageBubble/ChatMessageBubble";

export default function ChatMessageDisplayBox(props){
    return (
        <div className={`${styles.chatMessageDisplayBoxPrimaryContainer} w-full h-full `}>

            <div className={`${styles.chatMessageDisplayBoxSecondaryContainer} w-full h-full flex overflow-y-auto  `}>
                
                <div className={`${styles.chatMessageDisplayBox} w-full flex flex-col text-clip overflow-y-auto bg-white  font-montserrat`}>
                   <ChatMessageBubble text={"Hello"} color={"blue"}/>
                   <ChatMessageBubble text={"Hello"} color={"blue"}/>
                   <ChatMessageBubble text={"Hello"} color={"blue"}/>
                   <ChatMessageBubble text={"Hello"} color={"blue"}/>
                   <ChatMessageBubble text={"Hello"} color={"blue"}/>
                   
                </div>
               
            </div>

        </div>
    );
}