var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Input/KeyEventArgs.ts" />
    /// CODE
    /// <reference path="../Engine/Surface.ts" />
    // Good Resource: http://unixpapa.com/js/key.html
    (function (Input) {
        var keyFromKeyCode = [];
        keyFromKeyCode[8] = Input.Key.Back;
        keyFromKeyCode[9] = Input.Key.Tab;
        keyFromKeyCode[13] = Input.Key.Enter;
        keyFromKeyCode[16] = Input.Key.Shift;
        keyFromKeyCode[17] = Input.Key.Ctrl;
        keyFromKeyCode[18] = Input.Key.Alt;
        //keyFromKeyCode[19] = Key.Pause/Break;
        keyFromKeyCode[20] = Input.Key.CapsLock;
        keyFromKeyCode[27] = Input.Key.Escape;
        keyFromKeyCode[32] = Input.Key.Space;
        keyFromKeyCode[33] = Input.Key.PageUp;
        keyFromKeyCode[34] = Input.Key.PageDown;
        keyFromKeyCode[35] = Input.Key.End;
        keyFromKeyCode[36] = Input.Key.Home;
        keyFromKeyCode[37] = Input.Key.Left;
        keyFromKeyCode[38] = Input.Key.Up;
        keyFromKeyCode[39] = Input.Key.Right;
        keyFromKeyCode[40] = Input.Key.Down;
        keyFromKeyCode[45] = Input.Key.Insert;
        keyFromKeyCode[46] = Input.Key.Delete;
        keyFromKeyCode[48] = Input.Key.D0;
        keyFromKeyCode[49] = Input.Key.D1;
        keyFromKeyCode[50] = Input.Key.D2;
        keyFromKeyCode[51] = Input.Key.D3;
        keyFromKeyCode[52] = Input.Key.D4;
        keyFromKeyCode[53] = Input.Key.D5;
        keyFromKeyCode[54] = Input.Key.D6;
        keyFromKeyCode[55] = Input.Key.D7;
        keyFromKeyCode[56] = Input.Key.D8;
        keyFromKeyCode[57] = Input.Key.D9;
        //keyFromKeyCode[59] = Key.Semicolon/Colon;
        //keyFromKeyCode[61] = Key.Equals/Plus;
        keyFromKeyCode[65] = Input.Key.A;
        keyFromKeyCode[66] = Input.Key.B;
        keyFromKeyCode[67] = Input.Key.C;
        keyFromKeyCode[68] = Input.Key.D;
        keyFromKeyCode[69] = Input.Key.E;
        keyFromKeyCode[70] = Input.Key.F;
        keyFromKeyCode[71] = Input.Key.G;
        keyFromKeyCode[72] = Input.Key.H;
        keyFromKeyCode[73] = Input.Key.I;
        keyFromKeyCode[74] = Input.Key.J;
        keyFromKeyCode[75] = Input.Key.K;
        keyFromKeyCode[76] = Input.Key.L;
        keyFromKeyCode[77] = Input.Key.M;
        keyFromKeyCode[78] = Input.Key.N;
        keyFromKeyCode[79] = Input.Key.O;
        keyFromKeyCode[80] = Input.Key.P;
        keyFromKeyCode[81] = Input.Key.Q;
        keyFromKeyCode[82] = Input.Key.R;
        keyFromKeyCode[83] = Input.Key.S;
        keyFromKeyCode[84] = Input.Key.T;
        keyFromKeyCode[85] = Input.Key.U;
        keyFromKeyCode[86] = Input.Key.V;
        keyFromKeyCode[87] = Input.Key.W;
        keyFromKeyCode[88] = Input.Key.X;
        keyFromKeyCode[89] = Input.Key.Y;
        keyFromKeyCode[90] = Input.Key.Z;
        //keyFromKeyCode[91] = Key.Window;
        keyFromKeyCode[96] = Input.Key.NumPad0;
        keyFromKeyCode[97] = Input.Key.NumPad1;
        keyFromKeyCode[98] = Input.Key.NumPad2;
        keyFromKeyCode[99] = Input.Key.NumPad3;
        keyFromKeyCode[100] = Input.Key.NumPad4;
        keyFromKeyCode[101] = Input.Key.NumPad5;
        keyFromKeyCode[102] = Input.Key.NumPad6;
        keyFromKeyCode[103] = Input.Key.NumPad7;
        keyFromKeyCode[104] = Input.Key.NumPad8;
        keyFromKeyCode[105] = Input.Key.NumPad9;
        keyFromKeyCode[106] = Input.Key.Multiply;
        keyFromKeyCode[107] = Input.Key.Add;
        keyFromKeyCode[109] = Input.Key.Subtract;
        keyFromKeyCode[110] = Input.Key.Decimal;
        keyFromKeyCode[111] = Input.Key.Divide;
        keyFromKeyCode[112] = Input.Key.F1;
        keyFromKeyCode[113] = Input.Key.F2;
        keyFromKeyCode[114] = Input.Key.F3;
        keyFromKeyCode[115] = Input.Key.F4;
        keyFromKeyCode[116] = Input.Key.F5;
        keyFromKeyCode[117] = Input.Key.F6;
        keyFromKeyCode[118] = Input.Key.F7;
        keyFromKeyCode[119] = Input.Key.F8;
        keyFromKeyCode[120] = Input.Key.F9;
        keyFromKeyCode[121] = Input.Key.F10;
        keyFromKeyCode[122] = Input.Key.F11;
        keyFromKeyCode[123] = Input.Key.F12;
        var KeyInterop = (function () {
            function KeyInterop(Surface) {
                this.Surface = Surface;
            }
            KeyInterop.prototype.RegisterEvents = function () {
                var _this = this;
                document.onkeypress = function (e) {
                    var args = _this.CreateArgsPress(e);
                    if(args) {
                        //KeyboardDebug("[Press] - " + e.keyCode + " - " + e.char);
                        _this.Surface._HandleKeyDown(args);
                        if(args.Handled) {
                            e.preventDefault();
                            return false;
                        }
                    }
                };
                document.onkeydown = function (e) {
                    var args = _this.CreateArgsDown(e);
                    if(args) {
                        //KeyboardDebug("[Down] - " + e.keyCode + " - " + e.char);
                        _this.Surface._HandleKeyDown(args);
                        if(args.Handled) {
                            e.preventDefault();
                            return false;
                        }
                    }
                };
            };
            KeyInterop.prototype.CreateArgsPress = function (e) {
                return undefined;
            };
            KeyInterop.prototype.CreateArgsDown = function (e) {
                return undefined;
            };
            KeyInterop.CreateInterop = function CreateInterop(surface) {
                //Figure out which KeyInterop
                if(navigator.appName === "Microsoft Internet Explorer") {
                    return new IEKeyInterop(surface);
                } else if(navigator.appName === "Netscape") {
                    return new NetscapeKeyInterop(surface);
                }
                return new KeyInterop(surface);
            };
            return KeyInterop;
        })();
        Input.KeyInterop = KeyInterop;        
        Nullstone.RegisterType(KeyInterop, "KeyInterop");
        var udkie = [];
        udkie[41] = 48;
        udkie[33] = 49;
        udkie[64] = 50;
        udkie[35] = 51;
        udkie[36] = 52;
        udkie[37] = 53;
        udkie[94] = 54;
        udkie[38] = 55;
        udkie[42] = 56;
        udkie[34] = Input.Key.Unknown;
        var IEKeyInterop = (function (_super) {
            __extends(IEKeyInterop, _super);
            function IEKeyInterop(surface) {
                        _super.call(this, surface);
            }
            IEKeyInterop.prototype.CreateArgsPress = function (e) {
                if(!e.char) {
                    return;
                }
                var modifiers = {
                    Shift: e.shiftKey,
                    Ctrl: e.ctrlKey,
                    Alt: e.altKey
                };
                var keyCode = e.keyCode;
                var unshifted = udkie[keyCode];
                if(unshifted) {
                    keyCode = unshifted;
                }
                var args = new Fayde.Input.KeyEventArgs(modifiers, keyCode, keyFromKeyCode[keyCode], e.char);
                if(args.Key === Input.Key.Unknown && e.key) {
                    args.Char = e.key;
                    var code = args.Char.toUpperCase().charCodeAt(0);
                    args.Key = keyFromKeyCode[code];
                    if(args.Key == null) {
                        args.Key = Input.Key.Unknown;
                    }
                }
                return args;
            };
            IEKeyInterop.prototype.CreateArgsDown = function (e) {
                if(e.char && e.keyCode !== 8) {
                    return;
                }
                var modifiers = {
                    Shift: e.shiftKey,
                    Ctrl: e.ctrlKey,
                    Alt: e.altKey
                };
                return new Fayde.Input.KeyEventArgs(modifiers, e.keyCode, keyFromKeyCode[e.keyCode]);
            };
            return IEKeyInterop;
        })(KeyInterop);
        Input.IEKeyInterop = IEKeyInterop;        
        Nullstone.RegisterType(IEKeyInterop, "IEKeyInterop");
        var sknet = [];
        sknet[8] = Input.Key.Back;
        sknet[9] = Input.Key.Tab;
        sknet[20] = Input.Key.CapsLock;
        sknet[27] = Input.Key.Escape;
        sknet[33] = Input.Key.PageUp;
        sknet[34] = Input.Key.PageDown;
        sknet[35] = Input.Key.End;
        sknet[36] = Input.Key.Home;
        sknet[37] = Input.Key.Left;
        sknet[38] = Input.Key.Up;
        sknet[39] = Input.Key.Right;
        sknet[40] = Input.Key.Down;
        sknet[45] = Input.Key.Insert;
        sknet[46] = Input.Key.Delete;
        var udknet = [];
        udknet[41] = 48;
        udknet[33] = 49;
        udknet[64] = 50;
        udknet[35] = 51;
        udknet[36] = 52;
        udknet[37] = 53;
        udknet[94] = 54;
        udknet[38] = 55;
        udknet[42] = 56;
        udknet[34] = Input.Key.Unknown;
        var NetscapeKeyInterop = (function (_super) {
            __extends(NetscapeKeyInterop, _super);
            function NetscapeKeyInterop(surface) {
                        _super.call(this, surface);
            }
            NetscapeKeyInterop.prototype.CreateArgsPress = function (e) {
                var modifiers = {
                    Shift: e.shiftKey,
                    Ctrl: e.ctrlKey,
                    Alt: e.altKey
                };
                var keyCode = e.keyCode;
                var unshifted = udknet[keyCode];
                if(unshifted) {
                    keyCode = unshifted;
                }
                return new Fayde.Input.KeyEventArgs(modifiers, keyCode, keyFromKeyCode[keyCode], String.fromCharCode(e.which || e.keyCode));
            };
            NetscapeKeyInterop.prototype.CreateArgsDown = function (e) {
                //only do for special keys
                if(sknet[e.keyCode] === undefined) {
                    return null;
                }
                var modifiers = {
                    Shift: e.shiftKey,
                    Ctrl: e.ctrlKey,
                    Alt: e.altKey
                };
                return new Fayde.Input.KeyEventArgs(modifiers, e.keyCode, keyFromKeyCode[e.keyCode]);
            };
            return NetscapeKeyInterop;
        })(KeyInterop);
        Input.NetscapeKeyInterop = NetscapeKeyInterop;        
        Nullstone.RegisterType(NetscapeKeyInterop, "NetscapeKeyInterop");
    })(Fayde.Input || (Fayde.Input = {}));
    var Input = Fayde.Input;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=KeyInterop.js.map
