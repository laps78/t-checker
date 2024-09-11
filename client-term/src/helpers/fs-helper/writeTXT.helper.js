import fs from "fs";
import os from "os";

const writeDataToFile = (data) => {
  console.log("датаЖ ", data);
  fs.appendFile("server.log", data + os.EOL, (err) => {
    if (err) throw err;
  });
};

export default writeDataToFile;
