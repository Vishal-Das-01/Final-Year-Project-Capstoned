import { Dropdown } from "flowbite-react";
import React from "react";

function DropDown({ placeHolder, list }) {
  return (
    <Dropdown
      renderTrigger={() => (
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          class="flex-shrink-0 z-10 inline-flex border-2 mr-5 items-center py-1.5 px-4 text-sm text-center text-black bg-white border-gray-300 rounded-md hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-black"
          type="button"
        >
          {placeHolder}
          <svg
            class="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      )}
      className="h-48 overflow-y-auto"
      dismissOnClick={true}
    >
      {list.map((item, index) => (
        <Dropdown.Item key={index}>{item}</Dropdown.Item>
      ))}
    </Dropdown>
  );
}

export default DropDown;
