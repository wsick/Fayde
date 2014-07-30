/// <reference path="qunit.d.ts" />

declare var require;
module runner {
    var testModules = [
        "tests/PrimitivesTests",
        "tests/FormatTests",
        "tests/TypeConverterTests",
        "tests/MarkupExpressionTests",
        "tests/XamlNodeTests",
        "tests/ProviderTests",
        "tests/DependencyPropertyTests",
        "tests/XamlLoadTests",
        "tests/DataTemplateTests",
        "tests/TransformTests",
        "tests/TimelineTests",
        "tests/ItemContainersManagerTests",
        "tests/BindingTests",
        "tests/UriMapperTests",
        "tests/DependencyLoadTests",
        "tests/DeepObservableCollectionTests"
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