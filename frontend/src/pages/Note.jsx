import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateNote } from '../features/notes/noteSlice';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { toast } from 'react-toastify';
import 'katex/dist/katex.min.css';

function Note() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'i') {
        setShowInstructions((prevShowInstructions) => !prevShowInstructions);
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  

  const markdownInstructions = `
    Use Cntrl + i to hide instruction


    Example Markdown Usage:
    \n
    new line: (hit enter key twice)
    \n
    Block Math Expression: $$ ... $$
    \n
    Inline Math Expression: $ ... $
    \n
    Heading 1: # Heading 1
    \n
    Heading 2: ## Heading 2
    \n
    Heading 3: ### Heading 3
    \n
    Heading 4: #### Heading 4
    \n
    Heading 5: ##### Heading 5
    \n
    Heading 6: ###### Heading 6
    \n
    Heading 7: ####### Heading 7
    \n
    Italic: *italic*
    \n
    Bold: **bold**
    \n
    Bold Italic: ***bold italic***
    \n
    Underline: _underline_
    \n
    Underline Bold: __underline bold__
    \n
    Underline Bold Italic: ___underline bold italic___
    \n
    Strikethrough: ~~Strikethrough~~
    \n
    Link: [link](https://www.google.com)
    \n
    Image: ![image](URL to image on open internet)
    \n
    List item:
    \n
    * list item
    \n
      - list item
    \n
        + list item
    \n
    Code block:
    \n
    \`\`\`code
    code
    \`\`\`
    \n
    Ordered list:
    \n
    1. ordered list item
    \n
    2. ordered list item
    \n
      1. ordered list item
    \n
    Math:
    \n
      - Fraction: \\frac{1}{2}
    \n
      - Square Root: \\sqrt{4}
    \n
      - Exponential: e^{i\\pi} = -1
    \n
      - Subscript: H_{2}O
    \n
      - Complex Numbers: \\mathbf{1+i}
    \n
      - Trigonometric Functions: \\sin(x) \\cos(x) \\tan(x)
    \n
      - Logarithms: \\log_2(x) \\log_{10}(x) \\log_{10}(x) \\log_{2}(x)
    \n
      - Absolute Value: \\left| \\frac{1}{2} \\right| = \\sqrt{\\frac{1}{2}}
  `;

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const { user } = useSelector((state) => state.auth);
  const { notes, isLoading, isError, message } = useSelector((state) => state.notes);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, isError, message, dispatch]);

  const noteId = window.location.pathname.split('/')[2];
  let note = notes.find((note) => note._id === noteId);
  const [text, setText] = useState(note.md);
  const [isTextAreaEmpty, setIsTextAreaEmpty] = useState(true);
  const [isNoteChanged, setIsNoteChanged] = useState(false);

  useEffect(() => {
    setIsNoteChanged(text !== note.md);
  }, [text, note.md]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
      toast.error('Nothing to update');
    } else if (!isNoteChanged) {
      toast.warn('No changes detected');
    } else {
      const noteData = {
        id: note._id,
        text: note.text,
        md: text,
      };

      const confirmed = window.confirm('Are you sure you want to update the note?');

      if (confirmed) {
        dispatch(updateNote(noteData));
        setText('');
        setIsTextAreaEmpty(true);
        setIsNoteChanged(false);
        toast.success('Note updated successfully');
      }
      else{
        toast.info('Note update cancelled');
      }
    }
  };

  const handleTextAreaChange = (e) => {
    setText(e.target.value);
    setIsTextAreaEmpty(e.target.value === '');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>{note.text}</h1>
        <p>
          <label htmlFor="markdown" className="form-group">
            Markdown extended note taking
          </label>
        </p>
      </section>

      <section className="instructions">
        <h2>Markdown Instructions <span style={{ fontFamily: 'monospace', fontSize: '0.9em', background: '#f7f7f7', padding: '0.2em 0.4em', borderRadius: '4px'}}>Ctrl + i</span></h2>
        {showInstructions && (
          <pre style={{fontSize: '16px'}}>
            {markdownInstructions}
          </pre>
        )}
        <button onClick={toggleInstructions}>
          {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
        </button>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Extend Note</label>
            <textarea
              type="text"
              name="markdown"
              id="markdown"
              placeholder="Enter your markdown note here:&#10;Example Markdown Usage:&#10;&#8205;&#10;new line : (hit enter key twice)&#10;&#8205;$$&#10;Block Math Expression&#10;$$&#10;$Inline Math Expression$&#10;&#8205;&#10;# Heading 1&#10;## Heading 2&#10;### Heading 3&#10;#### Heading 4&#10;##### Heading 5&#10;###### Heading 6&#10;####### Heading 7&#10;&#8205;&#10;*italic*&#10;**bold**&#10;***bold italic***&#10;_underline_&#10;__underline bold__&#10;___underline bold italic___&#10;~~Strikethrough~~&#10;&#8205;&#10;[link](https://www.google.com)&#10;![image](<URL to image on open internet>)&#10;&#8205;&#10;* list item&#10;&#8205;&emsp;- list item&#10;&#8205;&emsp;&emsp;+ list item&#10;&#8205;&#10;```code&#10;code&#10;```&#10;&#8205;&#10;1. ordered list item&#10;2. ordered list item&#10;&#8205;&emsp;1. ordered list item&#10;&#8205;&#10;Math:&#10;&#8205;&emsp;fraction : \frac{1}{2}&#10;&#8205;&emsp;square root : \sqrt{4}&#10;&#8205;&emsp;exponential : e^{i\pi} = -1&#10;&#8205;&emsp;substript : H_{2}O&#10;&#8205;&emsp;complex numbers : \mathbf{1+i}&#10;&#8205;&emsp;trigonometric functions : \sin(x) \cos(x) \tan(x)&#10;&#8205;&emsp;logarithms : \log_2(x) \log_10(x) \log_{10}(x) \log_{2}(x)&#10;&#8205;&emsp;absolute value : \left| \frac{1}{2} \right| = \sqrt{1/2}"
              defaultValue={note.md}
              value={text}
              className={isTextAreaEmpty ? 'markdown empty' : 'markdown'}
              onKeyDown={(e) => {
                if (e.key === 'Tab' && !e.shiftKey) {
                  document.execCommand('insertText', false, '\t');
                  e.preventDefault();
                  return false;
                }
              }}
              onChange={handleTextAreaChange}
            ></textarea>
          </div>
          <div className="form-group">
          <button
              className="btn btn-block"
              type="submit"
              disabled={isTextAreaEmpty}
              style={isTextAreaEmpty || !isNoteChanged ? { opacity: 0.5, cursor: 'not-allowed' } : null}
              title={isTextAreaEmpty || !isNoteChanged ? 'Empty text area or no-changes' : ''}
            >
              Update Extended Note Section
            </button>
          </div>
        </form>
      </section>

      <section className="content">
        <h1 className="heading">{note.text}</h1>
        <p className="Rmd">
          <ReactMarkdown remarkPlugins={[gfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
            {note.md}
          </ReactMarkdown>
        </p>
      </section>
    </>
  );
}

export default Note;
