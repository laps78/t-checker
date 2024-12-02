import { useState, useEffect } from "react";
import "./App.css";
import workStatuses from "./preferences/workstatuses.data.ts";
import { makeTimeStringValue } from "./components/DigitalClock/DigitalClock.tsx";
import IDB from "./helpers/IDB-helper/IDB.helper.ts";
import { CalendarUI } from "./components/Calendar/CalendarUI.tsx";

// type declarations
export type event = MouseEventHandler<HTMLDivElement>;
export interface checkMark {
  type: string;
  timestamp: number;
  title: string;
}

function App() {
  const [currentDate, setCurrentDate] = useState(
    makeTimeStringValue(new Date())
  );

  const db = new IDB();

  const lastMarkSign = () => {
    const lastmarkStored: string | null = localStorage.getItem("lastMark");
    const lastmark = JSON.parse(lastmarkStored) || "";

    const sign = `[ ${lastmark.type} ] ${new Date(
      lastmark.timestamp
    ).toLocaleDateString()}: ${new Date(
      lastmark.timestamp
    ).toLocaleTimeString()}`;
    if (lastmark === "") {
      return "";
    }
    return String(sign);
  };
  let currentWorkStatus = workStatuses[0];
  if (localStorage.getItem("currentWorkStatus")) {
    const savedStatus: string | null =
      localStorage.getItem("currentWorkStatus");
    currentWorkStatus = JSON.parse(savedStatus);
  }
  const [workStatus, setWorkStatus] = useState(currentWorkStatus);
  const handleIncomeClick = (event: event) => {
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

  const handleOutcomeClick = (event: event) => {
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
      if (data.length > 0) {
        alert(JSON.stringify(data, null, 4));
      } else {
        alert(
          "Ничего не получается отобразить: нет сохраненных отметок.\nПорытайтесь добавить метку вручную.\n\nЕсли вы уверены, что метки все же есть, но раз за разом, вновь и вновь видите это сообющение - напишите разработчику."
        );
      }
      //
    } catch (error) {
      console.error("Ошибка обработчика ссылки экспорта: ", error);
    }
  };

  /**
   * main page digital clocks effect
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const newActualTimeString = makeTimeStringValue(new Date());
      setCurrentDate(newActualTimeString);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentDate]);

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
        <h1 className="mainPage__header">{`${currentDate} | ${workStatus.name}`}</h1>
        <p className="last_mark_sign">
          Последняя отметка:
          <br />
          {lastMarkSign() || "Еще не зарегистрировано"}
        </p>

        <CalendarUI db={db} />

        <div className="card">
          <p>
            <a href="#" onClick={handleExportLink}>
              Все сохраненные отметки
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
