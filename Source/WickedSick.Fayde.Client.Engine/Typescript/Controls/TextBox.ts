/// <reference path="TextBoxBase.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Controls {
    export class TextBox extends TextBoxBase implements Text.ITextAttributesSource {
        static AcceptsReturnProperty: DependencyProperty = DependencyProperty.Register("AcceptsReturn", () => Boolean, TextBox, false, (d, args) => (<TextBox>d).$AcceptsReturn = (args.NewValue === true));
        static CaretBrushProperty: DependencyProperty = DependencyProperty.RegisterCore("CaretBrush", () => Media.Brush, TextBox);
        static MaxLengthProperty: DependencyProperty = DependencyProperty.RegisterFull("MaxLength", () => Number, TextBox, 0, (d, args) => (<TextBox>d).$MaxLength = args.NewValue, undefined, undefined, positiveIntValidator);
        static IsReadOnlyProperty: DependencyProperty = DependencyProperty.Register("IsReadOnly", () => Boolean, TextBox, undefined, (d, args) => (<TextBox>d)._IsReadOnlyChanged(args));
        static SelectionForegroundProperty: DependencyProperty = DependencyProperty.RegisterCore("SelectionForeground", () => Media.Brush, TextBox, undefined, (d, args) => (<TextBox>d)._SelectionForegroundChanged(args));
        static SelectionBackgroundProperty: DependencyProperty = DependencyProperty.RegisterCore("SelectionBackground", () => Media.Brush, TextBox, undefined, (d, args) => (<TextBox>d)._SelectionBackgroundChanged(args));
        static BaselineOffsetProperty: DependencyProperty = DependencyProperty.Register("BaselineOffset", () => Number, TextBox);
        static SelectionLengthProperty: DependencyProperty = DependencyProperty.RegisterFull("SelectionLength", () => Number, TextBox, 0, (d, args) => (<TextBox>d)._SelectionLengthChanged(args.NewValue), undefined, true, positiveIntValidator);
        static SelectionStartProperty: DependencyProperty = DependencyProperty.RegisterFull("SelectionStart", () => Number, TextBox, 0, (d, args) => (<TextBox>d)._SelectionStartChanged(args.NewValue), undefined, true, positiveIntValidator);
        static TextProperty: DependencyProperty = DependencyProperty.Register("Text", () => String, TextBox, undefined, (d, args) => (<TextBox>d)._TextChanged(args.NewValue));
        static TextAlignmentProperty: DependencyProperty = DependencyProperty.Register("TextAlignment", () => new Enum(TextAlignment), TextBox, TextAlignment.Left, (d, args) => (<TextBox>d)._TextAlignmentChanged(args));
        static TextWrappingProperty: DependencyProperty = DependencyProperty.Register("TextWrapping", () => new Enum(TextWrapping), TextBox, TextWrapping.NoWrap, (d, args) => (<TextBox>d)._TextWrappingChanged(args));
        static HorizontalScrollBarVisibilityProperty: DependencyProperty = DependencyProperty.Register("HorizontalScrollBarVisibility", () => new Enum(ScrollBarVisibility), TextBox, ScrollBarVisibility.Hidden, (d, args) => (<TextBox>d)._HorizontalScrollBarVisibilityChanged(args));
        static VerticalScrollBarVisibilityProperty: DependencyProperty = DependencyProperty.Register("VerticalScrollBarVisibility", () => new Enum(ScrollBarVisibility), TextBox, ScrollBarVisibility.Hidden, (d, args) => (<TextBox>d)._VerticalScrollBarVisibilityChanged(args));
        AcceptsReturn: bool;
        CaretBrush: Media.Brush;
        MaxLength: number;
        IsReadOnly: bool;
        BaselineOffset: number;
        SelectionLength: number;
        SelectionStart: number;
        Text: string;
        TextAlignment: TextAlignment;
        TextWrapping: TextWrapping;
        HorizontalScrollBarVisibility: ScrollBarVisibility;
        VerticalScrollBarVisibility: ScrollBarVisibility;
        SelectionForeground: Media.Brush;
        SelectionBackground: Media.Brush;

        SelectionChanged: RoutedEvent<RoutedEventArgs> = new RoutedEvent<RoutedEventArgs>();
        //TextChanged: RoutedEvent<TextChangedEventArgs> = new RoutedEvent<TextChangedEventArgs>();
        TextChanged: RoutedEvent<RoutedEventArgs> = new RoutedEvent<RoutedEventArgs>();

        constructor() {
            super(TextBoxEmitChangedType.TEXT | TextBoxEmitChangedType.SELECTION, TextBox.TextProperty);
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();

            var ce = this.$ContentElement;
            if (!ce)
                return;

            var ceType = (<any>ce).constructor;
            var propd = DependencyProperty.GetDependencyProperty(ceType, "VerticalScrollBarVisibility", true);
            if (propd)
                ce.SetValueInternal(propd, this.VerticalScrollBarVisibility);

            propd = DependencyProperty.GetDependencyProperty(ceType, "HorizontalScrollBarVisibility", true);
            if (propd) {
                var vis = (this.TextWrapping === TextWrapping.Wrap) ? ScrollBarVisibility.Disabled : this.HorizontalScrollBarVisibility;
                ce.SetValueInternal(propd, vis);
            }
        }

        get DisplayText(): string { return this.Text; }

        CursorDown(cursor: number, isPage: bool): number {
            //TODO:
            return cursor;
        }
        CursorUp(cursor: number, isPage: bool): number {
            //TODO:
            return cursor;
        }
        CursorNextWord(cursor: number): number {
            //TODO:
            return cursor;
        }
        CursorPrevWord(cursor: number): number {
            //TODO:
            return cursor;
        }
        CursorLineBegin(cursor: number): number {
            var buffer = this._Buffer;
            var len = buffer.length;
            var r = buffer.lastIndexOf("\r", cursor);
            var n = buffer.lastIndexOf("\n", cursor);
            return Math.max(r, n, 0);
        }
        CursorLineEnd(cursor: number): number {
            var buffer = this._Buffer;
            var len = buffer.length;
            var r = buffer.indexOf("\r", cursor);
            if (r < 0) r = len;
            var n = buffer.indexOf("\n", cursor);
            if (n < 0) n = len;
            return Math.min(r, n);
        }

        _EmitTextChanged() {
            //this.TextChanged.RaiseAsync(this, new TextChangedEventArgs());
            this.TextChanged.RaiseAsync(this, new RoutedEventArgs());
        }
        _EmitSelectionChanged() {
            //TextDebug("TextBox.SelectionChanged [" + this.SelectionStart + " -- " + this.SelectionLength + "]");
            this.SelectionChanged.RaiseAsync(this, new RoutedEventArgs());
        }

        private _IsReadOnlyChanged(args: IDependencyPropertyChangedEventArgs) {
            this.$IsReadOnly = args.NewValue === true;
            if (this.$IsFocused) {
                if (this.$IsReadOnly) {
                    this._ResetIMContext();
                    //TODO: this._IMCtx.FocusOut();
                } else {
                    //TODO: this._IMCtx.FocusIn();
                }
            }
            if (this.$View)
                this.$View.SetEnableCursor(!this.$IsReadOnly);
        }
        private _FontChanged(args: IDependencyPropertyChangedEventArgs) { this._ModelChanged(TextBoxModelChangedType.Font, args.NewValue); }
        private _SelectionBackgroundListener: Media.IBrushChangedListener;
        private _SelectionBackgroundChanged(args: IDependencyPropertyChangedEventArgs) {
            var newBrush = <Media.Brush>args.NewValue;
            if (this._SelectionBackgroundListener)
                this._SelectionBackgroundListener.Detach();
            this._SelectionBackgroundListener = null;
            if (newBrush) {
                this._SelectionBackgroundListener = newBrush.Listen((brush) => {
                    this._ModelChanged(TextBoxModelChangedType.Brush, newBrush);
                    this.XamlNode.LayoutUpdater.Invalidate();
                });
            }

            this._ModelChanged(TextBoxModelChangedType.Brush, newBrush);
            this.XamlNode.LayoutUpdater.Invalidate();
        }
        private _SelectionForegroundListener: Media.IBrushChangedListener;
        private _SelectionForegroundChanged(args: IDependencyPropertyChangedEventArgs) {
            var newBrush = <Media.Brush>args.NewValue;
            if (this._SelectionForegroundListener)
                this._SelectionForegroundListener.Detach();
            this._SelectionForegroundListener = null;
            if (newBrush) {
                this._SelectionForegroundListener = newBrush.Listen((brush) => {
                    this._ModelChanged(TextBoxModelChangedType.Brush, newBrush);
                    this.XamlNode.LayoutUpdater.Invalidate();
                });
            }

            this._ModelChanged(TextBoxModelChangedType.Brush, newBrush);
            this.XamlNode.LayoutUpdater.Invalidate();
        }
        private _TextAlignmentChanged(args: IDependencyPropertyChangedEventArgs) {
            this._ModelChanged(TextBoxModelChangedType.TextAlignment, args.NewValue);
        }
        private _TextWrappingChanged(args: IDependencyPropertyChangedEventArgs) {
            var ce = this.$ContentElement;
            if (ce) {
                var ceType = (<any>ce).constructor;
                var propd = DependencyProperty.GetDependencyProperty(ceType, "HorizontalScrollBarVisibility", true);
                if (propd) {
                    var vis = (args.NewValue === TextWrapping.Wrap) ? ScrollBarVisibility.Disabled : this.HorizontalScrollBarVisibility;
                    ce.SetValueInternal(propd, vis);
                }
            }
            this._ModelChanged(TextBoxModelChangedType.TextWrapping, args.NewValue);
        }
        private _HorizontalScrollBarVisibilityChanged(args: IDependencyPropertyChangedEventArgs) {
            var ce = this.$ContentElement;
            if (!ce)
                return;

            var ceType = (<any>ce).constructor;
            var propd = DependencyProperty.GetDependencyProperty(ceType, "HorizontalScrollBarVisibility");
            if (!propd)
                return;

            var vis = (this.TextWrapping === TextWrapping.Wrap) ? ScrollBarVisibility.Disabled : args.NewValue;
            ce.SetValueInternal(propd, vis);
        }
        private _VerticalScrollBarVisibilityChanged(args: IDependencyPropertyChangedEventArgs) {
            var ce = this.$ContentElement;
            if (!ce)
                return;

            var ceType = (<any>ce).constructor;
            var propd = DependencyProperty.GetDependencyProperty(ceType, "VerticalScrollBarVisibility");
            if (!propd)
                return;
            ce.SetValueInternal(propd, args.NewValue);
        }

        OnMouseEnter(e: Input.MouseEventArgs) {
            super.OnMouseEnter(e);
            this.UpdateVisualState();
        }
        OnMouseLeave(e: Input.MouseEventArgs) {
            super.OnMouseLeave(e);
            this.UpdateVisualState();
        }
        OnGotFocus(e: RoutedEventArgs) {
            super.OnGotFocus(e);
            this.UpdateVisualState();
        }
        OnLostFocus(e: RoutedEventArgs) {
            super.OnLostFocus(e);
            this.UpdateVisualState();
        }

        GetVisualStateCommon(): string {
            if (!this.IsEnabled) {
                return "Disabled";
            } else if (this.IsReadOnly) {
                return "ReadOnly";
            } else if (this.IsMouseOver) {
                return "MouseOver";
            } else {
                return "Normal";
            }
        }
    }
    Nullstone.RegisterType(TextBox, "TextBox");

    function positiveIntValidator(dobj: DependencyObject, propd: DependencyProperty, value: any): bool {
        if (typeof value !== 'number')
            return false;
        return value >= 0;
    }
}