/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="PathSegmentCollection.js"/>
/// <reference path="../Shapes/Enums.js"/>

//#region PathFigure
var PathFigure = Nullstone.Create("PathFigure", DependencyObject);

PathFigure.Instance.Init = function () {
    this._Path = null;
};

//#region Dependency Properties

PathFigure.IsClosedProperty = DependencyProperty.RegisterCore("IsClosed", function () { return Boolean; }, PathFigure, false);
PathFigure.Instance.GetIsClosed = function () {
    ///<returns type="Boolean"></returns>
    return this.$GetValue(PathFigure.IsClosedProperty);
};
PathFigure.Instance.SetIsClosed = function (value) {
    ///<param name="value" type="Boolean"></param>
    this.$SetValue(PathFigure.IsClosedProperty, value);
};

PathFigure.SegmentsProperty = DependencyProperty.RegisterFull("Segments", function () { return PathSegmentCollection; }, PathFigure, null, { GetValue: function () { return new PathSegmentCollection(); } });
PathFigure.Instance.GetSegments = function () {
    ///<returns type="PathSegmentCollection"></returns>
    return this.$GetValue(PathFigure.SegmentsProperty);
};
PathFigure.Instance.SetSegments = function (value) {
    ///<param name="value" type="PathSegmentCollection"></param>
    this.$SetValue(PathFigure.SegmentsProperty, value);
};

PathFigure.StartPointProperty = DependencyProperty.RegisterCore("StartPoint", function () { return Point; }, PathFigure, new Point());
PathFigure.Instance.GetStartPoint = function () {
    ///<returns type="Point"></returns>
    return this.$GetValue(PathFigure.StartPointProperty);
};
PathFigure.Instance.SetStartPoint = function (value) {
    ///<param name="value" type="Point"></param>
    this.$SetValue(PathFigure.StartPointProperty, value);
};

PathFigure.IsFilledProperty = DependencyProperty.RegisterCore("IsFilled", function () { return Boolean; }, PathFigure, true);
PathFigure.Instance.GetIsFilled = function () {
    ///<returns type="Boolean"></returns>
    return this.$GetValue(PathFigure.IsFilledProperty);
};
PathFigure.Instance.SetIsFilled = function (value) {
    ///<param name="value" type="Boolean"></param>
    this.$SetValue(PathFigure.IsFilledProperty, value);
};

//#endregion

PathFigure.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== PathFigure) {
        this._OnPropertyChanged$DependencyObject(args, error);
        return;
    }
    this._Path = null;
    this.PropertyChanged.Raise(this, args);
};
PathFigure.Instance._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(PathFigure.SegmentsProperty, sender)) {
        this._OnCollectionChanged$DependencyObject(sender, args);
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
PathFigure.Instance._OnCollectionItemChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(PathFigure.SegmentsProperty, sender)) {
        this._OnCollectionItemChanged$DependencyObject(sender, args);
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

    var start = this.GetStartPoint();
    this._Path.push({ type: PathEntryType.Move, x: start.X, y: start.Y });

    var segments = this.GetSegments();
    var segmentCount = segments.GetCount();
    for (var i = 0; i < segmentCount; i++) {
        var segment = segments[i];
        segment._Append(this._Path);
    }
    if (this.GetIsClosed())
        this._Path.push({ type: PathEntryType.Close });
};

Nullstone.FinishCreate(PathFigure);
//#endregion