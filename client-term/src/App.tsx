import { useState } from "react";
import "./App.css";
import workStatuses from "./preferences/workstatuses.data.js";
import {
  DigitalClock,
  makeTimeStringValue,
} from "./components/DigitalClock/DigitalClock.jsx";
import IDB from "./helpers/IDB-helper/IDB.helper.js";
import Calendar from "react-calendar";

export interface checkMark {
  type: string;
  timestamp: number;
  title: string;
}

function App() {
  const [ calendarValue, setCalendarValue ] = useState(new Date());
  const db = new IDB();
  const lastMarkSign = () => {
    const lastmarkStored = localStorage.getItem("lastMark");
    const lastmark = JSON.parse(lastmarkStored) || "";
    console.log(lastmarkStored, lastmark);
    const sign = `[ ${lastmark.type} ] ${
      new Date(lastmark.timestamp).toLocaleDateString()
    }: ${new Date(lastmark.timestamp).toLocaleTimeString()}`;
    if (lastmark === "") {
      return "";
    }
    return String(sign);
  };
  let currentWorkStatus = workStatuses[0];
  if (localStorage.getItem("currentWorkStatus")) {
    const savedStatus: string = localStorage.getItem("currentWorkStatus");
    currentWorkStatus = JSON.parse(savedStatus);
  }
  const [workStatus, setWorkStatus] = useState(currentWorkStatus);
  const handleIncomeClick = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (workStatus === workStatuses[1]) {
      return;
    }
    const date = new Date();
    const newCheckMark = {
      type: "checkIn",
      timestamp: Number(date.getTime()),
      datestring: date.toLocaleDateString(),
      timestring: makeTimeStringValue(date),
    };
    console.info("[click!] Есть приход:", newCheckMark);
    db.save(newCheckMark);
    setWorkStatus(workStatuses[1]);
    localStorage.setItem("currentWorkStatus", JSON.stringify(workStatuses[1]));
    localStorage.setItem("lastMark", JSON.stringify(newCheckMark));
  };

  const handleOutcomeClick = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (workStatus === workStatuses[0]) {
      return;
    }
    const date = new Date();
    const newCheckMark = {
      type: "checkOut",
      timestamp: Number(date.getTime()),
      datestring: date.toLocaleDateString(),
      timestring: makeTimeStringValue(date),
    };
    console.info("[click!] Есть уход:", newCheckMark);
    db.save(newCheckMark);
    setWorkStatus(workStatuses[0]);
    localStorage.setItem("currentWorkStatus", JSON.stringify(workStatuses[0]));
    localStorage.setItem("lastMark", JSON.stringify(newCheckMark));
  };

  const handleExportLink = async () => {
    try {
      const data = await db.getAllMarks();
      // working on data to export
      console.info(data);
      alert(JSON.stringify(data, null, 4));
      //
    } catch (error) {
      console.error("Ошибка обработчика ссылки экспорта: ", error);
    }
  };

  return (
    <>
      <header>
        <div className="header__line">
          <span className="logo__span">
            <span className="t-letter">t</span>-checker
          </span>
        </div>
        <div className="burger__menu">
          <div className="burger_menu_line"></div>
          <div className="burger_menu_line"></div>
          <div className="burger_menu_line"></div>
        </div>
      </header>
      <main>
        <DigitalClock />
        <h1>{`Я сейчас | ${workStatus.name}`}</h1>
        <p className="last_mark_sign">Последняя отметка:<br />{lastMarkSign()}</p>
        <div className="calendar__wrapper">
          <Calendar
            className="Calendar"
            onChange={setCalendarValue}
            value={calendarValue}
            showNavigation={false}
          />
        </div>
        <div className="card">
          <p>
            <a href="#" onClick={handleExportLink}>
              Сохраненные записи
            </a>
          </p>
        </div>
      </main>
      <footer className="footer">
        <div
          onClick={handleIncomeClick}
          className="button footer-button footer-left-button"
        >
          Приход
        </div>
        <div
          onClick={handleOutcomeClick}
          className="button footer-button footer-right-button"
        >
          Уход
        </div>
      </footer>
    </>
  );
}

export default App;
