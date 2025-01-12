import { useState } from "react";
import EditMarkForm from "./editMark.form";

export default function DailyInfoCard({ date, stats, db }) {
  const [isFormHidden, setFormHidden] = useState(true);
  const [dailyMarks, setDailyMarks] = useState([]);
  const [nowEditing, setNowEditing] = useState[dailyMarks[0]];

  // open editors handlers
  const editCheckinHandler = (event) => {
    setFormHidden(!isFormHidden);
    setNowEditing(dailyMarks[0]);
    //
    console.log("isFormHidden: ", isFormHidden);
    //
  };
  const editCheckoutHandler = (event) => {
    setFormHidden(!isFormHidden);
    setNowEditing(dailyMarks[1]);
    console.log("isFormHidden: ", isFormHidden);
  };

  // Daily card
  const { checkinTimeString, checkoutTimeString, workedOutHours, restMinutes } =
    stats;
  const DailyInfo = () => {
    if (stats !== "") {
      return (
        <>
          <div className="daily_card_stats">
            <div className="statsRow__container">
              <span className="statsRow">
                <strong>ПРИХОД:</strong>
                {`${checkinTimeString || "нет отметок"}`}
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
                {`${checkoutTimeString || "нет отметок"}`}
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
              <strong>ОТРАБОТАНО:</strong> {workedOutHours || 0} часов{" "}
              {restMinutes || 0} минут
            </span>
          </div>
          <EditMarkForm markData={nowEditing} />
        </>
      );
    } else {
      return "нет отметок";
    }
  };

  return (
    <>
      <h3>{date}</h3>
      <DailyInfo />
    </>
  );
}
