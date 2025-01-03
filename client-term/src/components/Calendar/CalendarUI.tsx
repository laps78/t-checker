import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar-style.css";
import DailyInfoCard from "./Calendar.Day.Card";

export function CalendarUI({ db }) {
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(
    "Выберите интересующую вас дату, чтобы увидеть информацию о рабочем времени"
  );
  const [dayStats, setDayStats] = useState("");
  const dayClickHandler = async (value, event) => {
    const selectedDateLocaleString = value.toLocaleDateString();
    setSelectedDay(selectedDateLocaleString);
    /**
     *
     * @param {array} foundMarks не пустой массив найденных значений
     * @returns строку для вывода в элементе статистики смены
     */
    const prepareFoundMarkMessage = (foundMarks) => {
      const checkinTimeString = foundMarks[0].timestring;
      const checkoutTimeString = foundMarks[1].timestring;
      const workedOutMilis =
        Number(foundMarks[1].timestamp) - Number(foundMarks[0].timestamp);
      const workedOutSec: number = workedOutMilis / 1000;
      const workedOutMinutes: number = Number((workedOutSec / 60).toFixed(0));
      const workedOutHours: number = Math.floor(Number(workedOutMinutes) / 60);
      const restMinutes: number = workedOutMinutes - workedOutHours * 60;
      const statsString = `Статистика рабочей смены ${foundMarks[0].datestring}:\n
      ПРИХОД: ${checkinTimeString}\n
      УХОД: ${checkoutTimeString}\n
      -----------------------------\n
      ОТРАБОТАНО:\n
      ${workedOutHours} часов ${restMinutes} минут\n
      (${workedOutMinutes} минут)`;
      const stats = {
        checkinTimeString,
        checkoutTimeString,
        workedOutHours,
        restMinutes,
      };
      setDayStats(stats);
      return statsString;
    };

    const matchedMarksArray = await db.getMarksByDatestring(
      selectedDateLocaleString
    );

    if (matchedMarksArray.length > 0) {
      prepareFoundMarkMessage(matchedMarksArray);
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
      <DailyInfoCard date={selectedDay} stats={dayStats} />
    </div>
  );
}

export default { CalendarUI };
