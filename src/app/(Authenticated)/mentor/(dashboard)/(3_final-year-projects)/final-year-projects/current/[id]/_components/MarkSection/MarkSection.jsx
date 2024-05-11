'use client';
import React, { useState } from "react";

function MarkSection({ isMarked}) {
  const [marking, setMarking] = useState(false);
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
            {marking ? (
              <input
                className="border-2 text-center border-gray-300 w-36 focus:border-blue-500 focus:ring-0"
                type="number"
              ></input>
            ) : (
              <td className="text-center">{isMarked ? 30 : "-"}</td>
            )}
            <td className="text-center">30</td>
          </tr>
          <tr>
            <td className="pt-2">Hamza Ali Akbar</td>
            {marking ? (
              <input
                className="border-2 text-center border-gray-300 w-36 focus:border-blue-500 focus:ring-0"
                type="number"
              ></input>
            ) : (
              <td className="text-center">{isMarked ? 30 : "-"}</td>
            )}
            <td className="text-center">30</td>
          </tr>
          <tr>
            <td className="pt-2">Taha Mirza</td>
            {marking ? (
              <input
                className="border-2 text-center border-gray-300 w-36 focus:border-blue-500 focus:ring-0"
                type="number"
              ></input>
            ) : (
              <td className="text-center">{isMarked ? 30 : "-"}</td>
            )}
            <td className="text-center">30</td>
          </tr>
        </tbody>
      </table>
      {marking ? (
        <div className="flex flex-row">
          <button
            onClick={() => setMarking(false)}
            className="mr-5 h-10 flex flex-row border-2 border-blue-500 text-black rounded-full px-2.5 py-1.5 text-sm hover:bg-gray-300 items-center"
          >
            Cancel
          </button>
          <button
            onClick={() => setMarking(false)}
            className="h-10 bg-green-500 text-white rounded-full px-2.5 py-1.5 text-sm hover:bg-green-700"
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => setMarking(true)}
          className="h-10 bg-red-500 text-white rounded-full px-2.5 py-1.5 text-sm hover:bg-red-700"
        >
          {isMarked ? "Edit Mark" : "Mark"}
        </button>
      )}
    </div>
  );
}

export default MarkSection;
