/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="PathSegmentCollection.js"/>
/// <reference path="../Shapes/Enums.js"/>

(function (namespace) {
    var PathFigure = Nullstone.Create("PathFigure", DependencyObject);

    PathFigure.Instance.Init = function () {
        this.Init$DependencyObject();
        this._Path = null;
    };

    //#region Properties

    PathFigure.IsClosedProperty = DependencyProperty.RegisterCore("IsClosed", function () { return Boolean; }, PathFigure, false);
    PathFigure.SegmentsProperty = DependencyProperty.RegisterFull("Segments", function () { return PathSegmentCollection; }, PathFigure, undefined, undefined, { GetValue: function () { return new PathSegmentCollection(); } });
    PathFigure.StartPointProperty = DependencyProperty.RegisterCore("StartPoint", function () { return Point; }, PathFigure, new Point());
    PathFigure.IsFilledProperty = DependencyProperty.RegisterCore("IsFilled", function () { return Boolean; }, PathFigure, true);

    Nullstone.AutoProperties(PathFigure, [
        PathFigure.IsClosedProperty,
        PathFigure.SegmentsProperty,
        PathFigure.StartPointProperty,
        PathFigure.IsFilledProperty
    ]);

    //#endregion

    PathFigure.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== PathFigure) {
            this._OnPropertyChanged$DependencyObject(args, error);
            return;
        }
        this._Path = null;
        this.PropertyChanged.Raise(this, args);
    };
    PathFigure.Instance._OnCollectionChanged = function (col, args) {
        if (!this._PropertyHasValueNoAutoCreate(PathFigure.SegmentsProperty, col)) {
            this._OnCollectionChanged$DependencyObject(col, args);
            return;
        }
        this._Path = null;
        var newArgs = {
            Property: PathFigure.SegmentsProperty,
            OldValue: null,
            NewValue: this._GetValue(PathFigure.SegmentsProperty)
        };
        this.PropertyChanged.Raise(this, newArgs);
    };
    PathFigure.Instance._OnCollectionItemChanged = function (col, obj, args) {
        if (!this._PropertyHasValueNoAutoCreate(PathFigure.SegmentsProperty, col)) {
            this._OnCollectionItemChanged$DependencyObject(col, obj, args);
            return;
        }
        this._Path = null;
        var newArgs = {
            Property: PathFigure.SegmentsProperty,
            OldValue: null,
            NewValue: this._GetValue(PathFigure.SegmentsProperty)
        };
        this.PropertyChanged.Raise(this, newArgs);
    };

    PathFigure.Instance._Build = function () {
        this._Path = [];

        var start = this.StartPoint;
        this._Path.push({ type: PathEntryType.Move, x: start.X, y: start.Y });

        var segments = this.Segments;
        var count = segments.GetCount();
        for (var i = 0; i < count; i++) {
            var segment = segments[i];
            segment._Append(this._Path);
        }
        if (this.IsClosed)
            this._Path.push({ type: PathEntryType.Close });
    };

    namespace.PathFigure = Nullstone.FinishCreate(PathFigure);
})(window);