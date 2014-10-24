/// <reference path="TextBoxBase.ts" />

module Fayde.Controls {
    export class TextBox extends TextBoxBase {
        static AcceptsReturnProperty = DependencyProperty.Register("AcceptsReturn", () => Boolean, TextBox, false);
        static CaretBrushProperty = DependencyProperty.RegisterCore("CaretBrush", () => Media.Brush, TextBox);
        static MaxLengthProperty = DependencyProperty.RegisterFull("MaxLength", () => Number, TextBox, 0, undefined, undefined, undefined, positiveIntValidator);
        static IsReadOnlyProperty = DependencyProperty.Register("IsReadOnly", () => Boolean, TextBox, false);
        static SelectionForegroundProperty = DependencyProperty.RegisterCore("SelectionForeground", () => Media.Brush, TextBox);
        static SelectionBackgroundProperty = DependencyProperty.RegisterCore("SelectionBackground", () => Media.Brush, TextBox);
        static BaselineOffsetProperty = DependencyProperty.Register("BaselineOffset", () => Number, TextBox);
        static SelectionLengthProperty = DependencyProperty.RegisterFull("SelectionLength", () => Number, TextBox, 0, undefined, undefined, true, positiveIntValidator);
        static SelectionStartProperty = DependencyProperty.RegisterFull("SelectionStart", () => Number, TextBox, 0, undefined, undefined, true, positiveIntValidator);
        static TextProperty = DependencyProperty.Register("Text", () => String, TextBox, undefined, (d, args) => (<TextBox>d)._TextChanged(args.NewValue));
        static TextAlignmentProperty = DependencyProperty.Register("TextAlignment", () => new Enum(TextAlignment), TextBox, TextAlignment.Left);
        static TextWrappingProperty = DependencyProperty.Register("TextWrapping", () => new Enum(TextWrapping), TextBox, TextWrapping.NoWrap);
        static HorizontalScrollBarVisibilityProperty = DependencyProperty.Register("HorizontalScrollBarVisibility", () => new Enum(ScrollBarVisibility), TextBox, ScrollBarVisibility.Hidden);
        static VerticalScrollBarVisibilityProperty = DependencyProperty.Register("VerticalScrollBarVisibility", () => new Enum(ScrollBarVisibility), TextBox, ScrollBarVisibility.Hidden);
        AcceptsReturn: boolean;
        CaretBrush: Media.Brush;
        MaxLength: number;
        IsReadOnly: boolean;
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

        //SelectionChanged = new RoutedEvent<RoutedEventArgs>();
        //TextChanged = new RoutedEvent<TextChangedEventArgs>();

        constructor () {
            super(TextBoxEmitChangedType.TEXT | TextBoxEmitChangedType.SELECTION, TextBox.TextProperty);
            this.DefaultStyleKey = (<any>this).constructor;

            var proxy = this.$Proxy;
            proxy.SyncSelectionStart = (value) => this.SetCurrentValue(TextBox.SelectionStartProperty, value);
            proxy.SyncSelectionLength = (value) => this.SetCurrentValue(TextBox.SelectionLengthProperty, value);
            proxy.SyncText = (value) => this.SetCurrentValue(TextBox.TextProperty, value);
            this.$Advancer = new Internal.TextBoxCursorAdvancer(this.$Proxy);
            this._SyncFont();
        }

        OnApplyTemplate () {
            super.OnApplyTemplate();
            var vis = (args.NewValue === TextWrapping.Wrap) ? ScrollBarVisibility.Disabled : this.HorizontalScrollBarVisibility;
            this.$ContentProxy.setHorizontalScrollBar(vis);
            this.$ContentProxy.setVerticalScrollBar(this.VerticalScrollBarVisibility);
        }

        get DisplayText (): string {
            return this.Text;
        }

        OnMouseEnter (e: Input.MouseEventArgs) {
            super.OnMouseEnter(e);
            this.UpdateVisualState();
        }

        OnMouseLeave (e: Input.MouseEventArgs) {
            super.OnMouseLeave(e);
            this.UpdateVisualState();
        }

        OnGotFocus (e: RoutedEventArgs) {
            super.OnGotFocus(e);
            this.UpdateVisualState();
        }

        OnLostFocus (e: RoutedEventArgs) {
            super.OnLostFocus(e);
            this.UpdateVisualState();
        }

        GoToStateCommon (gotoFunc: (state: string) => boolean): boolean {
            if (!this.IsEnabled)
                return gotoFunc("Disabled");
            if (this.IsReadOnly)
                return gotoFunc("ReadOnly");
            if (this.IsMouseOver)
                return gotoFunc("MouseOver");
            return gotoFunc("Normal");
        }

        private _SyncFont () {
            var view = this.$View;
            var propds = [
                Control.ForegroundProperty,
                Control.FontFamilyProperty,
                Control.FontSizeProperty,
                Control.FontStretchProperty,
                Control.FontStyleProperty,
                Control.FontWeightProperty
            ];
            propds.forEach(propd => propd.Store.ListenToChanged(this, propd, (dobj, args) => view.setFontProperty(propd, args.NewValue), this));
        }
    }
    Fayde.RegisterType(TextBox, "Fayde.Controls", Fayde.XMLNS);
    TemplateVisualStates(TextBox,
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "MouseOver" },
        { GroupName: "CommonStates", Name: "Disabled" },
        { GroupName: "CommonStates", Name: "ReadOnly" },
        { GroupName: "FocusStates", Name: "Unfocused" },
        { GroupName: "FocusStates", Name: "Focused" },
        { GroupName: "ValidationStates", Name: "Valid" },
        { GroupName: "ValidationStates", Name: "InvalidUnfocused" },
        { GroupName: "ValidationStates", Name: "InvalidFocused" });
    TemplateParts(TextBox,
        { Name: "ContentElement", Type: FrameworkElement });

    module reactions {
        DPReaction<boolean>(TextBox.AcceptsReturnProperty, (tb: TextBox, ov, nv) => {
            tb.$Proxy.acceptsReturn = nv === true;
        }, false);
        DPReaction<number>(TextBox.MaxLengthProperty, (tb: TextBox, ov, nv) => {
            tb.$Proxy.maxLength = nv;
        }, false);
        DPReaction<boolean>(TextBox.IsReadOnlyProperty, (tb: TextBox, ov, nv) => {
            tb.$View.setIsReadOnly(nv === true);
        }, false);
        DPReaction<number>(TextBox.SelectionStartProperty, (tb: TextBox, ov, nv) => {
            tb.$Proxy.setSelectionStart(nv);
            tb.$View.setSelectionStart(nv);
        }, false);
        DPReaction<number>(TextBox.SelectionLengthProperty, (tb: TextBox, ov, nv) => {
            tb.$Proxy.setSelectionLength(nv);
            tb.$View.setSelectionLength(nv);
        }, false);
        UIReaction<Media.Brush>(TextBox.SelectionBackgroundProperty, (upd, ov, nv, tb?: TextBox) => {
            tb._ModelChanged(TextBoxModelChangedType.Brush, nv);
            upd.invalidate();
        });
        UIReaction<Media.Brush>(TextBox.SelectionForegroundProperty, (upd, ov, nv, tb?: TextBox) => {
            tb._ModelChanged(TextBoxModelChangedType.Brush, nv);
            upd.invalidate();
        });
        DPReaction<TextAlignment>(TextBox.TextAlignmentProperty, (tb: TextBox, ov, nv) => tb.$View.setTextAlignment(nv), false);
        DPReaction<TextWrapping>(TextBox.TextWrappingProperty, (tb: TextBox, ov, nv) => {
            var vis = (args.NewValue === TextWrapping.Wrap) ? ScrollBarVisibility.Disabled : tb.HorizontalScrollBarVisibility;
            tb.$ContentProxy.setHorizontalScrollBar(vis);
            tb.$View.setTextWrapping(nv);
        }, false);
        DPReaction<ScrollBarVisibility>(TextBox.HorizontalScrollBarVisibilityProperty, (tb: TextBox, ov, nv) => {
            var vis = (args.NewValue === TextWrapping.Wrap) ? ScrollBarVisibility.Disabled : tb.HorizontalScrollBarVisibility;
            tb.$ContentProxy.setHorizontalScrollBar(vis);
        }, false);
        DPReaction<ScrollBarVisibility>(TextBox.VerticalScrollBarVisibilityProperty, (tb: TextBox, ov, nv) => {
            tb.$ContentProxy.setVerticalScrollBar(nv);
        }, false);
        DPReaction<string>(TextBox.TextProperty, (tb: TextBox, ov, nv) => {
            tb.$Proxy.setText(nv);
            tb.$View.setText(tb.DisplayText);
        }, false);
    }

    function positiveIntValidator (dobj: DependencyObject, propd: DependencyProperty, value: any): boolean {
        if (typeof value !== 'number')
            return false;
        return value >= 0;
    }
}