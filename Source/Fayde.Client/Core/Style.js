/// <reference path="DependencyObject.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    var Style = (function (_super) {
        __extends(Style, _super);
        function Style() {
            _super.call(this);
            this._IsSealed = false;
            var coll = Style.SettersProperty.Initialize(this);
            coll.AttachTo(this);
        }
        Style.prototype.Seal = function () {
            if (this._IsSealed)
                return;
            this.Setters._Seal(this.TargetType);
            this._IsSealed = true;

            var base = this.BasedOn;
            if (base)
                base.Seal();
        };

        Style.prototype.Validate = function (instance, error) {
            var parentType = (instance).constructor;

            if (this._IsSealed) {
                if (!(instance instanceof this.TargetType)) {
                    //if (!Nullstone.DoesInheritFrom(parentType, style.TargetType)) {
                    error.Number = BError.XamlParse;
                    error.Message = "Style.TargetType (" + (this.TargetType)._TypeName + ") is not a subclass of (" + (parentType)._TypeName + ")";
                    return false;
                }
                return true;
            }

            // 1 Check for circular references in the BasedOn tree
            var cycles = [];
            var root = this;
            while (root) {
                if (cycles.indexOf(root) > -1) {
                    error.Number = BError.InvalidOperation;
                    error.Message = "Circular reference in Style.BasedOn";
                    return false;
                }
                cycles.push(root);
                root = root.BasedOn;
            }
            cycles = null;

            // 2 Check that the instance is a subclass of Style::TargetType and also all the styles TargetTypes are
            //   subclasses of their BasedOn styles TargetType.
            root = this;
            var targetType;
            while (root) {
                targetType = root.TargetType;
                if (root === this) {
                    if (!targetType) {
                        error.Number = BError.InvalidOperation;
                        error.Message = "TargetType cannot be null";
                        return false;
                    } else if (!Nullstone.DoesInheritFrom(parentType, targetType)) {
                        error.Number = BError.XamlParse;
                        error.Message = "Style.TargetType (" + (targetType)._TypeName + ") is not a subclass of (" + (parentType)._TypeName + ")";
                        return false;
                    }
                } else if (!targetType || !Nullstone.DoesInheritFrom(parentType, targetType)) {
                    error.Number = BError.InvalidOperation;
                    error.Message = "Style.TargetType (" + (targetType ? (targetType)._TypeName : "<Not Specified>") + ") is not a subclass of (" + (parentType)._TypeName + ")";
                    return false;
                }
                parentType = targetType;
                root = root.BasedOn;
            }

            // 3 This style is now OK and never needs to be checked again.
            this.Seal();
            return true;
        };
        Style.SettersProperty = DependencyProperty.RegisterImmutable("Setters", function () {
            return Fayde.SetterCollection;
        }, Style);
        Style.BasedOnProperty = DependencyProperty.Register("BasedOn", function () {
            return Style;
        }, Style);
        Style.TargetTypeProperty = DependencyProperty.Register("TargetType", function () {
            return Function;
        }, Style);

        Style.Annotations = { ContentProperty: Style.SettersProperty };
        return Style;
    })(Fayde.DependencyObject);
    Fayde.Style = Style;
    Fayde.RegisterType(Style, {
        Name: "Style",
        Namespace: "Fayde",
        XmlNamespace: Fayde.XMLNS
    });
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Style.js.map