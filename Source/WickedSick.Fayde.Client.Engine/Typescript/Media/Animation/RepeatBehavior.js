var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Runtime/Nullstone.ts"/>
        /// CODE
        /// <reference path="../../Primitives/Duration.ts"/>
        (function (Animation) {
            var RepeatBehavior = (function () {
                function RepeatBehavior() {
                    this._Duration = null;
                    this._Count = null;
                    this.IsForever = false;
                }
                RepeatBehavior.FromRepeatDuration = function FromRepeatDuration(duration) {
                    var rb = new RepeatBehavior();
                    rb._Duration = duration;
                    return rb;
                };
                RepeatBehavior.FromIterationCount = function FromIterationCount(count) {
                    var rb = new RepeatBehavior();
                    rb._Count = count;
                    return rb;
                };
                RepeatBehavior.FromForever = function FromForever() {
                    var rb = new RepeatBehavior();
                    rb.IsForever = true;
                    return rb;
                };
                Object.defineProperty(RepeatBehavior.prototype, "HasCount", {
                    get: function () {
                        return this._Count != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RepeatBehavior.prototype, "Count", {
                    get: function () {
                        return this._Count;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RepeatBehavior.prototype, "HasDuration", {
                    get: function () {
                        return this._Duration != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RepeatBehavior.prototype, "Duration", {
                    get: function () {
                        return this._Duration;
                    },
                    enumerable: true,
                    configurable: true
                });
                RepeatBehavior.prototype.Clone = function () {
                    var rb = new RepeatBehavior();
                    rb._Duration = this._Duration;
                    rb._Count = this._Count;
                    rb.IsForever = this.IsForever;
                    return rb;
                };
                return RepeatBehavior;
            })();
            Animation.RepeatBehavior = RepeatBehavior;            
            Nullstone.RegisterType(RepeatBehavior, "RepeatBehavior");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RepeatBehavior.js.map
