const { appendFile } = require("fs/promises");
const os = require("os");

const saveDataToFS = async (dataToSave) => {
  try {
    await fs.appendFile("timelog.dat", dataToSave + os.EOL, "utf-8")
  } catch (error) {
    console.error("Ошибка при сохранении данных в файл timelog.dat", error);
  }
};

module.exports = { saveDataToFS };
