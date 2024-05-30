import { Carousel, Flowbite } from "flowbite-react";
import styles from "./FYPGroupsContent.module.css";
import { IoCaretForwardCircleOutline } from "react-icons/io5";
import GroupDetails from "./_components/GroupDetails/GroupDetails";
import NotFound from "../_components/NotFound/NotFound";

export default function FYPGroupsContent({ studentID, group }) {
  return (
    <div
      className={`${styles.contentCardContainer} flex flex-col items-start rounded-xl `}
    >
      <div className="w-full h-full mx-2 my-4">
        <div
          className={`${styles.contentHeadingWrapper} flex flex-row items-center `}
        >
          <p
            className={`${styles.contentHeading} font-montserrat font-semibold text-black py-2`}
          >
            Final Year Group
          </p>

          <div
            className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
          />
        </div>

        {!group && <NotFound />}

        {group && (
          <div
            className={`${styles.fypGroupInfoWrapper} flex flex-col mt-2 h-4/5`}
          >
            <GroupDetails
              studentID={studentID}
              projectTitle={group.project.proposal.title}
              groupName={group.name}
              groupMembers={group.members}
              groupLead={group.lead}
              groupSupervisor={group.supervisor}
            />
          </div>
        )}
      </div>
    </div>
  );
}
