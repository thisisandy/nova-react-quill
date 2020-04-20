import { useCallback } from 'react';
import { QuillEditor, QuillDelta } from 'quill2';

export const useContentGetter = (quill: QuillEditor, format: 'text' | 'delta' | 'json'): () => QuillDelta| null | string => useCallback(() => {
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
    default: {
      try {
        return JSON.stringify(quill.getContents());
      } catch (error) {
        return quill.getText();
      }
    }
  }
}, [format, quill]);
