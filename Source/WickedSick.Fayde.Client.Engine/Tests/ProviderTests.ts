/// <reference path="qunit-1.10.0.d.ts" />
/// <reference path="../Typescript/Controls/Control.ts" />
/// <reference path="../Typescript/Core/DependencyObject.ts" />
/// <reference path="../Typescript/Core/UIElement.ts" />

QUnit.module("Provider Tests");

var Mock1Property = DependencyProperty.Register("Mock1", () => String, Fayde.DependencyObject);
var Mock2Property = DependencyProperty.Register("Mock2", () => String, Fayde.DependencyObject, "Default");

test("Basic", () => {
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

test("Inherited", () => {
    var root = new Fayde.FrameworkElement();
    var child = new Fayde.FrameworkElement();

    root.UseLayoutRounding = false;

    var val = child.UseLayoutRounding;
    strictEqual(val, true, "Inherited property that hasn't been propagated should default to true.");

    var error = new BError();
    ok(root.XamlNode.AttachVisualChild(child, error), "Attaching child to root should not fail: " + error.Message);

    val = child.UseLayoutRounding;
    strictEqual(val, false, "Inherited property should be propagated from root to false.");

    root.ClearValue(Fayde.UIElement.UseLayoutRoundingProperty);
    val = child.UseLayoutRounding;
    strictEqual(val, true, "Inherited property should be reset to true after value at root is cleared.");



    if (Font.DEFAULT_SIZE === 50 || Font.DEFAULT_SIZE === 90 || Font.DEFAULT_SIZE === 120) {
        ok(false, "Further tests are invalid. Default font size cannot be equal to 50, 90, or 120.");
    }
    
    var Controls = Fayde.Controls;
    var root2 = new Controls.Control();
    root2.Template = new Controls.ControlTemplate(Controls.Control, {
        ParseType: Controls.Grid,
        Children: [
            {
                ParseType: Controls.Border,
                Name: "TheBorder"
            }
        ]
    });
    var child2 = new Controls.Control();
    child2.Template = new Controls.ControlTemplate(Controls.Control, {
        ParseType: Controls.Grid
    });
    root2.ApplyTemplate();
    
    strictEqual(root2.FontSize, Font.DEFAULT_SIZE, "Root FontSize should be default.");
    strictEqual(child2.FontSize, Font.DEFAULT_SIZE, "Child FontSize should be default.");

    root2.FontSize = 120;
    strictEqual(root2.FontSize, 120, "Root FontSize should change to 120 after setting local value.");
    var theBorder = <Fayde.Controls.Border>root2.GetTemplateChild("TheBorder");
    theBorder.Child = child2;
    strictEqual(child2.FontSize, 120, "Child FontSize should inherited 120 immediately after attaching.");
    root2.ClearValue(Controls.Control.FontSizeProperty);
    
    child2.FontSize = 50;
    strictEqual(child2.FontSize, 50, "Child FontSize should change to 50 after setting local value.");
    root2.FontSize = 90;
    strictEqual(root2.FontSize, 90, "Root FontSize should change to 90 after setting local value.");

    root2.ClearValue(Controls.Control.FontSizeProperty);
    child2.ClearValue(Controls.Control.FontSizeProperty);
    strictEqual(root2.FontSize, Font.DEFAULT_SIZE, "Root FontSize should be default.");
    strictEqual(child2.FontSize, Font.DEFAULT_SIZE, "Child FontSize should be default.");
    
    root2.FontSize = 90;
    strictEqual(root2.FontSize, 90, "Root FontSize should change to 90 after setting local value.");
    strictEqual(child2.FontSize, 90, "Root FontSize should inherit 90 from Root.");

    child2.FontSize = 50;
    strictEqual(child2.FontSize, 50, "Child FontSize should override inherited with local value 50.");

    child2.ClearValue(Controls.Control.FontSizeProperty);
    strictEqual(child2.FontSize, 90, "Child FontSize should inherit 90 from root after clearing local value.");

    root2.ClearValue(Controls.Control.FontSizeProperty);
    strictEqual(root2.FontSize, Font.DEFAULT_SIZE, "Root FontSize should be default after clearing Root Value.");
    strictEqual(child2.FontSize, Font.DEFAULT_SIZE, "Child FontSize should be default after clearing Root Value.");
    
    root2.FontSize = 90;
    strictEqual(root2.FontSize, 90, "Root FontSize should change to 90 after setting local value.");
    strictEqual(child2.FontSize, 90, "Child FontSize should inherit 90 from Root.");
    theBorder.Child = null;
    strictEqual(child2.FontSize, Font.DEFAULT_SIZE, "Child FontSize should clear inherited 90 from Root immediately after detaching.");
});
test("Styles", () => {
    var root = new Fayde.FrameworkElement();
    var child = new Fayde.FrameworkElement();
    var error = new BError();
    ok(root.XamlNode.AttachVisualChild(child, error), "Attaching child to root should not fail: " + error.Message);

    //Test implicit style
    var val = child.GetValue(Fayde.UIElement.TagProperty);
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

test("DataContext", () => {
    var root = new Fayde.FrameworkElement();
    var child = new Fayde.FrameworkElement();

    //Test inherited DataContext
    var effectiveDataContext = {};

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
});

test("IsEnabled", () => {
    var Controls = Fayde.Controls;
    var root = new Controls.Control();
    root.Template = new Controls.ControlTemplate(Controls.Control, {
        ParseType: Controls.Grid,
        Children: [
            {
                ParseType: Controls.Border,
                Name: "TheBorder"
            }
        ]
    });
    
    var child = new Controls.Control();
    child.Template = new Controls.ControlTemplate(Controls.Control, {
        ParseType: Controls.Grid
    });

    root.ApplyTemplate();
    var theBorder = <Fayde.Controls.Border>root.GetTemplateChild("TheBorder");
    
    theBorder.Child = child;
    
    ok(root.IsEnabled, "Root IsEnabled should default to true.");
    ok(child.IsEnabled, "Child IsEnabled should default to true.");

    root.IsEnabled = false;
    ok(!root.IsEnabled, "Root IsEnabled should be false.");
    ok(!child.IsEnabled, "Child IsEnabled should inherit from Root to false.");

    child.IsEnabled = false;
    ok(!child.IsEnabled, "Child IsEnabled local is false.");

    root.IsEnabled = true;
    ok(root.IsEnabled, "Root IsEnabled should revert to true.");
    ok(!child.IsEnabled, "Child IsEnabled should reveal local value of false after Root IsEnabled reverted back to true.");

    root.IsEnabled = false;
    child.IsEnabled = true;
    ok(!root.IsEnabled, "Root IsEnabled should be false.");
    ok(!child.IsEnabled, "Child IsEnabled local is true, and should inherit from Root IsEnabled false.");

    theBorder.Child = null;
    ok(child.IsEnabled, "Child IsEnabled is no longer in the tree. IsEnabled should be local value true.");
});