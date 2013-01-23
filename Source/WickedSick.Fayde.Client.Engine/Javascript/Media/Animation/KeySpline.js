/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="Curves.js"/>

(function (namespace) {
    var KeySpline = Nullstone.Create("KeySpline", DependencyObject);

    //#region Properties

    KeySpline.ControlPoint1Property = DependencyProperty.RegisterCore("ControlPoint1", function () { return Point; }, KeySpline, new Point(0, 0));
    KeySpline.ControlPoint2Property = DependencyProperty.RegisterCore("ControlPoint2", function () { return Point; }, KeySpline, new Point(1.0, 1.0));

    Nullstone.AutoProperties(KeySpline, [
        KeySpline.ControlPoint1Property,
        KeySpline.ControlPoint2Property
    ]);

    //#endregion

    KeySpline.PRECISION_LEVEL = 4;
    KeySpline.TOTAL_COUNT = Math.pow(2, KeySpline.PRECISION_LEVEL);
    KeySpline.Instance.GetSplineProgress = function (linearProgress) {
        if (linearProgress >= 1.0)
            return 1.0;
        if (linearProgress <= 0.0)
            return 0.0;
        if (!this._QuadraticsArray)
            this._RegenerateQuadratics();
        return namespace.Curves.QuadraticArrayYForX(this._QuadraticsArray, linearProgress, KeySpline.TOTAL_COUNT);
    };

    KeySpline.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== KeySpline) {
            this._OnPropertyChanged$DependencyObject(args, error);
            return;
        }

        delete this._QuadraticsArray;

        this.PropertyChanged.Raise(this, args);
    };

    KeySpline.Instance._RegenerateQuadratics = function () {
        var c1 = this.ControlPoint1;
        var c2 = this.ControlPoint2;
        var src = {
            c0: { x: 0.0, y: 0.0 },
            c1: { x: c1.x, y: c1.y },
            c2: { x: c2.x, y: c2.y },
            c3: { x: 1.0, y: 1.0 }
        };

        var carr = [];
        this._QuadraticsArray = [];
        namespace.Curves.SubdivideCubicAtLevel(carr, KeySpline.PRECISION_LEVEL, src);
        this._QuadraticsArray = namespace.Curves.ConvertCubicsToQuadratics(carr, KeySpline.TOTAL_COUNT);
    };

    namespace.KeySpline = Nullstone.FinishCreate(KeySpline);
})(Nullstone.Namespace("Fayde.Media.Animation"));
