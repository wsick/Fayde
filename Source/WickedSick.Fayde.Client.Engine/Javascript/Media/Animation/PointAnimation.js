/// <reference path="Animation.js"/>
/// CODE

//#region PointAnimation
var PointAnimation = Nullstone.Create("PointAnimation", Animation);

//#region Properties

PointAnimation.ByProperty = DependencyProperty.Register("By", function () { return Point; }, PointAnimation);
PointAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return IEasingFunction; }, PointAnimation);
PointAnimation.FromProperty = DependencyProperty.Register("From", function () { return Point; }, PointAnimation);
PointAnimation.ToProperty = DependencyProperty.Register("To", function () { return Point; }, PointAnimation);

Nullstone.AutoProperties(PointAnimation, [
    PointAnimation.ByProperty,
    PointAnimation.EasingFunctionProperty,
    PointAnimation.FromProperty,
    PointAnimation.ToProperty
]);

//#endregion

PointAnimation.Instance.GetTargetValue = function (defaultOriginValue) {
    this._EnsureCache();

    var start = 0.0;
    if (this._FromCached != null)
        start = this._FromCached;
    else if (defaultOriginValue != null && Number.isNumber(defaultOriginValue))
        start = defaultOriginValue;

    if (this._ToCached != null)
        return this._ToCached;
    else if (this._ByCached != null)
        return new Point(start.X + this._ByCached.X, start.Y + this._ByCached.Y);
    return start;
};
PointAnimation.Instance.GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
    this._EnsureCache();

    var start = 0.0;
    if (this._FromCached != null)
        start = this._FromCached;
    else if (defaultOriginValue != null && Number.isNumber(defaultOriginValue))
        start = defaultOriginValue;

    var end = start;
    if (this._ToCached != null)
        end = this._ToCached;
    else if (this._ByCached != null)
        end = new Point(start.X + this._ByCached.X, start.Y + this._ByCached.Y);
    else if (defaultDestinationValue != null && Number.isNumber(defaultDestinationValue))
        end = defaultDestinationValue;

    var easingFunc = this.EasingFunction;
    if (easingFunc != null)
        clockData.Progress = easingFunc.Ease(clockData.Progress);

    var x = start.X + ((end.X - start.X) * clockData.Progress);
    var y = start.Y + ((end.Y - start.Y) * clockData.Progress);
    return new Point(x, y);
};
PointAnimation.Instance._EnsureCache = function () {
    if (this._HasCached)
        return;
    this._FromCached = this.From;
    this._ToCached = this.To;
    this._ByCached = this.By;
    this._HasCached = true;
};

PointAnimation.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== PointAnimation) {
        this._OnPropertyChanged$Animation(args, error);
        return;
    }

    this._FromCached = null;
    this._ToCached = null;
    this._ByCached = null;
    this._HasCached = false;

    this.PropertyChanged.Raise(this, args);
};

Nullstone.FinishCreate(PointAnimation);
//#endregion