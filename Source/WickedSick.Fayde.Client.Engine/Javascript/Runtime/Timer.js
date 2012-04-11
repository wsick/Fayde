/// <reference path="Nullstone.js"/>
/// CODE

//#region Timer
var Timer = Nullstone.Create("Timer");

Timer.Instance.Init = function () {
    this.Tick = new MulticastEvent();
    this.SetInterval(0);
};

//#region Properties

Timer.Instance.GetInterval = function () {
    ///<returns type="Number"></returns>
    return this._Interval;
};
Timer.Instance.SetInterval = function (value) {
    ///<param name="value" type="Number"></param>
    var isChanged = this._Interval !== value;
    this._Interval = value;
    if (isChanged && this.IsEnabled) {
        this.Stop();
        this.Start();
    }
};

//#endregion

Timer.Instance.Start = function () {
    if (this.IsEnabled)
        return;
    this.IsEnabled = true;

    var timer = this;
    this._IntervalID = setInterval(function () { timer.Tick.Raise(this, new EventArgs()); }, this.GetInterval().GetJsDelay());
};
Timer.Instance.Stop = function () {
    if (!this.IsEnabled)
        return;
    this.IsEnabled = false;

    clearInterval(this._IntervalID);
};

Nullstone.FinishCreate(Timer);
//#endregion