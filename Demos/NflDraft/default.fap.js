var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NflDraft;
(function (NflDraft) {
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application() {
            _super.call(this);
            this.Loaded.Subscribe(this.OnLoaded, this);
        }
        Application.prototype.OnLoaded = function (sender, e) {
        };
        return Application;
    })(App);
    NflDraft.Application = Application;
    Nullstone.RegisterType(Application, "Application");
})(NflDraft || (NflDraft = {}));
//@ sourceMappingURL=default.fap.js.map
