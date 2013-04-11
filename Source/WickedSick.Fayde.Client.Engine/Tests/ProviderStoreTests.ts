/// <reference path="qunit-1.10.0.d.ts" />
/// <reference path="../Typescript/Core/DependencyObject.ts" />
/// <reference path="../Typescript/Core/Providers/BasicProviderStore.ts" />

var Mock1Property = DependencyProperty.RegisterFull("Mock1", () => { return String; }, Fayde.DependencyObject, undefined, undefined, { GetValue: () => { return "AutoCreated"; } });
var Mock2Property = DependencyProperty.RegisterFull("Mock2", () => { return String; }, Fayde.DependencyObject, "Default");

test("ProviderStoreTests.BasicProvider", () => {
    var d = new Fayde.DependencyObject();
    var store = d._Store;
    store.SetProviders([null, new Fayde.Providers.LocalValueProvider(), null, null, null, null, null, new Fayde.Providers.DefaultValueProvider(), new Fayde.Providers.AutoCreateProvider()]);

    var val;

    val = store.GetValue(Mock1Property);
    strictEqual(val, "AutoCreated", "Initial GetValue (Mock1) should return value from auto creator provider.");

    val = store.ReadLocalValue(Mock1Property);
    ok(val instanceof Fayde.UnsetValue, "ReadLocalValue (Mock1) should return UnsetValue since value has not been set.");

    store.SetValue(Mock1Property, "Modified");
    val = store.GetValue(Mock1Property);
    strictEqual(val, "Modified", "GetValue (Mock1) should return value from local value provider after a SetValue.");

    val = store.ClearValue(Mock1Property);
    val = store.GetValue(Mock1Property);
    strictEqual(val, "AutoCreated", "GetValue (Mock1) after ClearValue should revert to using auto creator provider.");


    val = store.GetValue(Mock2Property);
    strictEqual(val, "Default", "Initial GetValue (Mock2) should return value from default value provider.");

    store.SetValue(Mock2Property, "Modified");
    val = store.GetValue(Mock2Property);
    strictEqual(val, "Modified", "GetValue (Mock2) should return value from local value provider after a SetValue.");

    val = store.ClearValue(Mock2Property);
    val = store.GetValue(Mock2Property);
    strictEqual(val, "Default", "GetValue (Mock2) after ClearValue should revert to using default value provider.");
});