/// <reference path="IProviderStore.ts" />
/// <reference path="../../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../FrameworkElement.ts" />

module Fayde.Providers {
    export class FrameworkElementDynamicProvider implements IPropertyProvider {
        private _ActualHeight: number;
        private _ActualWidth: number;
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            var isWidth = propd._ID === FrameworkElement.ActualWidthProperty._ID;
            var isHeight = propd._ID === FrameworkElement.ActualHeightProperty._ID;
            if (isWidth) {
                var feNode = (<FrameworkElement>store._Object).XamlNode;
                return feNode.LayoutUpdater.ActualWidth;
            } else if (isHeight) {
                var feNode = (<FrameworkElement>store._Object).XamlNode;
                return feNode.LayoutUpdater.ActualHeight;
            }
        }
    }
    Nullstone.RegisterType(FrameworkElementDynamicProvider, "FrameworkElementDynamicProvider");
}