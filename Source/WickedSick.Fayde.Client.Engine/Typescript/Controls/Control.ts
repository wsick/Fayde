/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/Providers/ControlProviderStore.ts" />

module Fayde.Controls {
    export class ControlNode extends FENode {
        XObject: Control;
        constructor(xobj: Control) {
            super(xobj);
        }

        TabTo() {
            var xobj = this.XObject;
            return xobj.IsEnabled && xobj.IsTabStop && xobj.Focus();
        }
    }
    Nullstone.RegisterType(ControlNode, "ControlNode");
    export class Control extends FrameworkElement {
        XamlNode: ControlNode;
        _Store: Providers.ControlProviderStore;
        CreateStore(): Providers.ControlProviderStore {
            return new Providers.ControlProviderStore(this);
        }
        CreateNode(): ControlNode {
            var n = new ControlNode(this);
            n.LayoutUpdater.SetContainerMode(true);
            return n;
        }

        IsEnabled: bool;
        IsTabStop: bool;
        TabNavigation: Input.KeyboardNavigationMode;
        TabIndex: number;

        static IsEnabledProperty: DependencyProperty;

        Focus(): bool {
            return App.Instance.MainSurface.Focus(this);
        }
        
        GetDefaultStyle(): Style {
            return undefined;
        }
    }
    Nullstone.RegisterType(Control, "Control");
}