import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar-style.css";

export function CalendarUI() {
  const [calendarValue, setCalendarValue] = useState(new Date());
  const dayClickHandler = (value, event) => {
    console.log("calendarEvent: ", event.target);
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
    </div>
  );
}

export default { CalendarUI };
