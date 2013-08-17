/// <reference path="TextBoxBase.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Controls {
    export class PasswordBox extends TextBoxBase implements Text.ITextAttributesSource {
        static BaselineOffsetProperty: DependencyProperty = DependencyProperty.Register("BaselineOffset", () => Number, PasswordBox);
        static CaretBrushProperty: DependencyProperty = DependencyProperty.RegisterCore("CaretBrush", () => Media.Brush, PasswordBox);
        static MaxLengthProperty: DependencyProperty = DependencyProperty.RegisterFull("MaxLength", () => Number, PasswordBox, 0, (d, args) => (<PasswordBox>d).$MaxLength = args.NewValue, undefined, undefined, positiveIntValidator);
        static PasswordCharProperty: DependencyProperty = DependencyProperty.Register("PasswordChar", () => String, PasswordBox, String.fromCharCode(9679), (d, args) => (<PasswordBox>d)._ModelChanged(TextBoxModelChangedType.Text, args.NewValue));
        static PasswordProperty: DependencyProperty = DependencyProperty.Register("Password", () => String, PasswordBox, undefined, (d, args) => (<PasswordBox>d)._TextChanged(args.NewValue));
        static SelectionForegroundProperty: DependencyProperty = DependencyProperty.RegisterCore("SelectionForeground", () => Media.Brush, PasswordBox, undefined, (d, args) => (<PasswordBox>d)._SelectionForegroundChanged(args));
        static SelectionBackgroundProperty: DependencyProperty = DependencyProperty.RegisterCore("SelectionBackground", () => Media.Brush, PasswordBox, undefined, (d, args) => (<PasswordBox>d)._SelectionBackgroundChanged(args));
        BaselineOffset: number;
        CaretBrush: Media.Brush;
        MaxLength; number;
        PasswordChar: string;
        Password: string;
        SelectionForeground: Media.Brush;
        SelectionBackground: Media.Brush;
        
        PasswordChangedEvent: RoutedEvent<RoutedEventArgs> = new RoutedEvent<RoutedEventArgs>();

        constructor() {
            super(TextBoxEmitChangedType.TEXT, PasswordBox.PasswordProperty);
            this.DefaultStyleKey = (<any>this).constructor;
        }
        
        get DisplayText(): string {
            var result = "";
            var count = this._Buffer.length;
            var pattern = this.PasswordChar;
            while (count > 0) {
                if (count & 1) result += pattern;
                count >>= 1, pattern += pattern;
            }
            return result;
        }

        CursorDown(cursor: number, isPage: boolean): number { return this._Buffer.length; }
        CursorUp(cursor: number, isPage: boolean): number { return 0; }
        CursorNextWord(cursor: number): number { return this._Buffer.length; }
        CursorPrevWord(cursor: number): number { return 0; }
        CursorLineBegin(cursor: number): number { return 0; }
        CursorLineEnd(cursor: number): number { return this._Buffer.length; }
        
        _EmitTextChanged() {
            this.PasswordChangedEvent.RaiseAsync(this, new RoutedEventArgs());
        }

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
    }
    Fayde.RegisterType(PasswordBox, {
    	Name: "PasswordBox",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
    
    function positiveIntValidator(dobj: DependencyObject, propd: DependencyProperty, value: any): boolean {
        if (typeof value !== 'number')
            return false;
        return value >= 0;
    }
}