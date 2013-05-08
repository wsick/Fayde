var Fayde;
(function (Fayde) {
    /// CODE
    (function (Text) {
        var TextBoxUndoActionDelete = (function () {
            function TextBoxUndoActionDelete(selectionAnchor, selectionCursor, buffer, start, length) {
                this.SelectionAnchor = selectionAnchor;
                this.SelectionCursor = selectionCursor;
                this.Start = start;
                this.Text = buffer.substr(start, length);
            }
            TextBoxUndoActionDelete.prototype.Undo = function (bo) {
                bo._Buffer = TextBuffer.Insert(bo._Buffer, this.Start, this.Text);
            };
            TextBoxUndoActionDelete.prototype.Redo = function (bo) {
                bo._Buffer = TextBuffer.Cut(bo._Buffer, this.Start, this.Text.length);
                return this.Start;
            };
            return TextBoxUndoActionDelete;
        })();
        Text.TextBoxUndoActionDelete = TextBoxUndoActionDelete;        
        var TextBoxUndoActionInsert = (function () {
            function TextBoxUndoActionInsert(selectionAnchor, selectionCursor, start, inserted, isAtomic) {
                this.SelectionAnchor = selectionAnchor;
                this.SelectionCursor = selectionCursor;
                this.Start = start;
                this.Text = inserted;
                this.IsGrowable = isAtomic !== true;
            }
            TextBoxUndoActionInsert.prototype.Undo = function (bo) {
                bo._Buffer = TextBuffer.Cut(bo._Buffer, this.Start, this.Text.length);
            };
            TextBoxUndoActionInsert.prototype.Redo = function (bo) {
                bo._Buffer = TextBuffer.Insert(bo._Buffer, this.Start, this.Text);
                return this.Start + this.Text.length;
            };
            TextBoxUndoActionInsert.prototype.Insert = function (start, text) {
                if(!this.IsGrowable || start !== (this.Start + this.Text.length)) {
                    return false;
                }
                this.Text += text;
                return true;
            };
            return TextBoxUndoActionInsert;
        })();
        Text.TextBoxUndoActionInsert = TextBoxUndoActionInsert;        
        var TextBoxUndoActionReplace = (function () {
            function TextBoxUndoActionReplace(selectionAnchor, selectionCursor, buffer, start, length, inserted) {
                this.SelectionAnchor = selectionAnchor;
                this.SelectionCursor = selectionCursor;
                this.Start = start;
                this.Length = length;
                this.Deleted = buffer.substr(start, length);
                this.Inserted = inserted;
            }
            TextBoxUndoActionReplace.prototype.Undo = function (bo) {
                bo._Buffer = TextBuffer.Cut(bo._Buffer, this.Start, this.Inserted.length);
                bo._Buffer = Fayde.Text.TextBuffer.Insert(bo._Buffer, this.Start, this.Deleted);
            };
            TextBoxUndoActionReplace.prototype.Redo = function (bo) {
                bo._Buffer = TextBuffer.Cut(bo._Buffer, this.Start, this.Length);
                bo._Buffer = TextBuffer.Insert(bo._Buffer, this.Start, this.Inserted);
                return this.Start + this.Inserted.length;
            };
            return TextBoxUndoActionReplace;
        })();
        Text.TextBoxUndoActionReplace = TextBoxUndoActionReplace;        
        var TextBuffer = (function () {
            function TextBuffer() { }
            TextBuffer.Cut = function Cut(text, start, len) {
                if(!text) {
                    return "";
                }
                return text.slice(0, start) + text.slice(start + len);
            };
            TextBuffer.Insert = function Insert(text, index, str) {
                if(!text) {
                    return str;
                }
                return [
                    text.slice(0, index), 
                    str, 
                    text.slice(index)
                ].join('');
            };
            TextBuffer.Replace = function Replace(text, start, len, str) {
                if(!text) {
                    return str;
                }
                return [
                    text.slice(0, start), 
                    str, 
                    text.slice(start + len)
                ].join('');
            };
            return TextBuffer;
        })();
        Text.TextBuffer = TextBuffer;        
    })(Fayde.Text || (Fayde.Text = {}));
    var Text = Fayde.Text;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=History.js.map
