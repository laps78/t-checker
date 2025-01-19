import "./App.css";
import workStatuses from "./preferences/workstatuses.data.js";
import { DigitalClock } from "./components/DigitalClock/DigitalClock.jsx";
import IDB from "./helpers/IDB-helper/IDB.helper.js";
import { CalendarUI } from "./components/CalendarUI/CalendarUI.js";
import useLocalstorage from "./helpers/useLocalStorage";

export interface checkMark {
  type: string;
  timestamp: number;
  title: string;
}

function App() {
  const [currentWorkStatus, setCurrentWorkStatus] = useLocalstorage(
    "currentWorkStatus",
    workStatuses[0]
  );
  const [lastMark, setLastMark] = useLocalstorage("lastMark", null);

  const db = new IDB();

  const lastMarkSign = () => {
    if (lastMark === null) {
      return "";
    }

    const sign = `[ ${lastMark.type} ] ${new Date(
      lastMark.timestamp
    ).toLocaleDateString()}: ${new Date(
      lastMark.timestamp
    ).toLocaleTimeString()}`;
    return sign;
  };

  const handleIncomeClick = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (currentWorkStatus === workStatuses[1]) {
      return;
    }
    const date = new Date();
    const newCheckMark = {
      type: "checkIn",
      timestamp: Number(date.getTime()),
      datestring: date.toLocaleDateString(),
      timestring: date.toLocaleTimeString(),
    };
    db.save(newCheckMark);
    setCurrentWorkStatus("currentWorkStatus", JSON.stringify(workStatuses[1]));
    setLastMark("lastMark", JSON.stringify(newCheckMark));
  };

  const handleOutcomeClick = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (currentWorkStatus === workStatuses[0]) {
      return;
    }
    const date = new Date();
    const newCheckMark = {
      type: "checkOut",
      timestamp: Number(date.getTime()),
      datestring: date.toLocaleDateString(),
      timestring: date.toLocaleTimeString(),
    };
    console.info("[click!] Есть уход:", newCheckMark);
    db.save(newCheckMark);
    setCurrentWorkStatus("currentWorkStatus", JSON.stringify(workStatuses[0]));
    setLastMark("lastMark", JSON.stringify(newCheckMark));
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
        <div className="mainHeader">
          <DigitalClock />
          <h1 className="mainPage__header">{`${currentWorkStatus.name}`}</h1>
        </div>
        <p className="last_mark_sign">
          Последняя отметка:
          <br />
          {lastMarkSign() || "Еще не зарегистрировано"}
        </p>
        <CalendarUI db={db} />
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
