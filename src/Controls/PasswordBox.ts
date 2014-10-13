/// <reference path="TextBoxBase.ts" />

module Fayde.Controls {
    export class PasswordBox extends TextBoxBase {
        static BaselineOffsetProperty = DependencyProperty.Register("BaselineOffset", () => Number, PasswordBox);
        static CaretBrushProperty = DependencyProperty.RegisterCore("CaretBrush", () => Media.Brush, PasswordBox);
        static MaxLengthProperty = DependencyProperty.RegisterFull("MaxLength", () => Number, PasswordBox, 0, (d, args) => (<PasswordBox>d).$MaxLength = args.NewValue, undefined, undefined, positiveIntValidator);
        static PasswordCharProperty = DependencyProperty.Register("PasswordChar", () => String, PasswordBox, String.fromCharCode(9679), (d, args) => (<PasswordBox>d)._ModelChanged(TextBoxModelChangedType.Text, args.NewValue));
        static PasswordProperty = DependencyProperty.Register("Password", () => String, PasswordBox, undefined, (d, args) => (<PasswordBox>d)._TextChanged(args.NewValue));
        static SelectionForegroundProperty = DependencyProperty.RegisterCore("SelectionForeground", () => Media.Brush, PasswordBox);
        static SelectionBackgroundProperty = DependencyProperty.RegisterCore("SelectionBackground", () => Media.Brush, PasswordBox);
        static SelectionLengthProperty = DependencyProperty.RegisterFull("SelectionLength", () => Number, PasswordBox, 0, (d, args) => (<PasswordBox>d)._SelectionLengthChanged(args.NewValue), undefined, true, positiveIntValidator);
        static SelectionStartProperty = DependencyProperty.RegisterFull("SelectionStart", () => Number, PasswordBox, 0, (d, args) => (<PasswordBox>d)._SelectionStartChanged(args.NewValue), undefined, true, positiveIntValidator);
        BaselineOffset: number;
        CaretBrush: Media.Brush;
        MaxLength;
        number;
        PasswordChar: string;
        Password: string;
        SelectionForeground: Media.Brush;
        SelectionBackground: Media.Brush;
        SelectionLength: number;
        SelectionStart: number;

        PasswordChangedEvent = new RoutedEvent<RoutedEventArgs>();

        constructor () {
            super(TextBoxEmitChangedType.TEXT, PasswordBox.PasswordProperty);
            this.DefaultStyleKey = (<any>this).constructor;
        }

        get DisplayText (): string {
            var result = "";
            var count = this._Buffer.length;
            var pattern = this.PasswordChar;
            while (count > 0) {
                if (count & 1) result += pattern;
                count >>= 1, pattern += pattern;
            }
            return result;
        }

        CursorDown (cursor: number, isPage: boolean): number {
            return this._Buffer.length;
        }

        CursorUp (cursor: number, isPage: boolean): number {
            return 0;
        }

        CursorNextWord (cursor: number): number {
            return this._Buffer.length;
        }

        CursorPrevWord (cursor: number): number {
            return 0;
        }

        CursorLineBegin (cursor: number): number {
            return 0;
        }

        CursorLineEnd (cursor: number): number {
            return this._Buffer.length;
        }

        _EmitTextChanged () {
            this.PasswordChangedEvent.RaiseAsync(this, new RoutedEventArgs());
        }
    }
    Fayde.RegisterType(PasswordBox, "Fayde.Controls", Fayde.XMLNS);
    TemplateVisualStates(PasswordBox,
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "MouseOver" },
        { GroupName: "CommonStates", Name: "Disabled" },
        { GroupName: "FocusStates", Name: "Unfocused" },
        { GroupName: "FocusStates", Name: "Focused" },
        { GroupName: "ValidationStates", Name: "Valid" },
        { GroupName: "ValidationStates", Name: "InvalidUnfocused" },
        { GroupName: "ValidationStates", Name: "InvalidFocused" });

    function positiveIntValidator (dobj: DependencyObject, propd: DependencyProperty, value: any): boolean {
        if (typeof value !== 'number')
            return false;
        return value >= 0;
    }

    module reactions {
        UIReaction<Media.Brush>(PasswordBox.SelectionBackgroundProperty, (upd, ov, nv, pb?: PasswordBox) => {
            pb._ModelChanged(TextBoxModelChangedType.Brush, nv);
            upd.invalidate();
        });
        UIReaction<Media.Brush>(PasswordBox.SelectionForegroundProperty, (upd, ov, nv, pb?: PasswordBox) => {
            pb._ModelChanged(TextBoxModelChangedType.Brush, nv);
            upd.invalidate();
        });
    }
}