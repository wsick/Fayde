/// <reference path="../RoutedEventArgs.js"/>
/// CODE

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
    this.KeyCode = keyCode;
};

Nullstone.FinishCreate(KeyEventArgs);
//#endregion