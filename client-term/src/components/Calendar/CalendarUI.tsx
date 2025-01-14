import { useState } from "react";
import Calendar from "react-calendar";
import "./calendar-style.css";
import DailyInfoCard from "./Calendar.Day.Card";

export function CalendarUI({ db }) {
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(
    calendarValue.toLocaleDateString()
  );

  const dayClickHandler = async (value, event) => {
    const selectedDateLocaleString = value.toLocaleDateString();
    setSelectedDay(selectedDateLocaleString);
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
      <DailyInfoCard date={selectedDay} db={db} />
    </div>
  );
}

export default { CalendarUI };
