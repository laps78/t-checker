import { useState } from "react";
import "./App.css";
import workStatuses from "./preferences/workstatuses.data.js";
import {
  DigitalClock,
  makeTimeStringValue,
} from "./components/DigitalClock/DigitalClock.jsx";

function App() {
  const currentWorkStatus = workStatuses[0];
  const [workStatus, setWorkStatus] = useState(currentWorkStatus);
  const handleIncomeClick = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (workStatus === workStatuses[1]) {
      return;
    }
    const date = new Date();
    const createdDataObject = {
      type: "checkIn",
      timestamp: Number(date.getTime()),
      title: makeTimeStringValue(date),
    };
    console.info("[click!] Есть приход:", createdDataObject);
    setWorkStatus(workStatuses[1]);
  };
  const handleOutcomeClick = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (workStatus === workStatuses[0]) {
      return;
    }
    const date = new Date();
    const createdDataObject = {
      type: "checkOut",
      timestamp: Number(date.getTime()),
      title: makeTimeStringValue(date),
    };
    console.info("[click!] Есть уход:", createdDataObject);
    setWorkStatus(workStatuses[0]);
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
        <p className="current_working_status_paragraph">{workStatus.comment}</p>
        <p>
          Хочешь - пришел, а хочешь - ушел.
          <br /> Главное это не забыть нажать нужную кнопку в приложении
        </p>
        <div className="card">
          <p>чуть позже можно будет ввести данные вручную с помощью формы</p>
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
