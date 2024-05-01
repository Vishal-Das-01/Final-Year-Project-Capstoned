import styles from "./ProposalsContent.module.css";
import ProposalListTile from "../_components/ProposalListTile/ProposalListTile";

export default function ProposalsContent(){
    return (
        <div className={`h-full w-full`}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>

					<h1 className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}>
						My Proposals (3/5)
					</h1>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>
                <div className={`${styles.proposalsInfoWrapper} flex flex-col my-2  `}>
                    <ProposalListTile sNo={1} text={"Hello World"} selected={true}/>
    
                    <ProposalListTile sNo={2} text={"Hello World"} selected={false}/>

                    <ProposalListTile sNo={3} text={"Hello World"} selected={true}/>

                </div>
                
				<div className={`${styles.messagesWrapper} flex flex-col my-2`}>

				</div>

			</div>

		</div>
    );
}