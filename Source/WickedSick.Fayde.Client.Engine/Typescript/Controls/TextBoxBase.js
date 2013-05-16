var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Control.ts" />
    /// <reference path="../Input/KeyEventArgs.ts" />
    /// CODE
    /// <reference path="../Core/Enums.ts" />
    /// <reference path="Enums.ts" />
    /// <reference path="Border.ts" />
    /// <reference path="../Text/History.ts" />
    (function (Controls) {
        (function (TextBoxModelChangedType) {
            TextBoxModelChangedType._map = [];
            TextBoxModelChangedType.Nothing = 0;
            TextBoxModelChangedType.TextAlignment = 1;
            TextBoxModelChangedType.TextWrapping = 2;
            TextBoxModelChangedType.Selection = 3;
            TextBoxModelChangedType.Brush = 4;
            TextBoxModelChangedType.Font = 5;
            TextBoxModelChangedType.Text = 6;
        })(Controls.TextBoxModelChangedType || (Controls.TextBoxModelChangedType = {}));
        var TextBoxModelChangedType = Controls.TextBoxModelChangedType;
        (function (TextBoxEmitChangedType) {
            TextBoxEmitChangedType._map = [];
            TextBoxEmitChangedType.NOTHING = 0;
            TextBoxEmitChangedType.SELECTION = 1 << 0;
            TextBoxEmitChangedType.TEXT = 1 << 1;
        })(Controls.TextBoxEmitChangedType || (Controls.TextBoxEmitChangedType = {}));
        var TextBoxEmitChangedType = Controls.TextBoxEmitChangedType;
        var Key = Fayde.Input.Key;
        var MAX_UNDO_COUNT = 10;
        var TextBoxBase = (function (_super) {
            __extends(TextBoxBase, _super);
            //Will be overriden
            function TextBoxBase(eventsMask, textPropd, selTextPropd) {
                        _super.call(this);
                this._Undo = [];
                this._Redo = [];
                this._Buffer = "";
                this._Emit = TextBoxEmitChangedType.NOTHING;
                this._NeedIMReset = false;
                this._Selecting = false;
                this._Captured = false;
                this._SettingValue = true;
                this._SelectionCursor = 0;
                this._SelectionAnchor = 0;
                this._Font = new Font();
                this._CursorOffset = 0;
                this._Batch = 0;
                this.$IsReadOnly = false;
                this.$IsFocused = false;
                this.$AcceptsReturn = false;
                this.$MaxLength = 0;
                this.$HasOffset = false;
                this._ModelListener = null;
                this._EventsMask = eventsMask;
                this._TextProperty = textPropd;
                this._SelectedTextProperty = selTextPropd;
            }
            Object.defineProperty(TextBoxBase.prototype, "SelectionCursor", {
                get: function () {
                    return this._SelectionCursor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "HasSelectedText", {
                get: function () {
                    return this._SelectionCursor !== this._SelectionAnchor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "CaretBrush", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "TextAlignment", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "TextWrapping", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "SelectionStart", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "SelectionLength", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "DisplayText", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "SelectionBackground", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "Background", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "SelectionForeground", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "Foreground", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "Font", {
                get: function () {
                    return this._Font;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "Direction", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "TextDecorations", {
                get: function () {
                    return Fayde.TextDecorations.None;
                },
                enumerable: true,
                configurable: true
            });
            TextBoxBase.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                var ce = this.$ContentElement = this.GetTemplateChild("ContentElement");
                if(!ce) {
                    return;
                }
                var view = this.$View;
                if(view) {
                    view.SetTextBox(null);
                }
                view = this.$View = new Controls.Internal.TextBoxView();
                view.SetEnableCursor(!this.$IsReadOnly);
                view.SetTextBox(this);
                if(ce instanceof Controls.ContentPresenter) {
                    (ce).SetValue(Controls.ContentPresenter.ContentProperty, view);
                } else if(ce instanceof Controls.ContentControl) {
                    (ce).SetValue(Controls.ContentControl.ContentProperty, view);
                } else if(ce instanceof Controls.Border) {
                    (ce).SetValue(Controls.Border.ChildProperty, view);
                } else if(ce instanceof Controls.Panel) {
                    (ce).Children.Add(view);
                } else {
                    Warn("TextBox does not have a valid content element.");
                    view.SetTextBox(null);
                    this.$View = view = null;
                }
            };
            TextBoxBase.prototype.Listen = function (listener) {
                this._ModelListener = listener;
            };
            TextBoxBase.prototype.Unlisten = function (listener) {
                if(this._ModelListener === listener) {
                    this._ModelListener = null;
                }
            };
            TextBoxBase.prototype._ModelChanged = function (type, newValue) {
                var listener = this._ModelListener;
                if(!listener) {
                    return;
                }
                listener.OnTextModelChanged({
                    Changed: type,
                    NewValue: newValue
                });
            };
            TextBoxBase.prototype._SelectedTextChanged = function (newValue) {
                if(!this._SettingValue) {
                    return;
                }
                var text = newValue || "";
                if(!text) {
                    return;
                }
                var length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
                var start = Math.min(this._SelectionAnchor, this._SelectionCursor);
                var action;
                if(length > 0) {
                    action = new Fayde.Text.TextBoxUndoActionReplace(this._SelectionAnchor, this._SelectionCursor, this._Buffer, start, length, text);
                    this._Buffer = Fayde.Text.TextBuffer.Replace(this._Buffer, start, length, text);
                } else if(text.length > 0) {
                    action = new Fayde.Text.TextBoxUndoActionInsert(this._SelectionAnchor, this._SelectionCursor, start, text);
                    this._Buffer = Fayde.Text.TextBuffer.Insert(this._Buffer, start, text);
                }
                if(action) {
                    this._Emit |= TextBoxEmitChangedType.TEXT;
                    this._Undo.push(action);
                    this._Redo = [];
                    this.ClearSelection(start + text.length);
                    this._ResetIMContext();
                    this._SyncAndEmit();
                }
            };
            TextBoxBase.prototype._SelectionStartChanged = function (newValue) {
                var changed = TextBoxModelChangedType.Nothing;
                var length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
                var start = newValue;
                if(start > this._Buffer.length) {
                    this.SelectionStart = this._Buffer.length;
                    return;
                }
                if(start + length > this._Buffer.length) {
                    this._BatchPush();
                    length = this._Buffer.length - start;
                    this.SelectionLength = length;
                    this._BatchPop();
                }
                if(this._SelectionAnchor != start) {
                    changed = TextBoxModelChangedType.Selection;
                    this.$HasOffset = false;
                }
                this._SelectionCursor = start + length;
                this._SelectionAnchor = start;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                this._SyncAndEmit();
                if(changed !== TextBoxModelChangedType.Nothing) {
                    this._ModelChanged(changed, newValue);
                }
            };
            TextBoxBase.prototype._SelectionLengthChanged = function (newValue) {
                var changed = TextBoxModelChangedType.Nothing;
                var start = Math.min(this._SelectionAnchor, this._SelectionCursor);
                var length = newValue;
                if(start + length > this._Buffer.length) {
                    length = this._Buffer.length - start;
                    this.SelectionLength = length;
                    return;
                }
                if(this._SelectionCursor != (start + length)) {
                    changed = TextBoxModelChangedType.Selection;
                    this.$HasOffset = false;
                }
                this._SelectionCursor = start + length;
                this._SelectionAnchor = start;
                this._Emit |= TextBoxEmitChangedType.SELECTION;
                this._SyncAndEmit();
                if(changed !== TextBoxModelChangedType.Nothing) {
                    this._ModelChanged(changed, newValue);
                }
            };
            TextBoxBase.prototype._TextChanged = function (newValue) {
                var text = newValue || "";
                if(this._SettingValue) {
                    if(text) {
                        var action;
                        if(this._Buffer.length > 0) {
                            action = new Fayde.Text.TextBoxUndoActionReplace(this._SelectionAnchor, this._SelectionCursor, this._Buffer, 0, this._Buffer.length, text);
                            this._Buffer = Fayde.Text.TextBuffer.Replace(this._Buffer, 0, this._Buffer.length, text);
                        } else {
                            action = new Fayde.Text.TextBoxUndoActionInsert(this._SelectionAnchor, this._SelectionCursor, 0, text);
                            this._Buffer = text + this._Buffer;
                        }
                        this._Undo.push(action);
                        this._Redo = [];
                        this._Emit |= TextBoxEmitChangedType.TEXT;
                        this.ClearSelection(0);
                        this._ResetIMContext();
                        this._SyncAndEmit(false);
                    }
                }
                this._ModelChanged(TextBoxModelChangedType.Text, newValue);
            };
            TextBoxBase.prototype._BatchPush = function () {
                this._Batch++;
            };
            TextBoxBase.prototype._BatchPop = function () {
                if(this._Batch < 1) {
                    Warn("TextBoxBase._Batch underflow");
                    return;
                }
                this._Batch--;
            };
            TextBoxBase.prototype._SyncAndEmit = function (syncText) {
                if(syncText === undefined) {
                    syncText = true;
                }
                if(this._Batch != 0 || this._Emit === TextBoxEmitChangedType.NOTHING) {
                    return;
                }
                if(syncText && (this._Emit & TextBoxEmitChangedType.TEXT)) {
                    this._SyncText();
                }
                if(this._Emit & TextBoxEmitChangedType.SELECTION) {
                    this._SyncSelectedText();
                }
                if(this.XamlNode.IsLoaded) {
                    this._Emit &= this._EventsMask;
                    if(this._Emit & TextBoxEmitChangedType.TEXT) {
                        this._EmitTextChanged();
                    }
                    if(this._Emit & TextBoxEmitChangedType.SELECTION) {
                        this._EmitSelectionChanged();
                    }
                }
                this._Emit = TextBoxEmitChangedType.NOTHING;
            };
            TextBoxBase.prototype._SyncText = function () {
                this._SettingValue = false;
                this.SetStoreValue(this._TextProperty, this._Buffer);
                this._SettingValue = true;
            };
            TextBoxBase.prototype._EmitTextChanged = function () {
            };
            TextBoxBase.prototype.SelectAll = function () {
                this.Select(0, this._Buffer.length);
            };
            TextBoxBase.prototype.ClearSelection = function (start) {
                this._BatchPush();
                this.SelectionStart = start;
                this.SelectionLength = 0;
                this._BatchPop();
            };
            TextBoxBase.prototype.Select = function (start, length) {
                if(start < 0) {
                    throw new ArgumentException("start < 0");
                }
                if(length < 0) {
                    throw new ArgumentException("length < 0");
                }
                if(start > this._Buffer.length) {
                    start = this._Buffer.length;
                }
                if(length > (this._Buffer.length - start)) {
                    length = this._Buffer.length - start;
                }
                this._BatchPush();
                this.SelectionStart = start;
                this.SelectionLength = length;
                this._BatchPop();
                this._ResetIMContext();
                this._SyncAndEmit();
                return true;
            };
            TextBoxBase.prototype._SyncSelectedText = function () {
                if(this._SelectionCursor !== this._SelectionAnchor) {
                    var start = Math.min(this._SelectionAnchor, this._SelectionCursor);
                    var len = Math.abs(this._SelectionCursor - this._SelectionAnchor);
                    var text = !this._Buffer ? '' : this._Buffer.substr(start, len);
                    this._SettingValue = false;
                    this.SetStoreValue(this._SelectedTextProperty, text);
                    this._SettingValue = true;
                } else {
                    this._SettingValue = false;
                    this.SetStoreValue(this._SelectedTextProperty, "");
                    this._SettingValue = true;
                }
            };
            TextBoxBase.prototype._EmitSelectionChanged = function () {
            };
            TextBoxBase.prototype._ResetIMContext = function () {
                if(this._NeedIMReset) {
                    //this._IMCtx.Reset();
                    this._NeedIMReset = false;
                }
            };
            TextBoxBase.prototype.CanUndo = function () {
                return this._Undo.length > 0;
            };
            TextBoxBase.prototype.Undo = function () {
                if(this._Undo.length < 1) {
                    return;
                }
                var action = this._Undo.pop();
                if(this._Redo.push(action) > MAX_UNDO_COUNT) {
                    this._Redo.shift();
                }
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
            };
            TextBoxBase.prototype.CanRedo = function () {
                return this._Redo.length > 0;
            };
            TextBoxBase.prototype.Redo = function () {
                if(this._Redo.length < 1) {
                    return;
                }
                var action = this._Redo.pop();
                if(this._Undo.push(action) > MAX_UNDO_COUNT) {
                    this._Undo.shift();
                }
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
            };
            TextBoxBase.prototype.OnLostFocus = function (e) {
                this.$IsFocused = false;
                if(this.$View) {
                    this.$View.OnLostFocus(e);
                }
                if(!this.$IsReadOnly) {
                    //this._IMCtx.FocusOut();
                    this._NeedIMReset = true;
                }
            };
            TextBoxBase.prototype.OnGotFocus = function (e) {
                this.$IsFocused = true;
                if(this.$View) {
                    this.$View.OnGotFocus(e);
                }
                if(!this.$IsReadOnly) {
                    //this._IMCtx.FocusIn();
                    this._NeedIMReset = true;
                }
            };
            TextBoxBase.prototype.OnMouseLeftButtonDown = function (e) {
                e.Handled = true;
                this.Focus();
                if(this.$View) {
                    var p = e.GetPosition(this.$View);
                    var cursor = this.$View.GetCursorFromXY(p.X, p.Y);
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
            };
            TextBoxBase.prototype.OnMouseLeftButtonUp = function (e) {
                if(this._Captured) {
                    this.ReleaseMouseCapture();
                    //TextDebug("TextBox-ReleaseCapturedMouse");
                                    }
                e.Handled = true;
                this._Selecting = false;
                this._Captured = false;
            };
            TextBoxBase.prototype.OnMouseMove = function (e) {
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                if(this._Selecting) {
                    var p = e.GetPosition(this.$View);
                    e.Handled = true;
                    cursor = this.$View.GetCursorFromXY(p.X, p.Y);
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
            };
            TextBoxBase.prototype.CursorDown = function (cursor, isPage) {
                return cursor;
            };
            TextBoxBase.prototype.CursorUp = function (cursor, isPage) {
                return cursor;
            };
            TextBoxBase.prototype.CursorNextWord = function (cursor) {
                return cursor;
            };
            TextBoxBase.prototype.CursorPrevWord = function (cursor) {
                return cursor;
            };
            TextBoxBase.prototype.CursorLineBegin = function (cursor) {
                var buffer = this._Buffer;
                var len = buffer.length;
                var r = buffer.lastIndexOf("\r", cursor);
                var n = buffer.lastIndexOf("\n", cursor);
                return Math.max(r, n, 0);
            };
            TextBoxBase.prototype.CursorLineEnd = function (cursor) {
                var buffer = this._Buffer;
                var len = buffer.length;
                var r = buffer.indexOf("\r", cursor);
                if(r < 0) {
                    r = len;
                }
                var n = buffer.indexOf("\n", cursor);
                if(n < 0) {
                    n = len;
                }
                return Math.min(r, n);
            };
            TextBoxBase.prototype._EmitCursorPositionChanged = function (height, x, y) {
                //LOOKS USELESS
                            };
            TextBoxBase.prototype.OnKeyDown = function (args) {
                switch(args.Key) {
                    case Key.Shift:
                    case Key.Ctrl:
                    case Key.Alt:
                        //alt
                        return;
                }
                var handled = false;
                this._Emit = TextBoxEmitChangedType.NOTHING;
                this._BatchPush();
                switch(args.Key) {
                    case Key.Back:
                        if(this.$IsReadOnly) {
                            break;
                        }
                        handled = this._KeyDownBackSpace(args.Modifiers);
                        break;
                    case Key.Delete:
                        if(this.$IsReadOnly) {
                            break;
                        }
                        if(args.Modifiers.Shift) {
                            //Shift+Delete => Cut
                            handled = true;
                        } else {
                            handled = this._KeyDownDelete(args.Modifiers);
                        }
                        break;
                    case Key.Insert:
                        if(args.Modifiers.Shift) {
                            //Shift+Insert => Paste
                            handled = true;
                        } else if(args.Modifiers.Ctrl) {
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
                        if(args.Modifiers.Ctrl) {
                            switch(args.Key) {
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
                                    if(this.$IsReadOnly) {
                                        break;
                                    }
                                    //copy to clipboard
                                    this.SelectedText = "";
                                    handled = true;
                                    break;
                                case Key.Y:
                                    //Ctrl+Y => Redo
                                    if(!this.$IsReadOnly) {
                                        handled = true;
                                        this.Redo();
                                    }
                                    break;
                                case Key.Z:
                                    //Ctrl+Z => Undo
                                    if(!this.$IsReadOnly) {
                                        handled = true;
                                        this.Undo();
                                    }
                                    break;
                            }
                        }
                        break;
                }
                if(handled) {
                    args.Handled = handled;
                    this._ResetIMContext();
                }
                this._BatchPop();
                this._SyncAndEmit();
                if(!args.Handled) {
                    this.PostOnKeyDown(args);
                }
            };
            TextBoxBase.prototype.PostOnKeyDown = function (args) {
                if(args.Handled) {
                    return;
                }
                /*
                if (!this._IsReadOnly && this._IMCtx.FilterKeyPress()) {
                this._NeedIMReset = true;
                return;
                }
                */
                if(this.$IsReadOnly || args.Modifiers.Alt || args.Modifiers.Ctrl) {
                    return;
                }
                this._Emit = TextBoxEmitChangedType.NOTHING;
                this._BatchPush();
                if(args.Key === Key.Enter) {
                    this._KeyDownChar('\r');
                } else if(args.Char != null && !args.Modifiers.Ctrl && !args.Modifiers.Alt) {
                    this._KeyDownChar(args.Char);
                }
                this._BatchPop();
                this._SyncAndEmit();
            };
            TextBoxBase.prototype._KeyDownBackSpace = function (modifiers) {
                if(modifiers.Shift || modifiers.Alt) {
                    return false;
                }
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                var start = 0;
                var length = 0;
                if(cursor !== anchor) {
                    length = Math.abs(cursor - anchor);
                    start = Math.min(anchor, cursor);
                } else if(modifiers.Ctrl) {
                    start = this.CursorPrevWord(cursor);
                    length = cursor - start;
                } else if(cursor > 0) {
                    if(cursor >= 2 && this._Buffer && this._Buffer.charAt(cursor - 2) === '\r' && this._Buffer.charAt(cursor - 1) === '\n') {
                        start = cursor - 2;
                        length = 2;
                    } else {
                        start = cursor - 1;
                        length = 1;
                    }
                }
                if(length > 0) {
                    this._Undo.push(new Fayde.Text.TextBoxUndoActionDelete(this._SelectionAnchor, this._SelectionCursor, this._Buffer, start, length));
                    this._Redo = [];
                    this._Buffer = Fayde.Text.TextBuffer.Cut(this._Buffer, start, length);
                    this._Emit |= TextBoxEmitChangedType.TEXT;
                    anchor = start;
                    cursor = start;
                }
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                }
                return true;
            };
            TextBoxBase.prototype._KeyDownDelete = function (modifiers) {
                if(modifiers.Shift || modifiers.Alt) {
                    return false;
                }
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                var start = 0;
                var length = 0;
                var handled = false;
                if(cursor !== anchor) {
                    length = Math.abs(cursor - anchor);
                    start = Math.min(anchor, cursor);
                } else if(modifiers.Ctrl) {
                    //Ctrl+Delete => delete the word start at the cursor
                    length = this.CursorNextWord(cursor) - cursor;
                    start = cursor;
                } else if(this._Buffer && cursor < this._Buffer.length) {
                    if(this._Buffer.charAt(cursor) === '\r' && this._Buffer.charAt(cursor + 1) === '\n') {
                        length = 2;
                    } else {
                        length = 1;
                    }
                    start = cursor;
                }
                if(length > 0) {
                    this._Undo.push(new Fayde.Text.TextBoxUndoActionDelete(this._SelectionAnchor, this._SelectionCursor, this._Buffer, start, length));
                    this._Redo = [];
                    this._Buffer = Fayde.Text.TextBuffer.Cut(this._Buffer, start, length);
                    this._Emit |= TextBoxEmitChangedType.TEXT;
                    handled = true;
                }
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                    handled = true;
                }
                return handled;
            };
            TextBoxBase.prototype._KeyDownPageDown = function (modifiers) {
                if(modifiers.Alt) {
                    return false;
                }
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                cursor = this.CursorDown(cursor, true);
                var have = this.$HasOffset;
                if(!modifiers.Shift) {
                    anchor = cursor;
                }
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                    this.$HasOffset = have;
                }
                return true;
            };
            TextBoxBase.prototype._KeyDownPageUp = function (modifiers) {
                if(modifiers.Alt) {
                    return false;
                }
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                cursor = this.CursorUp(cursor, true);
                var have = this.$HasOffset;
                if(!modifiers.Shift) {
                    anchor = cursor;
                }
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                    this.$HasOffset = have;
                }
                return true;
            };
            TextBoxBase.prototype._KeyDownHome = function (modifiers) {
                if(modifiers.Alt) {
                    return false;
                }
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                var handled = false;
                if(modifiers.Ctrl) {
                    cursor = 0;
                } else {
                    cursor = this.CursorLineBegin(cursor);
                }
                if(!modifiers.Shift) {
                    anchor = cursor;
                }
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                    this.$HasOffset = false;
                    handled = true;
                }
                return handled;
            };
            TextBoxBase.prototype._KeyDownEnd = function (modifiers) {
                if(modifiers.Alt) {
                    return false;
                }
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                var handled = false;
                if(modifiers.Ctrl) {
                    cursor = this._Buffer.length;
                } else {
                    cursor = this.CursorLineEnd(cursor);
                }
                if(!modifiers.Shift) {
                    anchor = cursor;
                }
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                    this.$HasOffset = false;
                    handled = true;
                }
                return handled;
            };
            TextBoxBase.prototype._KeyDownLeft = function (modifiers) {
                if(modifiers.Alt) {
                    return false;
                }
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                var handled = false;
                if(modifiers.Ctrl) {
                    cursor = this.CursorPrevWord(cursor);
                } else if(!modifiers.Shift && anchor !== cursor) {
                    cursor = Math.min(anchor, cursor);
                } else {
                    if(cursor >= 2 && this._Buffer && this._Buffer.charAt(cursor - 2) === '\r' && this._Buffer.charAt(cursor - 1) === '\n') {
                        cursor -= 2;
                    } else if(cursor > 0) {
                        cursor--;
                    }
                }
                if(!modifiers.Shift) {
                    anchor = cursor;
                }
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                    handled = true;
                }
                return handled;
            };
            TextBoxBase.prototype._KeyDownRight = function (modifiers) {
                if(modifiers.Alt) {
                    return false;
                }
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                var handled = false;
                if(modifiers.Ctrl) {
                    cursor = this.CursorNextWord(cursor);
                } else if(!modifiers.Shift && anchor !== cursor) {
                    cursor = Math.max(anchor, cursor);
                } else {
                    if(this._Buffer && this._Buffer.charAt(cursor) === '\r' && this._Buffer.charAt(cursor + 1) === '\n') {
                        cursor += 2;
                    } else if(cursor < this._Buffer.length) {
                        cursor++;
                    }
                }
                if(!modifiers.Shift) {
                    anchor = cursor;
                }
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                    handled = true;
                }
                return handled;
            };
            TextBoxBase.prototype._KeyDownDown = function (modifiers) {
                if(modifiers.Alt) {
                    return false;
                }
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                var handled = false;
                cursor = this.CursorDown(cursor, false);
                var have = this.$HasOffset;
                if(!modifiers.Shift) {
                    anchor = cursor;
                }
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                    this.$HasOffset = have;
                    handled = true;
                }
                return handled;
            };
            TextBoxBase.prototype._KeyDownUp = function (modifiers) {
                if(modifiers.Alt) {
                    return false;
                }
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                var handled = false;
                cursor = this.CursorUp(cursor, false);
                var have = this.$HasOffset;
                if(!modifiers.Shift) {
                    anchor = cursor;
                }
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                    this.$HasOffset = have;
                    handled = true;
                }
                return handled;
            };
            TextBoxBase.prototype._KeyDownChar = function (c) {
                var anchor = this._SelectionAnchor;
                var cursor = this._SelectionCursor;
                var length = Math.abs(cursor - anchor);
                var start = Math.min(anchor, cursor);
                if((this.$MaxLength > 0 && this._Buffer.length >= this.$MaxLength) || (c === '\r') && !this.$AcceptsReturn) {
                    return false;
                }
                if(length > 0) {
                    this._Undo.push(new Fayde.Text.TextBoxUndoActionReplace(anchor, cursor, this._Buffer, start, length, c));
                    this._Redo = [];
                    this._Buffer = Fayde.Text.TextBuffer.Replace(this._Buffer, start, length, c);
                } else {
                    var ins = null;
                    var action = this._Undo[this._Undo.length - 1];
                    if(action instanceof Fayde.Text.TextBoxUndoActionInsert) {
                        ins = action;
                        if(!ins.Insert(start, c)) {
                            ins = null;
                        }
                    }
                    if(!ins) {
                        ins = new Fayde.Text.TextBoxUndoActionInsert(anchor, cursor, start, c);
                        this._Undo.push(ins);
                    }
                    this._Redo = [];
                    this._Buffer = Fayde.Text.TextBuffer.Insert(this._Buffer, start, c);
                }
                this._Emit |= TextBoxEmitChangedType.TEXT;
                cursor = start + 1;
                anchor = cursor;
                if(this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
                    this.SelectionStart = Math.min(anchor, cursor);
                    this.SelectionLength = Math.abs(cursor - anchor);
                    this._SelectionAnchor = anchor;
                    this._SelectionCursor = cursor;
                    this._Emit |= TextBoxEmitChangedType.SELECTION;
                }
                return true;
            };
            return TextBoxBase;
        })(Controls.Control);
        Controls.TextBoxBase = TextBoxBase;        
        Nullstone.RegisterType(TextBoxBase, "TextBoxBase");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextBoxBase.js.map
