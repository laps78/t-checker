const { appendFile } = require("fs/promises");
const os = require("os");

const saveDataToFS = async (req, res, next) => {
  const { data } = req.data;
  try {
    console.log("[savetoFS] data from req: ", data);
    await fs.appendFile("timelog.dat", data + os.EOL, "utf-8")
  } catch (error) {
    console.error("Ошибка при сохранении данных в файл timelog.dat", error);
  }
  next();
};

module.exports = { saveDataToFS };
