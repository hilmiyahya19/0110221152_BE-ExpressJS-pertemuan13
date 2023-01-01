// import database
const db = require("../config/database");

// membuat class student
class Student {
  //   // solusiton with callback
  //   static all(callback) {
  //     const query = "SELECT * FROM students";
  //     /**
  //      * Melakukan query menggunakan method query
  //      * Menerima 2 params: query dan callback
  //      */
  //     db.query(query, (err, results) => {
  //       callback(results);
  //     });
  //   }

  // solusiton with promise + async await
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM students";
      /**
       * Melakukan query menggunakan method query
       * Menerima 2 params: query dan callback
       */
      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  /**
   * TODO 1: Buat fungsi untuk insert data.
   * Method menerima parameter data yang akan diinsert.
   * Method mengembalikan data student yang baru diinsert.
   */
  static async create(data) {
    // melakukan insert data ke database
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO students SET ?";
      db.query(sql, data, (err, results) => {
        resolve(results.insertId);
      });
    });

    // mencari data yang baru ditambahkan
    const student = await this.find(id);
    return student;
  }

  static find(id) {
    // melakukan query berdasarkan id
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM students WHERE id = ?";
      db.query(sql, id, (err, results) => {
        // destructing array
        const [student] = results;
        resolve(student);
      });
    });
  }

  // models update
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE students SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    // mencari data yang baru diupdate
    const student = await this.find(id);
    return student;
  }

  // models delete
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM students WHERE id = ?";

      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }
}

// export class Student
module.exports = Student;