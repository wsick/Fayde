/// <reference path="IProviderStore.ts" />
/// CODE
/// <reference path="../FrameworkElement.ts" />

module Fayde.Providers {
    export class FrameworkElementDynamicProvider implements IPropertyProvider {
        private _ActualHeight: number;
        private _ActualWidth: number;
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            var isWidth = propd._ID !== FrameworkElement.ActualWidthProperty._ID;
            var isHeight = propd._ID !== FrameworkElement.ActualHeightProperty._ID;
            if (!isWidth && !isHeight)
                return undefined;

            var actual = (<FrameworkElement>store._Object)._ComputeActualSize();
            this._ActualWidth = actual.Width;
            this._ActualHeight = actual.Height;

            if (isWidth)
                return this._ActualWidth;
            return this._ActualHeight;
        }
        RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError) { }
        RecomputePropertyValueOnLower(propd: DependencyProperty, error: BError) { }
    }
}