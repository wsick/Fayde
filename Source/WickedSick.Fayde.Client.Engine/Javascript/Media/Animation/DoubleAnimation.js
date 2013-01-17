/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="Animation.js"/>
/// CODE

(function (namespace) {
    var DoubleAnimation = Nullstone.Create("DoubleAnimation", Animation);

    //#region Properties

    DoubleAnimation.ByProperty = DependencyProperty.Register("By", function () { return Number; }, DoubleAnimation);
    DoubleAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return IEasingFunction; }, DoubleAnimation);
    DoubleAnimation.FromProperty = DependencyProperty.Register("From", function () { return Number; }, DoubleAnimation);
    DoubleAnimation.ToProperty = DependencyProperty.Register("To", function () { return Number; }, DoubleAnimation);

    Nullstone.AutoProperties(DoubleAnimation, [
        DoubleAnimation.ByProperty,
        DoubleAnimation.EasingFunctionProperty,
        DoubleAnimation.FromProperty,
        DoubleAnimation.ToProperty
    ]);

    //#endregion

    DoubleAnimation.Instance.GetTargetValue = function (defaultOriginValue) {
        this._EnsureCache();

        var start = 0.0;
        if (this._FromCached != null)
            start = this._FromCached;
        else if (defaultOriginValue != null && Number.isNumber(defaultOriginValue))
            start = defaultOriginValue;

        if (this._ToCached != null)
            return this._ToCached;
        else if (this._ByCached != null)
            return start + this._ByCached;
        return start;
    };
    DoubleAnimation.Instance.GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
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
            end = start + this._ByCached;
        else if (defaultDestinationValue != null && Number.isNumber(defaultDestinationValue))
            end = defaultDestinationValue;

        var easingFunc = this.EasingFunction;
        if (easingFunc != null)
            clockData.Progress = easingFunc.Ease(clockData.Progress);

        return start + ((end - start) * clockData.Progress);
    };
    DoubleAnimation.Instance._EnsureCache = function () {
        if (this._HasCached)
            return;
        this._FromCached = this.From;
        this._ToCached = this.To;
        this._ByCached = this.By;
        this._HasCached = true;
    };

    DoubleAnimation.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== DoubleAnimation) {
            this._OnPropertyChanged$Animation(args, error);
            return;
        }

        this._FromCached = null;
        this._ToCached = null;
        this._ByCached = null;
        this._HasCached = false;

        this.PropertyChanged.Raise(this, args);
    };

    namespace.DoubleAnimation = Nullstone.FinishCreate(DoubleAnimation);
})(window);