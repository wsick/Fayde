/// <reference path="Enums.js"/>

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
Keyboard.Modifiers = ModifierKeys.None;