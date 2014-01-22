var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TestControl = (function (_super) {
    __extends(TestControl, _super);
    function TestControl() {
        _super.apply(this, arguments);
        this.CallbackFired = false;
    }
    TestControl.prototype.TestCallback = function (sender, e) {
        this.CallbackFired = true;
    };
    return TestControl;
})(Fayde.Controls.ContentControl);
Fayde.RegisterType(TestControl, "window", "http://schemas.test.com/");
//# sourceMappingURL=TestControl.js.map
