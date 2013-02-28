var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (MarchMadnessDemo) {
            var Team = (function (_super) {
                __extends(Team, _super);
                function Team() {
                    _super.apply(this, arguments);

                }
                return Team;
            })(Fayde.Controls.Page);
            MarchMadnessDemo.Team = Team;            
            Nullstone.RegisterType(Team, "Team", Fayde.Controls.Page);
        })(Demos.MarchMadnessDemo || (Demos.MarchMadnessDemo = {}));
        var MarchMadnessDemo = Demos.MarchMadnessDemo;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Team.fayde.js.map
