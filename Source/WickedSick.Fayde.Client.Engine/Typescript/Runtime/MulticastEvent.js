/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="EventArgs.ts" />
var MulticastEvent = (function () {
    function MulticastEvent() { }
    MulticastEvent.prototype.Raise = function (sender, args) {
        //TODO: Implement
            };
    MulticastEvent.prototype.RaiseAsync = function (sender, args) {
        //TODO: Implement
            };
    return MulticastEvent;
})();
Nullstone.RegisterType(MulticastEvent, "MulticastEvent");
//@ sourceMappingURL=MulticastEvent.js.map
