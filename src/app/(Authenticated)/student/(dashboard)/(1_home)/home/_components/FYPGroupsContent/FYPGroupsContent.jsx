import { Carousel, Flowbite } from "flowbite-react";
import styles from "./FYPGroupsContent.module.css";
import { IoCaretForwardCircleOutline } from "react-icons/io5";
import GroupDetails from "./_components/GroupDetails/GroupDetails";
import NotFound from "../_components/NotFound/NotFound";

export default function FYPGroupsContent({ group }) {
  return (
    <div
      className={`${styles.contentCardContainer} flex flex-col items-start rounded-xl `}
    >
      <div className="h-full w-full mx-2 my-4">
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
            className={`${styles.fypGroupInfoWrapper} flex flex-col my-2 h-4/5`}
          >
            <GroupDetails
              projectTitle={group.projectTitle}
              groupName={group.groupName}
              groupMembers={group.groupMembers}
              groupLead={group.groupLead}
              role={group.role}
            />
          </div>
        )}
      </div>
    </div>
  );
}
