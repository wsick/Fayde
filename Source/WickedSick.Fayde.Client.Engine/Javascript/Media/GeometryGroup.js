/// <reference path="Geometry.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region GeometryGroup
var GeometryGroup = Nullstone.Create("GeometryGroup", Geometry);

GeometryGroup.Instance.Init = function () {
    this.Init$Geometry();
};

//#region Dependency Properties

GeometryGroup.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return new Enum(FillRule); }, GeometryGroup, FillRule.EvenOdd);
GeometryGroup.ChildrenProperty = DependencyProperty.RegisterFull("Children", function () { return GeometryCollection; }, GeometryGroup, null, { GetValue: function () { return new GeometryCollection(); } });

Nullstone.AutoProperties(GeometryGroup, [
    GeometryGroup.FillRuleProperty,
    GeometryGroup.ChildrenProperty
]);

//#endregion

GeometryGroup.Instance.ComputePathBounds = function () {
    /// <returns type="Rect" />
    var bounds = new Rect();
    var children = this.Children;
    var count = children.GetCount();
    for (var i = 0; i < count; i++) {
        var g = children.GetValueAt(i);
        bounds = bounds.Union(g.GetBounds(), true);
    }
    return bounds;
};

GeometryGroup.Instance.Draw = function (ctx) {
    /// <param name="ctx" type="_RenderContext"></param>

    var transform = this.Transform;
    if (transform != null) {
        ctx.Save();
        ctx.Transform(transform);
    }
    var children = this.Children;
    var count = children.GetCount();
    for (var i = 0; i < count; i++) {
        var g = children.GetValueAt(i);
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
        NewValue: this.Children
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
        NewValue: this.Children
    });
};

Nullstone.FinishCreate(GeometryGroup);
//#endregion