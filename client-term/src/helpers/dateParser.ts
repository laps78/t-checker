/**
 * Функция для преобразования строки даты и времени в объект Date
 * @param {string} dateStr
 * @param {string} timeStr
 * @returns {object} new Date
 */
function parseDateTime(dateStr: string, timeStr: string): object {
  // Разбиваем строку даты на массив компонентов [день, месяц, год]
  const dateParts: string[] = dateStr.split(".");
  const monthNumber: number = Number.parseInt(dateParts[1]);
  // Разбиваем строку времени на массив компонентов [часы, минуты, секунды]
  const timeParts: string[] = timeStr.split(":");

  return new Date(
    Number.parseInt(dateParts[2]),
    Number.parseInt(String(monthNumber - 1)),
    Number.parseInt(dateParts[0]),
    Number.parseInt(timeParts[0]),
    Number.parseInt(timeParts[1]),
    Number.parseInt(timeParts[2])
  );
}

export default parseDateTime;
