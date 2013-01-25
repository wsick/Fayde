/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

(function (namespace) {
    var Run = Nullstone.Create("Run", Inline);

    //#region Properties

    Run.FlowDirectionProperty = DependencyProperty.RegisterInheritable("FlowDirection", function () { return new Enum(FlowDirection); }, Run, FlowDirection.LeftToRight, undefined, undefined, _Inheritable.FlowDirection);
    Run.TextProperty = DependencyProperty.Register("Text", function () { return String; }, Run);

    Nullstone.AutoProperties(Run, [
        Run.FlowDirectionProperty,
        Run.TextProperty
    ]);

    //#endregion

    Run.Instance._SerializeText = function () {
        /// <returns type="String" />
        return this.Text;
    };

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Run.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Run) {
                this._OnPropertyChanged$Inline(args, error);
                return;
            }

            var ivprop = false;
            if (args.Property._ID === Run.TextProperty._ID) {
                ivprop = true;
            }
            if (ivprop)
                this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);

            this.PropertyChanged.Raise(this, args);
        };
    }
    //#endif
    
    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Run.Instance.ApplyHtmlChange = function (change) {
            var propd = change.Property;
            if (propd.OwnerType !== Run) {
                this.ApplyHtmlChange$Inline(change);
                return;
            }

            var propd = change.Property;
            var rootEl = this.GetRootHtmlElement();
            if (propd._ID === Run.TextProperty._ID) {
                rootEl.textContent = change.NewValue;
            }
        };
    }
    //#endif

    namespace.Run = Nullstone.FinishCreate(Run);
})(window);