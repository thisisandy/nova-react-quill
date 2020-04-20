import {
  QuillEditor, RangeStatic, QuillDelta, Sources,
} from 'quill2';

export interface QuillModules {
    [key: string]: any;
    clipboard?: {
        matchers?: any[];
        matchVisual?: boolean;
    } | boolean;
    history?: {
        delay?: number;
        maxStack?: number;
        userOnly?: boolean;
    } | boolean;
    keyboard?: {
        bindings?: any;
    } | boolean;
    syntax?: boolean;
    toolbar?: QuillToolbarConfig | string | {
        container?: string | string[] | QuillToolbarConfig;
        handlers?: {
            [key: string]: any;
        };
    } | boolean;
}
export type QuillToolbarConfig = Array<Array<string> | {
    indent?: string;
    list?: string;
    direction?: string;
    header?: number | Array<boolean | number>;
    color?: string[] | string;
    background?: string[] | string;
    align?: string[] | string;
    script?: string;
    font?: string[] | string;
    size?: Array<boolean | string>;
}>
type BasicListenersParams = { editor: QuillEditor; source: Sources }
type onSelectionChangedParams = {
    oldRange: RangeStatic;
    range: RangeStatic;
} & BasicListenersParams & { event: 'selection-change' }
type onContentChangedParams = {
    content: any;
    delta: QuillDelta;
    html: string | null;
    oldDelta: QuillDelta;
    text: string;
} & BasicListenersParams & { event: 'text-change' }
export type EventListeners = {
    onEditorChanged: (params: onContentChangedParams | onSelectionChangedParams) => void;
    onContentChanged: (params:
        onContentChangedParams) => void;
    onSelectionChanged: (
        params: onSelectionChangedParams) => void;
    onBlur: (params: BasicListenersParams) => void;
    onFocus: (params: BasicListenersParams) => void;
}
