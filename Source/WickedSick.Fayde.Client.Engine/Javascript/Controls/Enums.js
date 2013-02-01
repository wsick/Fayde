/// <reference path="../Runtime/Nullstone.js"/>

(function (namespace) {
    namespace.ClickMode = {
        Release: 0,
        Press: 1,
        Hover: 2
    };
    namespace.TextTrimming = {
        None: 0
    };
    namespace.TextWrapping = {
        NoWrap: 0,
        Wrap: 1,
        WrapWithOverflow: 2
    };
    namespace.GridUnitType = {
        Auto: 0,
        Pixel: 1,
        Star: 2
    };
    namespace.MediaElementState = {
        Closed: 0,
        Opening: 1,
        //Individualizing: 2,
        //AcquiringLicense: 3,
        Buffering: 4,
        Playing: 5,
        Paused: 6,
        Stopped: 7
    };
    namespace.PlacementMode = {
        Bottom: 0,
        Right: 1,
        Mouse: 2,
        Left: 3,
        Top: 4
    };
    namespace.ScrollBarVisibility = {
        Disabled: 0,
        Auto: 1,
        Hidden: 2,
        Visible: 3
    };
    namespace.SelectionMode = {
        Single: 0,
        Multiple: 1,
        Extended: 2
    };
    namespace.VirtualizationMode = {
        Standard: 0,
        Recycling: 1
    };
})(Nullstone.Namespace("Fayde.Controls"));