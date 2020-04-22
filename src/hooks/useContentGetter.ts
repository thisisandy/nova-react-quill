import { useCallback } from 'react';
import { QuillEditor, QuillDelta } from 'quill2';
import { Format } from '../types/QuillEditor.interface';

export const useContentGetter = (quill: QuillEditor, format: Format): () => QuillDelta| null | string => useCallback(() => {
  const html = quill.root.querySelector('.ql-editor')?.innerHTML;
  if (html === '<p><br></p>' || html === '<div><br></div>') {
    return null;
  }
  switch (format) {
    case 'text': {
      return quill.getText();
    }
    case 'delta': {
      return quill.getContents();
    }
    case 'html': {
      return html;
    }
    default: {
      try {
        return JSON.stringify(quill.getContents());
      } catch (error) {
        return quill.getText();
      }
    }
  }
}, [format, quill]);
