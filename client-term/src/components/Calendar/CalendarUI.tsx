import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar-style.css";

export function CalendarUI({ db }) {
  const [calendarValue, setCalendarValue] = useState(new Date());

  const dayClickHandler = async (value, event) => {
    const selectedDateLocaleString = value.toLocaleDateString();
    /**
     *
     * @param {array} foundMarks не пустой массив найденных значений
     * @returns строку для вывода элементе статистики смены
     */
    const prepareFoundMarkMessage = (foundMarks) => {
      const chheckinTimeString = foundMarks[0].timestring;
      const checkoutTimeString = foundMarks[1].timestring;
      const workedOutMilis =
        Number(foundMarks[1].timestamp) - Number(foundMarks[0].timestamp);
      const workedOutSec: number = workedOutMilis / 1000;
      const workedOutMinutes: number = Number((workedOutSec / 60).toFixed(0));
      const workedOutHours: number = Math.floor(Number(workedOutMinutes) / 60);
      const restMinutes: number = workedOutMinutes - workedOutHours * 60;

      return `Статистика рабочей смены ${foundMarks[0].datestring}:\n
      ПРИХОД: ${chheckinTimeString}\n
      УХОД: ${checkoutTimeString}\n
      -----------------------------\n
      ОТРАБОТАНО:\n
      ${workedOutHours} часов ${restMinutes} минут\n
      (${workedOutMinutes} минут)`;
    };

    const matchedMarksArray = await db.getMarksByDatestring(
      selectedDateLocaleString
    );

    if (matchedMarksArray.length > 0) {
      alert(prepareFoundMarkMessage(matchedMarksArray));
    } else {
      alert("ничего не найдено");
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
    </div>
  );
}

export default { CalendarUI };
