/// <reference path="../../Runtime/Nullstone.js" />
/// CODE
/// <reference path="InheritedPropertyValueProvider.js"/>
/// <reference path="Enums.js"/>

//#region _InheritedContext
var _InheritedContext = Nullstone.Create("_InheritedContext");

_InheritedContext.FromSources = function (foregroundSource, fontFamilySource, fontStretchSource, fontStyleSource,
        fontWeightSource, fontSizeSource, languageSource, flowDirectionSource, useLayoutRoundingSource, textDecorationsSource) {
    var ic = new _InheritedContext();
    ic.ForegroundSource = foregroundSource;
    ic.FontFamilySource = fontFamilySource;
    ic.FontStretchSource = fontStretchSource;
    ic.FontStyleSource = fontStyleSource;
    ic.FontWeightSource = fontWeightSource;
    ic.FontSizeSource = fontSizeSource;
    ic.LanguageSource = languageSource;
    ic.FlowDirectionSource = flowDirectionSource;
    ic.UseLayoutRoundingSource = useLayoutRoundingSource;
    ic.TextDecorationsSource = textDecorationsSource;
    return ic;
};
_InheritedContext.FromObject = function (obj, parentContext) {
    var ic = new _InheritedContext();

    var inhEnum = _Inheritable;
    ic.ForegroundSource = ic.GetLocalSource(obj, inhEnum.Foreground);
    if (!ic.ForegroundSource && parentContext) ic.ForegroundSource = parentContext.ForegroundSource;

    ic.FontFamilySource = ic.GetLocalSource(obj, inhEnum.FontFamily);
    if (!ic.FontFamilySource && parentContext) ic.FontFamilySource = parentContext.FontFamilySource;

    ic.FontStretchSource = ic.GetLocalSource(obj, inhEnum.FontStretch);
    if (!ic.FontStretchSource && parentContext) ic.FontStretchSource = parentContext.FontStretchSource;

    ic.FontStyleSource = ic.GetLocalSource(obj, inhEnum.FontStyle);
    if (!ic.FontStretchSource && parentContext) ic.FontStretchSource = parentContext.FontStretchSource;

    ic.FontWeightSource = ic.GetLocalSource(obj, inhEnum.FontWeight);
    if (!ic.FontWeightSource && parentContext) ic.FontWeightSource = parentContext.FontWeightSource;

    ic.FontSizeSource = ic.GetLocalSource(obj, inhEnum.FontSize);
    if (!ic.FontSizeSource && parentContext) ic.FontSizeSource = parentContext.FontSizeSource;

    ic.LanguageSource = ic.GetLocalSource(obj, inhEnum.Language);
    if (!ic.LanguageSource && parentContext) ic.LanguageSource = parentContext.LanguageSource;

    ic.FlowDirectionSource = ic.GetLocalSource(obj, inhEnum.FlowDirection);
    if (!ic.FlowDirectionSource && parentContext) ic.FlowDirectionSource = parentContext.FlowDirectionSource;

    ic.UseLayoutRoundingSource = ic.GetLocalSource(obj, inhEnum.UseLayoutRounding);
    if (!ic.UseLayoutRoundingSource && parentContext) ic.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;

    ic.TextDecorationsSource = ic.GetLocalSource(obj, inhEnum.TextDecorations);
    if (!ic.TextDecorationsSource && parentContext) ic.TextDecorationsSource = parentContext.TextDecorationsSource;

    return ic;
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

    return rv;
};
_InheritedContext.Instance.GetLocalSource = function (obj, prop) {
    var propd = _InheritedPropertyValueProvider.GetProperty(prop, obj);
    if (!propd)
        return;
    if ((obj._ProviderBitmasks[propd._ID] & ((1 << _PropertyPrecedence.Inherited) - 1)) !== 0)
        return obj;
};

Nullstone.FinishCreate(_InheritedContext);
//#endregion