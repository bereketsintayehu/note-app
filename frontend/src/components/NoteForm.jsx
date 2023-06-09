import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../features/notes/noteSlice';
import { toast } from 'react-toastify';

function NoteForm() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === '') {
      return; // Exit the function if the note field is empty
    }

    const noteData = {
      text: text,
      md: '',
    };

    try {
      await dispatch(createNote(noteData));

      // Show toast message for success
      toast.success('Note created successfully.');
    } catch (error) {
      // Show toast message for error
      toast.error('An error occurred while creating the note.');
    }

    setText('');
  };

  const isNoteEmpty = text.trim() === '';

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Note Title</label>
          <input type="text" name="text" id="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="form-group">
        <button className="btn btn-block" type="submit" disabled={isNoteEmpty} 
        style={{ opacity: isNoteEmpty ? 0.5 : 1, cursor: isNoteEmpty ? 'not-allowed' : 'pointer' }}
        title={isNoteEmpty ? 'Empty note title' : ''}
        >
            Add Note
        </button>

        </div>
      </form>
    </section>
  );
}

export default NoteForm;
