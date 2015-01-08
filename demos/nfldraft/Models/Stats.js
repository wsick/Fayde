define(["require", "exports"], function (require, exports) {
    var Stats = (function () {
        function Stats() {
            this.Completions = 0;
            this.PassingAttempts = 0;
            this.PassingYards = 0;
            this.PassingTouchdowns = 0;
            this.Interceptions = 0;
            this.Fumbles = 0;
            this.FumblesLost = 0;
            this.QBR = 0;
            this.Rating = 0;
            this.RushingAttempts = 0;
            this.RushingYards = 0;
            this.RushingTouchdowns = 0;
            this.Targets = 0;
            this.Receptions = 0;
            this.ReceivingYards = 0;
            this.ReceivingTouchdowns = 0;
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
        Object.defineProperty(Stats.prototype, "FantasyPoints", {
            get: function () {
                var passingPoints = (this.PassingYards / 25) + (this.PassingTouchdowns * 4) + (this.Interceptions * -2);
                var rushingPoints = (this.RushingYards / 10) + (this.RushingTouchdowns * 6);
                var receivingPoints = (this.ReceivingYards / 10) + (this.ReceivingTouchdowns * 6);
                return passingPoints + rushingPoints + receivingPoints + (this.FumblesLost * -2);
            },
            enumerable: true,
            configurable: true
        });
        return Stats;
    })();
    return Stats;
});
//# sourceMappingURL=Stats.js.map