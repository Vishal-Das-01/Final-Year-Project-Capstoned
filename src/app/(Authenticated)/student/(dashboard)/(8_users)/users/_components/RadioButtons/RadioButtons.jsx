import React from "react";

function RadioButtons({ setRadioUserType }) {
  return (
    <fieldset className="flex flex-row max-w-md gap-4">
      <div class="flex items-center">
        <input
          defaultChecked
          type="radio"
          id="students"
          name="userType"
          value="Students"
          onClick={() => setRadioUserType("Students")}
          class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="default-radio-1"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Students
        </label>
      </div>
      <div class="flex items-center">
        <input
          type="radio"
          id="mentors"
          name="userType"
          value="Mentors"
          onClick={() => setRadioUserType("Mentors")}
          class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="default-radio-2"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Mentors
        </label>
      </div>
      <div class="flex items-center">
        <input
          type="radio"
          id="supervisors"
          name="userType"
          value="Supervisors"
          onClick={() => setRadioUserType("Supervisors")}
          class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="default-radio-2"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Supervisors
        </label>
      </div>
    </fieldset>
  );
}

export default RadioButtons;
