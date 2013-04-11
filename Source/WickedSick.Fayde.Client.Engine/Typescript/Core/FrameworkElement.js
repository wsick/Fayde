var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="UIElement.ts" />
/// CODE
/// <reference path="../Runtime/Enumerable.ts" />
/// <reference path="../Primitives/size.ts" />
/// <reference path="ResourceDictionary.ts" />
var Fayde;
(function (Fayde) {
    var FENode = (function (_super) {
        __extends(FENode, _super);
        function FENode(xobj) {
                _super.call(this, xobj);
            this.IsLoaded = false;
        }
        FENode.prototype.SetSubtreeNode = function (subtreeNode) {
            var error = new BError();
            if(!subtreeNode.AttachTo(this, error)) {
                error.ThrowException();
            }
            this.SubtreeNode = subtreeNode;
        };
        FENode.prototype.SetIsLoaded = function (value) {
            if(this.IsLoaded === value) {
                return;
            }
            this.IsLoaded = value;
            this.OnIsLoadedChanged(value);
        };
        FENode.prototype.OnIsLoadedChanged = function (newIsLoaded) {
            var res = this.XObject.Resources;
            if(!newIsLoaded) {
                //Raise unloaded event
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                            }
            var enumerator = this.GetVisualTreeEnumerator();
            while(enumerator.MoveNext()) {
                (enumerator.Current).SetIsLoaded(newIsLoaded);
            }
            if(newIsLoaded) {
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                //Raise loaded event
                            }
        };
        FENode.prototype.OnIsAttachedChanged = function (newIsAttached) {
            if(this.SubtreeNode) {
                this.SubtreeNode.SetIsAttached(newIsAttached);
            }
            _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
        };
        FENode.prototype.GetVisualTreeEnumerator = function (direction) {
            if(this.SubtreeNode) {
                if(this.SubtreeNode instanceof Fayde.XamlObjectCollection) {
                    return this.SubtreeNode.GetVisualTreeEnumerator();
                }
                return Fayde.ArrayEx.GetEnumerator([
                    this.SubtreeNode
                ]);
            }
        };
        return FENode;
    })(Fayde.UINode);
    Fayde.FENode = FENode;    
    var FrameworkElement = (function (_super) {
        __extends(FrameworkElement, _super);
        function FrameworkElement() {
                _super.call(this);
            Object.defineProperty(this, "Resources", {
                value: new Fayde.ResourceDictionary(),
                writable: false
            });
        }
        FrameworkElement.prototype.CreateNode = function () {
            return new FENode(this);
        };
        FrameworkElement.prototype._ComputeActualSize = function () {
            return new size();
        };
        return FrameworkElement;
    })(Fayde.UIElement);
    Fayde.FrameworkElement = FrameworkElement;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkElement.js.map
