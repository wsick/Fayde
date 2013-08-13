var NflDraft;
(function (NflDraft) {
    /// <reference path="Team.ts" />
    (function (Models) {
        var Stats = (function () {
            function Stats() {
            }
            Object.defineProperty(Stats.prototype, "RushingAverage", {
                get: function () {
                    return this.RushingYards / this.RushingAttempts;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Stats.prototype, "ReceivingAverage", {
                get: function () {
                    return this.ReceivingYards / this.Receptions;
                },
                enumerable: true,
                configurable: true
            });
            return Stats;
        })();
        Models.Stats = Stats;
    })(NflDraft.Models || (NflDraft.Models = {}));
    var Models = NflDraft.Models;
})(NflDraft || (NflDraft = {}));
//# sourceMappingURL=Stats.js.map
