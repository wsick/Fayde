/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/Providers/ControlProviderStore.ts" />

module Fayde.Controls {
    export class Control extends FrameworkElement {
        _Store: Providers.ControlProviderStore;
        CreateStore() {
            return new Providers.ControlProviderStore(this);
        }
        static IsEnabledProperty: DependencyProperty;
    }
}