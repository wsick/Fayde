/// <reference path="Control.ts" />
/// <reference path="../Input/KeyEventArgs.ts" />

module Fayde.Controls {

    export interface ITextModelArgs {
        Changed: TextBoxModelChangedType;
        NewValue: any;
    }

    export interface ITextModelListener {
        OnTextModelChanged(args: ITextModelArgs);
    }

    var Key = Input.Key;
    export class TextBoxBase extends Control {
        private _Selecting: boolean = false;
        private _Captured: boolean = false;

        private _TextProperty: DependencyProperty;

        IsReadOnly = false;

        $ContentProxy = new Internal.TextBoxContentProxy();
        $Proxy: Internal.TextProxy;
        $Advancer: Internal.ICursorAdvancer;
        $View: Internal.TextBoxView;
        $IsFocused: boolean = false;

        constructor(eventsMask: TextBoxEmitChangedType, textPropd: DependencyProperty) {
            super();
            this.$View = this.CreateView();
            this.$View.setTextBox(this);
            this.$Proxy = new Internal.TextProxy(eventsMask);
            this._TextProperty = textPropd;
        }

        CreateView(): Internal.TextBoxView {
            return new Internal.TextBoxView();
        }

        get Cursor(): CursorType {
            var cursor = this.GetValue(FrameworkElement.CursorProperty);
            if (cursor === CursorType.Default)
                return CursorType.IBeam;
            return cursor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.$ContentProxy.setElement(<FrameworkElement>this.GetTemplateChild("ContentElement", FrameworkElement), this.$View);
        }

        private _UpdateFont() {
            this._Font.Family = this.FontFamily;
            this._Font.Size = this.FontSize;
            this._Font.Stretch = this.FontStretch;
            this._Font.Style = this.FontStyle;
            this._Font.Weight = this.FontWeight;
        }

        OnLostFocus(e: RoutedEventArgs) {
            this.$IsFocused = false;
            if (this.$View)
                this.$View.OnLostFocus(e);
        }

        OnGotFocus(e: RoutedEventArgs) {
            this.$IsFocused = true;
            if (this.$View)
                this.$View.OnGotFocus(e);
        }

        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            e.Handled = true;
            this.Focus();

            if (this.$View) {
                var p = e.GetPosition(this.$View);
                var cursor = this.$View.GetCursorFromXY(p.x, p.y);

                this._Captured = this.CaptureMouse();
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

        OnKeyDown(args: Input.KeyEventArgs) {
            switch (args.Key) {
                case Key.Shift: //shift
                case Key.Ctrl: //ctrl
                case Key.Alt: //alt
                    return;
            }

            var isReadOnly = this.IsReadOnly;
            var handled = false;
            var proxy = this.$Proxy;
            proxy.begin();

            switch (args.Key) {
                case Key.Back:
                    if (isReadOnly)
                        break;
                    handled = this._KeyDownBackSpace(args.Modifiers);
                    break;
                case Key.Delete:
                    if (isReadOnly)
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
                                proxy.selectAll();
                                break;
                            case Key.C:
                                //Ctrl+C => Copy
                                //TODO: Copy to clipboard
                                handled = true;
                                break;
                            case Key.X:
                                //Ctrl+X => Cut
                                if (isReadOnly)
                                    break;
                                //TODO: Copy to clipboard
                                //TODO: Clear text
                                handled = true;
                                break;
                            case Key.Y:
                                //Ctrl+Y => Redo
                                if (!isReadOnly) {
                                    handled = true;
                                    proxy.redo();
                                }
                                break;
                            case Key.Z:
                                //Ctrl+Z => Undo
                                if (!isReadOnly) {
                                    handled = true;
                                    proxy.undo();
                                }
                                break;
                        }
                    }
                    break;
            }

            if (handled) {
                args.Handled = handled;
            }
            proxy.end();

            if (!args.Handled && !isReadOnly)
                this.PostOnKeyDown(args);
        }

        PostOnKeyDown(args: Input.KeyEventArgs) {
            if (args.Handled)
                return;

            if (args.Modifiers.Alt || args.Modifiers.Ctrl)
                return;

            var proxy = this.$Proxy;
            proxy.begin();
            if (args.Key === Key.Enter) {
                proxy.enterText('\r\n');
            } else if (args.Char != null && !args.Modifiers.Ctrl && !args.Modifiers.Alt) {
                proxy.enterText(args.Char);
            }
            proxy.end();
        }

        private _KeyDownBackSpace(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Shift || modifiers.Alt)
                return false;

            var proxy = this.$Proxy;
            var anchor = proxy.selAnchor;
            var cursor = proxy.selCursor;
            var start = 0;
            var length = 0;

            if (cursor !== anchor) {
                length = Math.abs(cursor - anchor);
                start = Math.min(anchor, cursor);
            } else if (modifiers.Ctrl) {
                start = this.$Advancer.CursorPrevWord(cursor);
                length = cursor - start;
            } else if (cursor > 0) {
                start = this.$Advancer.CursorPrevChar(cursor);
                length = cursor - start;
            }

            return proxy.removeText(start, length);
        }

        private _KeyDownDelete(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Shift || modifiers.Alt)
                return false;

            var proxy = this.$Proxy;
            var anchor = proxy.selAnchor;
            var cursor = proxy.selCursor;
            var start = 0;
            var length = 0;

            if (cursor !== anchor) {
                length = Math.abs(cursor - anchor);
                start = Math.min(anchor, cursor);
            } else if (modifiers.Ctrl) {
                //Ctrl+Delete => delete the word start at the cursor
                length = this.$Advancer.CursorNextWord(cursor) - cursor;
                start = cursor;
            } else {
                length = this.$Advancer.CursorNextChar(cursor) - cursor;
                start = cursor;
            }

            return proxy.removeText(start, length);
        }

        private _KeyDownPageDown(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var proxy = this.$Proxy;
            var anchor = proxy.selAnchor;
            var cursor = proxy.selCursor;

            cursor = this.$Advancer.CursorDown(cursor, true);

            if (!modifiers.Shift)
                anchor = cursor;

            return proxy.setAnchorCursor(anchor, cursor);
        }

        private _KeyDownPageUp(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var proxy = this.$Proxy;
            var anchor = proxy.selAnchor;
            var cursor = proxy.selCursor;

            cursor = this.$Advancer.CursorUp(cursor, true);

            if (!modifiers.Shift)
                anchor = cursor;

            return proxy.setAnchorCursor(anchor, cursor);
        }

        private _KeyDownHome(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var proxy = this.$Proxy;
            var anchor = proxy.selAnchor;
            var cursor = proxy.selCursor;

            if (modifiers.Ctrl) {
                cursor = this.$Advancer.CursorBegin(cursor);
            } else {
                cursor = this.$Advancer.CursorLineBegin(cursor);
            }

            if (!modifiers.Shift)
                anchor = cursor;

            return proxy.setAnchorCursor(anchor, cursor);
        }

        private _KeyDownEnd(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var proxy = this.$Proxy;
            var anchor = proxy.selAnchor;
            var cursor = proxy.selCursor;

            if (modifiers.Ctrl) {
                cursor = this.$Advancer.CursorEnd(cursor);
            } else {
                cursor = this.$Advancer.CursorLineEnd(cursor);
            }

            if (!modifiers.Shift)
                anchor = cursor;

            return proxy.setAnchorCursor(anchor, cursor);
        }

        private _KeyDownLeft(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var proxy = this.$Proxy;
            var anchor = proxy.selAnchor;
            var cursor = proxy.selCursor;

            if (modifiers.Ctrl) {
                cursor = this.$Advancer.CursorPrevWord(cursor);
            } else if (!modifiers.Shift && anchor !== cursor) {
                cursor = Math.min(anchor, cursor);
            } else {
                cursor = this.$Advancer.CursorPrevChar(cursor);
            }

            if (!modifiers.Shift)
                anchor = cursor;

            return proxy.setAnchorCursor(anchor, cursor);
        }

        private _KeyDownRight(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var proxy = this.$Proxy;
            var anchor = proxy.selAnchor;
            var cursor = proxy.selCursor;

            if (modifiers.Ctrl) {
                cursor = this.$Advancer.CursorNextWord(cursor);
            } else if (!modifiers.Shift && anchor !== cursor) {
                cursor = Math.max(anchor, cursor);
            } else {
                cursor = this.$Advancer.CursorNextChar(cursor);
            }

            if (!modifiers.Shift)
                anchor = cursor;

            return proxy.setAnchorCursor(anchor, cursor);
        }

        private _KeyDownDown(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var proxy = this.$Proxy;
            var cursor = this.$Advancer.CursorDown(proxy.selCursor, false);
            var anchor = proxy.selAnchor;
            if (!modifiers.Shift)
                anchor = cursor;
            return proxy.setAnchorCursor(anchor, cursor);
        }

        private _KeyDownUp(modifiers: Input.IModifiersOn): boolean {
            if (modifiers.Alt)
                return false;

            var proxy = this.$Proxy;
            var cursor = this.$Advancer.CursorUp(proxy.selCursor, false);
            var anchor = proxy.selAnchor;
            if (!modifiers.Shift)
                anchor = cursor;
            return proxy.setAnchorCursor(anchor, cursor);
        }
    }
    Fayde.RegisterType(TextBoxBase, "Fayde.Controls");
}