var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/RoutedEventArgs.ts" />
    /// CODE
    (function (Input) {
        (function (Key) {
            Key._map = [];
            //     A special value indicating no key.
            Key.None = 0;
            //     The BACKSPACE key.
            Key.Back = 1;
            //     The TAB key.
            Key.Tab = 2;
            //     The ENTER key.
            Key.Enter = 3;
            //     The SHIFT key.
            Key.Shift = 4;
            //     The CTRL (control) key.
            Key.Ctrl = 5;
            //     The ALT key.
            Key.Alt = 6;
            //     The CAPSLOCK key.
            Key.CapsLock = 7;
            //     The ESC (also known as ESCAPE) key.
            Key.Escape = 8;
            //     The SPACE key.
            Key.Space = 9;
            //     The PAGEUP key.
            Key.PageUp = 10;
            //     The PAGEDOWN key.
            Key.PageDown = 11;
            //     The END key.
            Key.End = 12;
            //     The HOME key.
            Key.Home = 13;
            //     The left arrow key.
            Key.Left = 14;
            //     The up arrow key.
            Key.Up = 15;
            //     The right arrow key.
            Key.Right = 16;
            //     The down arrow key.
            Key.Down = 17;
            //     The INSERT key.
            Key.Insert = 18;
            //     The DEL (also known as DELETE) key.
            Key.Delete = 19;
            //     The 0 (zero) key.
            Key.D0 = 20;
            //     The 1 key.
            Key.D1 = 21;
            //     The 2 key.
            Key.D2 = 22;
            //     The 3 key.
            Key.D3 = 23;
            //     The 4 key.
            Key.D4 = 24;
            //     The 5 key.
            Key.D5 = 25;
            //     The 6 key.
            Key.D6 = 26;
            //     The 7 key.
            Key.D7 = 27;
            //     The 8 key.
            Key.D8 = 28;
            //     The 9 key.
            Key.D9 = 29;
            //     The A key.
            Key.A = 30;
            //     The B key.
            Key.B = 31;
            //     The C key.
            Key.C = 32;
            //     The D key.
            Key.D = 33;
            //     The E key.
            Key.E = 34;
            //     The F key.
            Key.F = 35;
            //     The G key.
            Key.G = 36;
            //     The H key.
            Key.H = 37;
            //     The I key.
            Key.I = 38;
            //     The J key.
            Key.J = 39;
            //     The K key.
            Key.K = 40;
            //     The L key.
            Key.L = 41;
            //     The M key.
            Key.M = 42;
            //     The N key.
            Key.N = 43;
            //     The O key.
            Key.O = 44;
            //     The P key.
            Key.P = 45;
            //     The Q key.
            Key.Q = 46;
            //     The R key.
            Key.R = 47;
            //     The S key.
            Key.S = 48;
            //     The T key.
            Key.T = 49;
            //     The U key.
            Key.U = 50;
            //     The V key.
            Key.V = 51;
            //     The W key.
            Key.W = 52;
            //     The X key.
            Key.X = 53;
            //     The Y key.
            Key.Y = 54;
            //     The Z key.
            Key.Z = 55;
            //     The F1 key.
            Key.F1 = 56;
            //     The F2 key.
            Key.F2 = 57;
            //     The F3 key.
            Key.F3 = 58;
            //     The F4 key.
            Key.F4 = 59;
            //     The F5 key.
            Key.F5 = 60;
            //     The F6 key.
            Key.F6 = 61;
            //     The F7 key.
            Key.F7 = 62;
            //     The F8 key.
            Key.F8 = 63;
            //     The F9 key.
            Key.F9 = 64;
            //     The F10 key.
            Key.F10 = 65;
            //     The F11 key.
            Key.F11 = 66;
            //     The F12 key.
            Key.F12 = 67;
            //     The 0 key on the number pad.
            Key.NumPad0 = 68;
            //     The 1 key on the number pad.
            Key.NumPad1 = 69;
            //     The 2 key on the number pad.
            Key.NumPad2 = 70;
            //     The 3 key on the number pad.
            Key.NumPad3 = 71;
            //     The 4 key on the number pad.
            Key.NumPad4 = 72;
            //     The 5 key on the number pad.
            Key.NumPad5 = 73;
            //     The 6 key on the number pad.
            Key.NumPad6 = 74;
            //     The 7 key on the number pad.
            Key.NumPad7 = 75;
            //     The 8 key on the number pad.
            Key.NumPad8 = 76;
            //     The 9 key on the number pad.
            Key.NumPad9 = 77;
            //     The * (MULTIPLY) key.
            Key.Multiply = 78;
            //     The + (ADD) key.
            Key.Add = 79;
            //     The - (SUBTRACT) key.
            Key.Subtract = 80;
            //     The . (DECIMAL) key.
            Key.Decimal = 81;
            //     The / (DIVIDE) key.
            Key.Divide = 82;
            //     A special value indicating the key is out of range of this enumeration.
            Key.Unknown = 255;
        })(Input.Key || (Input.Key = {}));
        var Key = Input.Key;
        var KeyboardEventArgs = (function (_super) {
            __extends(KeyboardEventArgs, _super);
            function KeyboardEventArgs() {
                _super.apply(this, arguments);

            }
            return KeyboardEventArgs;
        })(Fayde.RoutedEventArgs);
        Input.KeyboardEventArgs = KeyboardEventArgs;        
        ///Modifers = { Shift: <bool>, Ctrl: <bool>, Alt: <bool> }
        var KeyEventArgs = (function (_super) {
            __extends(KeyEventArgs, _super);
            function KeyEventArgs(modifiers, keyCode, key, char) {
                        _super.call(this);
                this.Modifiers = modifiers;
                this.PlatformKeyCode = keyCode;
                this.Key = key;
                if(this.Key == null) {
                    this.Key = Key.Unknown;
                }
                this.Char = char;
            }
            return KeyEventArgs;
        })(KeyboardEventArgs);
        Input.KeyEventArgs = KeyEventArgs;        
    })(Fayde.Input || (Fayde.Input = {}));
    var Input = Fayde.Input;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=KeyEventArgs.js.map
