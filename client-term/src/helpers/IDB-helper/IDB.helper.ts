import Dexie from "dexie";

class IDB {
  constructor() {
    this.db = this.createDB();
  }

  createDB() {
    try {
      const db = new Dexie("checkMarks");
      db.version(1).stores({
        checkMarks: "++id, type, timestamp, datestring, timestring",
      });
      return db;
    } catch (error) {
      console.error(
        "[ IDB Module ] Ошибка создания новой базы данных: ",
        error
      );
    }
  }

  async save(checkMark) {
    try {
      await this.db.checkMarks.add(checkMark);
    } catch (error) {
      console.error(
        `[ IDB Module ] Ошибка добавления записи в базу данных: `,
        error
      );
    }
  }

  async getAllMarks() {
    const arrayMarks = await this.db.checkMarks.toArray();
    return arrayMarks;
  }

  /**
   * этот рабочий асинхронный метод еще нигде не использован
   */
  async getLastMark() {
    try {
      const lastMark = await this.db.checkMarks.orderBy("timestamp").last();
      return lastMark;
    } catch (error) {
      console.error(
        `[ IDB Module ] Ошибка чтения записи в базе данных: `,
        error
      );
    }
  }
}

export default IDB;
