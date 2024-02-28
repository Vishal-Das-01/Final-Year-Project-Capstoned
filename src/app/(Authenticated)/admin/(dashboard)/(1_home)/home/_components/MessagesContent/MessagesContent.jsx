import styles from "./MessagesContent.module.css";
import MessageListTile from "../_components/MessageListTile/MessageListTile";

export default function MessagesContent(){
    return (
        <div className={`h-full w-full`}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>

					<h1 className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}>
						Messages
					</h1>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

				<div className={`${styles.messagesWrapper} flex flex-col my-2`}>

					<MessageListTile 
                        name={`Hamza Akbar`}
                        unreadMsgCount={`7`}
                        imgSrc={`/picCircular.png`}
                        href={``}                    
                    />

                    <MessageListTile 
                        name={`Owais Ali`}
                        unreadMsgCount={`13`}
                        imgSrc={`/picCircular.png`}
                        href={``}                    
                    />

                    <MessageListTile 
                        name={`Hasin Zaman`}
                        unreadMsgCount={`2`}
                        imgSrc={`/picCircular.png`}
                        href={``}                    
                    />

				</div>

			</div>

		</div>
    );
}