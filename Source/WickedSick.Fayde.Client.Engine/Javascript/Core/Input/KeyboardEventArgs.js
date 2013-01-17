/// <reference path="../RoutedEventArgs.js"/>
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="KeyCodes.js"/>

(function (namespace) {
    var KeyboardEventArgs = Nullstone.Create("KeyboardEventArgs", RoutedEventArgs);
    namespace.KeyboardEventArgs = Nullstone.FinishCreate(KeyboardEventArgs);
})(window);

(function (namespace) {
    var KeyEventArgs = Nullstone.Create("KeyEventArgs", KeyboardEventArgs, 4);

    ///Modifers = { Shift: <bool>, Ctrl: <bool>, Alt: <bool> }
    KeyEventArgs.Instance.Init = function (modifiers, keyCode, key, char) {
        this.Init$KeyboardEventArgs();
        this.Modifiers = modifiers;
        this.PlatformKeyCode = keyCode;
        this.Key = key;
        if (this.Key == null)
            this.Key = Key.Unknown;
        this.Char = char;
    };

    namespace.KeyEventArgs = Nullstone.FinishCreate(KeyEventArgs);
})(window);