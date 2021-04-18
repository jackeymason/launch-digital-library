import express, { response } from "express"
import pg from 'pg'

import Book from "../../../models/Book.js"
import Note from "../../../models/Note.js"
const booksRouter = new express.Router()

booksRouter.get("/", async (req, res) => {
  const result = await Book.findAll();
  res.json({ books: result });
})

booksRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  const result = await Book.findById(id);
  res.json({ book: result[0] });
})

booksRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const book = new Book(req.body);
    const persisted = await book.save();
    if (persisted)
      res.json(book);
    else {
      const { title, author, pageCount, description, fiction } = req.body;
      throw new Error(`${title} ${author} ${pageCount} ${description} ${fiction} not persisted to DB`);
    }
  } catch (error) {
    console.log(error)
    res.status(422).json({ errors: error });
  }
})

booksRouter.post("/:id/reading-notes", async (req, res) => {
  try {
    Object.keys(req.body).forEach(key =>{
      if(req.body[key] === "")
        req.body[key] = null;
    });
    let note = new Note(req.body);
    //console.log("pre save note: ", note);
    const success = await note.save();
    if(!!!success)
      throw new Error("Error: failed to persist data.");
    else
      res.status(201).json({Note: note});
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
})

booksRouter.get("/:id/notes", async (req, res) => {
  const id = req.params.id;
  try{
  const notesArray = await Note.getNotesByBookID(id);
  res.status(200).json(notesArray);
  } catch(Error){
    console.log(Error);
    res.status(500).json({error: error});
  }
})




export default booksRouter