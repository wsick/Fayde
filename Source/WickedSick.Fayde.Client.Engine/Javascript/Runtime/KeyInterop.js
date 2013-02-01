/// <reference path="Nullstone.js"/>
/// CODE
/// <reference path="../Core/Input/KeyboardEventArgs.js"/>

/// Good Resource: http://unixpapa.com/js/key.html

(function (namespace) {
    //#region KeyInterop
    var KeyInterop = Nullstone.Create("KeyInterop");
    KeyInterop.Instance.RegisterEvents = function () {
        var interop = this;
        document.onkeypress = function (e) {
            var args = interop.CreateArgsPress(e);
            if (args) {
                KeyboardDebug("[Press] - " + e.keyCode + " - " + e.char);
                if (interop.Surface._HandleKeyDown(args)) {
                    return false;
                }
            }
        };
        document.onkeydown = function (e) {
            var args = interop.CreateArgsDown(e);
            if (args) {
                KeyboardDebug("[Down] - " + e.keyCode + " - " + e.char);
                if (interop.Surface._HandleKeyDown(args)) {
                    return false;
                }
            }
        };
    };
    namespace.KeyInterop = Nullstone.FinishCreate(KeyInterop);
    //#endregion

    KeyInterop.CreateInterop = function (surface) {
        //Figure out which KeyInterop
        var interop;
        if (navigator.appName === "Microsoft Internet Explorer")
            interop = new IEKeyInterop();
        else if (navigator.appName === "Netscape")
            interop = new NetscapeKeyInterop();
        else
            interop = new KeyInterop();
        interop.Surface = surface;
        return interop;
    };
    KeyInterop.KeyFromKeyCode = (function () {
        var keyFromKeyCode = [];
        keyFromKeyCode[8] = Key.Back;
        keyFromKeyCode[9] = Key.Tab;
        keyFromKeyCode[13] = Key.Enter;
        keyFromKeyCode[16] = Key.Shift;
        keyFromKeyCode[17] = Key.Ctrl;
        keyFromKeyCode[18] = Key.Alt;
        //keyFromKeyCode[19] = Key.Pause/Break;
        keyFromKeyCode[20] = Key.CapsLock;
        keyFromKeyCode[27] = Key.Escape;
        keyFromKeyCode[32] = Key.Space;
        keyFromKeyCode[33] = Key.PageUp;
        keyFromKeyCode[34] = Key.PageDown;
        keyFromKeyCode[35] = Key.End;
        keyFromKeyCode[36] = Key.Home;
        keyFromKeyCode[37] = Key.Left;
        keyFromKeyCode[38] = Key.Up;
        keyFromKeyCode[39] = Key.Right;
        keyFromKeyCode[40] = Key.Down;
        keyFromKeyCode[45] = Key.Insert;
        keyFromKeyCode[46] = Key.Delete;
        keyFromKeyCode[48] = Key.D0;
        keyFromKeyCode[49] = Key.D1;
        keyFromKeyCode[50] = Key.D2;
        keyFromKeyCode[51] = Key.D3;
        keyFromKeyCode[52] = Key.D4;
        keyFromKeyCode[53] = Key.D5;
        keyFromKeyCode[54] = Key.D6;
        keyFromKeyCode[55] = Key.D7;
        keyFromKeyCode[56] = Key.D8;
        keyFromKeyCode[57] = Key.D9;
        //keyFromKeyCode[59] = Key.Semicolon/Colon;
        //keyFromKeyCode[61] = Key.Equals/Plus;
        keyFromKeyCode[65] = Key.A;
        keyFromKeyCode[66] = Key.B;
        keyFromKeyCode[67] = Key.C;
        keyFromKeyCode[68] = Key.D;
        keyFromKeyCode[69] = Key.E;
        keyFromKeyCode[70] = Key.F;
        keyFromKeyCode[71] = Key.G;
        keyFromKeyCode[72] = Key.H;
        keyFromKeyCode[73] = Key.I;
        keyFromKeyCode[74] = Key.J;
        keyFromKeyCode[75] = Key.K;
        keyFromKeyCode[76] = Key.L;
        keyFromKeyCode[77] = Key.M;
        keyFromKeyCode[78] = Key.N;
        keyFromKeyCode[79] = Key.O;
        keyFromKeyCode[80] = Key.P;
        keyFromKeyCode[81] = Key.Q;
        keyFromKeyCode[82] = Key.R;
        keyFromKeyCode[83] = Key.S;
        keyFromKeyCode[84] = Key.T;
        keyFromKeyCode[85] = Key.U;
        keyFromKeyCode[86] = Key.V;
        keyFromKeyCode[87] = Key.W;
        keyFromKeyCode[88] = Key.X;
        keyFromKeyCode[89] = Key.Y;
        keyFromKeyCode[90] = Key.Z;
        //keyFromKeyCode[91] = Key.Window;
        keyFromKeyCode[96] = Key.NumPad0;
        keyFromKeyCode[97] = Key.NumPad1;
        keyFromKeyCode[98] = Key.NumPad2;
        keyFromKeyCode[99] = Key.NumPad3;
        keyFromKeyCode[100] = Key.NumPad4;
        keyFromKeyCode[101] = Key.NumPad5;
        keyFromKeyCode[102] = Key.NumPad6;
        keyFromKeyCode[103] = Key.NumPad7;
        keyFromKeyCode[104] = Key.NumPad8;
        keyFromKeyCode[105] = Key.NumPad9;
        keyFromKeyCode[106] = Key.Multiply;
        keyFromKeyCode[107] = Key.Add;
        keyFromKeyCode[109] = Key.Subtract;
        keyFromKeyCode[110] = Key.Decimal;
        keyFromKeyCode[111] = Key.Divide;
        keyFromKeyCode[112] = Key.F1;
        keyFromKeyCode[113] = Key.F2;
        keyFromKeyCode[114] = Key.F3;
        keyFromKeyCode[115] = Key.F4;
        keyFromKeyCode[116] = Key.F5;
        keyFromKeyCode[117] = Key.F6;
        keyFromKeyCode[118] = Key.F7;
        keyFromKeyCode[119] = Key.F8;
        keyFromKeyCode[120] = Key.F9;
        keyFromKeyCode[121] = Key.F10;
        keyFromKeyCode[122] = Key.F11;
        keyFromKeyCode[123] = Key.F12;
        return keyFromKeyCode;
    })();

    //#region IEKeyInterop
    var IEKeyInterop = Nullstone.Create("IEKeyInterop", KeyInterop);

    (function () {
        var keyFromKeyCode = KeyInterop.KeyFromKeyCode;

        var unshiftedDKeys = [];
        unshiftedDKeys[41] = 48;
        unshiftedDKeys[33] = 49;
        unshiftedDKeys[64] = 50;
        unshiftedDKeys[35] = 51;
        unshiftedDKeys[36] = 52;
        unshiftedDKeys[37] = 53;
        unshiftedDKeys[94] = 54;
        unshiftedDKeys[38] = 55;
        unshiftedDKeys[42] = 56;
        unshiftedDKeys[34] = Key.Unknown;

        IEKeyInterop.Instance.CreateArgsPress = (function (e) {
            if (e.char == null)
                return;

            var modifiers = {
                Shift: e.shiftKey,
                Ctrl: e.ctrlKey,
                Alt: e.altKey
            };

            var keyCode = e.keyCode;
            var unshifted = unshiftedDKeys[keyCode];
            if (unshifted)
                keyCode = unshifted;

            return new Fayde.Input.KeyEventArgs(modifiers, keyCode, keyFromKeyCode[keyCode], e.char);
        });

        IEKeyInterop.Instance.CreateArgsDown = (function (e) {
            if (e.char != null && e.keyCode !== 8)
                return;
            var modifiers = {
                Shift: e.shiftKey,
                Ctrl: e.ctrlKey,
                Alt: e.altKey
            };
            return new Fayde.Input.KeyEventArgs(modifiers, e.keyCode, keyFromKeyCode[e.keyCode]);
        });
    })();

    namespace.IEKeyInterop = Nullstone.FinishCreate(IEKeyInterop);
    //#endregion

    //#region NetscapeKeyInterop
    var NetscapeKeyInterop = Nullstone.Create("NetscapeKeyInterop", KeyInterop);

    (function () {
        var keyFromKeyCode = KeyInterop.KeyFromKeyCode;

        var specialKeys = [];
        specialKeys[8] = Key.Back;
        specialKeys[9] = Key.Tab;
        specialKeys[20] = Key.CapsLock;
        specialKeys[27] = Key.Escape;
        specialKeys[33] = Key.PageUp;
        specialKeys[34] = Key.PageDown;
        specialKeys[35] = Key.End;
        specialKeys[36] = Key.Home;
        specialKeys[37] = Key.Left;
        specialKeys[38] = Key.Up;
        specialKeys[39] = Key.Right;
        specialKeys[40] = Key.Down;
        specialKeys[45] = Key.Insert;
        specialKeys[46] = Key.Delete;

        var unshiftedDKeys = [];
        unshiftedDKeys[41] = 48;
        unshiftedDKeys[33] = 49;
        unshiftedDKeys[64] = 50;
        unshiftedDKeys[35] = 51;
        unshiftedDKeys[36] = 52;
        unshiftedDKeys[37] = 53;
        unshiftedDKeys[94] = 54;
        unshiftedDKeys[38] = 55;
        unshiftedDKeys[42] = 56;
        unshiftedDKeys[34] = Key.Unknown;

        NetscapeKeyInterop.Instance.CreateArgsPress = (function (e) {
            var modifiers = {
                Shift: e.shiftKey,
                Ctrl: e.ctrlKey,
                Alt: e.altKey
            };

            var keyCode = e.keyCode;
            var unshifted = unshiftedDKeys[keyCode];
            if (unshifted)
                keyCode = unshifted;

            return new Fayde.Input.KeyEventArgs(modifiers, keyCode, keyFromKeyCode[keyCode], String.fromCharCode(e.which || e.keyCode));
        });
        NetscapeKeyInterop.Instance.CreateArgsDown = function (e) {
            //only do for special keys
            if (specialKeys[e.keyCode] === undefined)
                return null;

            var modifiers = {
                Shift: e.shiftKey,
                Ctrl: e.ctrlKey,
                Alt: e.altKey
            };
            return new Fayde.Input.KeyEventArgs(modifiers, e.keyCode, keyFromKeyCode[e.keyCode]);
        };
    })();

    namespace.NetscapeKeyInterop = Nullstone.FinishCreate(NetscapeKeyInterop);
    //#endregion
})(window);