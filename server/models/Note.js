import pg from "pg";;
import _ from "lodash";

const pool = new pg.Pool({
    connectionString: "postgres://postgres:password@localhost:5432/launch_digital_library_development"
});

class Note {
    constructor({id=null, date = null, title, body, book_id }){
        this.id = id;
        this.date = date
        this.title = title;
        this.body = body;
        this.book_id = book_id;
    }

    async save() {
        try {
            const query = "INSERT INTO notes (title, body, book_id) VALUES ($1, $2, $3) RETURNING id, date";
            const results = await pool.query( query,[this.title, this.body, this.book_id])
            const row = await results.rows[0];
            console.log("This pre id and date set: ", this);
            this.id = row.id;
            this.date = row.date;
            console.log("This post id and date set: ", this);
            if(!!this.id && !!this.date)
                return true;
            else
                throw new Error("Persistance failure. id and/or date not created");
        } catch(error){
            console.log(error);
            return false;
        }
    }

    static async getNotesByBookID(id){
        const results = await pool.query(`SELECT * FROM notes where notes.book_id = ${id};`);
        console.log(results.rows);
        return results.rows;
    }


}
export default Note;