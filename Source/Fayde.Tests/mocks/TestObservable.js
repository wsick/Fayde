var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var TestObservable = (function (_super) {
        __extends(TestObservable, _super);
        function TestObservable() {
            _super.apply(this, arguments);
            this.Member1 = 0;
            this.Member2 = "";
        }
        return TestObservable;
    })(Fayde.MVVM.ObservableObject);
    Fayde.MVVM.NotifyProperties(TestObservable, ["Member1", "Member2"]);
    
    return TestObservable;
});
//# sourceMappingURL=TestObservable.js.map
