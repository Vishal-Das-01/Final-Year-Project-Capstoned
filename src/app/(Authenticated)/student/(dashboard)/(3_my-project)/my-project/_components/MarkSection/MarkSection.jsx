import React from "react";

function MarkSection({ isMarked, members }) {
  console.log(members)
  return (
    <div className="flex flex-row">
      <table className="border-4 border-double border-gray-500 mr-5">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="w-36">Members</th>
            <th className="w-36">Marks Obtained</th>
            <th className="w-36">Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {members.map((item, index) => (
            <tr key={index}>
              <td className="pl-2 pt-2">
                {item.member.firstName} {item.member.lastName}
              </td>
              <td className="text-center pt-2">{isMarked ? item.marks : "-"}</td>
              <td className="text-center pt-2">100</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarkSection;
