/// <reference path="Control.ts" />
/// <reference path="../Input/KeyEventArgs.ts" />

module Fayde.Controls {
    export enum TextBoxModelChangedType {
        Nothing = 0,
        TextAlignment = 1,
        TextWrapping = 2,
        Selection = 3,
        Brush = 4,
        Font = 5,
        Text = 6,
    }

    export enum TextBoxEmitChangedType {
        NOTHING = 0,
        SELECTION = 1 << 0,
        TEXT = 1 << 1,
    }

    export interface ITextModelArgs {
        Changed: TextBoxModelChangedType;
        NewValue: any;
    }

    export interface ITextModelListener {
        OnTextModelChanged(args: ITextModelArgs);
    }

    var Key = Input.Key;
    var MAX_UNDO_COUNT = 10;
    export class TextBoxBase extends Control implements Text.ITextAttributesSource, Text.IBufferOwner {
        private _Undo: Text.ITextBoxUndoAction[] = [];
        private _Redo: Text.ITextBoxUndoAction[] = [];
        _Buffer: string = "";
        private _Emit: TextBoxEmitChangedType = TextBoxEmitChangedType.NOTHING;
        private _NeedIMReset: boolean = false;
        private _Selecting: boolean = false;
        private _Captured: boolean = false;
        private _SettingValue: boolean = true;
        private _SelectionCursor: number = 0;
        private _SelectionAnchor: number = 0;

        private _SelectedText: string;

        private _EventsMask: TextBoxEmitChangedType;
        private _TextProperty: DependencyProperty;

        private _Font: Font = new Font();
        private _CursorOffset: number = 0;
        private _Batch: number = 0;
        
        $View: Internal.TextBoxView;
        $ContentElement: FrameworkElement;
        $IsReadOnly: boolean = false;
        $IsFocused: boolean = false;
        $AcceptsReturn: boolean = false;
        $MaxLength: number = 0;
        $HasOffset: boolean = false;

        constructor(eventsMask: TextBoxEmitChangedType, textPropd: DependencyProperty) {
            super();
            this._EventsMask = eventsMask;
            this._TextProperty = textPropd;
        }

        get Cursor(): CursorType {
            var cursor = this.GetValue(FrameworkElement.CursorProperty);
            if (cursor === CursorType.Default)
                return CursorType.IBeam;
            return cursor;
        }

        get SelectionCursor(): number { return this._SelectionCursor; }
        get HasSelectedText(): boolean { return this._SelectionCursor !== this._SelectionAnchor; }
        CaretBrush: Media.Brush;
        TextAlignment: TextAlignment;
        TextWrapping: TextWrapping;
        SelectionStart: number;
        SelectionLength: number;
        get DisplayText(): string { return undefined; }

        SelectionBackground: Media.Brush;
        SelectionForeground: Media.Brush;
        Background: Media.Brush;
        Foreground: Media.Brush;
        get Font(): Font { return this._Font; }
        get Direction(): FlowDirection { return this.FlowDirection; }
        get TextDecorations(): TextDecorations { return Fayde.TextDecorations.None; }

        OnApplyTemplate() {
            super.OnApplyTemplate();

            var ce = this.$ContentElement = <FrameworkElement>this.GetTemplateChild("ContentElement", FrameworkElement);
            if (!ce)
                return;

            var view = this.$View;
            if (view)
                view.SetTextBox(null);

            view = this.$View = new Internal.TextBoxView();
            view.SetEnableCursor(!this.$IsReadOnly);
            view.SetTextBox(this);

            if (ce instanceof ContentPresenter) {
                (<ContentPresenter>ce).SetValue(ContentPresenter.ContentProperty, view);
            } else if (ce instanceof ContentControl) {
                (<ContentControl>ce).SetValue(ContentControl.ContentProperty, view);
            } else if (ce instanceof Border) {
                (<Border>ce).SetValue(Border.ChildProperty, view);
            } else if (ce instanceof Panel) {
                (<Panel>ce).Children.Add(view);
            } else {
                Warn("TextBox does not have a valid content element.");
                view.SetTextBox(null);
                this.$View = view = null;
            }
        }

        private _ModelListener: ITextModelListener = null;
        Listen(listener: ITextModelListener) { this._ModelListener = listener; }
        Unlisten(listener: ITextModelListener) { if (this._ModelListener === listener) this._ModelListener = null; }
        _ModelChanged(type: TextBoxModelChangedType, newValue: any) {
            this._UpdateFont();
            
            var listener = this._ModelListener;
            if (!listener) return;
            listener.OnTextModelChanged({
                Changed: type,
                NewValue: newValue
            });
        }

        private _UpdateFont() {
            this._Font.Family = this.FontFamily;
            this._Font.Size = this.FontSize;
            this._Font.Stretch = this.FontStretch;
            this._Font.Style = this.FontStyle;
            this._Font.Weight = this.FontWeight;
        }

        _SelectedTextChanged(newValue: string) {
            if (!this._SettingValue)
                return;

            var text = newValue || "";
            if (!text)
                return;

            var length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
            var start = Math.min(this._SelectionAnchor, this._SelectionCursor);

            var action: Text.ITextBoxUndoAction;
            if (length > 0) {
                action = new Text.TextBoxUndoActionReplace(this._SelectionAnchor, this._SelectionCursor, this._Buffer, start, length, text);
                this._Buffer = Text.TextBuffer.Replace(this._Buffer, start, length, text);
            } else if (text.length > 0) {
                action = new Text.TextBoxUndoActionInsert(this._SelectionAnchor, this._SelectionCursor, start, text);
                this._Buffer = Text.TextBuffer.Insert(this._Buffer, start, text);
            }
            if (action) {
                this._Emit |= TextBoxEmitChangedType.TEXT;
                this._Undo.push(action);
                this._Redo = [];

                this.ClearSelection(start + text.length);
                this._ResetIMContext();

                this._SyncAndEmit();
            }
        }
        _SelectionStartChanged(newValue: number) {
            var changed = TextBoxModelChangedType.Nothing;

            var length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
            var start = newValue;
            if (start > this._Buffer.length) {
                this.SelectionStart = this._Buffer.length;
                return;
            }

            if (start + length > this._Buffer.length) {
                this._BatchPush();
                length = this._Buffer.length - start;
                this.SelectionLength = length;
                this._BatchPop();
            }

            if (this._SelectionAnchor != start) {
                changed = TextBoxModelChangedType.Selection;
                this.$HasOffset = false;
            }

            this._SelectionCursor = start + length;
            this._SelectionAnchor = start;

            this._Emit |= TextBoxEmitChangedType.SELECTION;
            this._SyncAndEmit();

            if (changed !== TextBoxModelChangedType.Nothing)
                this._ModelChanged(changed, newValue);
        }
        _SelectionLengthChanged(newValue: number) {
            var changed = TextBoxModelChangedType.Nothing;

            var start = Math.min(this._SelectionAnchor, this._SelectionCursor);
            var length = newValue;
            if (start + length > this._Buffer.length) {
                length = this._Buffer.length - start;
                this.SelectionLength = length;
                return;
            }
            if (this._SelectionCursor != (start + length)) {
                changed = TextBoxModelChangedType.Selection;
                this.$HasOffset = false;
            }

            this._SelectionCursor = start + length;
            this._SelectionAnchor = start;
            this._Emit |= TextBoxEmitChangedType.SELECTION;
            this._SyncAndEmit();

            if (changed !== TextBoxModelChangedType.Nothing)
                this._ModelChanged(changed, newValue);
        }
        _TextChanged(newValue: string) {
            var text = newValue || "";
            if (this._SettingValue) {
                var action: Text.ITextBoxUndoAction;
                if (this._Buffer.length > 0) {
                    action = new Text.TextBoxUndoActionReplace(this._SelectionAnchor, this._SelectionCursor, this._Buffer, 0, this._Buffer.length, text);
                    this._Buffer = Text.TextBuffer.Replace(this._Buffer, 0, this._Buffer.length, text);
                } else {
                    action = new Text.TextBoxUndoActionInsert(this._SelectionAnchor, this._SelectionCursor, 0, text);
                    this._Buffer = text + this._Buffer;
                }

                this._Undo.push(action);
                this._Redo = [];

                this._Emit |= TextBoxEmitChangedType.TEXT;
                this.ClearSelection(0);
                this._ResetIMContext();

                this._SyncAndEmit(false);
            }
            this._ModelChanged(TextBoxModelChangedType.Text, newValue);
        }

        private _BatchPush() {
            this._Batch++;
        }
        private _BatchPop() {
            if (this._Batch < 1) {
                Warn("TextBoxBase._Batch underflow");
                return;
            }
            this._Batch--;
        }
        private _SyncAndEmit(syncText?: boolean) {
            if (syncText === undefined)
                syncText = true;

            if (this._Batch != 0 || this._Emit === TextBoxEmitChangedType.NOTHING)
                return;

            if (syncText && (this._Emit & TextBoxEmitChangedType.TEXT))
                this._SyncText();

            if (this._Emit & TextBoxEmitChangedType.SELECTION)
                this._SyncSelectedText();

            if (this.XamlNode.IsLoaded) {
                this._Emit &= this._EventsMask;
                if (this._Emit & TextBoxEmitChangedType.TEXT)
                    this._EmitTextChanged();
                if (this._Emit & TextBoxEmitChangedType.SELECTION)
                    this._EmitSelectionChanged();
            }

            this._Emit = TextBoxEmitChangedType.NOTHING;
        }
        
        private _SyncText() {
            this._SettingValue = false;
            this.SetCurrentValue(this._TextProperty, this._Buffer);
            this._SettingValue = true;
        }
        _EmitTextChanged() { }

        SelectAll() {
            this.Select(0, this._Buffer.length);
        }
        ClearSelection(start: number) {
            this._BatchPush();
            this.SelectionStart = start;
            this.SelectionLength = 0;
            this._BatchPop();
        }
        Select(start: number, length: number): boolean {
            if (start < 0)
                throw new ArgumentException("start < 0");
            if (length < 0)
                throw new ArgumentException("length < 0");

            if (start > this._Buffer.length)
                start = this._Buffer.length;

            if (length > (this._Buffer.length - start))
                length = this._Buffer.length - start;

            this._BatchPush();
            this.SelectionStart = start;
            this.SelectionLength = length;
            this._BatchPop();

            this._ResetIMContext();

            this._SyncAndEmit();

            return true;
        }
        private _SyncSelectedText() {
            if (this._SelectionCursor !== this._SelectionAnchor) {
                var start = Math.min(this._SelectionAnchor, this._SelectionCursor);
                var len = Math.abs(this._SelectionCursor - this._SelectionAnchor);
                var text = !this._Buffer ? '' : this._Buffer.substr(start, len);

                this._SettingValue = false;
                this._SelectedText = text;
                this._SelectedTextChanged(text);
                this._SettingValue = true;
            } else {
                this._SettingValue = false;
                this._SelectedText = "";
                this._SelectedTextChanged("");
                this._SettingValue = true;
            }
        }
        _EmitSelectionChanged() { }

        _ResetIMContext() {
            if (this._NeedIMReset) {
                //this._IMCtx.Reset();
                this._NeedIMReset = false;
            }
        }

        CanUndo() { return this._Undo.length > 0; }
        Undo() {
            if (this._Undo.length < 1)
                return;

            var action = this._Undo.pop();
            if (this._Redo.push(action) > MAX_UNDO_COUNT)
                this._Redo.shift();

            action.Undo(this);

            var anchor = action.SelectionAnchor;
            var cursor = action.SelectionCursor;

            this._BatchPush();
            this.SelectionStart = Math.min(anchor, cursor);
            this.SelectionLength = Math.abs(cursor - anchor);
            this._Emit = TextBoxEmitChangedType.TEXT | TextBoxEmitChangedType.SELECTION;
            this._SelectionAnchor = anchor;
            this._SelectionCursor = cursor;
            this._BatchPop();

            this._SyncAndEmit();
        }
        CanRedo() { return this._Redo.length > 0; }
        Redo() {
            if (this._Redo.length < 1)
                return;

            var action = this._Redo.pop();
            if (this._Undo.push(action) > MAX_UNDO_COUNT)
                this._Undo.shift();

            var anchor = action.Redo(this);
            var cursor = anchor;

            this._BatchPush();
            this.SelectionStart = Math.min(anchor, cursor);
            this.SelectionLength = Math.abs(cursor - anchor);
            this._Emit = TextBoxEmitChangedType.TEXT | TextBoxEmitChangedType.SELECTION;
            this._SelectionAnchor = anchor;
            this._SelectionCursor = cursor;
            this._BatchPop();

            this._SyncAndEmit();
        }

        OnLostFocus(e: RoutedEventArgs) {
            this.$IsFocused = false;
            if (this.$View)
                this.$View.OnLostFocus(e);

            if (!this.$IsReadOnly) {
                //this._IMCtx.FocusOut();
                this._NeedIMReset = true;
            }
        }
        OnGotFocus(e: RoutedEventArgs) {
            this.$IsFocused = true;
            if (this.$View)
                this.$View.OnGotFocus(e);
            if (!this.$IsReadOnly) {
                //this._IMCtx.FocusIn();
                this._NeedIMReset = true;
            }
        }

        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            e.Handled = true;
            this.Focus();

            if (this.$View) {
                var p = e.GetPosition(this.$View);
                var cursor = this.$View.GetCursorFromXY(p.x, p.y);

                this._ResetIMContext();

                this._Captured = this.CaptureMouse();
                //TextDebug("TextBox-CapturedMouse: " + this._Captured);
                this._Selecting = true;

                this._BatchPush();
                this._Emit = TextBoxEmitChangedType.NOTHING;
                this.SelectionStart = cursor;
                this.SelectionLength = 0;
                this._BatchPop();

                this._SyncAndEmit();
            }
        }
        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) {
            if (this._Captured) {
                this.ReleaseMouseCapture();
                //TextDebug("TextBox-ReleaseCapturedMouse");
            }

            e.Handled = true;
            this._Selecting = false;
            this._Captured = false;
        }
        OnMouseMove(e: Input.MouseEventArgs) {
            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;

            if (this._Selecting) {
                var p = e.GetPosition(this.$View);
                e.Handled = true;

                cursor = this.$View.GetCursorFromXY(p.x, p.y);
                //TextDebug("TextBox.MouseMove-CursorPos: " + p.toString());

                this._BatchPush();
                this._Emit = TextBoxEmitChangedType.NOTHING;
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._BatchPop();

                this._SyncAndEmit();

                //TODO: 
                //if (!this._Secret && (clipboard = this.GetClipboard(this, Primary))) {
                //  clipboard.SetText(this.SelectedText);
                //}
            }
        }

        CursorDown(cursor: number, isPage: boolean): number { return cursor; }
        CursorUp(cursor: number, isPage: boolean): number { return cursor; }
        CursorNextWord(cursor: number): number { return cursor; }
        CursorPrevWord(cursor: number): number { return cursor; }
        CursorLineBegin(cursor: number): number { return cursor; }
        CursorLineEnd(cursor: number): number { return cursor; }
        _EmitCursorPositionChanged(height: number, x: number, y: number) {
            //LOOKS USELESS
        }

        OnKeyDown(args: Input.KeyEventArgs) {
            switch (args.Key) {
                case Key.Shift: //shift
                case Key.Ctrl: //ctrl
                case Key.Alt: //alt
                    return;
            }

            var handled = false;
            this._Emit = TextBoxEmitChangedType.NOTHING;

            this._BatchPush();

            switch (args.Key) {
                case Key.Back:
                    if (this.$IsReadOnly)
                        break;
                    handled = this._KeyDownBackSpace(args.Modifiers);
                    break;
                case Key.Delete:
                    if (this.$IsReadOnly)
                        break;
                    if (args.Modifiers.Shift) {
                        //Shift+Delete => Cut
                        handled = true;
                    } else {
                        handled = this._KeyDownDelete(args.Modifiers);
                    }
                    break;
                case Key.Insert:
                    if (args.Modifiers.Shift) {
                        //Shift+Insert => Paste
                        handled = true;
                    } else if (args.Modifiers.Ctrl) {
                        //Ctrl+Insert => Copy
                        handled = true;
                    }
                    break;
                case Key.PageDown:
                    handled = this._KeyDownPageDown(args.Modifiers);
                    break;
                case Key.PageUp:
                    handled = this._KeyDownPageUp(args.Modifiers);
                    break;
                case Key.Home:
                    handled = this._KeyDownHome(args.Modifiers);
                    break;
                case Key.End:
                    handled = this._KeyDownEnd(args.Modifiers);
                    break;
                case Key.Left:
                    handled = this._KeyDownLeft(args.Modifiers);
                    break;
                case Key.Right:
                    handled = this._KeyDownRight(args.Modifiers);
                    break;
                case Key.Down:
                    handled = this._KeyDownDown(args.Modifiers);
                    break;
                case Key.Up:
                    handled = this._KeyDownUp(args.Modifiers);
                    break;
                default:
                    if (args.Modifiers.Ctrl) {
                        switch (args.Key) {
                            case Key.A:
                                //Ctrl+A => Select All
                                handled = true;
                                this.SelectAll();
                                break;
                            case Key.C:
                                //Ctrl+C => Copy
                                //copy to clipboard
                                handled = true;
                                break;
                            case Key.X:
                                //Ctrl+X => Cut
                                if (this.$IsReadOnly)
                                    break;
                                //copy to clipboard
                                this._SelectedText = "";
                                this._SelectedTextChanged("");
                                handled = true;
                                break;
                            case Key.Y:
                                //Ctrl+Y => Redo
                                if (!this.$IsReadOnly) {
                                    handled = true;
                                    this.Redo();
                                }
                                break;
                            case Key.Z:
                                //Ctrl+Z => Undo
                                if (!this.$IsReadOnly) {
                                    handled = true;
                                    this.Undo();
                                }
                                break;
                        }
                    }
                    break;
            }

            if (handled) {
                args.Handled = handled;
                this._ResetIMContext();
            }
            this._BatchPop();
            this._SyncAndEmit();

            if (!args.Handled)
                this.PostOnKeyDown(args);
        }
        PostOnKeyDown(args: Input.KeyEventArgs) {
            if (args.Handled)
                return;

            /*
            if (!this._IsReadOnly && this._IMCtx.FilterKeyPress()) {
            this._NeedIMReset = true;
            return;
            }
            */

            if (this.$IsReadOnly || args.Modifiers.Alt || args.Modifiers.Ctrl)
                return;

            this._Emit = TextBoxEmitChangedType.NOTHING;
            this._BatchPush();

            if (args.Key === Key.Enter) {
                this._KeyDownChar('\r');
            } else if (args.Char != null && !args.Modifiers.Ctrl && !args.Modifiers.Alt) {
                this._KeyDownChar(args.Char);
            }
            this._BatchPop();
            this._SyncAndEmit();
        }

        private _KeyDownBackSpace(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Shift || modifiers.Alt)
                return false;

            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;
            var start = 0;
            var length = 0;

            if (cursor !== anchor) {
                length = Math.abs(cursor - anchor);
                start = Math.min(anchor, cursor);
            } else if (modifiers.Ctrl) {
                start = this.CursorPrevWord(cursor);
                length = cursor - start;
            } else if (cursor > 0) {
                if (cursor >= 2 && this._Buffer && this._Buffer.charAt(cursor - 2) === '\r' && this._Buffer.charAt(cursor - 1) === '\n') {
                    start = cursor - 2;
                    length = 2;
                } else {
                    start = cursor - 1;
                    length = 1;
                }
            }

            if (length > 0) {
                this._Undo.push(new Text.TextBoxUndoActionDelete(this._SelectionAnchor, this._SelectionCursor, this._Buffer, start, length));
                this._Redo = [];

                this._Buffer = Text.TextBuffer.Cut(this._Buffer, start, length);
                this._Emit |= TextBoxEmitChangedType.TEXT;
                anchor = start;
                cursor = start;
            }

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
            }

            return true;
        }
        private _KeyDownDelete(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Shift || modifiers.Alt)
                return false;

            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;
            var start = 0;
            var length = 0;
            var handled = false;

            if (cursor !== anchor) {
                length = Math.abs(cursor - anchor);
                start = Math.min(anchor, cursor);
            } else if (modifiers.Ctrl) {
                //Ctrl+Delete => delete the word start at the cursor
                length = this.CursorNextWord(cursor) - cursor;
                start = cursor;
            } else if (this._Buffer && cursor < this._Buffer.length) {
                if (this._Buffer.charAt(cursor) === '\r' && this._Buffer.charAt(cursor + 1) === '\n')
                    length = 2;
                else
                    length = 1;
                start = cursor;
            }

            if (length > 0) {
                this._Undo.push(new Text.TextBoxUndoActionDelete(this._SelectionAnchor, this._SelectionCursor, this._Buffer, start, length));
                this._Redo = [];

                this._Buffer = Text.TextBuffer.Cut(this._Buffer, start, length);
                this._Emit |= TextBoxEmitChangedType.TEXT;
                handled = true;
            }

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                handled = true;
            }

            return handled;
        }
        private _KeyDownPageDown(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;

            cursor = this.CursorDown(cursor, true);
            var have = this.$HasOffset;

            if (!modifiers.Shift) {
                anchor = cursor;
            }

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                this.$HasOffset = have;
            }

            return true;
        }
        private _KeyDownPageUp(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;

            cursor = this.CursorUp(cursor, true);
            var have = this.$HasOffset;

            if (!modifiers.Shift) {
                anchor = cursor;
            }

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                this.$HasOffset = have;
            }

            return true;
        }
        private _KeyDownHome(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;
            var handled = false;

            if (modifiers.Ctrl) {
                cursor = 0;
            } else {
                cursor = this.CursorLineBegin(cursor);
            }

            if (!modifiers.Shift) {
                anchor = cursor;
            }

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                this.$HasOffset = false;
                handled = true;
            }

            return handled;
        }
        private _KeyDownEnd(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;
            var handled = false;

            if (modifiers.Ctrl) {
                cursor = this._Buffer.length;
            } else {
                cursor = this.CursorLineEnd(cursor);
            }

            if (!modifiers.Shift) {
                anchor = cursor;
            }

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                this.$HasOffset = false;
                handled = true;
            }

            return handled;
        }
        private _KeyDownLeft(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;
            var handled = false;

            if (modifiers.Ctrl) {
                cursor = this.CursorPrevWord(cursor);
            } else if (!modifiers.Shift && anchor !== cursor) {
                cursor = Math.min(anchor, cursor);
            } else {
                if (cursor >= 2 && this._Buffer && this._Buffer.charAt(cursor - 2) === '\r' && this._Buffer.charAt(cursor - 1) === '\n')
                    cursor -= 2;
                else if (cursor > 0)
                    cursor--;
            }

            if (!modifiers.Shift)
                anchor = cursor;

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                handled = true;
            }

            return handled;
        }
        private _KeyDownRight(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;
            var handled = false;

            if (modifiers.Ctrl) {
                cursor = this.CursorNextWord(cursor);
            } else if (!modifiers.Shift && anchor !== cursor) {
                cursor = Math.max(anchor, cursor);
            } else {
                if (this._Buffer && this._Buffer.charAt(cursor) === '\r' && this._Buffer.charAt(cursor + 1) === '\n')
                    cursor += 2;
                else if (cursor < this._Buffer.length)
                    cursor++;
            }

            if (!modifiers.Shift)
                anchor = cursor;

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                handled = true;
            }

            return handled;
        }
        private _KeyDownDown(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;
            var handled = false;

            cursor = this.CursorDown(cursor, false);
            var have = this.$HasOffset;

            if (!modifiers.Shift) {
                anchor = cursor;
            }

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                this.$HasOffset = have;
                handled = true;
            }

            return handled;
        }
        private _KeyDownUp(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;
            var handled = false;

            cursor = this.CursorUp(cursor, false);
            var have = this.$HasOffset;

            if (!modifiers.Shift) {
                anchor = cursor;
            }

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                this.$HasOffset = have;
                handled = true;
            }

            return handled;
        }
        private _KeyDownChar(c: string): boolean {
            var anchor = this._SelectionAnchor;
            var cursor = this._SelectionCursor;
            var length = Math.abs(cursor - anchor);
            var start = Math.min(anchor, cursor);

            if ((this.$MaxLength > 0 && this._Buffer.length >= this.$MaxLength) || (c === '\r') && !this.$AcceptsReturn)
                return false;

            if (length > 0) {
                this._Undo.push(new Text.TextBoxUndoActionReplace(anchor, cursor, this._Buffer, start, length, c));
                this._Redo = [];
                
                this._Buffer = Text.TextBuffer.Replace(this._Buffer, start, length, c);
            } else {
                var ins: Text.TextBoxUndoActionInsert = null;
                var action = this._Undo[this._Undo.length - 1];
                if (action instanceof Text.TextBoxUndoActionInsert) {
                    ins = <Text.TextBoxUndoActionInsert>action;
                    if (!ins.Insert(start, c))
                        ins = null;
                }

                if (!ins) {
                    ins = new Text.TextBoxUndoActionInsert(anchor, cursor, start, c);
                    this._Undo.push(ins);
                }
                this._Redo = [];

                this._Buffer = Text.TextBuffer.Insert(this._Buffer, start, c);
            }

            this._Emit |= TextBoxEmitChangedType.TEXT;
            cursor = start + 1;
            anchor = cursor;

            if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                this.SelectionStart = Math.min(anchor, cursor);
                this.SelectionLength = Math.abs(cursor - anchor);
                this._SelectionAnchor = anchor;
                this._SelectionCursor = cursor;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
            }

            return true;
        }
    }
    Fayde.RegisterType(TextBoxBase, "Fayde.Controls");
}