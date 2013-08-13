/// CODE

module Fayde.Text {
    export interface ITextBoxUndoAction {
        SelectionAnchor: number;
        SelectionCursor: number;
        Undo(bufferholder: IBufferOwner);
        Redo(bufferholder: IBufferOwner): number;
    }

    export interface IBufferOwner {
        _Buffer: string;
    }

    export class TextBoxUndoActionDelete implements ITextBoxUndoAction {
        SelectionAnchor: number;
        SelectionCursor: number;
        Start: number;
        Text: string;
        constructor(selectionAnchor: number, selectionCursor: number, buffer: string, start: number, length: number) {
            this.SelectionAnchor = selectionAnchor;
            this.SelectionCursor = selectionCursor;
            this.Start = start;
            this.Text = buffer.substr(start, length);
        }
        Undo(bo: IBufferOwner) {
            bo._Buffer = TextBuffer.Insert(bo._Buffer, this.Start, this.Text);
        }
        Redo(bo: IBufferOwner): number {
            bo._Buffer = TextBuffer.Cut(bo._Buffer, this.Start, this.Text.length);
            return this.Start;
        }
    }

    export class TextBoxUndoActionInsert implements ITextBoxUndoAction {
        SelectionAnchor: number;
        SelectionCursor: number;
        Start: number;
        Text: string;
        IsGrowable: boolean;
        constructor(selectionAnchor: number, selectionCursor: number, start: number, inserted: string, isAtomic?: boolean) {
            this.SelectionAnchor = selectionAnchor;
            this.SelectionCursor = selectionCursor;
            this.Start = start;
            this.Text = inserted;
            this.IsGrowable = isAtomic !== true;
        }
        Undo(bo: IBufferOwner) {
            bo._Buffer = TextBuffer.Cut(bo._Buffer, this.Start, this.Text.length);
        }
        Redo(bo: IBufferOwner): number {
            bo._Buffer = TextBuffer.Insert(bo._Buffer, this.Start, this.Text);
            return this.Start + this.Text.length;
        }

        Insert(start: number, text: string) {
            if (!this.IsGrowable || start !== (this.Start + this.Text.length))
                return false;
            this.Text += text;
            return true;
        }
    }

    export class TextBoxUndoActionReplace implements ITextBoxUndoAction {
        SelectionAnchor: number;
        SelectionCursor: number;
        Start: number;
        Length: number;
        Deleted: string;
        Inserted: string;
        constructor(selectionAnchor: number, selectionCursor: number, buffer: string, start: number, length: number, inserted: string) {
            this.SelectionAnchor = selectionAnchor;
            this.SelectionCursor = selectionCursor;
            this.Start = start;
            this.Length = length;
            this.Deleted = buffer.substr(start, length);
            this.Inserted = inserted;
        }
        Undo(bo: IBufferOwner) {
            bo._Buffer = TextBuffer.Cut(bo._Buffer, this.Start, this.Inserted.length);
            bo._Buffer = Text.TextBuffer.Insert(bo._Buffer, this.Start, this.Deleted);
        }
        Redo(bo: IBufferOwner): number {
            bo._Buffer = TextBuffer.Cut(bo._Buffer, this.Start, this.Length);
            bo._Buffer = TextBuffer.Insert(bo._Buffer, this.Start, this.Inserted);
            return this.Start + this.Inserted.length;
        }
    }

    export class TextBuffer {
        static Cut(text: string, start: number, len: number): string {
            if (!text)
                return "";
            return text.slice(0, start) + text.slice(start + len);
        }
        static Insert(text: string, index: number, str: string): string {
            if (!text)
                return str;
            return [text.slice(0, index), str, text.slice(index)].join('');
        }
        static Replace(text: string, start: number, len: number, str: string): string {
            if (!text)
                return str;
            return [text.slice(0, start), str, text.slice(start + len)].join('');
        }
    }
}