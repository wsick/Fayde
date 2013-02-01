/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE
/// <reference path="InlineCollection.js"/>

(function (namespace) {
    var Span = Nullstone.Create("Span", namespace.Inline);

    //#region Properties

    Span._InlinesAutoCreator = {
        GetValue: function (propd, obj) {
            var inlines = new namespace.InlineCollection();
            if (obj instanceof namespace.Hyperlink)
                inlines._SetIsForHyperlink();
            return inlines;
        }
    };
    Span.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return namespace.InlineCollection; }, Span, undefined, undefined, Span._InlinesAutoCreator);

    Nullstone.AutoProperties(Span, [
        Span.InlinesProperty
    ]);

    //#endregion

    //#region Annotations

    Span.Annotations = {
        ContentProperty: Span.InlinesProperty
    };

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

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Span.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Span) {
                this._OnPropertyChanged$Inline(args, error);
                return;
            }

            if (args.Property._ID === Span.InlinesProperty._ID) {
                this.SetChildrenHtml(args.NewValue);
            }
            this.PropertyChanged.Raise(this, args);
        };
        Span.Instance._OnCollectionChanged = function (sender, args) {
            if (this._PropertyHasValueNoAutoCreate(Span.InlinesProperty, sender)) {
                if (args.IsAdd)
                    this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);
                //this._NotifyLayoutContainerOnCollectionChanged(sender, args);
                this.UpdateHtmlInlines(args);
            } else {
                this._OnCollectionChanged$Inline(sender, args);
            }
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        Span.Instance._OnCollectionChanged = function (sender, args) {
            if (this._PropertyHasValueNoAutoCreate(Span.InlinesProperty, sender)) {
                if (args.IsAdd)
                    this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);
            } else {
                this._OnCollectionChanged$Inline(sender, args);
            }
        };
    }
    //#endif


    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Span.Instance.CreateHtmlObjectImpl = function () {
            return document.createElement("span");
        };
        Span.Instance.GetContentHtmlElement = function () {
            return this._HtmlEl;
        };
        Span.Instance.UpdateHtmlInlines = function (args) {
            if (args.IsCleared) {
                this.ClearChildrenHtml();
            } else if (args.IsAdd) {
                this.AddChildHtml(args.NewValue, args.Index);
            } else if (args.IsRemove) {
                this.RemoveChildHtml(args.NewValue);
            } else if (args.IsReplace) {
                this.ReplaceChildHtml(args.OldValue, args.NewValue);
            }
        };
        Span.Instance.SetChildrenHtml = function (inlines) {
            var contentEl = this.GetContentHtmlElement();
            while (contentEl.hasChildNodes()) {
                contentEl.removeChild(contentEl.lastChild);
            }
            if (!inlines)
                return;
            var len = inlines.GetCount();
            for (var i = 0; i < len; i++) {
                var te = inlines.GetValueAt(i);
                contentEl.appendChild(te.GetRootHtmlElement());
            }
        };
        Span.Instance.AddChildHtml = function (inline, newIndex) {
            var contentEl = this.GetContentHtmlElement();
            var index = 0;
            var curEl = contentEl.firstChild;
            while (curEl && index < newIndex) {
                curEl = curEl.nextSibling;
                index++;
            }
            contentEl.insertBefore(inline.GetRootHtmlElement(), curEl);
        };
        Span.Instance.ReplaceChildHtml = function (oldInline, newInline) {
            var contentEl = this.GetContentHtmlElement();
            contentEl.replaceChild(newInline.GetRootHtmlElement(), oldInline.GetRootHtmlElement());
        };
        Span.Instance.RemoveChildHtml = function (inline) {
            var contentEl = this.GetContentHtmlElement();
            contentEl.removeChild(inline.GetRootHtmlElement());
        };
        Span.Instance.ClearChildrenHtml = function () {
            var contentEl = this.GetContentHtmlElement();
            while (contentEl.hasChildNodes()) {
                contentEl.removeChild(contentEl.lastChild);
            }
        };
    }
    //#endif

    namespace.Span = Nullstone.FinishCreate(Span);
})(Nullstone.Namespace("Fayde.Documents"));