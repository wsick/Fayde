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
        constructor(xobj: ItemsPresenter) {
            super(xobj);
        }

        private _ElementRoot: Panel;
        get ElementRoot(): Panel { return this._ElementRoot; }

        DoApplyTemplateWithError(error: BError): boolean {
            if (this._ElementRoot)
                return false;

            var xobj = this.XObject;
            var ic = xobj.TemplateOwner;
            if (!(ic instanceof ItemsControl))
                return false;

            var er: Panel;
            if (ic.ItemsPanel)
                er = this._ElementRoot = ic.ItemsPanel.GetVisualTree(xobj);
            if (!er)
                er = this._ElementRoot = getFallbackTemplate(ic).GetVisualTree(xobj);

            ItemsControl.SetIsItemsHost(er, true);
            if (!this.FinishApplyTemplateWithError(er, error))
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

        get ItemsControl(): ItemsControl {
            return this.TemplateOwner instanceof ItemsControl ? this.TemplateOwner : null;
        }
        get Panel(): Panel {
            var er = this.XamlNode.ElementRoot;
            return er instanceof Panel ? er : undefined;
        }

        static Get(panel: Panel): ItemsPresenter {
            if (!(panel instanceof Panel))
                return null;
            if (!ItemsControl.GetIsItemsHost(panel))
                return null;
            return panel.TemplateOwner instanceof ItemsPresenter ? <ItemsPresenter>panel.TemplateOwner : null;
        }

        OnItemsAdded(index: number, newItems: any[]) {
            var panel = this.Panel;
            if (!panel)
                return;
            if (panel instanceof VirtualizingPanel) {
                (<VirtualizingPanel>panel).OnItemsAdded(index, newItems);
            } else {
                for (var ic = this.ItemsControl, children = panel.Children, generator = ic.ItemContainersManager.CreateGenerator(index, newItems.length); generator.Generate();) {
                    var container = generator.Current;
                    children.Insert(index + generator.GenerateIndex, <UIElement>container);
                    ic.PrepareContainerForItem(container, generator.CurrentItem);
                }
            }
        }
        OnItemsRemoved(index: number, oldItems: any[]) {
            var panel = this.Panel;
            if (!panel)
                return;
            if (panel instanceof VirtualizingPanel) {
                (<VirtualizingPanel>panel).OnItemsRemoved(index, oldItems);
            } else {
                var icm = this.ItemsControl.ItemContainersManager;
                var children = panel.Children;
                var count = oldItems ? oldItems.length : null;
                if (count == null || count === children.Count) {
                    children.Clear();
                } else {
                    while (count > 0) {
                        children.RemoveAt(index);
                        count--;
                    }
                }
            }
        }
    }
    Fayde.RegisterType(ItemsPresenter, "Fayde.Controls", Fayde.XMLNS);
}