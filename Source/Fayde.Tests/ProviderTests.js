QUnit.module("Provider Tests");

var Mock1Property = DependencyProperty.Register("Mock1", function () {
    return String;
}, Fayde.DependencyObject);
var Mock2Property = DependencyProperty.Register("Mock2", function () {
    return String;
}, Fayde.DependencyObject, "Default");

test("Basic", function () {
    var dobj = new Fayde.DependencyObject();

    var val;

    val = dobj.ReadLocalValue(Mock1Property);
    ok(val === DependencyProperty.UnsetValue, "ReadLocalValue (Mock1) should return UnsetValue since value has not been set.");

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

    var mock2changed = false;
    Mock2Property.ChangedCallback = function (d, args) {
        return mock2changed = true;
    };
    dobj.SetValue(Mock2Property, "Default");
    ok(!mock2changed, "SetValue to the same value as default should not trigger property changed.");
});

test("Inherited", function () {
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
    root2.Template = Fayde.Xaml.Load("<ControlTemplate xmlns=\"" + Fayde.XMLNS + "\" xmlns:x=\"" + Fayde.XMLNSX + "\" TargetType=\"Control\"><Grid><Border x:Name=\"TheBorder\" /></Grid></ControlTemplate>");

    var child2 = new Controls.Control();
    child2.Template = Fayde.Xaml.Load("<ControlTemplate xmlns=\"" + Fayde.XMLNS + "\" xmlns:x=\"" + Fayde.XMLNSX + "\" TargetType=\"Control\"><Grid /></ControlTemplate>");
    root2.ApplyTemplate();

    strictEqual(root2.FontSize, Font.DEFAULT_SIZE, "Root FontSize should be default.");
    strictEqual(child2.FontSize, Font.DEFAULT_SIZE, "Child FontSize should be default.");

    root2.FontSize = 120;
    strictEqual(root2.FontSize, 120, "Root FontSize should change to 120 after setting local value.");
    var theBorder = root2.GetTemplateChild("TheBorder");
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

    var tb1 = new Fayde.Controls.TextBlock();
    tb1.FontSize = 40;
    tb1.Text = "Hey Brad!";

    var autogenRun = tb1.Inlines.GetValueAt(0);
    strictEqual(autogenRun.FontSize, 40, "FontSize set on a TextBlock should propagate to child inlines.");
});
test("Styles", function () {
    var root = new Fayde.FrameworkElement();
    var child = new Fayde.FrameworkElement();
    var error = new BError();
    ok(root.XamlNode.AttachVisualChild(child, error), "Attaching child to root should not fail: " + error.Message);

    var val = child.GetValue(Fayde.UIElement.TagProperty);
    strictEqual(val, undefined, "Child Tag should be undefined by default.");
    var visualTreeStyle = new Fayde.Style();
    visualTreeStyle.TargetType = Fayde.FrameworkElement;
    var s1 = new Fayde.Setter();
    s1.Property = Fayde.UIElement.TagProperty;
    s1.Value = "TagValue";
    visualTreeStyle.Setters.Add(s1);
    var s2 = new Fayde.Setter();
    s2.Property = Fayde.FrameworkElement.MaxWidthProperty;
    s2.Value = Number.POSITIVE_INFINITY;
    visualTreeStyle.Setters.Add(s2);

    var maxwidthchanged = false;
    var oldCallback = Fayde.FrameworkElement.MaxWidthProperty.ChangedCallback;
    Fayde.FrameworkElement.MaxWidthProperty.ChangedCallback = function () {
        return maxwidthchanged = true;
    };

    Fayde.Providers.ImplicitStyleBroker.Set(child, Fayde.Providers.StyleMask.VisualTree, [visualTreeStyle, null, null]);
    val = child.GetValue(Fayde.UIElement.TagProperty);
    strictEqual(val, "TagValue", "Child Tag should be \"TagValue\" after setting implicit style.");

    ok(!maxwidthchanged, "MaxWidth Property was setting to same as default value and should not trigger property changed.");

    Fayde.Providers.ImplicitStyleBroker.Clear(child, Fayde.Providers.StyleMask.VisualTree);
    val = child.GetValue(Fayde.UIElement.TagProperty);
    strictEqual(val, undefined, "Child Tag should be undefined after clearing implicit style.");

    ok(!maxwidthchanged, "MaxWidth Property was setting to same as default value and should not trigger property changed.");
    Fayde.FrameworkElement.MaxWidthProperty.ChangedCallback = oldCallback;

    Fayde.Providers.ImplicitStyleBroker.Set(child, Fayde.Providers.StyleMask.VisualTree, [visualTreeStyle, null, null]);

    val = child.GetValue(Fayde.UIElement.VisibilityProperty);
    strictEqual(val, Fayde.Visibility.Visible, "Child Visibility should default to Visible.");

    var localStyle = new Fayde.Style();
    var s3 = new Fayde.Setter();
    s3.Property = Fayde.UIElement.TagProperty;
    s3.Value = "Overridden Value";
    localStyle.Setters.Add(s3);
    var s4 = new Fayde.Setter();
    s4.Property = Fayde.UIElement.VisibilityProperty;
    s4.Value = "Collapsed";
    localStyle.Setters.Add(s4);
    var s5 = new Fayde.Setter();
    s5.Property = Fayde.FrameworkElement.MaxHeightProperty;
    s5.Value = Number.POSITIVE_INFINITY;
    localStyle.Setters.Add(s5);

    var maxheightchanged = false;
    oldCallback = Fayde.FrameworkElement.MaxHeightProperty.ChangedCallback;
    Fayde.FrameworkElement.MaxHeightProperty.ChangedCallback = function () {
        return maxheightchanged = true;
    };

    child.Style = localStyle;
    val = child.GetValue(Fayde.UIElement.VisibilityProperty);
    strictEqual(val, Fayde.Visibility.Collapsed, "Child Visibility should have changed to default by local style.");

    val = child.GetValue(Fayde.UIElement.TagProperty);
    strictEqual(val, "Overridden Value", "Child Tag property should be overriden by a new local style over the implicit style.");

    ok(!maxheightchanged, "MaxHeight Property was setting to same as default value and should not trigger property changed.");

    child.Style = new Fayde.Style();
    val = child.GetValue(Fayde.UIElement.VisibilityProperty);
    strictEqual(val, Fayde.Visibility.Visible, "After a new style is applied without Visibility property, Visibility revert to default value.");

    ok(!maxheightchanged, "MaxHeight Property was setting to same as default value and should not trigger property changed.");
    Fayde.FrameworkElement.MaxHeightProperty.ChangedCallback = oldCallback;
});

test("DataContext", function () {
    var root = new Fayde.FrameworkElement();
    var child = new Fayde.FrameworkElement();

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

    var root2 = new Fayde.Controls.Border();
    var vm = { Child: {} };
    root2.DataContext = vm;

    var child2 = new Fayde.Controls.Border();
    child2.SetBinding(Fayde.DependencyObject.DataContextProperty, new Fayde.Data.Binding("Child"));
    var grandchild2 = new Fayde.Controls.Border();
    child2.Child = grandchild2;

    root2.Child = child2;

    strictEqual(grandchild2.DataContext, vm.Child, "Child DataContext of Bound DataContext from Inherited DataContext.");
});

test("IsEnabled", function () {
    var Controls = Fayde.Controls;
    var root = new Controls.Control();
    root.Template = Fayde.Xaml.Load("<ControlTemplate xmlns=\"" + Fayde.XMLNS + "\" xmlns:x=\"" + Fayde.XMLNSX + "\" TargetType=\"Control\"><Grid><Border x:Name=\"TheBorder\" /></Grid></ControlTemplate>");

    var child = new Controls.Control();
    child.Template = Fayde.Xaml.Load("<ControlTemplate xmlns=\"" + Fayde.XMLNS + "\" xmlns:x=\"" + Fayde.XMLNSX + "\" TargetType=\"Control\"><Grid /></ControlTemplate>");

    root.ApplyTemplate();
    var theBorder = root.GetTemplateChild("TheBorder");

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
