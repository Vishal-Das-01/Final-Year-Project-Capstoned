import styles from "./ChatMessageDisplayBox.module.css";
import ChatMessageBubble from "./_components/ChatMessageBubble/ChatMessageBubble";

export default function ChatMessageDisplayBox(props){
    return (
        <div className={`${styles.chatMessageDisplayBoxPrimaryContainer} w-full h-full `}>

            <div className={`${styles.chatMessageDisplayBoxSecondaryContainer} w-full h-full flex overflow-y-auto  `}>
                
                <div className={`${styles.chatMessageDisplayBox} w-full flex flex-col text-clip overflow-y-auto bg-white  font-montserrat`}>
                   
                   <ChatMessageBubble 
                   text={"The rusty swing set creaked in the twilight, whispering secrets to the wind."} 
                   color={"white"} 
                   recipient={true}
                   name={`Hamza Akbar`}
                   imageSrc={"/picCircular.png"}
                   />

                   <ChatMessageBubble 
                   text={"Raindrops tattooed the windowpane, a rhythmic lullaby for the sleeping city"} 
                   color={"white"} 
                   recipient={false}
                   name={`Hamza Akbar`}
                   imageSrc={"/picCircular.png"}
                   />

                   <ChatMessageBubble 
                   text={"Sunlight streamed through the dusty attic window, illuminating forgotten treasures."} 
                   color={"white"} 
                   recipient={true}
                   name={`Hamza Akbar`}
                   imageSrc={"/picCircular.png"}
                   />

                   <ChatMessageBubble 
                   text={"The aroma of freshly baked bread wafted from the kitchen, a warm hug for the soul."} 
                   color={"white"} 
                   recipient={false}
                   name={`Hamza Akbar`}
                   imageSrc={"/picCircular.png"}
                   />

                   <ChatMessageBubble 
                   text={"Hello"} 
                   color={"white"} 
                   recipient={true}
                   name={`Hamza Akbar`}
                   imageSrc={"/picCircular.png"}
                   />
                   
                   <ChatMessageBubble 
                   text={"Hello"} 
                   color={"white"} 
                   recipient={false}
                   name={`Hamza Akbar`}
                   imageSrc={"/picCircular.png"}
                   />

                   <ChatMessageBubble 
                   text={"Hello"} 
                   color={"white"} 
                   recipient={true}
                   name={`Hamza Akbar`}
                   imageSrc={"/picCircular.png"}
                   />

                   <ChatMessageBubble 
                   text={"Hello"} 
                   color={"white"} 
                   recipient={false}
                   name={`Hamza Akbar`}
                   imageSrc={"/picCircular.png"}
                   />

                   <ChatMessageBubble 
                   text={"Hello"} 
                   color={"white"} 
                   recipient={true}
                   name={`Hamza Akbar`}
                   imageSrc={"/picCircular.png"}
                   />

                </div>
               
            </div>

        </div>
    );
}