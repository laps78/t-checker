import { useState } from "react";
import EditMarkForm from "./editMark.form";
import { statsMaker } from "../../helpers/statsMaker";

const dontHaveMarksString =
  "Выберите интересующую вас дату, чтобы увидеть информацию о рабочем времени";

export function DailyInfoCard({ date, db }) {
  let dayStats = null;
  //const [isFormHidden, setFormHidden] = useState(true);
  //const [dayStats, setDayStats] = useState(dontHaveMarksString);
  //const [dailyMarks, setDailyMarks] = useState(getMatchedMarkArray(date, db));
  //const [nowEditing, setNowEditing] = useState[dailyMarks[0]];

  const matchedMarksArray = db.getMarksByDatestring(date);
  if (matchedMarksArray.length > 0) {
    dayStats = statsMaker(matchedMarksArray);
  } else {
    dayStats = {
      checkinTimeString: false,
      checkoutTimeString: false,
    };
  }

  // open editors handlers
  const editCheckinHandler = (event) => {
    //setFormHidden(!isFormHidden);
    //setNowEditing(dailyMarks[0]);
    //
    console.log("isFormHidden: ", isFormHidden);
    //
  };
  const editCheckoutHandler = (event) => {
    //setFormHidden(!isFormHidden);
    //setNowEditing(dailyMarks[1]);
    console.log("isFormHidden: ", isFormHidden);
  };

  // Daily card
  const DailyInfo = () => {
    return (
      <>
        <div className="daily_card_stats">
          <div className="statsRow__container">
            <span className="statsRow">
              <strong>ПРИХОД:</strong>
              {`${dayStats.checkinTimeString || "нет отметок"}`}
            </span>
            <a
              className="statsRow_edit_link"
              href="#"
              onClick={editCheckinHandler}
            >
              ✎
            </a>
          </div>
          <div className="statsRow__container">
            <span className="statsRow">
              <strong>УХОД:</strong>{" "}
              {`${dayStats.checkoutTimeString || "нет отметок"}`}
            </span>
            <a
              className="statsRow_edit_link"
              href="#"
              onClick={editCheckoutHandler}
            >
              ✎
            </a>
          </div>
          <hr />
          <span className="statsRow">
            <strong>ОТРАБОТАНО:</strong> {dayStats.workedOutHours || 0} часов{" "}
            {dayStats.restMinutes || 0} минут
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <h3>{date}</h3>
      <DailyInfo />
    </>
  );
}

export default DailyInfoCard;
