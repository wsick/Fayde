var NflDraft;
(function (NflDraft) {
    (function (Models) {
        var Stats = (function () {
            function Stats() {
            }
            Stats.prototype.RushingAverage = function () {
                return this.RushingYards / this.RushingAttempts;
            };

            Stats.prototype.ReceivingAverage = function () {
                return this.ReceivingYards / this.Receptions;
            };
            return Stats;
        })();
        Models.Stats = Stats;
    })(NflDraft.Models || (NflDraft.Models = {}));
    var Models = NflDraft.Models;
})(NflDraft || (NflDraft = {}));
//@ sourceMappingURL=Stats.js.map
