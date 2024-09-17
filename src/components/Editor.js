import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/edit/closebrackets.js';


const Editor = () => {
  const editorRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    const editor = CodeMirror.fromTextArea(textareaRef.current, {
      mode: { name: 'javascript', json: true },
      theme: 'dracula',
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
      height: '500px',
      width: '100%',
    });

    // Optional: You can add event listeners here
    editor.on('change', (editorInstance) => {
      console.log(editorInstance.getValue());
    });

    return () => {
      editor.toTextArea();
    };
  }, []);

  return <textarea ref={textareaRef} id='code-editor'></textarea>;
};

export default Editor;
