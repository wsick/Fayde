/// <reference path="../../Runtime/Nullstone.ts"/>
/// CODE
/// <reference path="../../Primitives/Duration.ts"/>

module Fayde.Media.Animation {
    export class RepeatBehavior {
        private _Duration: Duration = null;
        private _Count: number = null;
        IsForever: bool = false;

        static FromRepeatDuration(duration: Duration): RepeatBehavior {
            var rb = new RepeatBehavior();
            rb._Duration = duration;
            return rb;
        }
        static FromIterationCount(count: number): RepeatBehavior {
            var rb = new RepeatBehavior();
            rb._Count = count;
            return rb;
        }

        get HasCount(): bool { return this._Count != null; }
        get Count(): number { return this._Count; }

        get HasDuration(): bool { return this._Duration != null; }
        get Duration(): Duration { return this._Duration; }

        Clone(): RepeatBehavior {
            var rb = new RepeatBehavior();
            rb._Duration = this._Duration;
            rb._Count = this._Count;
            rb.IsForever = this.IsForever;
            return rb;
        }

        static Forever: RepeatBehavior = (function () { var rb = new RepeatBehavior(); rb.IsForever = true; return rb; })();
    }
    Nullstone.RegisterType(RepeatBehavior, "RepeatBehavior");
}