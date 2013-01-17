/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE

(function (namespace) {
    var FocusChangedNode = Nullstone.Create("FocusChangedNode", LinkedListNode, 2);

    FocusChangedNode.Instance.Init = function (lostFocus, gotFocus) {
        this.Init$LinkedListNode();
        this.LostFocus = lostFocus;
        this.GotFocus = gotFocus;
    };

    namespace.FocusChangedNode = Nullstone.FinishCreate(FocusChangedNode);
})(window);