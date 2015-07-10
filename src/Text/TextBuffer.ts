module Fayde.Text.TextBuffer {
    export function Cut (text: string, start: number, len: number): string {
        if (!text)
            return "";
        return text.slice(0, start) + text.slice(start + len);
    }

    export function Insert (text: string, index: number, str: string): string {
        if (!text)
            return str;
        return [text.slice(0, index), str, text.slice(index)].join('');
    }

    export function Replace (text: string, start: number, len: number, str: string): string {
        if (!text)
            return str;
        return [text.slice(0, start), str, text.slice(start + len)].join('');
    }
}
