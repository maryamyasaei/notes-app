import { useState } from "react"
import "./App.css"

export interface Note {
  id: number
  title: string
  content: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Todo List",
      content: "Washing, doing Assignments, Calling Sister",
    },
    {
      id: 2,
      title: "Remember",
      content: "Dr Appointment on Next Week.",
    },
    {
      id: 3,
      title: "Reading List",
      content: "1- Fraction of the Whole 2- Keep calm and Code On",
    },
  ])

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const newNote: Note = {
    id: notes.length + 1,
    title: title,
    content: content,
  }

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault()
    setNotes([newNote, ...notes])
    setTitle("")
    setContent("")
  }
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault()

    if (!selectedNote) {
      return
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    }

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    )

    setNotes(updatedNotesList)
    setTitle("")
    setContent("")
    setSelectedNote(null)
  }
  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null)
  }

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation()
    const updatedNotes = notes.filter((note) => note.id !== noteId)
    setNotes(updatedNotes)
  }

  return (
    <div className="app-container">
      <form
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handleAddNote(event)
        }
        className="note-form"
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        ></input>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        ></textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              onClick={() => handleNoteClick(note)}
            >
              <div className="notes-header">
                <button onClick={(event) => deleteNote(event, note.id)}>
                  x
                </button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
