import { useState, useEffect } from "react";
import { statsMaker } from "../../../helpers/statsMaker";
import DailyInfo from "./DailyInfo";

const dontHaveMarksString =
  "Выберите интересующую вас дату, чтобы увидеть информацию о рабочем времени";

export function DailyInfoCard({ date, db }) {
  let dayStats = dontHaveMarksString;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    let ignore = false;
    const getData = () => {
      setLoading(true);
      db.getMarksByDatestring(date)
        .then((result) => {
          console.log("result: ", result);
          setData(result);
          setLoading(false);
          ignore = true;
        })
        .catch((error) => {
          console.error(
            "[ DailyInfoCard ] Ошибка при получении данных: ",
            error.stack
          );
          setLoading(false);
          return (
            <>{`Упс!.. Что пошло не так.=( Попробуйте обновить страницу.`}</>
          );
        })
        .finally(() => {
          ignore = true;
          setLoading(false);
        });
    };
    getData();
  }, [date]);

  if (isLoading) {
    return <div className="loader">Загрузка данных...</div>;
  }

  return (
    <>
      <h3>{date}</h3>
      <DailyInfo dayStats={statsMaker(data)} />
    </>
  );
}

export default DailyInfoCard;
