import foundMarksDeleteInner from "./foundMarksModifier";

/**
 *
 * @param {array} foundMarks не пустой массив найденных значений
 * @returns строку для вывода элементе статистики смены
 */
export const statsMaker = (foundMarks) => {
  if (foundMarks.length === 0) {
    return {
      checkinTimeString: "нет отметки",
      checkoutTimeString: "нет отметки",
      workedOutHours: 0,
      restMinutes: 0,
      statsString: "нет данных",
    };
  }

  if (foundMarks.length === 1) {
    const now = new Date();
    const nowTimeStamp = now.getTime();
    const unClosedDayWorkedOutTime: number =
      Number(nowTimeStamp) - Number(foundMarks[0].timestamp);
    const unClosedDayWorkedOutTimeSec: number = Number(
      Math.floor(unClosedDayWorkedOutTime / 1000)
    );
    const unClosedDayWorkedOutTimeMin: number = Number(
      Math.floor(unClosedDayWorkedOutTimeSec / 60)
    );
    const unClosedDayWorkedOutTimeHours: number = Number(
      Math.floor(unClosedDayWorkedOutTimeMin / 60)
    );
    const unClosedDayWorkedOutTimeRestMin: number =
      unClosedDayWorkedOutTimeMin - unClosedDayWorkedOutTimeHours * 60;

    return {
      checkinTimeString: foundMarks[0].timestring,
      checkoutTimeString: "нет отметки",
      workedOutHours: unClosedDayWorkedOutTimeHours,
      restMinutes: unClosedDayWorkedOutTimeRestMin,
    };
  }

  // Делаем 2 отметки(первую и последнюю), если их пришло больше
  if (foundMarks.length > 2) {
    foundMarks = foundMarksDeleteInner(foundMarks);
  }

  const checkinTimeString = foundMarks[0].timestring;
  const checkoutTimeString = foundMarks[1].timestring;
  const workedOutMilis =
    Number(foundMarks[1].timestamp) - Number(foundMarks[0].timestamp);
  const workedOutSec: number = Number(Math.floor(workedOutMilis / 1000));
  const workedOutMinutes: number = Number(Math.floor(workedOutSec / 60));
  const workedOutHours: number = Number(Math.floor(workedOutMinutes / 60));
  const restMinutes: number = workedOutMinutes - workedOutHours * 60;
  const stats = {
    checkinTimeString,
    checkoutTimeString,
    workedOutHours,
    restMinutes,
  };

  return stats;
};

export default statsMaker;
