/// <reference path="../Runtime/Nullstone.js" />
/// CODE

var Validators = {};
Validators.StyleValidator = function (instance, propd, value, error) {
    /// <param name="instance" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    /// <param name="value" type="Object"></param>
    /// <param name="error" type="BError"></param>
    /// <returns type="Boolean" />

    var parentType = instance.constructor;
    var errorMessage;
    if (value) {
        var root;
        var style = Nullstone.As(value, Style);

        if (style.GetIsSealed()) {
            if (Nullstone.DoesInheritFrom(parentType, style.GetTargetType())) {
                error.SetErrored(BError.XamlParseException, "Style.TargetType (" + style.GetTargetType()._TypeName + ") is not a subclass of (" + parentType._TypeName + ")");
                return false;
            }
            return true;
        }

        // 1 Check for circular references in the BasedOn tree
        var cycles = [];
        root = style;
        while (root) {
            if (cycles[root._ID]) {
                error.SetErrored(BError.InvalidOperation, "Circular reference in Style.BasedOn");
                return false;
            }
            cycles[root._ID] = true;
            root = root.GetBasedOn();
        }
        cycles = null;

        // 2 Check that the instance is a subclass of Style::TargetType and also all the styles TargetTypes are
        //   subclasses of their BasedOn styles TargetType.
        root = style;
        while (root) {
            var targetType = root.GetTargetType();
            if (Nullstone.RefEquals(root, style)) {
                if (!targetType) {
                    error.SetErrored(BError.InvalidOperation, "TargetType cannot be null");
                    return false;
                } else if (!Nullstone.DoesInheritFrom(parentType, targetType)) {
                    error.SetErrored(BError.XamlParseException, "Style.TargetType (" + targetType._TypeName + ") is not a subclass of (" + parentType._TypeName + ")");
                    return false;
                }
            } else if (!targetType || !Nullstone.DoesInheritFrom(parentType, targetType)) {
                error.SetErrored(BError.InvalidOperation, "Style.TargetType (" + (targetType ? targetType._TypeName : "<Not Specified>") + ") is not a subclass of (" + parentType._TypeName + ")");
                return false;
            }
            parentType = targetType;
            root = root.GetBasedOn();
        }

        // 3 This style is now OK and never needs to be checked again.
        style._Seal();
    }
    return true;
};