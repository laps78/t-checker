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
    const now: number = new Date().getTime();
    const unClosedDayWorkedOutTime: number =
      Number(now) - Number(foundMarks[0].timestamp);
    const unClosedDayWorkedOutTimeSec: number = (
      unClosedDayWorkedOutTime / 1000
    ).toFixed(0);
    const unClosedDayWorkedOutTimeMin: number = (
      unClosedDayWorkedOutTimeSec / 60
    ).toFixed(0);
    const unClosedDayWorkedOutTimeHours: number = (
      unClosedDayWorkedOutTimeMin / 60
    ).toFixed(0);
    const unClosedDayWorkedOutTimeRestMin: number =
      unClosedDayWorkedOutTimeMin - unClosedDayWorkedOutTimeHours * 60;
    console.log(unClosedDayWorkedOutTimeSec);
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
  const workedOutSec: number = (workedOutMilis / 1000).toFixed(0);
  const workedOutMinutes: number = (workedOutSec / 60).toFixed(0);
  const workedOutHours: number = (workedOutMinutes / 60).toFixed(0);
  const restMinutes: number = workedOutMinutes - workedOutHours * 60;
  console.log(workedOutSec);
  const stats = {
    checkinTimeString,
    checkoutTimeString,
    workedOutHours,
    restMinutes,
  };

  return stats;
};
