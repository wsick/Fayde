module runner {
    var testModules = [
        ".build/tests/MatrixTests",
        ".build/tests/PrimitivesTests",
        ".build/tests/FormatTests",
        ".build/tests/TypeConverterTests",
        ".build/tests/MarkupExpressionTests",
        ".build/tests/XamlNodeTests",
        ".build/tests/ProviderTests",
        ".build/tests/DependencyPropertyTests",
        ".build/tests/DataTemplateTests",
        ".build/tests/TransformTests",
        ".build/tests/TimelineTests",
        ".build/tests/ItemContainersManagerTests",
        ".build/tests/BindingTests",
        ".build/tests/UriMapperTests",
        ".build/tests/DeepObservableCollectionTests",

        ".build/tests/RouteMapperTests",

        ".build/tests/Markup/Basic",
        ".build/tests/Markup/Controls",
        ".build/tests/Markup/Framework",
        ".build/tests/Markup/Resources",
        ".build/tests/Markup/Media",

        ".build/tests/MVVM/AutoModel"
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
