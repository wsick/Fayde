module Fayde.Controls.Internal {
    export class HistoryTracker {
        private $$undo: Text.ITextBoxUndoAction[] = [];
        private $$redo: Text.ITextBoxUndoAction[] = [];
        private $$maxUndoCount: number;

        constructor (maxUndoCount: number) {
            this.$$maxUndoCount = maxUndoCount;
        }

        get canUndo (): boolean {
            return this.$$undo.length > 0;
        }

        get canRedo (): boolean {
            return this.$$redo.length > 0;
        }

        insert (anchor: number, cursor: number, start: number, newText: string) {
            var action = <Text.TextBoxUndoActionInsert>this.$$undo[this.$$undo.length - 1];

            if (!(action instanceof Text.TextBoxUndoActionInsert) || !action.Insert(start, newText))
                return this.doAction(new Text.TextBoxUndoActionInsert(anchor, cursor, start, newText));
            if (this.$$redo.length > 0)
                this.$$redo = [];
        }

        doAction (action: Text.ITextBoxUndoAction) {
            this.$$undo.push(action);
            if (this.$$undo.length > this.$$maxUndoCount)
                this.$$undo.shift();
            this.$$redo = [];
        }

        undo (bufferholder: Text.ITextOwner): Text.ITextBoxUndoAction {
            if (this.$$undo.length < 1)
                return null;

            var action = this.$$undo.pop();
            if (this.$$redo.push(action) > this.$$maxUndoCount)
                this.$$redo.shift();

            action.Undo(bufferholder);
            return action
        }

        redo (bufferholder: Text.ITextOwner): number {
            if (this.$$redo.length < 1)
                return;

            var action = this.$$redo.pop();
            if (this.$$undo.push(action) > this.$$maxUndoCount)
                this.$$undo.shift();

            return action.Redo(bufferholder);
        }
    }
}