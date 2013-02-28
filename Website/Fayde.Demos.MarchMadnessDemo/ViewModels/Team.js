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
                var Team = (function (_super) {
                    __extends(Team, _super);
                    function Team() {
                        _super.apply(this, arguments);

                    }
                    return Team;
                })(Fayde.MVVM.ObservableObject);
                ViewModels.Team = Team;                
                Nullstone.RegisterType(Team, "Team", Fayde.MVVM.ObservableObject);
                Nullstone.AutoNotifyProperty(Team, "Seed");
                Nullstone.AutoNotifyProperty(Team, "Name");
            })(MarchMadnessDemo.ViewModels || (MarchMadnessDemo.ViewModels = {}));
            var ViewModels = MarchMadnessDemo.ViewModels;
        })(Demos.MarchMadnessDemo || (Demos.MarchMadnessDemo = {}));
        var MarchMadnessDemo = Demos.MarchMadnessDemo;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Team.js.map
