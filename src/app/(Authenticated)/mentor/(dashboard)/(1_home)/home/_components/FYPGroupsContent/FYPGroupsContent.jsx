import { Carousel, Flowbite } from "flowbite-react";
import styles from "./FYPGroupsContent.module.css";
import { IoCaretForwardCircleOutline } from "react-icons/io5";
import GroupDetails from "./_components/GroupDetails/GroupDetails";

const customTheme = {
  indicators: {
    active: {
      off: "bg-gray-300 hover:bg-blue-500",
      on: "bg-blue-500",
    },
    base: "h-2 w-2 rounded-full",
    wrapper: "absolute bottom-1 left-1/2 flex -translate-x-1/2 space-x-3",
  },
};

export default function FYPGroupsContent({groups}) {
  console.log(groups)
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
            Final Year Groups
          </p>

          <div
            className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
          />
        </div>

        <div
          className={`${styles.fypGroupInfoWrapper} flex flex-col my-2 h-4/5`}
        >
          <Carousel
            theme={customTheme}
            rightControl={
              <IoCaretForwardCircleOutline className="text-2xl text-gray-300 hover:text-blue-500" />
            }
            leftControl={
              <IoCaretForwardCircleOutline className="text-2xl text-gray-300 hover:text-blue-500 transform rotate-180" />
            }
          >
            {groups.map((group, index) => (
              <GroupDetails
                key={index}
                projectTitle={group.groupID.project.proposal.title}
                groupName={group.groupID.name}
                groupMembers={group.groupID.members}
                groupLead={group.groupID.lead}
                role={group.role}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
