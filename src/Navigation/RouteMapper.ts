/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../MVVM/IViewModelProvider.ts" />
/// <reference path="RouteMapping.ts" />
/// <reference path="Route.ts" />

module Fayde.Navigation {
    export class RouteMapper extends DependencyObject {
        static RouteMappingsProperty = DependencyProperty.RegisterImmutable<XamlObjectCollection<RouteMapping>>("RouteMappings", () => XamlObjectCollection, RouteMapper);
        static ViewModelProviderProperty = DependencyProperty.Register("ViewModelProvider", () => Fayde.MVVM.IViewModelProvider_, RouteMapper);

        RouteMappings: XamlObjectCollection<RouteMapping>;
        ViewModelProvider: Fayde.MVVM.IViewModelProvider;

        constructor() {
            super();
            RouteMapper.RouteMappingsProperty.Initialize(this);
        }

        MapUri(uri: Uri): Route {
            var enumerator = this.RouteMappings.getEnumerator();
            var mapped: Route;
            while (enumerator.moveNext()) {
                mapped = enumerator.current.MapUri(uri);
                if (mapped) {
                    var vm: any = this.ViewModelProvider ? this.ViewModelProvider.ResolveViewModel(mapped) : null;
                    mapped.DataContext = vm;
                    return mapped;
                }
            }
            return undefined;
        }
    }
    Fayde.RegisterType(RouteMapper, "Fayde.Navigation", Fayde.XMLNS);
    Xaml.Content(RouteMapper, RouteMapper.RouteMappingsProperty);
}