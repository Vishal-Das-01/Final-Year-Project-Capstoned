import React from "react";

function ProfileCardTwo() {
  const list = [
    "Software Engineering",
    "Security",
    "Network Security",
    "Cloud Security",
    "Application Security",
    "Machine Learning",
    "Artificial Intelligence",
    "Mobile App Development",
    "Backend Engineering",
    "Frontend Engineering",
  ];

  const officeHours = [
    { start: "10:00", end: "123:00", day: "Mon" },
    { start: "10:00", end: "12:00", day: "Tue" },
    { start: "10:00", end: "12:00", day: "Wed" },
    { start: "10:00", end: "14:00", day: "Thu" },
    { start: "10:00", end: "12:00", day: "Fri" },
    { start: "10:00", end: "12:00", day: "Sat" },
    { start: null, end: null, day: "Sun" },
  ];

  const tailwindColorClasses = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-indigo-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-gray-100",
  ];

  const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * tailwindColorClasses.length);
    return tailwindColorClasses[randomIndex];
  };

  return (
    <div className="flex flex-col ml-5 mr-14 my-5 items-center justify-start font-montserrat text-black">
      <form className="w-full">
        <div className="flex flex-row items-center mb-5 text-sm justify-start">
          <h1 className="block font-semibold">Group :</h1>
          <p className="block ml-2 font-normal">Group Name</p>
        </div>
        <div className="flex flex-row items-center mb-5 text-sm justify-start">
          <h1 className="block font-semibold">Semester :</h1>
          <p className="block ml-2 font-normal">8</p>
        </div>
        <div className="flex flex-row items-center mb-5 text-sm justify-start">
          <h1 className="block font-semibold">GPA :</h1>
          <p className="block ml-2 font-normal">4.0</p>
        </div>

        <h1 className="block font-semibold text-sm mb-2">
          Industries Interest :
        </h1>

        {list.map((item, index) => {
          const randomColorClass = generateRandomColor();
          return (
            <button
              key={index}
              type="button"
              className={`${randomColorClass} inline-flex justify-center items-center rounded-xl p-2 text-xs mr-2 my-1 `}
            >
              {item}
            </button>
          );
        })}

       
        
      </form>
    </div>
  );
}

export default ProfileCardTwo;
