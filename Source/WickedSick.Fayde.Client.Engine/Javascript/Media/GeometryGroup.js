/// <reference path="Geometry.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region GeometryGroup
var GeometryGroup = Nullstone.Create("GeometryGroup", Geometry);

GeometryGroup.Instance.Init = function () {
    this.Init$Geometry();
};

//#region Dependency Properties

GeometryGroup.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return Number; }, GeometryGroup, FillRule.EvenOdd);
GeometryGroup.Instance.GetFillRule = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(GeometryGroup.FillRuleProperty);
};
GeometryGroup.Instance.SetFillRule = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(GeometryGroup.FillRuleProperty, value);
};

GeometryGroup.ChildrenProperty = DependencyProperty.RegisterFull("Children", function () { return GeometryCollection; }, GeometryGroup, null, { GetValue: function () { return new GeometryCollection(); } });
GeometryGroup.Instance.GetChildren = function () {
    ///<returns type="GeometryCollection"></returns>
    return this.GetValue(GeometryGroup.ChildrenProperty);
};
GeometryGroup.Instance.SetChildren = function (value) {
    ///<param name="value" type="GeometryCollection"></param>
    this.SetValue(GeometryGroup.ChildrenProperty, value);
};

//#endregion

GeometryGroup.Instance.ComputePathBounds = function () {
    /// <returns type="Rect" />
    var bounds = new Rect();
    var children = this.GetChildren();
    var count = children.GetCount();
    var g;
    for (var i = 0; i < count; i++) {
        g = children.GetValueAt(i);
        bounds = bounds.Union(g.GetBounds(), true);
    }
    return bounds;
};

GeometryGroup.Instance.Draw = function (ctx) {
    /// <param name="ctx" type="_RenderContext"></param>

    var transform = this.GetTransform();
    if (transform != null) {
        ctx.Save();
        ctx.Transform(transform);
    }
    var children = this.GetChildren();
    var count = children.GetCount();
    var g;
    for (var i = 0; i < count; i++) {
        g = children.GetValueAt(i);
        g.Draw(ctx);
    }
    if (transform != null)
        ctx.Restore();
};

GeometryGroup.prototype._OnCollectionChanged = function (sender, args) {
    this._InvalidateCache();
    if (!this._PropertyHasValueNoAutoCreate(GeometryGroup.ChildrenProperty, sender)) {
        this._OnCollectionChanged(sender, args);
        return;
    }
    this.PropertyChanged.Raise(this, {
        Property: GeometryGroup.ChildrenProperty,
        OldValue: null,
        NewValue: this.GetChildren()
    });
};
GeometryGroup.prototype._OnCollectionItemChanged = function (sender, args) {
    this._InvalidateCache();
    if (!this._PropertyHasValueNoAutoCreate(GeometryGroup.ChildrenProperty, sender)) {
        this._OnCollectionItemChanged(sender, args);
        return;
    }
    this.PropertyChanged.Raise(this, {
        Property: GeometryGroup.ChildrenProperty,
        OldValue: null,
        NewValue: this.GetChildren()
    });
};

Nullstone.FinishCreate(GeometryGroup);
//#endregion