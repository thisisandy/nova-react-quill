/*
 * @Author: Andy.Hu
 * @Date: 2020-04-18 15:18:22
 * @Last Modified by: Andy.Hu
 * @Last Modified time: 2020-04-20 23:38:07
 */
import { useEffect, useCallback } from 'react';
import {
  RangeStatic, QuillEditor, TextChangeHandler, QuillDelta, Sources,
  EditorChangeHandler, SelectionChangeHandler,
} from 'quill2';
import { EventListeners } from '../types/QuillEditor.interface';

export interface Range {
  index: number;
  length: number;
}
export const useEditorChangeListeners = (deps: { quill: QuillEditor } & EventListeners): void => {
  const {
    quill, onContentChanged, onEditorChanged, onSelectionChanged, onBlur, onFocus,
  } = deps;
  const selectionChangeHandler: SelectionChangeHandler = useCallback(
    (range: RangeStatic | null, oldRange: RangeStatic | null, source: Sources) => {
      if (range === null) {
        onBlur({
          editor: quill,
          source,
        });
      } else if (oldRange === null) {
        onFocus({
          editor: quill,
          source,
        });
      }
      onSelectionChanged({
        editor: quill,
        oldRange,
        range,
        source,
        event: 'selection-change',
      });
    }, [onBlur, onFocus, onSelectionChanged, quill],
  );
  const textChangeHandler: TextChangeHandler = useCallback((
    delta: QuillDelta,
    oldDelta: QuillDelta,
    source: Sources,
  ) => {
    const text = quill.getText();
    const content = quill.getContents();
    const editorElem = quill.root;
    const html: string | null = editorElem.querySelector('.ql-editor').innerHTML;
    // sanitze html
    onContentChanged({
      content,
      delta,
      editor: quill,
      html,
      oldDelta,
      source,
      text,
      event: 'text-change',
    });
  }, [onContentChanged, quill]);
  const editorChangeHandler: EditorChangeHandler = useCallback((event: 'text-change' | 'selection-change',
    current: any | Range | null, old: any | Range | null, source: Sources) => {
    if (event === 'text-change') {
      const text = quill.getText();
      const content = quill.getContents();
      let html: string | null = quill.root.querySelector('.ql-editor')?.innerHTML;
      if (html === '<p><br></p>' || html === '<div><br></div>') {
        html = null;
      }
      onEditorChanged({
        content,
        delta: current,
        editor: quill,
        event,
        html,
        oldDelta: old,
        source,
        text,
      });
    } else {
      onEditorChanged({
        editor: quill,
        event,
        oldRange: old,
        range: current,
        source,
      });
    }
  }, [onEditorChanged, quill]);
  useEffect(() => {
    quill.on('editor-change', editorChangeHandler);
    return quill.off.bind(quill, 'editor-change', editorChangeHandler);
  });
  useEffect(() => {
    quill.on('selection-change', selectionChangeHandler);
    return quill.off.bind('selection-change', selectionChangeHandler);
  }, [quill, selectionChangeHandler]);
  useEffect(() => {
    quill.on('text-change', textChangeHandler);
    return quill.off.bind(quill, 'text-change', textChangeHandler);
  }, [quill, textChangeHandler]);
};
