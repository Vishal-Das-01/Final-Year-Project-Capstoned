import styles from "./ProposalsContent.module.css";
import ProposalListTile from "../_components/ProposalListTile/ProposalListTile";
import NotFound from "../_components/NotFound/NotFound";

export default function ProposalsContent({proposals}){
    return (
        <div className={`h-full w-full`}>

			<div className={`mx-2 my-4`}>

				<div className="flex flex-row items-center">

					<h1 className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}>
						Selected Proposals ({proposals?.length || 0}/5)
					</h1>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

                <div className={`${styles.proposalsInfoWrapper} flex flex-col my-2  `}>
					{(!proposals || proposals.length === 0) && <div className="my-3"><NotFound /></div>}
					{proposals && proposals.length !== 0 && proposals.map((item, index) => (
						<ProposalListTile key={index} sNo={index + 1} title={item.proposal.title} proposer={item.proposal.proposer} proposedBy={item.proposal.proposedBy}/>						
					))}
                </div>
                
	

			</div>

		</div>
    );
}