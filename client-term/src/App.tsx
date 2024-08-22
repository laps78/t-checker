import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const workStatuses = [ 
    {
      name: "не работаю",
      boolean: false,
      id: 0,
      comment: "Или забыл отметиться о прибытии...",
    },
    {
      name: "работаю",
      boolean: true,
      id: 1,
      comment: "Или забыл отметиться об уходе...",
    },
  ]
  const currentWorkStatus = workStatuses[0] 
  const [workStatus, setWorkStatus] = useState(currentWorkStatus);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>t-checker</h1>
      <p>
        Хочешь - пришел, а хочешь - ушел.
        <br /> Главное это не забыть нажать нужную кнопку в приложении
      </p>
      <header>
        <div className="header_line">
          t-checker
        </div>
      </header>
      <main>
        <div className="status__holder">
          <h1>{workStatus.name}</h1>
          <p>{workStatus.comment}</p>
        </div>
      </main>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          счетчик рандомных вспышек спонтанного тапательного гнева<br/ > {count}
        </button>
        <p>Ввести данные вручную с помощью формы</p>
      </div>
      <div className="footer">
        <div className="button footer-button footer-left-button">
          приход
        </div>
        <div className="button footer-button footer-right-button">
          уход
        </div>
      </div>
    </>
  );
}

export default App;
