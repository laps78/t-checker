/**
 *
 * @param {array} foundMarks не пустой массив найденных значений
 * @returns строку для вывода элементе статистики смены
 */
export const statsMaker = (foundMarks) => {
  const checkinTimeString = foundMarks[0].timestring;
  const checkoutTimeString = foundMarks[1].timestring;
  const workedOutMilis =
    Number(foundMarks[1].timestamp) - Number(foundMarks[0].timestamp);
  const workedOutSec: number = workedOutMilis / 1000;
  const workedOutMinutes: number = Number((workedOutSec / 60).toFixed(0));
  const workedOutHours: number = Math.floor(Number(workedOutMinutes) / 60);
  const restMinutes: number = workedOutMinutes - workedOutHours * 60;
  const statsString = `Статистика рабочей смены ${foundMarks[0].datestring}:\n
  ПРИХОД: ${checkinTimeString}\n
  УХОД: ${checkoutTimeString}\n
  -----------------------------\n
  ОТРАБОТАНО:\n
  ${workedOutHours} часов ${restMinutes} минут\n
  (${workedOutMinutes} минут)`;

  const stats = {
    checkinTimeString,
    checkoutTimeString,
    workedOutHours,
    restMinutes,
    statsString,
  };

  return stats;
};
