/// <reference path="../Runtime/TypeManagement.ts" />
/// <reference path="../Navigation/Route.ts" />

module Fayde.MVVM {
    export interface IViewModelProvider {
        ResolveViewModel(route: Fayde.Navigation.Route);
    }
    export var IViewModelProvider_ = Fayde.RegisterInterface<IViewModelProvider>("IViewModelProvider");
}