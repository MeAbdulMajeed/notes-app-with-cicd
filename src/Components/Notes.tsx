import { ChangeEvent, useState } from "react";
import EditNotesModal from "./EditNotesModal";

interface Note {
  id: string;
  title: string;
  description: string;
}

const Notes = () => {
  // State for creating a new note
  const [note, setNote] = useState({ id: "", title: "", description: "" });
  // State for all notes
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  // State for editing a note
  const [editNote, setEditNote] = useState<Note | null>(null);

  // Handle change for create form
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  // Add new note
  const handleAddNote = () => {
    if (note.title.trim().length > 0 && note.description.trim().length > 0) {
      setAllNotes((prev) => [...prev, { ...note, id: crypto.randomUUID() }]);
      setNote({ id: "", title: "", description: "" }); // reset form
    }
  };

  // Open edit modal
  const handleEdit = (note: Note) => {
    setEditNote(note);
  };

  // Save edited note
  const handleSaveEdit = () => {
    if (!editNote) return;
    setAllNotes((prev) =>
      prev.map((n) => (n.id === editNote.id ? editNote : n))
    );
    setEditNote(null); // close modal
  };

  // Delete note
  const handleDelete = (id: string) => {
    setAllNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="m-4">
      {/* Create Note Form */}
      <div className="mb-4">
        <div className="d-flex flex-column my-3">
          <label htmlFor="title">Title</label>
          <input
            value={note.title}
            type="text"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="d-flex flex-column my-3">
          <label htmlFor="description">Description</label>
          <textarea
            value={note.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddNote}>
          Add Note
        </button>
      </div>

      {/* List of Notes */}
      <div className="my-2">
        <h3 className="text-danger">All Notes</h3>
        {allNotes.map((n) => (
          <div className="p-2 border mb-2" key={n.id}>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary btn-sm mx-2"
                onClick={() => handleEdit(n)}
                data-bs-toggle="modal"
                data-bs-target="#editModal"
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm mx-2"
                onClick={() => handleDelete(n.id)}
              >
                Delete
              </button>
            </div>
            <h4>{n.title}</h4>
            <p>{n.description}</p>
          </div>
        ))}
      </div>

      {/* Edit Note Modal */}
      <EditNotesModal
        editNoteModal={editNote}
        setEditNote={setEditNote}
        handleSaveEdit={handleSaveEdit}
      />
    </div>
  );
};

export default Notes;
