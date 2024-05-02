import React from "react";
import styles from "./MilestoneTable.module.css";

function MilestoneTable({milestones}) {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 m-5 relative shadow-lg rounded-xl overflow-hidden">
    <table className="min-w-full leading-normal">
      <thead className="sticky top-0 z-10 text-xs text-white bg-blue-500 uppercase text-left" >
        <tr>
          <th class="px-4 py-3" scope="col">
            Name
          </th>
          <th class="px-4 py-3" scope="col">
            Description
          </th>
          <th class="px-4 py-3" scope="col">
            Number
          </th>
          <th class="px-4 py-3" scope="col">
            Deadline
          </th>
          <th class="px-4 py-3" scope="col">
            Created
          </th>
          <th class="px-4 py-3" scope="col">
            Last Modified
          </th>
          <th class="px-4 py-3" scope="col">
            Total Marks
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Milestones data mapping */}
        {milestones.map((milestone, index) => (
          <tr key={index}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {milestone.name}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {milestone.description}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {milestone.number}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {new Date(milestone.deadline).toLocaleDateString()}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {new Date(milestone.created).toLocaleDateString()}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {new Date(milestone.lastModified).toLocaleDateString()}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {milestone.totalMarks}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

    
  );
}

export default MilestoneTable;

