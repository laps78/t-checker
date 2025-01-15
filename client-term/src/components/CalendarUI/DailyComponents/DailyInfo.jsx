import { useState } from "react";
import parseDateTime from "../../../helpers/dateParser";

const DailyInfo = ({ dayStats, markData, db }) => {
  console.log(markData);
  const [isFormHidden, setFormHidden] = useState(true);
  const [nowEditing, setNowEditing] = useState({
    timestring: "00:00:00",
  });
  const [currentHours, setCurrentHours] = useState(
    String(nowEditing.timestring.split(":")[0])
  );
  const [currentMinutes, setCurrentMinutes] = useState(
    String(nowEditing.timestring.split(":")[1])
  );

  // open form handlers
  const editCheckinHandler = (event) => {
    setNowEditing(markData[0]);
    setFormHidden(!isFormHidden);
  };

  // delete mark button Handlers
  const deleteCheckinHandler = () => {
    if (markData[0]) {
      db.deleteMark(markData[0].id);
    }
  };
  const deleteCheckoutHandler = () => {
    if (markData[1]) {
      db.deleteMark(markData[1].id);
    }
  };

  const editCheckoutHandler = (event) => {
    if (markData.length < 2) {
      const now = newDate();
      markData.push({
        type: "checkOut",
        timestamp: now.getTime().toString(),
        datestring: now.toLocaleDatestring(),
        timestring: now.toLocaleDatestring(),
      });
    }
    setNowEditing(markData[1]);
    setFormHidden(!isFormHidden);
  };

  const togglePopupDisplayStyle = () => {
    if (!isFormHidden) {
      return { display: "flex" };
    }
    return { display: "none" };
  };

  const closeFormButtonHandler = (event) => {
    setFormHidden(!isFormHidden);
  };

  // input change handlers
  const changeHoursHandler = (event) => {
    //
    console.log("hours changed!");
    //
    let newHours = event.target.value;

    if (newHours < 10) {
      newHours = `0${newHours}`;
    }
    //
    console.log("new: ", newHours);
    //
    setCurrentHours(newHours);
  };

  const changeMinutesHandler = (event) => {
    //
    console.log("minutes changed!");
    //
    let newMinutes = event.target.value;
    if (newMinutes < 10) {
      newMinutes = `0${newMinutes}`;
    }
    setCurrentMinutes(newMinutes);
  };

  // Form submit handler
  const submitHandler = async (event) => {
    event.preventDefault();
    const newTimestring = `${currentHours}:${currentMinutes}:00`;
    const newDate = parseDateTime(markData[0].datestring, newTimestring);
    const newTimestamp = newDate.getTime();
    await db.updateMark(nowEditing.id, {
      timestamp: newTimestamp,
      timestring: newTimestring,
    });
    setFormHidden(!isFormHidden);
  };

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
          <a
            className="statsRow_delete_link"
            href="#"
            onClick={deleteCheckinHandler}
          >
            🗑
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
          <a
            className="statsRow_delete_link"
            href="#"
            onClick={deleteCheckoutHandler}
          >
            🗑
          </a>
        </div>
        <hr />
        <span className="statsRow">
          <strong>ОТРАБОТАНО:</strong> {dayStats.workedOutHours || 0} часов{" "}
          {dayStats.restMinutes || 0} минут
        </span>
      </div>

      <div style={togglePopupDisplayStyle()} className="EditFormPopup">
        <div className="EditFormPopupHeader">
          <div className="popup_header_caption">
            {`Редактор метки [${nowEditing.type}] от ${nowEditing.datestring}`}
          </div>
          <div className="PopupCloseButton" onClick={closeFormButtonHandler}>
            X
          </div>
        </div>
        <form onSubmit={submitHandler} className="EditForm">
          <h3>Укажите новое значение:</h3>
          <div className="timeInput">
            <div className="leftCol">
              <input
                name="input_hours"
                onChange={changeHoursHandler}
                type="text"
                className="edit_form_textinput"
                placeholder={currentHours}
              />
              <label htmlFor="input_hours" className="editForm_textLabel">
                часов
              </label>
            </div>
            <div className="centerCol">:</div>
            <div className="rightCol">
              <input
                name="input_minutes"
                onChange={changeMinutesHandler}
                type="text"
                className="edit_form_textinput"
                placeholder={currentMinutes}
              />
              <label htmlFor="input_minutes" className="editForm_textLabel">
                минут
              </label>
            </div>
          </div>
          <button className="editForm_submit" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </>
  );
};

export default DailyInfo;
