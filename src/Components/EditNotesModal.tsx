import { ChangeEvent } from "react";

interface Note {
  id: string;
  title: string;
  description: string;
}

interface EditNotesModalProps {
  editNoteModal: Note | null;
  setEditNote: React.Dispatch<React.SetStateAction<Note | null>>;
  handleSaveEdit: () => void;
}

const EditNotesModal = ({
  editNoteModal,
  setEditNote,
  handleSaveEdit,
}: EditNotesModalProps) => {
  if (!editNoteModal) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditNote((prev) =>
      prev ? { ...prev, [name]: value } : prev
    );
  };

  return (
    <div className="modal" id="editModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column my-3">
              <label htmlFor="title">Title</label>
              <input
                value={editNoteModal.title}
                type="text"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column my-3">
              <label htmlFor="description">Description</label>
              <textarea
                value={editNoteModal.description}
                name="description"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveEdit}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNotesModal;
