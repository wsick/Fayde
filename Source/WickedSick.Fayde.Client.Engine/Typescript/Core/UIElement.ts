/// <reference path="DependencyObject.ts" />
/// <reference path="Providers/Enums.ts" />
/// <reference path="Enums.ts" />
/// CODE
/// <reference path="Walkers.ts" />
/// <reference path="Providers/InheritedProviderStore.ts"/>

module Fayde {
    export class UINode extends XamlNode {
        XObject: UIElement;
        constructor(xobj: UIElement) {
            super(xobj);
        }

        VisualParentNode: UINode;

        GetInheritedEnumerator(): IEnumerator {
            return this.GetVisualTreeEnumerator(VisualTreeDirection.Logical);
        }

        OnIsAttachedChanged(newIsAttached: bool) {
            super.OnIsAttachedChanged(newIsAttached);
            //Update total render visibility
            if (!newIsAttached) {
                //cache invalidate hint
                //Remove dirty element from surface
                //If surface focused element === this --> focus element to null on surface
            }
        }
        _ElementAdded(uie: UIElement) {
            uie.XamlNode.VisualParentNode = this;
            //Update uie Total Render+HitTest Visibility
            //Invalidate uie
            this.XObject._Store.PropagateInheritedOnAdd(uie);
            //set loaded to this.IsLoaded
            //Update this Bounds(true)
            //Invalidate this measure
            //LayoutInformation.SetLayoutClip(this, undefined)
            //Clear PreviousConstraint
            //Clear uie render size
            //Update uie transform
            //Update uie projection
            //Invalidate uie measure
            //Invalidate uie arrange
            //if uie has dirtysizehint or uie LastRenderSize !== undefined --> uie.propagateflagup dirtysizeup
        }
        _ElementRemoved(uie: UIElement) {
            //this.Invalidate uie subtree bounds
            uie.XamlNode.VisualParentNode = null;
            //set loaded to false
            //LayoutInformation.SetLayoutSlot(uie, emptySlot);
            //LayoutInformation.SetLayoutClip(uie, undefined);

            //Invalidate this measure

            this.XObject._Store.ClearInheritedOnRemove(uie);
        }
    }
    export class UIElement extends DependencyObject {
        XamlNode: UINode;
        _Store: Providers.InheritedProviderStore;
        CreateStore() {
            var s = new Providers.InheritedProviderStore(this);
            s.SetProviders([null, 
                new Providers.LocalValueProvider(), 
                null,
                null,
                null,
                new Providers.InheritedProvider(),
                null,
                new Providers.DefaultValueProvider(),
                new Providers.AutoCreateProvider()]
            );
            s.SetProviders([null, new Fayde.Providers.LocalValueProvider(), null, null, null, new Fayde.Providers.InheritedProvider(), null, new Fayde.Providers.DefaultValueProvider(), new Fayde.Providers.AutoCreateProvider()]);
            return s;
        }
        CreateNode(): XamlNode {
            return new UINode(this);
        }

        static TagProperty = DependencyProperty.Register("Tag", function () { return Object; }, UIElement);
        static VisibilityProperty = DependencyProperty.RegisterCore("Visibility", function () { return new Enum(Fayde.Visibility); }, UIElement, Fayde.Visibility.Visible);
        static UseLayoutRoundingProperty = DependencyProperty.RegisterInheritable("UseLayoutRounding", function () { return Boolean; }, UIElement, true, undefined, undefined, Providers._Inheritable.UseLayoutRounding);
    }
}