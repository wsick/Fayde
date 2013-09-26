var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NflDraft;
(function (NflDraft) {
    /// <reference path="Player.ts" />
    /// <reference path="Stats.ts" />
    (function (Models) {
        var FantasyPlayer = (function (_super) {
            __extends(FantasyPlayer, _super);
            function FantasyPlayer() {
                _super.apply(this, arguments);
            }
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
                    } else {
                        return null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FantasyPlayer.prototype, "PlayerDisplay", {
                get: function () {
                    return this.Name + " " + this.Team.Abbreviation + " - " + this.Positions.toString();
                },
                enumerable: true,
                configurable: true
            });
            return FantasyPlayer;
        })(Models.Player);
        Models.FantasyPlayer = FantasyPlayer;
    })(NflDraft.Models || (NflDraft.Models = {}));
    var Models = NflDraft.Models;
})(NflDraft || (NflDraft = {}));
//# sourceMappingURL=FantasyPlayer.js.map
