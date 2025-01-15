import { useState } from "react";
import EditMarkForm from "../editMark.form";

const DailyInfo = ({ dayStats }) => {
  console.log("daystats: ", dayStats);
  const [isFormHidden, setFormHidden] = useState(true);
  // open editors handlers
  const editCheckinHandler = (event) => {
    setFormHidden(!isFormHidden);
    //setNowEditing(dailyMarks[0]);
    //
    console.log("isFormHidden: ", isFormHidden);
    //
  };
  const editCheckoutHandler = (event) => {
    setFormHidden(!isFormHidden);
    //setNowEditing(dailyMarks[1]);
    console.log("isFormHidden: ", isFormHidden);
  };
  // if (typeof dayStats === String) {
  //   dayStats = {
  //     checkinTimeString: false,
  //     checkoutTimeString: false,
  //     workedOutHours: false,
  //     restMinutes: false,
  //   };

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

export default DailyInfo;
