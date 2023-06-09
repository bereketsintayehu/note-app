import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteNote, updateNote } from '../features/notes/noteSlice';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './style.css';

function NoteItem({ note }) {
  const [visibility, setVisibility] = useState(false);
  const [text, setText] = useState('');
  const [isTitleChanged, setIsTitleChanged] = useState(false); 
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
      toast.error('Note title should not be empty');
    } else {
      const noteData = {
        id: note._id,
        md: note.md,
        text: text,
      };

      const confirmed = window.confirm('Are you sure you want to update the note?');

      if (confirmed) {
        dispatch(updateNote(noteData));
        setText('');
        setVisibility(false);
        setIsTitleChanged(false); // Reset the title change flag
        toast.success('Note updated successfully');
      }
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete the note?');

    if (confirmed) {
      dispatch(deleteNote(id));
      toast.success('Note deleted successfully');
    } else {
      toast.info('Note deletion cancelled');
    }
  };

  const handleTitleChange = (e) => {
    setText(e.target.value);
    setIsTitleChanged(e.target.value !== note.text); // Set the title change flag
  };

  return (
    <div className="note">
      <div>{new Date(note.createdAt).toLocaleDateString('en-US')}</div>
      <Link className="extend" to={'/note/' + note._id}>
        <h2 className="title">{note.text}</h2>
      </Link>
      <button
        onClick={() => handleDelete(note._id)}
        className="delete"
        aria-label="Delete Note"
      >
        <FaTrashAlt />
        <span className="sr-only">Delete Note</span>
      </button>
      <button
        onClick={() => setVisibility(true)}
        className="update"
        aria-label="Update Note"
      >
        <FaPencilAlt />
        <span className="sr-only">Update Note</span>
      </button>

      {visibility && (
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="text">Note Title</label>
              <input
                defaultValue={note.text}
                onChange={handleTitleChange}
                placeholder="Enter note title"
                required
              />
              {isTitleChanged && text.trim() === '' && (
                <p className="validation-feedback">Note title should not be empty</p>
              )}
            </div>
            <div className="form-group">
              <button
                className="btn btn-block"
                type="submit"
                disabled={!isTitleChanged || text.trim() === ''}
                style={{
                  opacity: isTitleChanged ? 1 : 0.5, // Set the opacity based on the title change
                  cursor: isTitleChanged ? 'pointer' : 'not-allowed', // Set the cursor style based on the title change
                }}
                title={!isTitleChanged ? "No changes to save" : text.trim() === '' ? "Note title should not be empty" : ""}
              >
                Update Title
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

export default NoteItem;
