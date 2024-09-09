import Dexie from "dexie";

class IDB {
  constructor() {
    this.db = this.createDB();
  }

  createDB() {
    try {
      const db = new Dexie("checkMarks");
      db.version(1).stores({
        checkMarks: "++id, type, timestamp, title",
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
    } catch (eror) {
      console.error(
        `[ IDB Module ] Ошибка добавления записи в базу данных: `,
        error
      );
    }
  }
}

export default IDB;
