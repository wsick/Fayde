module runner {
    var testModules = [
        ".build/tests/Matrix",
        ".build/tests/Format",
        ".build/tests/TypeConverter",
        ".build/tests/MarkupExpression",
        ".build/tests/XamlNode",
        ".build/tests/Provider",
        ".build/tests/DependencyProperty",
        ".build/tests/DataTemplate",
        ".build/tests/Transform",
        ".build/tests/Timeline",
        ".build/tests/ItemContainersManager",
        ".build/tests/Binding",
        ".build/tests/UriMapper",
        ".build/tests/DeepObservableCollection",

        ".build/tests/RouteMapper",

        ".build/tests/Markup/Basic",
        ".build/tests/Markup/Controls",
        ".build/tests/Markup/Framework",
        ".build/tests/Markup/Resources",
        ".build/tests/Markup/Media",

        ".build/tests/MVVM/AutoModel",

        ".build/tests/Primitives/DateTime",
        
        ".build/tests/Localization/GregorianCalendar",

        ".build/tests/Text/Proxy"
    ];

    Fayde.LoadConfigJson((config, err) => {
        if (err)
            console.warn("Error loading configuration file.", err);

        require(testModules, (...modules: any[]) => {
            for (var i = 0; i < modules.length; i++) {
                modules[i].load();
            }
            QUnit.load();
            QUnit.start();
        });
    });
}
