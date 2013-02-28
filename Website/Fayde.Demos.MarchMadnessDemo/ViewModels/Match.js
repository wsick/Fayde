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
                var Match = (function (_super) {
                    __extends(Match, _super);
                    function Match() {
                        _super.apply(this, arguments);

                    }
                    return Match;
                })(Fayde.MVVM.ObservableObject);
                ViewModels.Match = Match;                
                Nullstone.RegisterType(Match, "Match", Fayde.MVVM.ObservableObject);
                Nullstone.AutoNotifyProperty(Match, "Team1");
                Nullstone.AutoNotifyProperty(Match, "Team2");
                Nullstone.AutoNotifyProperty(Match, "Round");
                Nullstone.AutoNotifyProperty(Match, "SelectedTeam");
                Nullstone.AutoNotifyProperty(Match, "MatchNumber");
            })(MarchMadnessDemo.ViewModels || (MarchMadnessDemo.ViewModels = {}));
            var ViewModels = MarchMadnessDemo.ViewModels;
        })(Demos.MarchMadnessDemo || (Demos.MarchMadnessDemo = {}));
        var MarchMadnessDemo = Demos.MarchMadnessDemo;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Match.js.map
