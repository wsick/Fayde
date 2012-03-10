/// <reference path="../../Runtime/Nullstone.js" />
/// CODE
/// <reference path="InheritedPropertyValueProvider.js"/>
/// <reference path="Enums.js"/>

//#region _InheritedContext
var _InheritedContext = Nullstone.Create("_InheritedContext", null);

_InheritedContext.Instance.Init = function (args) {
    if (args.length > 2) {
        this._InitFull(args);
    } else if (args.length == 2) {
        this._InitFromObj(args[0], args[1]);
    }
};

_InheritedContext.Instance._InitFull = function (args) {
    this.ForegroundSource = args[0];
    this.FontFamilySource = args[1];
    this.FontStretchSource = args[2];
    this.FontStyleSource = args[3];
    this.FontWeightSource = args[4];
    this.FontSizeSource = args[5];
    this.LanguageSource = args[6];
    this.FlowDirectionSource = args[7];
    this.UseLayoutRoundingSource = args[8];
    this.TextDecorationsSource = args[9];
    this.FontResourceSource = args[10];
};
_InheritedContext.Instance._InitFromObj = function (obj, parentContext) {
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

_InheritedContext.Instance.Compare = function (withContext, props) {
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
_InheritedContext.Instance.GetLocalSource = function (obj, prop) {
    var source = null;
    var propd = _InheritedPropertyValueProvider.GetProperty(prop, obj);
    if (propd && obj._GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited)
        source = obj;
    return source;
};

Nullstone.FinishCreate(_InheritedContext);
//#endregion