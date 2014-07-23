/// <reference path="DataTemplate.ts" />

module Fayde {
    export class HierarchicalDataTemplate extends DataTemplate {
        constructor() {
            super();
            Object.defineProperty(this, "IsItemTemplateSet", { value: false, writable: false });
            Object.defineProperty(this, "IsItemContainerStyleSet", { value: false, writable: false });
        }

        private _ItemsSource: Data.Binding = null;
        get ItemsSource(): Data.Binding { return this._ItemsSource; }
        set ItemsSource(value: Data.Binding) {
            if (value instanceof Data.Binding)
                this._ItemsSource = value;
        }

        IsItemTemplateSet: boolean;
        private _ItemTemplate: DataTemplate = null;
        get ItemTemplate(): DataTemplate { return this._ItemTemplate; }
        set ItemTemplate(value: DataTemplate) {
            this._ItemTemplate = value;
            Object.defineProperty(this, "IsItemTemplateSet", { value: false, writable: true });
        }

        IsItemContainerStyleSet: boolean;
        private _ItemContainerStyle: Style = null;
        get ItemContainerStyle(): Style { return this._ItemContainerStyle; }
        set ItemContainerStyle(value: Style) {
            this._ItemContainerStyle = value;
            Object.defineProperty(this, "IsItemContainerStyleSet", { value: false, writable: true });
        }
    }
    Fayde.RegisterType(HierarchicalDataTemplate, "Fayde", Fayde.XMLNS);
}