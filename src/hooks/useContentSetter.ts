import { useEffect } from 'react';
import { QuillDelta, QuillEditor } from 'quill2';
import sanitizeHtml from 'sanitize-html';
import { Format } from '../types/QuillEditor.interface';

 type Params = {
    quill: QuillEditor;
    format: Format; sanitize: boolean;
    preserveWhiteSpace: boolean; value: QuillDelta | string;
}
export const useContentSetter = ({
  quill, format, sanitize,
  value, preserveWhiteSpace,
}: Params): void => useEffect(() => {
  if (format === 'html') {
    let html = '';
    if (sanitize) {
      html = sanitizeHtml(value as string);
    }
    if (preserveWhiteSpace) {
      html = `<pre>${html}</pre>`;
    }
    const contents = quill.clipboard.convert({ html });
    quill.setContents(contents, 'silent');
    return;
  }
  if (format === 'text') {
    quill.setText(value as string);
    return;
  }
  if (format === 'delta') {
    quill.setContents(value as QuillDelta);
    return;
  }
  try {
    quill.setContents(JSON.parse(value as string), 'silent');
    return;
  } catch (error) {
    quill.setText(value as string, 'silent');
  }
}, [format, preserveWhiteSpace, quill, sanitize, value]);
