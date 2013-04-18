var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Expression.ts" />
/// CODE
/// <reference path="TypeConverter.ts" />
/// <reference path="../Controls/ContentControl.ts" />
var Fayde;
(function (Fayde) {
    var TemplateBindingExpression = (function (_super) {
        __extends(TemplateBindingExpression, _super);
        function TemplateBindingExpression(sourcePropd, targetPropd, targetPropName) {
                _super.call(this);
            this._SetsParent = false;
            this.SourceProperty = sourcePropd;
            this.TargetProperty = targetPropd;
            this.TargetPropertyName = targetPropName;
        }
        TemplateBindingExpression.prototype.GetValue = function (propd) {
            var target = this._Target;
            var source = target.TemplateOwner;
            var value;
            if(source) {
                value = source._Store.GetValue(this.SourceProperty);
            }
            value = Fayde.TypeConverter.ConvertObject(this.TargetProperty, value, (target).constructor, true);
            return value;
        };
        TemplateBindingExpression.prototype.OnAttached = function (dobj) {
            _super.prototype.OnAttached.call(this, dobj);
            this._Target = dobj;
            this._DetachListener();
            var cc;
            if(this._Target instanceof Fayde.Controls.ContentControl) {
                cc = this._Target;
            }
            if(cc && this.TargetProperty._ID === Fayde.Controls.ContentControl.ContentProperty._ID) {
                this._SetsParent = cc._ContentSetsParent;
                cc._ContentSetsParent = false;
            }
            this._AttachListener();
        };
        TemplateBindingExpression.prototype.OnDetached = function (dobj) {
            _super.prototype.OnDetached.call(this, dobj);
            var listener = this._Listener;
            if(!listener) {
                return;
            }
            var cc;
            if(this._Target instanceof Fayde.Controls.ContentControl) {
                cc = this._Target;
            }
            if(cc) {
                cc._ContentSetsParent = this._SetsParent;
            }
            this._DetachListener();
            this._Target = null;
        };
        TemplateBindingExpression.prototype.OnPropertyChanged = function (sender, args) {
            if(this.SourceProperty._ID !== args.Property._ID) {
                return;
            }
            try  {
                // Type converting doesn't happen for TemplateBindings
                this.IsUpdating = true;
                var store = this._Target._Store;
                var targetProp = this.TargetProperty;
                try  {
                    store.SetValue(targetProp, this.GetValue(null));
                } catch (err2) {
                    var val = targetProp.DefaultValue;
                    if(val === undefined) {
                        val = targetProp._IsAutoCreated ? targetProp._AutoCreator.GetValue(targetProp, this._Target) : undefined;
                    }
                    store.SetValue(targetProp, val);
                }
            } catch (err) {
            }finally {
                this.IsUpdating = false;
            }
        };
        TemplateBindingExpression.prototype._AttachListener = function () {
            var source = this._Target.TemplateOwner;
            if(!source) {
                return;
            }
            this._Listener = this;
            source._Store._SubscribePropertyChanged(this);
        };
        TemplateBindingExpression.prototype._DetachListener = function () {
            var listener = this._Listener;
            if(!listener) {
                return;
            }
            this._Target.TemplateOwner._Store._UnsubscribePropertyChanged(listener);
            this._Listener = listener = null;
        };
        return TemplateBindingExpression;
    })(Fayde.Expression);
    Fayde.TemplateBindingExpression = TemplateBindingExpression;    
    Nullstone.RegisterType(TemplateBindingExpression, "TemplateBindingExpression");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TemplateBindingExpression.js.map
