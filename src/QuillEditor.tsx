/*
 * @Author: Andy.Hu
 * @Date: 2020-04-16 22:24:48
 * @Last Modified by: Andy.Hu
 * @Last Modified time: 2020-04-23 00:05:39
 */

import { Quill, QuillEditor, QuillDelta } from 'quill2';
import React, {
  useEffect, memo, forwardRef, useRef, ReactNode, useCallback, useImperativeHandle, useLayoutEffect,
} from 'react';

import { QuillModules, EventListeners } from './types/QuillEditor.interface';
import { defaultModules } from './module.default';
import { useEditorChangeListeners } from './hooks/useEditorListeners';
import { useContentGetter } from './hooks/useContentGetter';
import { useContentSetter } from './hooks/useContentSetter';

type QuillEditorProps = {
  registry: object;
  format: 'delta' | 'html' | 'text' | 'json';
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
  value: string|QuillDelta;
  children: ReactNode;
  preserveWhiteSpace: boolean;
  disabled: boolean;
} & EventListeners


const EditorWrapper = memo(forwardRef<{}, { children: ReactNode }>(
  (props, ref: React.MutableRefObject<HTMLDivElement>) => <div style={{ display: 'content' }} ref={ref}>{props.children}</div>,
));

export const Editor = memo(forwardRef((props: QuillEditorProps, ref) => {
  const config = defaultModules;
  const {
    format,
    children,
    bounds,
    debug,
    registry,
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
    value,
    sanitize,
    preserveWhiteSpace,
    disabled,
  } = { ...props, ...config };
  const wrapper = useRef<Element>(null);
  const quillInstance = useRef<QuillEditor>();
  const mountQuill = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
    const quill: QuillEditor = new Quill(wrapper.current, {
      bounds,
      debug,
      registry,
      modules,
      placeholder,
      readOnly,
      scrollingContainer,
      strict,
      theme: theme || 'snow',
    });
    quillInstance.current = quill;
    quill.history.clear();
  },
  [bounds, debug,
    registry, modules, placeholder,
    readOnly, scrollingContainer,
    strict, theme]);

  useEffect(mountQuill, []);
  useContentSetter({
    quill: quillInstance.current, sanitize, value, preserveWhiteSpace, format,
  });
  useEditorChangeListeners({
    quill: quillInstance.current,
    onContentChanged,
    onEditorChanged,
    onSelectionChanged,
    onBlur,
    onFocus,
  });
  const toggleEnable = useCallback(() => {
    if (disabled) {
      quillInstance.current.disable();
      wrapper.current.setAttribute('disabled', 'disabled');
      return;
    }
    if (!readOnly) {
      quillInstance.current.enable();
    }
    wrapper.current.removeAttribute('disabled');
  }, [disabled, readOnly]);

  useEffect(
    toggleEnable, [],
  );

  const contentGetter = useContentGetter(quillInstance.current, format);
  useImperativeHandle(ref, () => ({
    get content(): string | QuillDelta {
      return contentGetter();
    },
  }), [contentGetter]);
  return (
    <EditorWrapper ref={wrapper}>
      {children}
    </EditorWrapper>
  );
}));
