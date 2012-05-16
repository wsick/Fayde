/// <reference path="../../Runtime/Nullstone.js" />
/// CODE
/// <reference path="InheritedPropertyValueProvider.js"/>
/// <reference path="Enums.js"/>

//#region _InheritedContext
var _InheritedContext = Nullstone.Create("_InheritedContext");

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
    var inhEnum = _Inheritable;
    this.ForegroundSource = this.GetLocalSource(obj, inhEnum.Foreground);
    if (!this.ForegroundSource && parentContext) this.ForegroundSource = parentContext.ForegroundSource;

    this.FontFamilySource = this.GetLocalSource(obj, inhEnum.FontFamily);
    if (!this.FontFamilySource && parentContext) this.FontFamilySource = parentContext.FontFamilySource;

    this.FontStretchSource = this.GetLocalSource(obj, inhEnum.FontStretch);
    if (!this.FontStretchSource && parentContext) this.FontStretchSource = parentContext.FontStretchSource;

    this.FontStyleSource = this.GetLocalSource(obj, inhEnum.FontStyle);
    if (!this.FontStretchSource && parentContext) this.FontStretchSource = parentContext.FontStretchSource;

    this.FontWeightSource = this.GetLocalSource(obj, inhEnum.FontWeight);
    if (!this.FontWeightSource && parentContext) this.FontWeightSource = parentContext.FontWeightSource;

    this.FontSizeSource = this.GetLocalSource(obj, inhEnum.FontSize);
    if (!this.FontSizeSource && parentContext) this.FontSizeSource = parentContext.FontSizeSource;

    this.LanguageSource = this.GetLocalSource(obj, inhEnum.Language);
    if (!this.LanguageSource && parentContext) this.LanguageSource = parentContext.LanguageSource;

    this.FlowDirectionSource = this.GetLocalSource(obj, inhEnum.FlowDirection);
    if (!this.FlowDirectionSource && parentContext) this.FlowDirectionSource = parentContext.FlowDirectionSource;

    this.UseLayoutRoundingSource = this.GetLocalSource(obj, inhEnum.UseLayoutRounding);
    if (!this.UseLayoutRoundingSource && parentContext) this.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;

    this.TextDecorationsSource = this.GetLocalSource(obj, inhEnum.TextDecorations);
    if (!this.TextDecorationsSource && parentContext) this.TextDecorationsSource = parentContext.TextDecorationsSource;

    this.FontResourceSource = this.GetLocalSource(obj, inhEnum.FontResource);
    if (!this.FontResourceSource && parentContext) this.FontResourceSource = parentContext.FontResourceSource;
};

_InheritedContext.Instance.Compare = function (withContext, props) {
    var inhEnum = _Inheritable;
    var rv = inhEnum.None;

    if (props & inhEnum.Foreground && Nullstone.RefEquals(withContext.ForegroundSource, this.ForegroundSource))
        rv |= inhEnum.Foreground;
    if (props & inhEnum.FontFamily && Nullstone.RefEquals(withContext.FontFamilySource, this.FontFamilySource))
        rv |= inhEnum.FontFamily;
    if (props & inhEnum.FontStretch && Nullstone.RefEquals(withContext.FontStretchSource, this.FontStretchSource))
        rv |= inhEnum.FontStretch;
    if (props & inhEnum.FontStyle && Nullstone.RefEquals(withContext.FontStyleSource, this.FontStyleSource))
        rv |= inhEnum.FontStyle;
    if (props & inhEnum.FontWeight && Nullstone.RefEquals(withContext.FontWeightSource, this.FontWeightSource))
        rv |= inhEnum.FontWeight;
    if (props & inhEnum.FontSize && Nullstone.RefEquals(withContext.FontSizeSource, this.FontSizeSource))
        rv |= inhEnum.FontSize;
    if (props & inhEnum.Language && Nullstone.RefEquals(withContext.LanguageSource, this.LanguageSource))
        rv |= inhEnum.Language;
    if (props & inhEnum.FlowDirection && Nullstone.RefEquals(withContext.FlowDirectionSource, this.FlowDirectionSource))
        rv |= inhEnum.FlowDirection;
    if (props & inhEnum.UseLayoutRounding && Nullstone.RefEquals(withContext.UseLayoutRoundingSource, this.UseLayoutRoundingSource))
        rv |= inhEnum.UseLayoutRounding;
    if (props & inhEnum.TextDecorations && Nullstone.RefEquals(withContext.TextDecorationsSource, this.TextDecorationsSource))
        rv |= inhEnum.TextDecorations;
    if (props & inhEnum.FontResource && Nullstone.RefEquals(withContext.FontResourceSource, this.FontResourceSource))
        rv |= inhEnum.FontResource;

    return rv;
};
_InheritedContext.Instance.GetLocalSource = function (obj, prop) {
    var source;
    var propd = _InheritedPropertyValueProvider.GetProperty(prop, obj);
    if (propd && obj._GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited)
        source = obj;
    return source;
};

Nullstone.FinishCreate(_InheritedContext);
//#endregion