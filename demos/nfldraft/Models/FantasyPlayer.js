var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Models/Player"], function (require, exports, Player) {
    var FantasyPlayer = (function (_super) {
        __extends(FantasyPlayer, _super);
        function FantasyPlayer() {
            _super.apply(this, arguments);
            this._visible = true;
        }
        Object.defineProperty(FantasyPlayer.prototype, "FantasyTeam", {
            get: function () {
                return this._fantasyTeam;
            },
            set: function (value) {
                this._fantasyTeam = value;
                this.OnPropertyChanged("FantasyTeam");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FantasyPlayer.prototype, "Visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                this.OnPropertyChanged("Visible");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FantasyPlayer.prototype, "LastSeason", {
            get: function () {
                if (this.Stats != undefined) {
                    var result = this.Stats.filter(function (stat) {
                        return stat.Year === 2012;
                    });
                    if (result.length === 1)
                        return result[0];
                    else
                        return null;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FantasyPlayer.prototype, "PlayerDisplay", {
            get: function () {
                return this.Name + " " + this.Team.Abbreviation + " - " + this.PrimaryPosition;
            },
            enumerable: true,
            configurable: true
        });
        return FantasyPlayer;
    })(Player);
    return FantasyPlayer;
});
//# sourceMappingURL=FantasyPlayer.js.map