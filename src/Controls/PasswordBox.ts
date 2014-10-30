/// <reference path="TextBoxBase.ts" />

module Fayde.Controls {
    export class PasswordBox extends TextBoxBase {
        static BaselineOffsetProperty = DependencyProperty.Register("BaselineOffset", () => Number, PasswordBox);
        static MaxLengthProperty = DependencyProperty.RegisterFull("MaxLength", () => Number, PasswordBox, 0, undefined, undefined, undefined, positiveIntValidator);
        static PasswordCharProperty = DependencyProperty.Register("PasswordChar", () => String, PasswordBox, String.fromCharCode(9679));
        static PasswordProperty = DependencyProperty.Register("Password", () => String, PasswordBox);
        BaselineOffset: number;
        CaretBrush: Media.Brush;
        MaxLength;
        number;
        PasswordChar: string;
        Password: string;

        constructor () {
            super(Internal.TextBoxEmitChangedType.TEXT);
            this.DefaultStyleKey = (<any>this).constructor;

            var proxy = this.$Proxy;
            proxy.SyncSelectionStart = (value) => this.SetCurrentValue(PasswordBox.SelectionStartProperty, value);
            proxy.SyncSelectionLength = (value) => this.SetCurrentValue(PasswordBox.SelectionLengthProperty, value);
            proxy.SyncText = (value) => this.SetCurrentValue(PasswordBox.PasswordProperty, value);
            this.$Advancer = new Internal.PasswordBoxCursorAdvancer(this.$Proxy);
        }

        get DisplayText (): string {
            var result = "";
            var count = this.$Proxy.text.length;
            var pattern = this.PasswordChar;
            while (count > 0) {
                if (count & 1) result += pattern;
                count >>= 1, pattern += pattern;
            }
            return result;
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
        DPReaction<number>(PasswordBox.MaxLengthProperty, (pb: PasswordBox, ov, nv) => {
            pb.$Proxy.maxLength = nv;
        }, false);
        DPReaction<string>(PasswordBox.PasswordCharProperty, (pb: PasswordBox, ov, nv) => {
            pb.$View.setText(pb.DisplayText);
        }, false);
        DPReaction<string>(PasswordBox.PasswordProperty, (pb: PasswordBox, ov, nv) => {
            pb.$Proxy.setText(nv);
            pb.$View.setText(pb.DisplayText);
        }, false);
    }
}