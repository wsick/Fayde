/// <reference path="../scripts/Fayde.d.ts"/>
/// <reference path="../ViewModels/DefaultViewModel.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NflDraft;
(function (NflDraft) {
    var token = Nullstone.ImportJsFiles(["ViewModels/DefaultViewModel.js", "Models/FantasyTeam.js", "Models/Round.js", "Models/DraftSpot.js", "Models/Team.js", "Models/Player.js", "Models/Stats.js", "Models/PlayerStats.js"]);

    var Default = (function (_super) {
        __extends(Default, _super);
        function Default() {
            _super.call(this);
            this.Loaded.Subscribe(this.OnLoaded, this);
        }
        Default.prototype.OnLoaded = function (sender, e) {
            var _this = this;
            token.DoOnComplete(function () {
                return _this.Setup();
            });
        };
        Default.prototype.Setup = function () {
            var vm = new NflDraft.ViewModels.DefaultViewModel();
            vm.Load();
            this.DataContext = vm;
        };
        return Default;
    })(Fayde.Controls.Page);
    NflDraft.Default = Default;
    Nullstone.RegisterType(Default, "Default");
})(NflDraft || (NflDraft = {}));
//# sourceMappingURL=default.fayde.js.map
