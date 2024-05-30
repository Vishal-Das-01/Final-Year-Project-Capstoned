import styles from "./SearchUsers.module.css";
import UserContent from "./_components/UserContent/UserContent";

export const metadata = {
  title: "Search Users",
  description:
    "Capstoned | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function SearchUsers() {
  return (
    <div
      className={`${styles.contentCardTitleContainer} p-3 my-9 mx-5 flex flex-col rounded-xl font-montserrat`}
    >
      <div className="flex flex-row items-center justify-start w-auto h-8 py-2 mr-5">
        <h1 className={`${styles.contentHeading} font-semibold text-black`}>
          Search Users
        </h1>
        <div
          className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
        />
      </div>

      <div className={`${styles.container} m-4`}>
        <UserContent />
      </div>
    </div>
    // <div
    //   className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}
    // >
    //   <div
    //     className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}
    //   >
    //     <CompaniesHeadingAndButton
    //       setOpenModal={setOpenModal}
    //       setModalTitle={setModalTitle}
    //       setModalContent={setModalContent}
    //     />

    //     <ContentTable>
    //       <TableHead>
    //         <TableHeadDataCell isNumberCell={true} text={`Number`} />

    //         <TableHeadDataCell isNumberCell={false} text={`Name`} />

    //         <TableHeadDataCell isNumberCell={false} text={`Occupation`} />

    //         <TableHeadDataCell isNumberCell={false} text={`Industries`} />

    //         <TableHeadDataCell isNumberCell={false} text={`Number`} />

    //         <TableHeadDataCell isNumberCell={false} text={`Room`} />

    //         <TableHeadDataCell isNumberCell={false} text={`Available`} />
    //       </TableHead>

    //       <tbody>
    //         <TableRow
    //           setOpenModal={setOpenModal}
    //           setModalTitle={setModalTitle}
    //           setModalContent={setModalContent}
    //         >
    //           <TableBodyDataCell text={"1"} />

    //           <TableBodyDataCell text={"Hamza Akbar"} />

    //           <TableBodyDataCell
    //             text={
    //               "This is dummy text. This is dummy text. This is dummy text. This is dummy text."
    //             }
    //           />
    //           <TableBodyDataCell
    //             text={list.map((item, index) => {
    //               const randomColorClass = generateRandomColor();
    //               return (
    //                 <button
    //                   key={index}
    //                   type="button"
    //                   className={`${randomColorClass} inline-flex justify-center items-center rounded-xl p-2 text-xs mr-2 my-1 `}
    //                 >
    //                   {item}
    //                 </button>
    //               );
    //             })}
    //           />

    //           <TableBodyDataCell text={"22"} />

    //           <TableBodyDataCell text={"Pakistan"} />

    //           <TableBodyDataCell text={"True"} />
    //         </TableRow>

    //         <TableRow
    //           setOpenModal={setOpenModal}
    //           setModalTitle={setModalTitle}
    //           setModalContent={setModalContent}
    //         >
    //           <TableBodyDataCell text={"1"} />

    //           <TableBodyDataCell text={"Hamza Akbar"} />

    //           <TableBodyDataCell
    //             text={
    //               "This is dummy text. This is dummy text. This is dummy text. This is dummy text."
    //             }
    //           />

    //           <TableBodyDataCell
    //             text={list.map((item, index) => {
    //               const randomColorClass = generateRandomColor();
    //               return (
    //                 <button
    //                   key={index}
    //                   type="button"
    //                   className={`${randomColorClass} inline-flex justify-center items-center rounded-xl p-2 text-xs mr-2 my-1 `}
    //                 >
    //                   {item}
    //                 </button>
    //               );
    //             })}
    //           />

    //           <TableBodyDataCell text={"22"} />

    //           <TableBodyDataCell text={"Pakistan"} />

    //           <TableBodyDataCell text={"True"} />
    //         </TableRow>
    //       </tbody>
    //     </ContentTable>
    //   </div>
    // </div>
  );
}
