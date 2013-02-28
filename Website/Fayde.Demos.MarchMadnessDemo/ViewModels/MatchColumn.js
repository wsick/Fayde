var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (MarchMadnessDemo) {
            (function (ViewModels) {
                var MatchColumn = (function (_super) {
                    __extends(MatchColumn, _super);
                    function MatchColumn() {
                        _super.apply(this, arguments);

                        this.Matches = new Fayde.Collections.ObservableCollection();
                    }
                    return MatchColumn;
                })(Fayde.MVVM.ObservableObject);
                ViewModels.MatchColumn = MatchColumn;                
                Nullstone.RegisterType(MatchColumn, "MatchColumn", Fayde.MVVM.ObservableObject);
                Nullstone.AutoNotifyProperty(MatchColumn, "Matches");
            })(MarchMadnessDemo.ViewModels || (MarchMadnessDemo.ViewModels = {}));
            var ViewModels = MarchMadnessDemo.ViewModels;
        })(Demos.MarchMadnessDemo || (Demos.MarchMadnessDemo = {}));
        var MarchMadnessDemo = Demos.MarchMadnessDemo;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=MatchColumn.js.map
