import React from "react";

function MainMarkSection(isMarked) {

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
          <tr>
            <td className="pt-2">Syed Owais Ali</td>
            <td className="text-center">{isMarked ? 30 : "-"}</td>
            <td className="text-center">30</td>
          </tr>
          <tr>
            <td className="pt-2">Hamza Ali Akbar</td>
            <td className="text-center">{isMarked ? 30 : "-"}</td>
            <td className="text-center">30</td>
          </tr>
          <tr>
            <td className="pt-2">Taha Mirza</td>
            <td className="text-center">{isMarked ? 30 : "-"}</td>
            <td className="text-center">30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MainMarkSection;
