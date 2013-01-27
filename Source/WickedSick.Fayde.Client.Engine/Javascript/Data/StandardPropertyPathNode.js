/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="PropertyPathNode.js"/>
/// CODE

(function (namespace) {
    var _StandardPropertyPathNode = Nullstone.Create("_StandardPropertyPathNode", namespace._PropertyPathNode, 2);

    _StandardPropertyPathNode.Instance.Init = function (typeName, propertyName) {
        this.Init$_PropertyPathNode();
        this._STypeName = typeName;
        this._PropertyName = propertyName;
    };

    //#region Properties

    Nullstone.Property(_StandardPropertyPathNode, "PropertyName", {
        get: function () { return this._PropertyName; }
    });
    Nullstone.Property(_StandardPropertyPathNode, "TypeName", {
        get: function () { return this._STypeName; }
    });

    //#endregion

    _StandardPropertyPathNode.Instance.SetValue = function (value) {
        if (this.DependencyProperty)
            this.Source.$SetValue(this.DependencyProperty, value);
        else if (this.PropertyInfo)
            this.PropertyInfo.SetValue(this.Source, value, null);
    };
    _StandardPropertyPathNode.Instance.UpdateValue = function () {
        if (this.DependencyProperty) {
            this.ValueType = this.DependencyProperty.GetTargetType();
            this.UpdateValueAndIsBroken(this.Source.$GetValue(this.DependencyProperty), this._CheckIsBroken());
        } else if (this.PropertyInfo) {
            //TODO: this.ValueType = PropertyInfo.PropertyType;
            this.ValueType = null;
            try {
                this.UpdateValueAndIsBroken(this.PropertyInfo.GetValue(this.Source, null), this._CheckIsBroken());
            } catch (err) {
                this.UpdateValueAndIsBroken(null, this._CheckIsBroken());
            }
        } else {
            this.ValueType = null;
            this.UpdateValueAndIsBroken(null, this._CheckIsBroken());
        }
    };

    _StandardPropertyPathNode.Instance.OnSourceChanged = function (oldSource, newSource) {
        this.OnSourceChanged$_PropertyPathNode(oldSource, newSource);

        var oldDO = Nullstone.As(oldSource, Fayde.DependencyObject);
        var newDO = Nullstone.As(newSource, Fayde.DependencyObject);
        var listener = this.Listener;
        if (listener) {
            listener.Detach();
            this.Listener = listener;
        }

        this.DependencyProperty = null;
        this.PropertyInfo = null;
        if (!this.Source)
            return;

        if (newDO != null) {
            propd = DependencyProperty.GetDependencyProperty(this.Source.constructor, this.PropertyName);
            if (propd) {
                this.DependencyProperty = propd;
                listener = new namespace.PropertyChangedListener(newDO, propd, this, this.OnPropertyChanged);
                this.Listener = listener;
            }
        }

        if (!this.DependencyProperty || !this.DependencyProperty._IsAttached) {
            this.PropertyInfo = PropertyInfo.Find(this.Source, this.PropertyName);
        }
    };
    _StandardPropertyPathNode.Instance.OnPropertyChanged = function (s, e) {
        try {
            this.UpdateValue();
            if (this.Next)
                this.Next.SetSource(this.Value);
        } catch (err) {
            //Ignore
        }
    };
    _StandardPropertyPathNode.Instance.OnSourcePropertyChanged = function (o, e) {
        if (e.PropertyName === this.PropertyName && this.PropertyInfo) {
            this.UpdateValue();
            var next = this.Next;
            if (next)
                next.SetSource(this.Value);
        }
    };

    namespace._StandardPropertyPathNode = Nullstone.FinishCreate(_StandardPropertyPathNode);
})(Nullstone.Namespace("Fayde.Data"));