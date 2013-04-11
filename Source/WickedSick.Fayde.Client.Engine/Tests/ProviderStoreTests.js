/// <reference path="qunit-1.10.0.d.ts" />
/// <reference path="../Typescript/Core/DependencyObject.ts" />
/// <reference path="../Typescript/Core/Providers/BasicProviderStore.ts" />
var Mock1Property = DependencyProperty.Register("Mock1", function () {
    return String;
}, Fayde.DependencyObject, "Default");
test("Test Basic Provider Storage", function () {
    var d = new Fayde.DependencyObject();
    var store = d._Store;
    store.SetProviders([
        null, 
        new Fayde.Providers.LocalValueProvider(), 
        null, 
        null, 
        null, 
        null, 
        null, 
        new Fayde.Providers.DefaultValueProvider(), 
        null
    ]);
    var val = store.GetValue(Mock1Property);
    strictEqual(val, "Default", "Initial GetValue should return value from default value provider.");
    store.SetValue(Mock1Property, "Modified");
    val = store.GetValue(Mock1Property);
    strictEqual(val, "Modified", "GetValue should return value from local value provider after a SetValue.");
});
//@ sourceMappingURL=ProviderStoreTests.js.map
