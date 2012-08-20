/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

//#region Span
var Span = Nullstone.Create("Span", Inline);

//#region Dependency Properties

Span._CreateInlineCollection = function (obj) {
    var inlines = new InlineCollection();
    if (obj instanceof Hyperlink)
        inlines._SetIsForHyperlink();
    return inlines;
};
Span.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return InlineCollection; }, Span, undefined, { GetValue: function (obj) { return Span._CreateInlineCollection(obj); } });

Nullstone.AutoProperties(Span, [
    Span.InlinesProperty
]);

//#endregion

Span.Instance._SerializeText = function () {
    /// <returns type="String" />
    var inlines = this.Inlines;
    var count = inlines.GetCount();
    var str = "";
    for (var i = 0; i < count; i++) {
        str += inlines.GetValueAt(i)._SerializeText();
    }
    return str;
};
Span.Instance._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Span.InlinesProperty, sender)) {
        if (args.Action === CollectionChangedArgs.Action.Add)
            this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);
        this._NotifyLayoutContainerOnCollectionChanged(sender, args);
    } else {
        this._OnCollectionChanged$Inline(sender, args);
    }
};

Nullstone.FinishCreate(Span);
//#endregion