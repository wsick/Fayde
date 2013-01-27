/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="PropertyValueProviders.js"/>

(function (namespace) {
    var TextElement = Nullstone.Create("TextElement", Fayde.DependencyObject);

    TextElement.Instance.Init = function () {
        this.Init$DependencyObject();
        this.AddProvider(new _InheritedPropertyValueProvider(this, _PropertyPrecedence.Inherited));
        this._Font = new Font();
        this._UpdateFont(true);
    };

    //#region Properties

    TextElement.ForegroundProperty = DependencyProperty.RegisterInheritable("Foreground", function () { return Fayde.Media.Brush; }, TextElement, undefined, undefined, { GetValue: function () { return new Fayde.Media.SolidColorBrush(new Color(0, 0, 0)); } }, _Inheritable.Foreground);
    TextElement.FontFamilyProperty = DependencyProperty.RegisterInheritable("FontFamily", function () { return String; }, TextElement, Font.DEFAULT_FAMILY, undefined, undefined, _Inheritable.FontFamily);
    TextElement.FontStretchProperty = DependencyProperty.RegisterInheritable("FontStretch", function () { return String; }, TextElement, Font.DEFAULT_STRETCH, undefined, undefined, _Inheritable.FontStretch);
    TextElement.FontStyleProperty = DependencyProperty.RegisterInheritable("FontStyle", function () { return String; }, TextElement, Font.DEFAULT_STYLE, undefined, undefined, _Inheritable.FontStyle);
    TextElement.FontWeightProperty = DependencyProperty.RegisterInheritable("FontWeight", function () { return new Enum(Fayde.FontWeight); }, TextElement, Font.DEFAULT_WEIGHT, undefined, undefined, _Inheritable.FontWeight);
    TextElement.FontSizeProperty = DependencyProperty.RegisterInheritable("FontSize", function () { return Number; }, TextElement, Font.DEFAULT_SIZE, undefined, undefined, _Inheritable.FontSize);
    TextElement.LanguageProperty = DependencyProperty.RegisterInheritable("Language", function () { return String; }, TextElement, undefined, undefined, undefined, _Inheritable.Language);
    TextElement.TextDecorationsProperty = DependencyProperty.RegisterInheritable("TextDecorations", function () { return new Enum(Fayde.TextDecorations); }, TextElement, Fayde.TextDecorations.None, undefined, undefined, _Inheritable.TextDecorations);

    Nullstone.AutoProperties(TextElement, [
        TextElement.ForegroundProperty,
        TextElement.FontFamilyProperty,
        TextElement.FontStretchProperty,
        TextElement.FontStyleProperty,
        TextElement.FontWeightProperty,
        TextElement.FontSizeProperty,
        TextElement.LanguageProperty,
        TextElement.TextDecorationsProperty
    ]);

    //#endregion

    //#region TextAttributes Methods

    TextElement.Instance.GetBackground = function (selected) { return null; }
    //TextElement.Instance.GetForeground (DP)
    TextElement.Instance.GetFont = function () { return this._Font; };
    TextElement.Instance.GetDirection = function () { return Fayde.FlowDirection.LeftToRight; };
    //TextElement.Instance.GetTextDecorations (DP)

    //#endregion

    TextElement.Instance._SerializeText = function (str) { return str; };
    TextElement.Instance._UpdateFont = function (force) {
        this._Font.Family = this.FontFamily;
        this._Font.Stretch = this.FontStretch;
        this._Font.Style = this.FontStyle;
        this._Font.Weight = this.FontWeight;
        this._Font.Size = this.FontSize;
        return this._Font.IsChanged || force;
    };

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        TextElement.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== TextElement) {
                this._OnPropertyChanged$DependencyObject(args, error);
                return;
            }

            var ivprop = false;
            if (args.Property._ID === TextElement.FontFamilyProperty._ID
                || args.Property._ID === TextElement.FontSizeProperty._ID
                || args.Property._ID === TextElement.FontStretchProperty._ID
                || args.Property._ID === TextElement.FontStyleProperty._ID
                || args.Property._ID === TextElement.FontWeightProperty._ID) {
                this._UpdateFont(false);
                ivprop = true;
            } else if (args.Property._ID === TextElement.ForegroundProperty._ID) {
                ivprop = true;
            }
            if (ivprop)
                this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
            this.PropertyChanged.Raise(this, args);
        };
        TextElement.Instance._OnSubPropertyChanged = function (propd, sender, args) {
            if (propd && propd._ID === TextElement.ForegroundProperty._ID) {
                this.InvalidateProperty(propd);
            } else {
                this._OnSubPropertyChanged$DependencyObject(propd, sender, args);
            }
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        TextElement.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== TextElement) {
                this._OnPropertyChanged$DependencyObject(args, error);
                return;
            }

            if (args.Property._ID === TextElement.FontFamilyProperty._ID
                || args.Property._ID === TextElement.FontSizeProperty._ID
                || args.Property._ID === TextElement.FontStretchProperty._ID
                || args.Property._ID === TextElement.FontStyleProperty._ID
                || args.Property._ID === TextElement.FontWeightProperty._ID) {
                this._UpdateFont(false);
            }
            this.PropertyChanged.Raise(this, args);
        };
    }
    //#endif

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        TextElement.Instance.GetRootHtmlElement = function () {
            if (!this._HtmlEl)
                this.CreateHtmlObject();
            return this._HtmlEl;
        };
        TextElement.Instance.CreateHtmlObject = function () {
            this._HtmlEl = this.CreateHtmlObjectImpl();
        };
        TextElement.Instance.CreateHtmlObjectImpl = function () {
            var container = document.createElement("span");
            container.style.whiteSpace = "nowrap";
            return container;
        };
        TextElement.Instance.ApplyHtmlChange = function (change) {
            var propd = change.Property;
            var rootEl = this.GetRootHtmlElement();
            if (propd._ID === TextElement.FontFamilyProperty._ID) {
                rootEl.style.fontFamily = change.NewValue.toString();
            } else if (propd._ID === TextElement.FontSizeProperty._ID) {
                rootEl.style.fontSize = change.NewValue + "px";
            } else if (propd._ID === TextElement.FontStretchProperty._ID) {
                rootEl.style.fontStretch = change.NewValue;
            } else if (propd._ID === TextElement.FontStyleProperty._ID) {
                rootEl.style.fontStyle = change.NewValue;
            } else if (propd._ID === TextElement.FontWeightProperty._ID) {
                rootEl.style.fontWeight = change.NewValue.toString();
            } else if (propd._ID === TextElement.ForegroundProperty._ID) {
                var brush = change.NewValue;
                if (!brush)
                    brush = this.Foreground;
                this.ApplyForegroundHtml(rootEl, brush);
            }
        };
        TextElement.Instance.ApplyForegroundHtml = function (contentEl, foreground) {
            var ctx = document.createElement("canvas").getContext("2d");
            foreground.SetupBrush(ctx, null);
            contentEl.style.color = foreground.ToHtml5Object();
        };
    }
    //#endif

    namespace.TextElement = Nullstone.FinishCreate(TextElement);
})(Nullstone.Namespace("Fayde.Documents"));

(function (namespace) {
    var TextElementCollection = Nullstone.Create("TextElementCollection", Fayde.DependencyObjectCollection);
    TextElementCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.TextElement;
    };
    namespace.TextElementCollection = Nullstone.FinishCreate(TextElementCollection);
})(Nullstone.Namespace("Fayde.Documents"));