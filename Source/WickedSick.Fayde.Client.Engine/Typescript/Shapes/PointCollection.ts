/// <reference path="../Core/XamlObjectCollection.ts" />
/// CODE

module Fayde.Shapes {
    export class PointCollection extends XamlObjectCollection {
        _RaiseItemAdded(value: XamlObject, index: number) {
            var shapeNode = <ShapeNode>this.XamlNode.ParentNode;
            shapeNode.XObject._InvalidateNaturalBounds();
        }
        _RaiseItemRemoved(value: XamlObject, index: number) {
            var shapeNode = <ShapeNode>this.XamlNode.ParentNode;
            shapeNode.XObject._InvalidateNaturalBounds();
        }
        _RaiseItemReplaced(removed: XamlObject, added: XamlObject, index: number) {
            var shapeNode = <ShapeNode>this.XamlNode.ParentNode;
            shapeNode.XObject._InvalidateNaturalBounds();
        }
        _RaiseCleared() {
            var shapeNode = <ShapeNode>this.XamlNode.ParentNode;
            shapeNode.XObject._InvalidateNaturalBounds();
        }
    }
    Nullstone.RegisterType(PointCollection, "PointCollection");
}