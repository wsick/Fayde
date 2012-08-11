/// <reference path="Transform.js"/>
/// CODE
/// <reference path="TransformCollection.js"/>

//#region TransformGroup
var TransformGroup = Nullstone.Create("TransformGroup", Transform);

//#region Dependency Properties

TransformGroup.ChildrenProperty = DependencyProperty.RegisterFull("Children", function () { return TransformCollection; }, TransformGroup, undefined, { GetValue: function () { return new TransformCollection(); } });

Nullstone.AutoProperties(TransformGroup, [
    TransformGroup.ChildrenProperty
]);

Nullstone.Property(TransformGroup, "Value", {
    get: function () {
        if (!this._Value)
            this._Value = this._BuildValue();
        return this._Value;
    }
});

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
        }
        if (args.NewValue != null) {
            args.NewValue.Changed.Subscribe(this._ChildrenChanged, this);
        }
    }
    this.PropertyChanged.Raise(this, args);
};
TransformGroup.Instance._ChildrenChanged = function (sender, e) {
    delete this._Value;
};

TransformGroup.Instance._BuildValue = function () {
    NotImplemented("TransformGroup._BuildValue");
    return new Matrix();
};

//#region Annotations

TransformGroup.Annotations = {
    ContentProperty: TransformGroup.ChildrenProperty
};

//#endregion

Nullstone.FinishCreate(TransformGroup);
//#endregion