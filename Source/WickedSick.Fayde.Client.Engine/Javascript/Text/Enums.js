/// <reference path="../Runtime/Nullstone.js"/>

(function (Text) {
    Text._TextBoxModelChanged = {
        Nothing: 0,
        TextAlignment: 1,
        TextWrapping: 2,
        Selection: 3,
        Brush: 4,
        Font: 5,
        Text: 6
    };
    Text._TextBoxEmitChanged = {
        NOTHING: 0,
        SELECTION: 1 << 0,
        TEXT: 1 << 1
    };
})(Nullstone.Namespace("Fayde.Text"));