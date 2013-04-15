/// <reference path="qunit-1.10.0.d.ts" />
/// <reference path="../Typescript/Core/DependencyObject.ts" />
/// <reference path="../Typescript/Core/Providers/BasicProviderStore.ts" />
/// <reference path="../Typescript/Core/UIElement.ts" />
/// <reference path="../Typescript/Core/Providers/InheritedProvider.ts" />

var Mock1Property = DependencyProperty.RegisterFull("Mock1", () =>{ return String; }, Fayde.DependencyObject, undefined, undefined, { GetValue: () => { return "AutoCreated"; } });
var Mock2Property = DependencyProperty.RegisterFull("Mock2", () => { return String; }, Fayde.DependencyObject, "Default");

test("ProviderStoreTests.BasicProvider", () => {
    var d = new Fayde.DependencyObject();
    var store = d._Store;

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

test("ProviderStoreTests.InheritedProviderStore", () => {
    var root = new Fayde.FrameworkElement();
    var rootStore = root._Store;
    var child = new Fayde.FrameworkElement();
    var childStore = child._Store;

    rootStore.SetValue(Fayde.UIElement.UseLayoutRoundingProperty, false);

    var val;
    val = childStore.GetValue(Fayde.UIElement.UseLayoutRoundingProperty);
    strictEqual(val, true, "Inherited property that hasn't been propagated should default to true.");

    try {
        root.XamlNode.SetSubtreeNode(child.XamlNode);
        ok(true, "Attaching child to root should not fail.");
    } catch (err) {
        ok(false, "Attaching child to root should not fail.");
        return;
    }
    root.XamlNode._ElementAdded(child);
    val = childStore.GetValue(Fayde.UIElement.UseLayoutRoundingProperty);
    strictEqual(val, false, "Inherited property should be propagated from root to false.");
});

test("ProviderStoreTests.FrameworkProviderStore", () => {
    var root = new Fayde.FrameworkElement();
    var rootStore = root._Store;
    var child = new Fayde.FrameworkElement();
    var childStore = child._Store;


    //Test inherited DataContext
    var effectiveDataContext = { };

    rootStore.SetValue(Fayde.FrameworkElement.DataContextProperty, effectiveDataContext);

    var val;
    val = childStore.GetValue(Fayde.FrameworkElement.DataContextProperty);
    strictEqual(val, undefined, "Child DataContext should be undefined before attaching to tree.");
    
    try {
        root.XamlNode.SetSubtreeNode(child.XamlNode);
        ok(true, "Attaching child to root should not fail.");
    } catch (err) {
        ok(false, "Attaching child to root should not fail.");
        return;
    }
    root.XamlNode._ElementAdded(child);
    val = childStore.GetValue(Fayde.FrameworkElement.DataContextProperty);
    strictEqual(val, effectiveDataContext, "Child DataContext should inherit DataContext from root after attaching to tree.");

    rootStore.ClearValue(Fayde.FrameworkElement.DataContextProperty, true);
    val = childStore.GetValue(Fayde.FrameworkElement.DataContextProperty);
    strictEqual(val, undefined, "Child DataContext should be undefined after clearing root DataContext value.");


    //Test implicit style
    //  Set
    //  Clear

    //Test local style
    //  Should override implicit
});