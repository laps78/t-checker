import React, { useState } from "react";
import Calendar from "react-calendar";

export function CalendarUI() {
  const [calendarValue, setCalendarValue] = useState(new Date());

  return (
    <div className="calendar__wrapper">
      <Calendar
        className="Calendar"
        onChange={setCalendarValue}
        value={calendarValue}
        showNavigation={false}
      />
    </div>
  );
}

export default { CalendarUI };
