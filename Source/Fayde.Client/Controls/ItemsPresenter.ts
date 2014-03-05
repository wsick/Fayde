/// <reference path="../Core/FrameworkElement.ts" />
/// <reference path="../Xaml/XamlDocument.ts" />
/// <reference path="../Xaml/XamlLoader.ts" />

module Fayde.Controls {
    var spxd = new Xaml.XamlDocument("<ItemsPanelTemplate xmlns=\"" + Fayde.XMLNS + "\"><StackPanel /></ItemsPanelTemplate>");
    var spft: ItemsPanelTemplate;

    var vspxd = new Xaml.XamlDocument("<ItemsPanelTemplate xmlns=\"" + Fayde.XMLNS + "\"><VirtualizingStackPanel /></ItemsPanelTemplate>");
    var vspft: ItemsPanelTemplate;

    function getFallbackTemplate(ic: ItemsControl): ItemsPanelTemplate {
        if (ic instanceof ListBox)
            return vspft = vspft || <ItemsPanelTemplate>Xaml.Load(vspxd.Document);
        return spft = spft || <ItemsPanelTemplate>Xaml.Load(spxd.Document);
    }

    export class ItemsPresenterNode extends FENode {
        XObject: ItemsPresenter;
        private _ElementRoot: Panel;
        constructor(xobj: ItemsPresenter) {
            super(xobj);
        }
        
        get ElementRoot(): Panel { return this._ElementRoot; }

        DoApplyTemplateWithError(error: BError): boolean {
            if (this._ElementRoot)
                return false;

            var xobj = this.XObject;
            var ic = xobj.TemplateOwner;
            if (!(ic instanceof ItemsControl))
                return false;

            if (ic.ItemsPanel)
                this._ElementRoot = ic.ItemsPanel.GetVisualTree(xobj);
            if (!this._ElementRoot)
                this._ElementRoot = getFallbackTemplate(ic).GetVisualTree(xobj);

            ItemsControl.SetIsItemsHost(this._ElementRoot, true);
            if (!this.FinishApplyTemplateWithError(this._ElementRoot, error))
                return false;
            ic.XamlNode.ItemsPresenter = xobj;
            return true;
        }
    }
    Fayde.RegisterType(ItemsPresenterNode, "Fayde.Controls");

    export class ItemsPresenter extends FrameworkElement {
        TemplateOwner: ItemsControl;
        XamlNode: ItemsPresenterNode;
        CreateNode(): ItemsPresenterNode { return new ItemsPresenterNode(this); }

        get ElementRoot(): Panel { return this.XamlNode.ElementRoot; }
        get ItemsControl(): ItemsControl {
            return this.TemplateOwner instanceof ItemsControl ? this.TemplateOwner : null;
        }

        static Get(panel: Panel): ItemsPresenter {
            if (!panel)
                return null;
            if (!ItemsControl.GetIsItemsHost(panel))
                return null;
            return panel.TemplateOwner instanceof ItemsPresenter ? <ItemsPresenter>panel.TemplateOwner : null;
        }
    }
    Fayde.RegisterType(ItemsPresenter, "Fayde.Controls", Fayde.XMLNS);
}