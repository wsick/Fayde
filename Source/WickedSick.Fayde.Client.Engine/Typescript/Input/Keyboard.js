var Fayde;
(function (Fayde) {
    (function (Input) {
        // http://msdn.microsoft.com/en-us/library/system.windows.input.keyboardnavigationmode.aspx
        (function (KeyboardNavigationMode) {
            KeyboardNavigationMode._map = [];
            KeyboardNavigationMode.Continue = 0;
            KeyboardNavigationMode.Once = 1;
            KeyboardNavigationMode.Cycle = 2;
            KeyboardNavigationMode.None = 3;
            KeyboardNavigationMode.Contained = 4;
            KeyboardNavigationMode.Local = 5;
        })(Input.KeyboardNavigationMode || (Input.KeyboardNavigationMode = {}));
        var KeyboardNavigationMode = Input.KeyboardNavigationMode;
        (function (ModifierKeys) {
            ModifierKeys._map = [];
            ModifierKeys.None = 0;
            ModifierKeys.Alt = 1;
            ModifierKeys.Control = 2;
            ModifierKeys.Shift = 4;
            ModifierKeys.Windows = 8;
            ModifierKeys.Apple = 16;
        })(Input.ModifierKeys || (Input.ModifierKeys = {}));
        var ModifierKeys = Input.ModifierKeys;
        var Keyboard = (function () {
            function Keyboard() { }
            Keyboard.Modifiers = ModifierKeys.None;
            Keyboard.RefreshModifiers = function RefreshModifiers(e) {
                if(e.Shift) {
                    Keyboard.Modifiers |= ModifierKeys.Shift;
                } else {
                    Keyboard.Modifiers &= ~ModifierKeys.Shift;
                }
                if(e.Ctrl) {
                    Keyboard.Modifiers |= ModifierKeys.Control;
                } else {
                    Keyboard.Modifiers &= ~ModifierKeys.Control;
                }
                if(e.Alt) {
                    Keyboard.Modifiers |= ModifierKeys.Alt;
                } else {
                    Keyboard.Modifiers &= ~ModifierKeys.Alt;
                }
            };
            Keyboard.HasControl = function HasControl() {
                return (Keyboard.Modifiers & ModifierKeys.Control) === ModifierKeys.Control;
            };
            Keyboard.HasAlt = function HasAlt() {
                return (Keyboard.Modifiers & ModifierKeys.Alt) === ModifierKeys.Alt;
            };
            Keyboard.HasShift = function HasShift() {
                return (Keyboard.Modifiers & ModifierKeys.Shift) === ModifierKeys.Shift;
            };
            return Keyboard;
        })();
        Input.Keyboard = Keyboard;        
    })(Fayde.Input || (Fayde.Input = {}));
    var Input = Fayde.Input;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Keyboard.js.map
