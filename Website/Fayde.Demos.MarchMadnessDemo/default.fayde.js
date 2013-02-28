var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (MarchMadnessDemo) {
            var Default = (function (_super) {
                __extends(Default, _super);
                function Default() {
                    _super.apply(this, arguments);

                }
                Default.prototype.Team_MouseLeftButtonUp = function (sender, e) {
                    var fe = sender;
                    var teamControl = (Fayde.VisualTreeHelper.GetChild(fe, 0));
                    var match = (fe.DataContext);
                    var team = (teamControl.DataContext);
                    match.SelectedTeam = team;
                };
                return Default;
            })(Fayde.Controls.Page);
            MarchMadnessDemo.Default = Default;            
            Nullstone.RegisterType(Default, "Default", Fayde.Controls.Page);
        })(Demos.MarchMadnessDemo || (Demos.MarchMadnessDemo = {}));
        var MarchMadnessDemo = Demos.MarchMadnessDemo;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=default.fayde.js.map
