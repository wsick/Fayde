/// CODE
/// <reference path="InheritedPropertyValueProvider.js"/>
/// <reference path="Enums.js"/>

//#region _InheritedContext

function _InheritedContext() {
    RefObject.call(this);
    if (arguments.length > 2) {
        this._InitFull.apply(this, arguments);
    } else if (arguments.length == 2) {
        this._InitFromObj(arguments[0], arguments[1]);
    }
}
_InheritedContext.InheritFrom(RefObject);

_InheritedContext.prototype._InitFull = function () {
    this.ForegroundSource = arguments[0];
    this.FontFamilySource = arguments[1];
    this.FontStretchSource = arguments[2];
    this.FontStyleSource = arguments[3];
    this.FontWeightSource = arguments[4];
    this.FontSizeSource = arguments[5];
    this.LanguageSource = arguments[6];
    this.FlowDirectionSource = arguments[7];
    this.UseLayoutRoundingSource = arguments[8];
    this.TextDecorationsSource = arguments[9];
    this.FontResourceSource = arguments[10];
};
_InheritedContext.prototype._InitFromObj = function (obj, parentContext) {
    this.ForegroundSource = this.GetLocalSource(obj, _Inheritable.Foreground);
    if (!this.ForegroundSource && parentContext) this.ForegroundSource = parentContext.ForegroundSource;

    this.FontFamilySource = this.GetLocalSource(obj, _Inheritable.FontFamily);
    if (!this.FontFamilySource && parentContext) this.FontFamilySource = parentContext.FontFamilySource;

    this.FontStretchSource = this.GetLocalSource(obj, _Inheritable.FontStretch);
    if (!this.FontStretchSource && parentContext) this.FontStretchSource = parentContext.FontStretchSource;

    this.FontStyleSource = this.GetLocalSource(obj, _Inheritable.FontStyle);
    if (!this.FontStretchSource && parentContext) this.FontStretchSource = parentContext.FontStretchSource;

    this.FontWeightSource = this.GetLocalSource(obj, _Inheritable.FontWeight);
    if (!this.FontWeightSource && parentContext) this.FontWeightSource = parentContext.FontWeightSource;

    this.FontSizeSource = this.GetLocalSource(obj, _Inheritable.FontSize);
    if (!this.FontSizeSource && parentContext) this.FontSizeSource = parentContext.FontSizeSource;

    this.LanguageSource = this.GetLocalSource(obj, _Inheritable.Language);
    if (!this.LanguageSource && parentContext) this.LanguageSource = parentContext.LanguageSource;

    this.FlowDirectionSource = this.GetLocalSource(obj, _Inheritable.FlowDirection);
    if (!this.FlowDirectionSource && parentContext) this.FlowDirectionSource = parentContext.FlowDirectionSource;

    this.UseLayoutRoundingSource = this.GetLocalSource(obj, _Inheritable.UseLayoutRounding);
    if (!this.UseLayoutRoundingSource && parentContext) this.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;

    this.TextDecorationsSource = this.GetLocalSource(obj, _Inheritable.TextDecorations);
    if (!this.TextDecorationsSource && parentContext) this.TextDecorationsSource = parentContext.TextDecorationsSource;

    this.FontResourceSource = this.GetLocalSource(obj, _Inheritable.FontResource);
    if (!this.FontResourceSource && parentContext) this.FontResourceSource = parentContext.FontResourceSource;
};

_InheritedContext.prototype.Compare = function (withContext, props) {
    var rv = _Inheritable.None;

    if (props & _Inheritable.Foreground && withContext.ForegroundSource == this.ForegroundSource)
        rv |= _Inheritable.Foreground;
    if (props & _Inheritable.FontFamily && withContext.FontFamilySource == this.FontFamilySource)
        rv |= _Inheritable.FontFamily;
    if (props & _Inheritable.FontStretch && withContext.FontStretchSource == this.FontStretchSource)
        rv |= _Inheritable.FontStretch;
    if (props & _Inheritable.FontStyle && withContext.FontStyleSource == this.FontStyleSource)
        rv |= _Inheritable.FontStyle;
    if (props & _Inheritable.FontWeight && withContext.FontWeightSource == this.FontWeightSource)
        rv |= _Inheritable.FontWeight;
    if (props & _Inheritable.FontSize && withContext.FontSizeSource == this.FontSizeSource)
        rv |= _Inheritable.FontSize;
    if (props & _Inheritable.Language && withContext.LanguageSource == this.LanguageSource)
        rv |= _Inheritable.Language;
    if (props & _Inheritable.FlowDirection && withContext.FlowDirectionSource == this.FlowDirectionSource)
        rv |= _Inheritable.FlowDirection;
    if (props & _Inheritable.UseLayoutRounding && withContext.UseLayoutRoundingSource == this.UseLayoutRoundingSource)
        rv |= _Inheritable.UseLayoutRounding;
    if (props & _Inheritable.TextDecorations && withContext.TextDecorationsSource == this.TextDecorationsSource)
        rv |= _Inheritable.TextDecorations;
    if (props & _Inheritable.FontResource && withContext.FontResourceSource == this.FontResourceSource)
        rv |= _Inheritable.FontResource;

    return rv;
};
_InheritedContext.prototype.GetLocalSource = function (obj, prop) {
    var source = null;
    var propd = _InheritedPropertyValueProvider.GetProperty(prop, obj);
    if (propd && obj._GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited)
        source = obj;
    return source;
};

//#endregion