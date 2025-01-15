import { useState } from "react";

export const EditMarkForm = (db, markData) => {
  // const savedTimeStringArray = markData.timestring.split(":");
  // const savedHours = savedTimeStringArray[0];
  // const savedMinutes = savedTimeStringArray[1];
  const [isHidden, setHidden] = useState(true);
  const [currentHours, setCurrentHours] = useState("");
  const [currentMinutes, setCurrentMinutes] = useState("");

  const togglePopupDisplayStyle = () => {
    if (!isHidden) {
      return { display: "flex" };
    }
    return { display: "none" };
  };
  const closeButtonHandler = (event) => {
    setHidden(!isHidden);
  };

  // input change handlers
  const changeHoursHandler = (event) => {
    let newHours = event.target.value;
    if (newHours < 10) {
      newHours = `0${newHours}`;
    }
    setCurrentHours(newHours);
  };
  const changeMinutesHandler = (event) => {
    let newMinutes = event.target.value;
    if (newMinutes < 10) {
      newMinutes = `0${newMinutes}`;
    }
    setCurrentMinutes(newMinutes);
  };

  // Form submit handler
  const submitHandler = async (event) => {
    event.preventDefault();
    //
    console.log("editForm submitted!");
    //
    const newDate = new Date(
      `${markData.datestring} ${currentHours}:${currentMinutes}:00`
    );
    const newTimestamp = newDate.getTime();
    const newTimestring = `${currentHours}:${currentMinutes}:00`;
    const newMarkData = {
      timestamp: newTimestamp,
      timestring: newTimestring,
    };
    await db.update(markData.id, {
      timestamp: newTimestamp,
      timestring: newTimestring,
    });
    setHidden(!isHidden);
  };
  return (
    <div style={togglePopupDisplayStyle()} className="EditFormPopup">
      <h3>{`Редактор метки ${markData.type} ${markData.datestring}`}</h3>
      <div className="EditFormPopupHeader">
        <div className="PopupCloseButton" onClick={closeButtonHandler}>
          X
        </div>
      </div>
      <form className="EditMarkForm" onSubmit={submitHandler}>
        <input
          onChange={changeHoursHandler}
          type="text"
          className="edit_form_textinput"
          value={currentHours}
        />
        <input
          onChange={changeMinutesHandler}
          type="text"
          className="edit_form_textinput"
          value={currentMinutes}
        />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default EditMarkForm;
