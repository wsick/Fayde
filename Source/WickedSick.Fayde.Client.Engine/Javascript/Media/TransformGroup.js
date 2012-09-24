/// <reference path="Transform.js"/>
/// CODE
/// <reference path="TransformCollection.js"/>

//#region TransformGroup
var TransformGroup = Nullstone.Create("TransformGroup", Transform);

//#region Properties

TransformGroup.ChildrenProperty = DependencyProperty.RegisterFull("Children", function () { return TransformCollection; }, TransformGroup);

Nullstone.AutoProperties(TransformGroup, [
    TransformGroup.ChildrenProperty
]);

//#endregion

//#region Annotations

TransformGroup.Annotations = {
    ContentProperty: TransformGroup.ChildrenProperty
};

//#endregion

TransformGroup.Instance.Init = function () {
    this.Init$Transform();
};

TransformGroup.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TransformGroup) {
        this._OnPropertyChanged$Transform(args, error);
        return;
    }

    if (args.Property._ID === TransformGroup.ChildrenProperty._ID) {
        if (args.OldValue != null) {
            args.OldValue.Changed.Unsubscribe(this._ChildrenChanged, this);
            args.OldValue.ItemChanged.Unsubscribe(this._ChildrenItemChanged, this);
        }
        if (args.NewValue != null) {
            args.NewValue.ItemChanged.Subscribe(this._ChildrenItemChanged, this);
            args.NewValue.Changed.Subscribe(this._ChildrenChanged, this);
        }
    }
    this.PropertyChanged.Raise(this, args);
};
TransformGroup.Instance._ChildrenChanged = function (sender, e) {
    this._ClearValue();
};
TransformGroup.Instance._ChildrenItemChanged = function (sender, e) {
    this._ClearValue();
};

TransformGroup.Instance._BuildValue = function () {
    var children = this.Children;
    var count = children.GetCount();
    var cur = mat3.identity();
    for (var i = count - 1; i >= 0; i--) {
        mat3.multiply(children.GetValueAt(i).Value.raw, cur, cur); //cur = cur * child
    }
    return cur;
};

Nullstone.FinishCreate(TransformGroup);
//#endregion