/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="StackPanel.ts" />
/// <reference path="VirtualizingStackPanel.ts" />
/// <reference path="ItemsControl.ts" />
/// <reference path="ItemsPanelTemplate.ts" />
/// <reference path="ListBox.ts" />

module Fayde.Controls {
    export class ItemsPresenterNode extends FENode {
        XObject: ItemsPresenter;
        private _ElementRoot: Panel;
        private _SPFT: ItemsPanelTemplate;
        private _VSPFT: ItemsPanelTemplate;
        constructor(xobj: ItemsPresenter) {
            super(xobj);
        }

        get ElementRoot(): Panel { return this._ElementRoot; }

        get StackPanelFallbackTemplate(): ItemsPanelTemplate {
            if (!this._SPFT)
                this._SPFT = new ItemsPanelTemplate({ ParseType: StackPanel });
            return this._SPFT;
        }
        get VirtualizingStackPanelFallbackTemplate(): ItemsPanelTemplate {
            if (!this._VSPFT)
                this._VSPFT = new ItemsPanelTemplate({ ParseType: VirtualizingStackPanel });
            return this._VSPFT;
        }

        DoApplyTemplateWithError(error: BError): bool {
            if (this._ElementRoot)
                return false;

            var xobj = this.XObject;
            var ic = xobj.TemplateOwner;
            if (!(ic instanceof ItemsControl))
                return false;

            if (ic.ItemsPanel)
                this._ElementRoot = ic.ItemsPanel.GetVisualTree(xobj);

            if (!this._ElementRoot) {
                var template: ItemsPanelTemplate;
                if (ic instanceof ListBox)
                    template = this.VirtualizingStackPanelFallbackTemplate;
                else
                    template = this.StackPanelFallbackTemplate;
                this._ElementRoot = <Panel>template.GetVisualTree(xobj);
            }

            this._ElementRoot.IsItemsHost = true;
            if (!this.FinishApplyTemplateWithError(this._ElementRoot, error))
                return false;
            ic.XamlNode._SetItemsPresenter(xobj);
            return true;
        }
    }
    Nullstone.RegisterType(ItemsPresenterNode, "ItemsPresenterNode");

    export class ItemsPresenter extends FrameworkElement {
        TemplateOwner: ItemsControl;
        XamlNode: ItemsPresenterNode;
        CreateNode(): ItemsPresenterNode { return new ItemsPresenterNode(this); }

        get ElementRoot(): Panel { return this.XamlNode.ElementRoot; }
    }
    Nullstone.RegisterType(ItemsPresenter, "ItemsPresenter");
}