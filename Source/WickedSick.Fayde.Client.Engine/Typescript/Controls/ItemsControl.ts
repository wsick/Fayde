/// <reference path="Control.ts" />
/// CODE
/// <reference path="Panel.ts" />
/// <reference path="ItemsPresenter.ts" />
/// <reference path="ItemContainerGenerator.ts" />

module Fayde.Controls {
    export class ItemsControl extends Control {
        private _Presenter: ItemsPresenter;
        ItemContainerGenerator: ItemContainerGenerator;
        constructor() {
            super();
            var icg = new ItemContainerGenerator();
            Object.defineProperty(this, "ItemContainerGenerator", {
                value: icg,
                writable: false
            });
        }

        Items: XamlObjectCollection; //TODO: Implement
        ItemsPanel: ItemsPanelTemplate; //TODO: Implement

        static GetItemsOwner(uie: UIElement): ItemsControl {
            if (!(uie instanceof Panel))
                return null;
            var panel = <Panel>uie;
            if (!panel.IsItemsHost)
                return null;
            var presenter = <ItemsPresenter>panel.TemplateOwner;
            if (!(presenter instanceof ItemsPresenter))
                return null;
            var ic = <ItemsControl>presenter.TemplateOwner;
            if (ic instanceof ItemsControl)
                return ic;
            return null;
        }

        _SetItemsPresenter(presenter: ItemsPresenter) {
            if (this._Presenter)
                this._Presenter.XamlNode._ElementRoot.Children.Clear();

            this._Presenter = presenter;
            this.AddItemsToPresenter(-1, 1, this.Items.Count);
        }
        AddItemsToPresenter(positionIndex: number, positionOffset: number, count: number) {
            //TODO: Implement
        }
    }
    Nullstone.RegisterType(ItemsControl, "ItemsControl");
}