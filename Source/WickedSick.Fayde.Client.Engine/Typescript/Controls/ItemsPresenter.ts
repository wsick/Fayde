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
        _ElementRoot: Panel;
        private _SPFT: ItemsPanelTemplate;
        private _VSPFT: ItemsPanelTemplate;
        constructor(xobj: ItemsPresenter) {
            super(xobj);
        }

        get StackPanelFallbackTemplate(): ItemsPanelTemplate {
            var spft = this._SPFT;
            if (!spft)
                this._SPFT = spft = new ItemsPanelTemplate({ Type: StackPanel });
            return spft;
        }
        get VirtualizingStackPanelFallbackTemplate(): ItemsPanelTemplate {
            var vspft = this._VSPFT;
            if (!vspft)
                this._VSPFT = vspft = new ItemsPanelTemplate({ Type: VirtualizingStackPanel });
            return vspft;
        }

        _GetDefaultTemplate(): UIElement {
            var xobj = this.XObject;
            var c = xobj.TemplateOwner;
            if (!(c instanceof ItemsControl))
                return null;

            if (this._ElementRoot)
                return this._ElementRoot;

            if (c.ItemsPanel) {
                var root = c.ItemsPanel.GetVisualTree(xobj);
                if (!(root instanceof Panel))
                    throw new InvalidOperationException("The root element of an ItemsPanelTemplate must be a Panel subclass");
                this._ElementRoot = <Panel>root;
            }

            if (!this._ElementRoot) {
                var template: ItemsPanelTemplate;
                if (c instanceof ListBox)
                    template = this.VirtualizingStackPanelFallbackTemplate;
                else
                    template = this.StackPanelFallbackTemplate;
                this._ElementRoot = <Panel>template.GetVisualTree(xobj);
            }

            this._ElementRoot.IsItemsHost = true;
            return this._ElementRoot;
        }
    }
    Nullstone.RegisterType(ItemsPresenterNode, "ItemsPresenterNode");

    export class ItemsPresenter extends FrameworkElement {
        TemplateOwner: ItemsControl;
        XamlNode: ItemsPresenterNode;
        CreateNode(): ItemsPresenterNode { return new ItemsPresenterNode(this); }

        OnApplyTemplate() {
            this.TemplateOwner._SetItemsPresenter(this);
            super.OnApplyTemplate();
        }
    }
    Nullstone.RegisterType(ItemsPresenter, "ItemsPresenter");
}