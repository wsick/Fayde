define(["require", "exports", "tests/PrimitivesTests", "tests/TypeConverterTests", "tests/MarkupExpressionTests", "tests/XamlNodeTests", "tests/ProviderTests", "tests/XamlLoadTests", "tests/TransformTests", "tests/TimelineTests", "tests/ItemsControlTests", "tests/BindingTests", "tests/UriMapperTests"], function(require, exports, PrimitivesTests, TypeConverterTests, MarkupExpressionTests, XamlNodeTests, ProviderTests, XamlLoadTests, TransformTests, TimelineTests, ItemsControlTests, BindingTests, UriMapperTests) {
    function run() {
        PrimitivesTests.run();
        TypeConverterTests.run();
        MarkupExpressionTests.run();
        XamlNodeTests.run();
        ProviderTests.run();
        XamlLoadTests.run();
        TransformTests.run();
        TimelineTests.run();
        ItemsControlTests.run();
        BindingTests.run();
        UriMapperTests.run();

        QUnit.load();
        QUnit.start();
    }
    exports.run = run;
});
//# sourceMappingURL=runner.js.map
