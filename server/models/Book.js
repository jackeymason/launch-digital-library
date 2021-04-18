import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/launch_digital_library_development"
})

class Book {
  constructor({ id=null, title, author, pageCount, description, fiction }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.page_count = parseInt(pageCount);
    this.description = description;
    this.fiction = fiction;
  }

  static async findAll() {
    const results = await pool.query('SELECT * FROM books');
    return results.rows;
  }

  static async findById(id) {
    const results = await pool.query(`SELECT * FROM books WHERE id = ${id}`);
    return results.rows;
  }

  async save() {
    try {
      const query = "INSERT INTO books (title, author, page_count, description, fiction) VALUES ($1, $2, $3, $4, $5) RETURNING id;";

      const results = await pool.query(query, [this.title, this.author, this.page_count, this.description, this.fiction]);
      const row = await results.rows[0];
      const newBookID = row.id;
      this.id = newBookID;
      console.log(this.id);
      return this.id > -1;
    } catch (error) {
      console.error(error);
    }
    return false;
  }
}

export default Book