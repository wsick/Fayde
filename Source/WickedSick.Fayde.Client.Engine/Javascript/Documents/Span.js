/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

//#region Span
var Span = Nullstone.Create("Span", Inline);

//#region DEPENDENCY PROPERTIES

Span._CreateInlineCollection = function (obj) {
    var inlines = new InlineCollection();
    if (obj instanceof Hyperlink)
        inlines._SetIsForHyperlink();
    return inlines;
};
Span.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return InlineCollection; }, Span, null, { GetValue: function (obj) { return Span._CreateInlineCollection(obj); } });
Span.Instance.GetInlines = function () {
    /// <returns type="InlineCollection" />
    return this.GetValue(Span.InlinesProperty);
};

//#endregion

Span.Instance._SerializeText = function (str) {
    var inlines = this.GetInlines();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        str = inlines.GetValueAt(i)._SerializeText(str);
    }
    return str;
};
Span.Instance._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Span.InlinesProperty, sender)) {
        if (args.Action === CollectionChangedArgs.Action.Add)
            this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);
        this._NotifyLayoutContainerOnCollectionChanged(sender, args);
    } else {
        this._OnCollectionChanged$super(sender, args);
    }
};

Nullstone.FinishCreate(Span);
//#endregion