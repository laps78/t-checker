// Функция для преобразования строки даты и времени в объект Date
function parseDateTime(dateStr, timeStr) {
  // Разбиваем строку даты на массив компонентов [день, месяц, год]
  const dateParts = dateStr.split(".");

  // Разбиваем строку времени на массив компонентов [часы, минуты, секунды]
  const timeParts = timeStr.split(":");

  return new Date(
    Number.parseInt(dateParts[2]),
    Number.parseInt(dateParts[1]),
    Number.parseInt(dateParts[0]),
    Number.parseInt(timeParts[0]),
    Number.parseInt(timeParts[1]),
    Number.parseInt(timeParts[2])
  );
}

export default parseDateTime;
