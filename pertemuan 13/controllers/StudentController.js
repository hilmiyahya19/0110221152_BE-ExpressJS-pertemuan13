// TODO 3: Import data students dari folder data/students.js
const Student = require("../models/Student");

// Membuat Class StudentController
class StudentController {
  // menambahkan keyword async untuk memberitahu proses asyncronus
  async index(req, res) {
    // memanggil method static all dengan async await
    const students = await Student.all();

    if (students.length > 0) {
      const data = {
        message: "Menampilkkan semua students",
        data: students,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Data students kosong",
      };

      res.status(404).json(data);
    }
  }

  // TODO 5: Tambahkan data students
  async store(req, res) {
    /**
     * Validasi sederhana
     *    Menghandle jika salah satu data tidak dikirim
     */

    // destructing req.body
    const { nama, nim, email, jurusan } = req.body;

    if (!nama || !nim || !email || !jurusan) {
      const data = {
        message: `Semua data harus dikirim`,
      };

      res.status(422).json(data);
    } else {
      const student = await Student.create(req.body);
      const data = {
        message: "Data student ditambahkan",
        data: student,
      };

      res.status(200).json(data);
    }
  }

  // TODO 6: Update data students
  async update(req, res) {
    const { id } = req.params;
    // cari id student yg ingin di update
    const student = await Student.find(id);

    if (student) {
      // melakukan update data
      const student = await Student.update(id, req.body);
      const data = {
        message: `Mengedit student id ${id}`,
        data: student,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Data student id ${id} tidak ditemukan`,
        data: student,
      };

      res.status(404).json(data);
    }
  }

  // TODO 7: Hapus data students
  async destroy(req, res) {
    const { id } = req.params;
    const student = await Student.find(id);

    if (student) {
      await Student.delete(id);
      const data = {
        message: `Menghapus student id ${id}`,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Data student id ${id} tidak ditemukan`,
      };

      res.status(404).json(data);
    }
  }

  // Melihat detail students
  async show(req, res) {
    const { id } = req.params;
    const student = await Student.find(id);

    if (student) {
      const data = {
        message: `Menampilkan data student id ${id}`,
        data: student,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Data student id ${id} tidak ditemukan`,
      };

      res.status(404).json(data);
    }
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;