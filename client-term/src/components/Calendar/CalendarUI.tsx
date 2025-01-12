import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar-style.css";
import DailyInfoCard from "./Calendar.Day.Card";
import { statsMaker } from "../../helpers/statsMaker";

export function CalendarUI({ db }) {
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(
    "Выберите интересующую вас дату, чтобы увадеть информацию о рабочем времени"
  );
  const [dayStats, setDayStats] = useState({});
  const dayClickHandler = async (value, event) => {
    const selectedDateLocaleString = value.toLocaleDateString();
    setSelectedDay(selectedDateLocaleString);

    const matchedMarksArray = await db.getMarksByDatestring(
      selectedDateLocaleString
    );

    if (matchedMarksArray.length > 0) {
      //
      console.info("[comming from dexie IDB]: ", matchedMarksArray);
      //
      const newDayStats = statsMaker(matchedMarksArray);
      setDayStats(newDayStats);
    } else {
      setDayStats("");
    }
  };

  return (
    <div className="calendar__wrapper">
      <Calendar
        className="Calendar"
        onChange={setCalendarValue}
        onClickDay={dayClickHandler}
        value={calendarValue}
        showNavigation={true}
      />
      <DailyInfoCard date={selectedDay} stats={dayStats} db={db} />
    </div>
  );
}

export default { CalendarUI };
