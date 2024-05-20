import React from "react";

function ProfileCardTwo({
  bio,
  company,
  industries,
  roomNum,
  officeHours,
  occupation,
}) {
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
        <label htmlFor="bio" className="block font-semibold mb-2 text-sm">
          Bio :
        </label>
        <textarea
          disabled
          id="bio"
          rows="2"
          className=" mb-5 block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Introduce yourself to everyone..."
          value={bio}
        />
        <div className="flex flex-row items-center mb-5 text-sm justify-start">
          <h1 className="block font-semibold">Company :</h1>
          {!company || !occupation ? (
            <p className="block ml-2 font-normal">No company</p>
          ) : (
            <p className="block ml-2 font-normal">
              {occupation} at {company?.name}
            </p>
          )}
        </div>

        <h1 className="block font-semibold text-sm mb-2">
          Industries Interest :
        </h1>
        {industries.length === 0 && (
          <p className="font-normal text-sm w-full flex flex-row justify-center">
            No industries interest
          </p>
        )}

        {industries.map((item, index) => {
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

        <div className="flex flex-row items-center mb-5 mt-4 text-sm justify-start">
          <h1 className="block font-semibold">Room :</h1>
          {!roomNum && <p className="block ml-2 font-normal">No room number</p>}
          <p className="block ml-2 font-normal">{roomNum}</p>
        </div>

        <h1 className="block font-semibold mt-5 mb-2 text-sm">
          Office Hours :
        </h1>
        <div className="grid grid-cols-7 max-w-3xl text-center rounded-xl overflow-hidden">
          {officeHours.length === 0 && (
            <p className="w-full col-span-7 flex flex-row justify-center font-normal text-sm">
              No office hours
            </p>
          )}
          {officeHours.map((item, index) => (
            <div
              key={index}
              className="flex flex-col w-full items-center justify-start"
            >
              <div className="text-sm bg-red-500 w-full font-semibold text-center text-white">
                {item.day}
              </div>
              {item.start && item.end ? (
                <div>
                  <p className="text-xs py-2">Start: {item.start}</p>
                  <p className="text-xs ">End: {item.end}</p>
                </div>
              ) : (
                <p className="text-xs py-2">Closed</p>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default ProfileCardTwo;
