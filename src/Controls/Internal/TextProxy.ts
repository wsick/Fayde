module Fayde.Controls.Internal {
    export enum TextBoxEmitChangedType {
        NOTHING = 0,
        SELECTION = 1 << 0,
        TEXT = 1 << 1,
    }

    export class TextProxy implements Text.ITextOwner {
        selAnchor: number = 0;
        selCursor: number = 0;
        selText: string = "";
        text: string = "";
        maxLength: number = 0;
        acceptsReturn: boolean = false;

        private $$batch: number = 0;
        private $$emit = TextBoxEmitChangedType.NOTHING;
        private $$syncing: boolean = false;
        private $$eventsMask: TextBoxEmitChangedType;

        private $$undo: Text.ITextBoxUndoAction[] = [];
        private $$redo: Text.ITextBoxUndoAction[] = [];
        private $$maxUndoCount: number;

        SyncSelectionStart: (value: number) => void;
        SyncSelectionLength: (value: number) => void;
        SyncText: (value: string) => void;

        constructor (eventsMask: TextBoxEmitChangedType, maxUndoCount: number) {
            this.$$eventsMask = eventsMask;
            this.$$maxUndoCount = maxUndoCount;
            this.SyncSelectionStart = (value: number) => {
            };
            this.SyncSelectionLength = (value: number) => {
            };
            this.SyncText = (value: string) => {
            };
        }

        setAnchorCursor (anchor: number, cursor: number): boolean {
            if (this.selAnchor === anchor && this.selCursor === cursor)
                return false;
            this.SyncSelectionStart(Math.min(anchor, cursor));
            this.SyncSelectionLength(Math.abs(cursor - anchor));
            this.selAnchor = anchor;
            this.selCursor = cursor;
            this.$$emit |= TextBoxEmitChangedType.SELECTION;
            return true;
        }

        enterText (newText: string): boolean {
            var anchor = this.selAnchor;
            var cursor = this.selCursor;
            var length = Math.abs(cursor - anchor);
            var start = Math.min(anchor, cursor);

            if ((this.maxLength > 0 && this.text.length >= this.maxLength) || (newText === '\r') && !this.acceptsReturn)
                return false;

            if (length > 0) {
                this.$$undo.push(new Text.TextBoxUndoActionReplace(anchor, cursor, this.text, start, length, newText));
                this.$$redo = [];

                this.text = Text.TextBuffer.Replace(this.text, start, length, newText);
            } else {
                var ins: Text.TextBoxUndoActionInsert = null;
                var action = this.$$undo[this.$$undo.length - 1];
                if (action instanceof Text.TextBoxUndoActionInsert) {
                    ins = <Text.TextBoxUndoActionInsert>action;
                    if (!ins.Insert(start, newText))
                        ins = null;
                }

                if (!ins) {
                    ins = new Text.TextBoxUndoActionInsert(anchor, cursor, start, newText);
                    this.$$undo.push(ins);
                }
                this.$$redo = [];

                this.text = Text.TextBuffer.Insert(this.text, start, newText);
            }

            this.$$emit |= TextBoxEmitChangedType.TEXT;
            cursor = start + 1;
            anchor = cursor;

            return this.setAnchorCursor(anchor, cursor);
        }

        removeText (start: number, length: number): boolean {
            if (length <= 0)
                return false;

            this.$$undo.push(new Text.TextBoxUndoActionDelete(this.selAnchor, this.selCursor, this.text, start, length));
            this.$$redo = [];

            this.text = Text.TextBuffer.Cut(this.text, start, length);
            this.$$emit |= TextBoxEmitChangedType.TEXT;

            return this.setAnchorCursor(start, start);
        }

        get canUndo (): boolean {
            return this.$$undo.length > 0;
        }

        get canRedo (): boolean {
            return this.$$redo.length > 0;
        }

        undo () {
            if (this.$$undo.length < 1)
                return;

            var action = this.$$undo.pop();
            if (this.$$redo.push(action) > this.$$maxUndoCount)
                this.$$redo.shift();

            action.Undo(this);

            var anchor = action.SelectionAnchor;
            var cursor = action.SelectionCursor;

            this.$$batch++;
            this.SyncSelectionStart(Math.min(anchor, cursor));
            this.SyncSelectionLength(Math.abs(cursor - anchor));
            this.$$emit = TextBoxEmitChangedType.TEXT | TextBoxEmitChangedType.SELECTION;
            this.selAnchor = anchor;
            this.selCursor = cursor;
            this.$$batch--;

            this.$syncEmit();
        }

        redo () {
            if (this.$$redo.length < 1)
                return;

            var action = this.$$redo.pop();
            if (this.$$undo.push(action) > this.$$maxUndoCount)
                this.$$undo.shift();

            var anchor = action.Redo(this);
            var cursor = anchor;

            this.$$batch++;
            this.SyncSelectionStart(Math.min(anchor, cursor));
            this.SyncSelectionLength(Math.abs(cursor - anchor));
            this.$$emit = TextBoxEmitChangedType.TEXT | TextBoxEmitChangedType.SELECTION;
            this.selAnchor = anchor;
            this.selCursor = cursor;
            this.$$batch--;

            this.$syncEmit();
        }

        begin () {
            this.$$emit = TextBoxEmitChangedType.NOTHING;
            this.$$batch++;
        }

        end () {
            this.$$batch--;
            this.$syncEmit();
        }

        beginSelect (cursor: number) {
            this.$$batch++;
            this.$$emit = TextBoxEmitChangedType.NOTHING;
            this.SyncSelectionStart(cursor);
            this.SyncSelectionLength(0);
            this.$$batch--;

            this.$syncEmit();
        }

        adjustSelection (cursor: number) {
            var anchor = this.selAnchor;

            this.$$batch++;
            this.$$emit = TextBoxEmitChangedType.NOTHING;
            this.SyncSelectionStart(Math.min(anchor, cursor));
            this.SyncSelectionLength(Math.abs(cursor - anchor));
            this.selAnchor = anchor;
            this.selCursor = cursor;
            this.$$batch--;

            this.$syncEmit();
        }

        selectAll () {
            this.select(0, this.text.length);
        }

        clearSelection (start: number) {
            this.$$batch++;
            this.SyncSelectionStart(start);
            this.SyncSelectionLength(0);
            this.$$batch--;
        }

        select (start: number, length: number): boolean {
            start = Math.min(Math.max(0, start), this.text.length);
            length = Math.min(Math.max(0, length), this.text.length - start);

            this.$$batch++;
            this.SyncSelectionStart(start);
            this.SyncSelectionLength(length);
            this.$$batch--;

            this.$syncEmit();
            return true;
        }

        setSelectionStart (value: number) {
            var length = Math.abs(this.selCursor - this.selAnchor);
            var start = value;
            if (start > this.text.length) {
                this.SyncSelectionStart(this.text.length);
                return;
            }

            if (start + length > this.text.length) {
                this.$$batch++;
                length = this.text.length - start;
                this.SyncSelectionLength(length);
                this.$$batch--;
            }

            var changed = (this.selAnchor !== start);

            this.selCursor = start + length;
            this.selAnchor = start;

            this.$$emit |= TextBoxEmitChangedType.SELECTION;
            this.$syncEmit();
        }

        setSelectionLength (value: number) {
            var start = Math.min(this.selAnchor, this.selCursor);
            var length = value;
            if (start + length > this.text.length) {
                length = this.text.length - start;
                this.SyncSelectionLength(length);
                return;
            }

            var changed = (this.selCursor !== (start + length));

            this.selCursor = start + length;
            this.selAnchor = start;
            this.$$emit |= TextBoxEmitChangedType.SELECTION;
            this.$syncEmit();
        }

        setText (value: string) {
            var text = value || "";
            if (!this.$$syncing) {
                var action: Text.ITextBoxUndoAction;
                if (this.text.length > 0) {
                    action = new Text.TextBoxUndoActionReplace(this.selAnchor, this.selCursor, this.text, 0, this.text.length, text);
                    this.text = Text.TextBuffer.Replace(this.text, 0, this.text.length, text);
                } else {
                    action = new Text.TextBoxUndoActionInsert(this.selAnchor, this.selCursor, 0, text);
                    this.text = text + this.text;
                }

                this.$$undo.push(action);
                this.$$redo = [];

                this.$$emit |= TextBoxEmitChangedType.TEXT;
                this.clearSelection(0);

                this.$syncEmit(false);
            }
        }

        private $syncEmit (syncText?: boolean) {
            syncText = syncText !== false;

            if (this.$$batch !== 0 || this.$$emit === TextBoxEmitChangedType.NOTHING)
                return;

            if (syncText && (this.$$emit & TextBoxEmitChangedType.TEXT))
                this.$syncText();

            /*
             this.$$emit &= this.$$eventsMask;
             if (this.$$emit & TextBoxEmitChangedType.TEXT) {
             Incite(this, { type: 'text' });
             }
             if (this.$$emit & TextBoxEmitChangedType.SELECTION) {
             Incite(this, { type: 'selection' });
             }
             */

            this.$$emit = TextBoxEmitChangedType.NOTHING;
        }

        private $syncText () {
            this.$$syncing = true;
            this.SyncText(this.text);
            this.$$syncing = false;
        }
    }
}