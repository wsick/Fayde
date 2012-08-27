/// <reference path="../RoutedEventArgs.js"/>
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="KeyCodes.js"/>

//#region KeyboardEventArgs
var KeyboardEventArgs = Nullstone.Create("KeyboardEventArgs", RoutedEventArgs);

Nullstone.FinishCreate(KeyboardEventArgs);
//#endregion

//#region KeyEventArgs
var KeyEventArgs = Nullstone.Create("KeyEventArgs", KeyboardEventArgs, 2);

///Modifers = { Shift: <bool>, Ctrl: <bool>, Alt: <bool> }
KeyEventArgs.Instance.Init = function (modifiers, keyCode) {
    this.Init$KeyboardEventArgs();
    this.Modifiers = modifiers;
    this.PlatformKeyCode = keyCode;
    this.Key = _KeyCodes[keyCode];
};

Nullstone.FinishCreate(KeyEventArgs);
//#endregion