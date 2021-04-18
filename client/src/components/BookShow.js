import React, { useState, useEffect } from "react"
import { jsonGetch, jsonPetch } from "./jsonFetch";

const BookShow = (props) => {
  const [book, setBook] = useState({})
  const [formData, setFormData] = useState({
    title: "", body: "", book_id: ""
  })

  const [notes, setNotes] = useState([]);
  /*
  const getBook = async () => {
    try {
      const bookId = props.match.params.id
      const response = await fetch(`/api/v1/books/${bookId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const responseBody = await response.json()
      setBook(responseBody.book);
      setFormData({
        ...formData, book_id: responseBody.book.id
      });

    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }
  */

  const handleResponse = (response) => {
    console.log("response: ", response);
    setNotes(response );
  }

  const setBookData = jsonResponse => {
    setBook(jsonResponse.book);
    setFormData({
      ...formData, book_id: jsonResponse.book.id
    });
  }

  useEffect(() => {
    const bookId = props.match.params.id;
    jsonGetch(`/api/v1/books/${bookId}`,setBookData);
  }, []);

  const getNotes = async () => {
    jsonGetch(`/api/v1/books/${props.match.params.id}/notes`, handleResponse);
  }

  useEffect(() => {
    getNotes();
  }, []);


  let descriptionSection
  if (book.description) {
    descriptionSection = <p>{book.description}</p>
  }

  let fictionSection
  if (book.fiction == true) {
    fictionSection = <p><em>This book is fictional.</em></p>
  }

  const setNoteData = response => {
    //console.log("Response in callBack: ", response);
    setNotes([
      ...notes, response.Note
    ]);
  }

  const onSubmit = event => {
    event.preventDefault();
    //ADD INPUT VALIDATION
    jsonPetch(`/api/v1/books/${formData.bookID}/reading-notes`, formData, setNoteData);
  }

  const onChange = event => {
    setFormData({
      ...formData, [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const notesArray = notes.map(each => {
    return (
      <div key={each.id}>
        <p>{each.title}</p>
        <p>{each.body}</p>
        <p>{each.date.slice(0, each.date.indexOf("T"))}</p>
      </div>
    )
  });

  console.log(notes);

  return (
    <>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <h3>{book.pageCount} pages</h3>
      {descriptionSection}
      {fictionSection}
      NOTES:
      {notesArray}

      <form onSubmit={onSubmit} >
        <input type="hidden" value={formData.book_id} />
        <p>Add a note</p>
        <label htmlFor="title">Title: &nbsp;
          <input type="type" id="title" name="title" value={formData.title} onChange={onChange} />
        </label>
        <label htmlFor="body">Content: &nbsp;
          <input type="type" id="body" name="body" value={formData.body} onChange={onChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default BookShow