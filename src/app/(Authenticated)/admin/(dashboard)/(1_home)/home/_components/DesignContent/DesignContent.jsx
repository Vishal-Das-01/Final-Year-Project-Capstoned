import styles from "./DesignContent.module.css";
import MessageListTile from "../_components/MessageListTile/MessageListTile";
import SpacemanFlying from "./_components/SpacemanFlying/SpacemanFlying";

export default function DesignContent(){
    return (
        <div className={`h-full w-full`}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center h-[40px]`}>

					<h1 className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}>
						{""}
					</h1>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

				<div className={`${styles.messagesWrapper} flex flex-col my-2`}>

					<SpacemanFlying />

				</div>

			</div>

		</div>
    );
}