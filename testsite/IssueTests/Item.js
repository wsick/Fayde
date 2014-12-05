var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item(display) {
            _super.call(this);
            this.Display = display;
            this.Visible = true;
        }
        return Item;
    })(Fayde.MVVM.ObservableObject);
    Fayde.MVVM.NotifyProperties(Item, ["Display", "Visible"]);
    
    return Item;
});
