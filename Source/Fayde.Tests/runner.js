define(["require", "exports", "tests/PrimitivesTests", "tests/FormatTests", "tests/TypeConverterTests", "tests/MarkupExpressionTests", "tests/XamlNodeTests", "tests/ProviderTests", "tests/DependencyPropertyTests", "tests/XamlLoadTests", "tests/DataTemplateTests", "tests/TransformTests", "tests/TimelineTests", "tests/ItemContainersManagerTests", "tests/BindingTests", "tests/UriMapperTests", "tests/DependencyLoadTests", "tests/DeepObservableCollectionTests"], function(require, exports, PrimitivesTests, FormatTests, TypeConverterTests, MarkupExpressionTests, XamlNodeTests, ProviderTests, DependencyPropertyTests, XamlLoadTests, DataTemplateTests, TransformTests, TimelineTests, ItemContainersManagerTests, BindingTests, UriMapperTests, DependencyLoadTests, DeepObservableCollectionTests) {
    function run() {
        PrimitivesTests.run();
        FormatTests.run();
        TypeConverterTests.run();
        MarkupExpressionTests.run();
        XamlNodeTests.run();
        ProviderTests.run();
        DependencyPropertyTests.run();
        XamlLoadTests.run();
        DataTemplateTests.run();
        TransformTests.run();
        TimelineTests.run();
        ItemContainersManagerTests.run();
        BindingTests.run();
        UriMapperTests.run();
        DependencyLoadTests.run();
        DeepObservableCollectionTests.run();

        QUnit.load();
        QUnit.start();
    }
    exports.run = run;
});
//# sourceMappingURL=runner.js.map
