import React, { useEffect, useState } from "react";

function TimeTable({ oldOfficeHours, setOfficeHours }) {
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const [mondayStart, setMondayStart] = useState("09:00");
  const [mondayEnd, setMondayEnd] = useState("18:00");

  const [tuesdayStart, setTuesdayStart] = useState("09:00");
  const [tuesdayEnd, setTuesdayEnd] = useState("18:00");

  const [wednesdayStart, setWednesdayStart] = useState("09:00");
  const [wednesdayEnd, setWednesdayEnd] = useState("18:00");

  const [thursdayStart, setThursdayStart] = useState("09:00");
  const [thursdayEnd, setThursdayEnd] = useState("18:00");

  const [fridayStart, setFridayStart] = useState("09:00");
  const [fridayEnd, setFridayEnd] = useState("18:00");

  const [saturdayStart, setSaturdayStart] = useState("09:00");
  const [saturdayEnd, setSaturdayEnd] = useState("18:00");

  const [sundayStart, setSundayStart] = useState("09:00");
  const [sundayEnd, setSundayEnd] = useState("18:00");

  useEffect(() => {
    if (oldOfficeHours.length > 0) {
      setMonday(oldOfficeHours[0].start !== null);
      setTuesday(oldOfficeHours[1].start !== null);
      setWednesday(oldOfficeHours[2].start !== null);
      setThursday(oldOfficeHours[3].start !== null);
      setFriday(oldOfficeHours[4].start !== null);
      setSaturday(oldOfficeHours[5].start !== null);
      setSunday(oldOfficeHours[6].start !== null);

      if (oldOfficeHours[0].start !== null) {
        setMondayStart(oldOfficeHours[0].start);
        setMondayEnd(oldOfficeHours[0].end);
      }
      if (oldOfficeHours[1].start !== null) {
        setTuesdayStart(oldOfficeHours[1].start);
        setTuesdayEnd(oldOfficeHours[1].end);
      }
      if (oldOfficeHours[2].start !== null) {
        setWednesdayStart(oldOfficeHours[2].start);
        setWednesdayEnd(oldOfficeHours[2].end);
      }
      if (oldOfficeHours[3].start !== null) {
        setThursdayStart(oldOfficeHours[3].start);
        setThursdayEnd(oldOfficeHours[3].end);
      }
      if (oldOfficeHours[4].start !== null) {
        setFridayStart(oldOfficeHours[4].start);
        setFridayEnd(oldOfficeHours[4].end);
      }
      if (oldOfficeHours[5].start !== null) {
        setSaturdayStart(oldOfficeHours[5].start);
        setSaturdayEnd(oldOfficeHours[5].end);
      }
      if (oldOfficeHours[6].start !== null) {
        setSundayStart(oldOfficeHours[6].start);
        setSundayEnd(oldOfficeHours[6].end);
      }
    }
  }, [oldOfficeHours]);

  useEffect(() => {
    const officeHours = [];
    if (monday) {
      officeHours.push({
        start: mondayStart,
        end: mondayEnd,
        day: "Monday",
      });
    } else {
      officeHours.push({
        day: "Monday",
        start: null,
        end: null,
      });
    }

    if (tuesday) {
      officeHours.push({
        start: tuesdayStart,
        end: tuesdayEnd,
        day: "Tuesday",
      });
    } else {
      officeHours.push({
        day: "Tuesday",
        start: null,
        end: null,
      });
    }

    if (wednesday) {
      officeHours.push({
        start: wednesdayStart,
        end: wednesdayEnd,
        day: "Wednesday",
      });
    } else {
      officeHours.push({
        day: "Wednesday",
        start: null,
        end: null,
      });
    }

    if (thursday) {
      officeHours.push({
        start: thursdayStart,
        end: thursdayEnd,
        day: "Thursday",
      });
    } else {
      officeHours.push({
        day: "Thursday",
        start: null,
        end: null,
      });
    }

    if (friday) {
      officeHours.push({
        start: fridayStart,
        end: fridayEnd,
        day: "Friday",
      });
    } else {
      officeHours.push({
        day: "Friday",
        start: null,
        end: null,
      });
    }

    if (saturday) {
      officeHours.push({
        start: saturdayStart,
        end: saturdayEnd,
        day: "Saturday",
      });
    } else {
      officeHours.push({
        day: "Saturday",
        start: null,
        end: null,
      });
    }

    if (sunday) {
      officeHours.push({
        start: sundayStart,
        end: sundayEnd,
        day: "Sunday",
      });
    } else {
      officeHours.push({
        day: "Sunday",
        start: null,
        end: null,
      });
    }

    setOfficeHours(officeHours);
    console.log("hello");
  }, [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    mondayStart,
    mondayEnd,
    tuesdayStart,
    tuesdayEnd,
    wednesdayStart,
    wednesdayEnd,
    thursdayStart,
    thursdayEnd,
    fridayStart,
    fridayEnd,
    saturdayStart,
    saturdayEnd,
    sundayStart,
    sundayEnd,
    setOfficeHours,
  ]);

  const getRow = (day, state, setState, start, setStart, end, setEnd) => (
    <tr>
      <td>{day}</td>
      <td>
        <div className="relative">
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={state}
              class="sr-only peer"
              checked={state}
              onChange={() => setState(!state)}
            />
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
            disabled={!state}
            type="time"
            id="time"
            class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5"
            value={start}
            onChange={(e) => setStart(e.target.value)}
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
            disabled={!state}
            type="time"
            id="time"
            class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5"
            min={start}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
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
        {getRow(
          "Monday",
          monday,
          setMonday,
          mondayStart,
          setMondayStart,
          mondayEnd,
          setMondayEnd
        )}
        {getRow(
          "Tuesday",
          tuesday,
          setTuesday,
          tuesdayStart,
          setTuesdayStart,
          tuesdayEnd,
          setTuesdayEnd
        )}
        {getRow(
          "Wednesday",
          wednesday,
          setWednesday,
          wednesdayStart,
          setWednesdayStart,
          wednesdayEnd,
          setWednesdayEnd
        )}
        {getRow(
          "Thursday",
          thursday,
          setThursday,
          thursdayStart,
          setThursdayStart,
          thursdayEnd,
          setThursdayEnd
        )}
        {getRow(
          "Friday",
          friday,
          setFriday,
          fridayStart,
          setFridayStart,
          fridayEnd,
          setFridayEnd
        )}
        {getRow(
          "Saturday",
          saturday,
          setSaturday,
          saturdayStart,
          setSaturdayStart,
          saturdayEnd,
          setSaturdayEnd
        )}
        {getRow(
          "Sunday",
          sunday,
          setSunday,
          sundayStart,
          setSundayStart,
          sundayEnd,
          setSundayEnd
        )}
      </tbody>
    </table>
  );
}

export default TimeTable;
