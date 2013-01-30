/// <reference path="Enums.js"/>

(function (namespace) {
    var ModifierKeys = {
        None: 0,
        Alt: 1,
        Control: 2,
        Shift: 4,
        Windows: 8,
        Apple: 16
    };

    function Keyboard() { }
    Keyboard.RefreshModifiers = function (e) {
        if (e.Shift)
            Keyboard.Modifiers |= ModifierKeys.Shift;
        else
            Keyboard.Modifiers &= ~ModifierKeys.Shift;
        if (e.Ctrl)
            Keyboard.Modifiers |= ModifierKeys.Control;
        else
            Keyboard.Modifiers &= ~ModifierKeys.Control;
        if (e.Alt)
            Keyboard.Modifiers |= ModifierKeys.Alt;
        else
            Keyboard.Modifiers &= ~ModifierKeys.Alt;
    };
    Keyboard.HasControl = function () {
        return (Keyboard.Modifiers & ModifierKeys.Control) === ModifierKeys.Control;
    };
    Keyboard.HasAlt = function () {
        return (Keyboard.Modifiers & ModifierKeys.Alt) === ModifierKeys.Alt;
    };
    Keyboard.HasShift = function () {
        return (Keyboard.Modifiers & ModifierKeys.Shift) === ModifierKeys.Shift;
    };
    Keyboard.Modifiers = ModifierKeys.None;
    namespace.Keyboard = Keyboard;
})(Nullstone.Namespace("Fayde.Input"));