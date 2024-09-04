import { useState } from "react";
import reactLogo from "./assets/react.s:vg";
import viteLogo from "/vite.svg";
import "./App.css";
import workStatuses from "./preferences/workstatuses.data.js";

function App() {
  const currentWorkStatus = workStatuses[0];
  const [workStatus, setWorkStatus] = useState(currentWorkStatus);
  const handleIncomeClick = (event) => {
    console.info("[click!] Есть приход");
  };
  const handleOutcomeClick = (event) => {
    console.info("[click!] Есть уход");
  };
  return (
    <>
      <header>
        <div className="header__line">
          <>t-checker</>
        </div>
      </header>  
      <main>
        <h1>{"t-checker | " + workStatus.name}</h1>
        <p className="current_working_status_paragraph">{workStatuses.comment}</p>
        <p>
          Хочешь - пришел, а хочешь - ушел.<br /> Главное это не забыть нажать нужную кнопку в приложении
        </p>      
        <div className="card">
          <p>чуть позже можно будет ввести данные вручную с помощью формы</p>
        </div>
        <div className="footer">
          <div
            onClick={handleIncomeClick}
            className="button footer-button footer-left-button">
            Отметить приход
          </div>
          <div
            onClick={handleOutcomeClick}
            className="button footer-button footer-right-button">
            Отметить уход
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

