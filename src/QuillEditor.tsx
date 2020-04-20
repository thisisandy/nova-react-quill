/*
 * @Author: Andy.Hu
 * @Date: 2020-04-16 22:24:48
 * @Last Modified by: Andy.Hu
 * @Last Modified time: 2020-04-20 22:53:09
 */

import { Quill } from 'quill2';
import React, {
  useEffect, memo, forwardRef, useRef, ReactNode, useCallback,
} from 'react';
import { QuillModules, EventListeners } from './types/QuillEditor.interface';
import { defaultModules } from './module.default';
import { useEditorChangeListeners } from './hooks/useEditorListeners';

type QuillEditorProps = {
    format: 'object' | 'html' | 'text' | 'json';
    theme?: string;
    modules: QuillModules;
    debug?: 'warn' | 'log' | 'error' | false;
    readOnly?: boolean;
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
    formats?: string[] | null;
    customToolbarPosition: 'top' | 'bottom';
    sanitize?: boolean;
    styles: CSSStyleDeclaration;
    strict?: boolean;
    scrollingContainer?: HTMLElement | string | null;
    bounds?: HTMLElement | string;
    trackChanges?: 'user' | 'all';
    preserveWhitespace?: boolean;
    classes?: string;
    trimOnValidation?: boolean;
    onEditorCreated: () => void;
    onFocus: () => void;
    onBlur: () => void;
    children: ReactNode;
} & EventListeners


const EditorWrapper = memo(forwardRef<{}, { children: ReactNode }>((props) => <div style={{ display: 'content' }}>{props.children}</div>));

export const QuillEditor = memo((props: QuillEditorProps) => {
  const config = defaultModules;
  const {
    children,
    bounds,
    debug,
    formats,
    modules,
    placeholder,
    readOnly,
    scrollingContainer,
    strict,
    theme,
    onEditorChanged,
    onContentChanged,
    onSelectionChanged,
    onBlur,
    onFocus,
  } = { ...props, ...config };
  const wrapper = useRef<Element>(null);
  const mountQuill = useCallback(() => new Quill(wrapper.current, {
    bounds,
    debug,
    formats,
    modules,
    placeholder,
    readOnly,
    scrollingContainer,
    strict,
    theme: theme || 'snow',
  }),
  [bounds, debug,
    formats, modules, placeholder,
    readOnly, scrollingContainer,
    strict, theme]);
  const quillInstance = useRef<Quill>();
  useEffect(() => {
    quillInstance.current = mountQuill();
  }, [mountQuill]);
  useEditorChangeListeners({
    quill: quillInstance.current,
    onContentChanged,
    onEditorChanged,
    onSelectionChanged,
    onBlur,
    onFocus,
  });
  return (
    <EditorWrapper ref={wrapper}>
      {children}
    </EditorWrapper>
  );
});
