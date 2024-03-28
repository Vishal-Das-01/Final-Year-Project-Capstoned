import React from "react";

function TimeTable() {
  const getRow = (day) => (
    <tr>
      <td>{day}</td>
      <td>
        <div className="relative">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </td>
      <td>
        <div class="relative flex flex-row items-center justify-center">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          ></svg>

          <input
            type="time"
            id="time"
            class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5"
            min="09:00"
            max="18:00"
            value="00:00"
            required
          />
        </div>
      </td>
      <td>
        <div class="relative flex flex-row items-center justify-center">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          ></svg>
          <input
            type="time"
            id="time"
            class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5"
            min="09:00"
            max="18:00"
            value="00:00"
            required
          />
        </div>
      </td>
    </tr>
  );

  return (
    <table className="w-full text-center text-sm border-spacing-y-4 border-separate">
      <thead>
        <tr className="mb-5">
          <th className="w-4/12">Day</th>
          <th className="w-2/12">Available</th>
          <th className="w-3/12">Start Time</th>
          <th className="w-3/12">End Time</th>
        </tr>
      </thead>
      <tbody>
        {getRow("Monday")}
        {getRow("Tuesday")}
        {getRow("Wednesday")}
        {getRow("Thursday")}
        {getRow("Friday")}
        {getRow("Saturday")}
        {getRow("Sunday")}
      </tbody>
    </table>
  );
}

export default TimeTable;
