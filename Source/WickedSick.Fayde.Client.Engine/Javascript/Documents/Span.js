/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

(function (namespace) {
    var Span = Nullstone.Create("Span", Inline);

    //#region Properties

    Span._InlinesAutoCreator = {
        GetValue: function (propd, obj) {
            var inlines = new InlineCollection();
            if (obj instanceof Hyperlink)
                inlines._SetIsForHyperlink();
            return inlines;
        }
    };
    Span.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return InlineCollection; }, Span, undefined, undefined, Span._InlinesAutoCreator);

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

    namespace.Span = Nullstone.FinishCreate(Span);
})(window);