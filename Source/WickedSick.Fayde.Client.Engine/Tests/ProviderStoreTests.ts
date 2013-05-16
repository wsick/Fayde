/// <reference path="qunit-1.10.0.d.ts" />
/// <reference path="../Typescript/Core/DependencyObject.ts" />
/// <reference path="../Typescript/Core/UIElement.ts" />

var Mock1Property = DependencyProperty.Register("Mock1", () => String, Fayde.DependencyObject);
var Mock2Property = DependencyProperty.Register("Mock2", () => String, Fayde.DependencyObject, "Default");

test("ProviderStoreTests.BasicProvider", () => {
    var dobj = new Fayde.DependencyObject();

    var val;

    val = dobj.ReadLocalValue(Mock1Property);
    ok(val === Fayde.UnsetValue, "ReadLocalValue (Mock1) should return UnsetValue since value has not been set.");

    dobj.SetValue(Mock1Property, "Modified");
    val = dobj.GetValue(Mock1Property);
    strictEqual(val, "Modified", "GetValue (Mock1) should return value from local value provider after a SetValue.");
    

    val = dobj.GetValue(Mock2Property);
    strictEqual(val, "Default", "Initial GetValue (Mock2) should return value from default value provider.");
    
    dobj.SetValue(Mock2Property, "Modified");
    val = dobj.GetValue(Mock2Property);
    strictEqual(val, "Modified", "GetValue (Mock2) should return value from local value provider after a SetValue.");

    val = dobj.ClearValue(Mock2Property);
    val = dobj.GetValue(Mock2Property);
    strictEqual(val, "Default", "GetValue (Mock2) after ClearValue should revert to using default value provider.");
});

test("ProviderStoreTests.InheritedProviderStore", () => {
    var root = new Fayde.FrameworkElement();
    var child = new Fayde.FrameworkElement();

    root.SetValue(Fayde.UIElement.UseLayoutRoundingProperty, false);

    var val = child.GetValue(Fayde.UIElement.UseLayoutRoundingProperty);
    strictEqual(val, true, "Inherited property that hasn't been propagated should default to true.");

    var error = new BError();
    ok(root.XamlNode.AttachVisualChild(child, error), "Attaching child to root should not fail: " + error.Message);

    val = child.GetValue(Fayde.UIElement.UseLayoutRoundingProperty);
    strictEqual(val, false, "Inherited property should be propagated from root to false.");

    root.ClearValue(Fayde.UIElement.UseLayoutRoundingProperty);
    val = child.GetValue(Fayde.UIElement.UseLayoutRoundingProperty);
    strictEqual(val, true, "Inherited property should be reset to true after value at root is cleared.");
});

test("ProviderStoreTests.FrameworkProviderStore", () => {
    var root = new Fayde.FrameworkElement();
    var child = new Fayde.FrameworkElement();

    //Test inherited DataContext
    var effectiveDataContext = { };

    root.SetValue(Fayde.DependencyObject.DataContextProperty, effectiveDataContext);

    var val = child.GetValue(Fayde.DependencyObject.DataContextProperty);
    strictEqual(val, undefined, "Child DataContext should be undefined before attaching to tree.");
    
    var error = new BError();
    ok(root.XamlNode.AttachVisualChild(child, error), "Attaching child to root should not fail: " + error.Message);

    val = child.GetValue(Fayde.DependencyObject.DataContextProperty);
    strictEqual(val, effectiveDataContext, "Child DataContext should inherit DataContext from root after attaching to tree.");

    root.ClearValue(Fayde.DependencyObject.DataContextProperty);
    val = child.GetValue(Fayde.DependencyObject.DataContextProperty);
    strictEqual(val, undefined, "Child DataContext should be undefined after clearing root DataContext value.");


    //Test implicit style
    val = child.GetValue(Fayde.UIElement.TagProperty);
    strictEqual(val, undefined, "Child Tag should be undefined by default.");
    var visualTreeStyle = new Fayde.Style();
    visualTreeStyle.TargetType = Fayde.FrameworkElement;
    var s1 = new Fayde.Setter();
    s1.Property = Fayde.UIElement.TagProperty;
    s1.Value = "TagValue";
    visualTreeStyle.Setters.Add(s1);
    
    Fayde.Providers.ImplicitStyleBroker.Set(child, Fayde.Providers.StyleMask.VisualTree, [visualTreeStyle, null, null]);
    val = child.GetValue(Fayde.UIElement.TagProperty);
    strictEqual(val, "TagValue", "Child Tag should be \"TagValue\" after setting implicit style.");
    
    Fayde.Providers.ImplicitStyleBroker.Clear(child, Fayde.Providers.StyleMask.VisualTree);
    val = child.GetValue(Fayde.UIElement.TagProperty);
    strictEqual(val, undefined, "Child Tag should be undefined after clearing implicit style.");
    
    Fayde.Providers.ImplicitStyleBroker.Set(child, Fayde.Providers.StyleMask.VisualTree, [visualTreeStyle, null, null]);


    val = child.GetValue(Fayde.UIElement.VisibilityProperty);
    strictEqual(val, Fayde.Visibility.Visible, "Child Visibility should default to Visible.");
    //Test local style
    var localStyle = new Fayde.Style();
    var s2 = new Fayde.Setter();
    s2.Property = Fayde.UIElement.TagProperty;
    s2.Value = "Overridden Value";
    localStyle.Setters.Add(s2);
    var s3 = new Fayde.Setter();
    s3.Property = Fayde.UIElement.VisibilityProperty;
    s3.Value = "Collapsed";
    localStyle.Setters.Add(s3);

    child.Style = localStyle;
    val = child.GetValue(Fayde.UIElement.VisibilityProperty);
    strictEqual(val, Fayde.Visibility.Collapsed, "Child Visibility should have changed to default by local style.");

    val = child.GetValue(Fayde.UIElement.TagProperty);
    strictEqual(val, "Overridden Value", "Child Tag property should be overriden by a new local style over the implicit style.");

    child.Style = new Fayde.Style();
    val = child.GetValue(Fayde.UIElement.VisibilityProperty);
    strictEqual(val, Fayde.Visibility.Visible, "After a new style is applied without Visibility property, Visibility revert to default value.");
});