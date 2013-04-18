var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Control.ts" />
    /// CODE
    (function (Controls) {
        var ContentControl = (function (_super) {
            __extends(ContentControl, _super);
            function ContentControl() {
                _super.apply(this, arguments);

                this._ContentSetsParent = true;
            }
            ContentControl.ContentProperty = DependencyProperty.RegisterCore("Content", function () {
                return Object;
            }, ContentControl, undefined, function (d, args) {
                (d).OnContentChanged(args.OldValue, args.NewValue);
            });
            ContentControl.ContentTemplateProperty = DependencyProperty.RegisterCore("ContentTemplate", function () {
                return Controls.ControlTemplate;
            }, ContentControl, undefined, function (d, args) {
                (d).OnContentTemplateChanged(args.OldValue, args.NewValue);
            });
            ContentControl.prototype.OnContentChanged = function (oldContent, newContent) {
            };
            ContentControl.prototype.OnContentTemplateChanged = function (oldContentTemplate, newContentTemplate) {
            };
            return ContentControl;
        })(Controls.Control);
        Controls.ContentControl = ContentControl;        
        Nullstone.RegisterType(ContentControl, "ContentControl");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ContentControl.js.map
