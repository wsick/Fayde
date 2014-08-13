/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />
/// <amd-dependency path="../mocks/TestControl" />
define(["require", "exports", "../mocks/TestControl"], function(require, exports) {
    function run() {
        QUnit.module("Xaml Load Tests");

        test("Valid XAML Document", function () {
            try  {
                var xaml = "<Border />";
                var root = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
                ok(false, "An error should let us know that there is no valid default namespace.");
            } catch (err) {
                ok(err instanceof XamlParseException, "An error should let us know that there is no valid default namespace.");
            }
        });

        test("Basic Load", function () {
            var xaml = "<Border xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" />";
            var root = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);

            strictEqual(root.constructor, Fayde.Controls.Border, "Root Object should be a Border.");
            equal(root.Child, null, "Border should not have a child.");
        });

        test("Basic attribute", function () {
            var xaml = "<TextBlock xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Text=\"Testing!\" HorizontalAlignment=\"Right\" />";
            var root = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);

            strictEqual(root.Text, "Testing!", "TextBlock should have Text property set to 'Testing!'.");
            strictEqual(root.HorizontalAlignment, 2 /* Right */, "Enum Attribute");
        });

        test("Simple tag", function () {
            var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<StackPanel.Background>" + "<SolidColorBrush>" + "<SolidColorBrush.Color>" + "<Color>#AABBCC</Color>" + "</SolidColorBrush.Color>" + "</SolidColorBrush>" + "</StackPanel.Background>" + "</StackPanel>";
            var sp = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            var bg = sp.Background;
            strictEqual(bg.Color.ToHexStringNoAlpha(), "#aabbcc", "Color");
        });

        test("Empty property value", function () {
            var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<StackPanel.DataContext>" + "<!-- someone commented out -->" + "</StackPanel.DataContext>" + "</StackPanel>";
            try  {
                var sp = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
                ok(true);
            } catch (err) {
                ok(false, err);
            }
        });

        test("Enum tag", function () {
            var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<StackPanel.Orientation>" + "<Orientation>Horizontal</Orientation>" + "</StackPanel.Orientation>" + "</StackPanel>";
            var sp = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            strictEqual(sp.Orientation, 0 /* Horizontal */, "Orientation");
        });

        test("Border with Child", function () {
            var xaml = "<Border xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\"><TextBlock Text=\"Hey!\" /></Border>";
            var root = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            var child = root.Child;
            strictEqual(child.constructor, Fayde.Controls.TextBlock, "Border Child should be a TextBlock.");
            strictEqual(child.Text, "Hey!", "Border Child should have Text property set to 'Hey!'");
        });

        test("Panel with Children", function () {
            var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\"><Border /><TextBlock /></StackPanel>";
            var root = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            strictEqual(root.Children.Count, 2, "There should be 2 children in StackPanel.");
            var child1 = root.Children.GetValueAt(0);
            var child2 = root.Children.GetValueAt(1);
            strictEqual(child1.constructor, Fayde.Controls.Border, "First child should be a Border.");
            strictEqual(child2.constructor, Fayde.Controls.TextBlock, "Second child should be a TextBlock.");
        });

        test("ContentControl", function () {
            var xaml = "<CheckBox xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">Hey</CheckBox>";
            var checkbox = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            strictEqual(checkbox.Content, "Hey", "Text Content");
        });

        test("TextBlock Text", function () {
            var xaml = "<TextBlock xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">Hey</TextBlock>";
            var tb = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            strictEqual(tb.Text, "Hey", "Text Content");
        });

        test("FrameworkElement Resources", function () {
            var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<StackPanel.Resources>" + "<x:Thickness x:Key=\"SomeThickness\">1,2,3,4</x:Thickness>" + "</StackPanel.Resources>" + "</StackPanel>";
            var root = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            var resources = root.Resources;
            ok(resources.Contains("SomeThickness"), "Resources should contain a resource with a key 'SomeThickness'");
            var thickness = resources.Get("SomeThickness");
            strictEqual(thickness.Left, 1, "Thickness.Left must equal 1 and not \"1\".");
            strictEqual(thickness.Top, 2, "Thickness.Top must equal 2 and not \"2\".");
            strictEqual(thickness.Right, 3, "Thickness.Right must equal 3 and not \"3\".");
            strictEqual(thickness.Bottom, 4, "Thickness.Bottom must equal 4 and not \"4\".");
        });

        test("Style", function () {
            var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<StackPanel.Resources>" + "<Style x:Key=\"SomeStyle\" TargetType=\"Button\">" + "<Setter Property=\"Margin\" Value=\"1\" />" + "</Style>" + "</StackPanel.Resources>" + "</StackPanel>";
            var root = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);

            var resources = root.Resources;
            var style = resources.Get("SomeStyle");
            style.Seal();
            strictEqual(style.TargetType, Fayde.Controls.Button, "TargetType on Style should be set to Button.");
            var setters = style.Setters;
            strictEqual(setters.Count, 1, "There should be 1 setter in the Style.");
            var setter = setters.GetValueAt(0);
            strictEqual(setter.Property, Fayde.FrameworkElement.MarginProperty, "Setter Property should be Margin property.");
            ok(Thickness.Equals(setter.ConvertedValue, new Thickness(1, 1, 1, 1)), "Setter Value should be a Thickness (1, 1, 1, 1).");

            xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<StackPanel.Resources>" + "<Style x:Key=\"SomeStyle\">" + "<Setter Property=\"Margin\" Value=\"1\" />" + "</Style>" + "</StackPanel.Resources>" + "</StackPanel>";
            try  {
                root = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
                ok(false, "Loading a style without a TargetType should fail.");
            } catch (err) {
                ok(err instanceof XamlParseException, "Error from loading a Style without a TargetType should be a XamlParseException.");
                strictEqual(err.Message, "Style must have a TargetType.");
            }
        });

        test("Setter+Template Binding", function () {
            var xaml = "<CheckBox xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<CheckBox.Style>" + "<Style TargetType=\"CheckBox\">" + "<Setter Property=\"HorizontalContentAlignment\" Value=\"Right\" />" + "<Setter Property=\"Template\">" + "<Setter.Value>" + "<ControlTemplate TargetType=\"CheckBox\">" + "<ContentPresenter HorizontalAlignment=\"{TemplateBinding HorizontalContentAlignment}\" />" + "</ControlTemplate>" + "</Setter.Value>" + "</Setter>" + "</Style>" + "</CheckBox.Style>" + "</CheckBox>";

            var checkbox = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            checkbox.ApplyTemplate();
            var cp = Fayde.VisualTreeHelper.GetChild(checkbox, 0);
            strictEqual(cp.HorizontalAlignment, 2 /* Right */, "HorizontalAlignment");

            xaml = "<CheckBox xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<CheckBox.Style>" + "<Style TargetType=\"CheckBox\">" + "<Setter Property=\"BorderThickness\" Value=\"1\" />" + "<Setter Property=\"Template\">" + "<Setter.Value>" + "<ControlTemplate TargetType=\"CheckBox\">" + "<Rectangle StrokeThickness=\"{TemplateBinding BorderThickness}\" />" + "</ControlTemplate>" + "</Setter.Value>" + "</Setter>" + "</Style>" + "</CheckBox.Style>" + "</CheckBox>";
            checkbox = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            checkbox.ApplyTemplate();
            var r = Fayde.VisualTreeHelper.GetChild(checkbox, 0);
            strictEqual(r.StrokeThickness, 1, "StrokeThickness");
        });

        test("HierarchicalDataTemplate", function () {
            var xaml = "<HierarchicalDataTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" ItemsSource=\"{Binding SomePath}\">" + "<Grid></Grid>" + "</HierarchicalDataTemplate>";

            var hdt;
            try  {
                hdt = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            } catch (err) {
                ok(false, "Loading a HierarchicalDataTemplate should not error. " + err.toString());
            }
            strictEqual(hdt.constructor, Fayde.HierarchicalDataTemplate, "Resulting object should be a HierarchicalDataTemplate.");

            ok(hdt.ItemsSource instanceof Fayde.Data.Binding, "HierarchicalDataTemplate.ItemsSource should be set to a Binding.");

            var visual = hdt.GetVisualTree(null);
            strictEqual(visual.constructor, Fayde.Controls.Grid, "Root visual from created visual tree should be a Grid.");
        });

        test("ControlTemplate", function () {
            var xaml = "<ControlTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<Grid></Grid>" + "</ControlTemplate>";

            var ct;
            try  {
                ct = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
                ok(false, "Loading a ControlTemplate should error if no TargetType is specified.");
            } catch (err) {
                ok(err instanceof XamlParseException, "Loading a ControlTemplate should error if no TargetType is specified.");
            }

            xaml = "<ControlTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" TargetType=\"Control\">" + "<Grid></Grid>" + "</ControlTemplate>";

            try  {
                ct = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
                ok(true, "Loading a ControlTemplate with a TargetType should succeed.");
            } catch (err) {
                ok(false, "Loading a ControlTemplate with a TargetType should succeed.");
            }

            strictEqual(ct.constructor, Fayde.Controls.ControlTemplate, "Template should be a ControlTemplate.");
            strictEqual(ct.TargetType, Fayde.Controls.Control, "ControlTemplate.TargetType should be Control.");

            var visual = ct.GetVisualTree(null);
            strictEqual(visual.constructor, Fayde.Controls.Grid, "Root visual from created visual tree should be a Grid.");
        });

        test("ItemsPanelTemplate", function () {
            var xaml = "<ItemsPanelTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<Border />" + "</ItemsPanelTemplate>";

            var ipt;
            try  {
                ipt = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
                var tempPanel = ipt.GetVisualTree(null);
                ok(false, "Getting the visual tree for an ItemsPanelTemplate with a non-Panel root visual should error.");
            } catch (err) {
                ok(err instanceof XamlParseException, "Getting the visual tree for an ItemsPanelTemplate with a non-Panel root visual should error.");
            }

            xaml = "<ItemsPanelTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<Grid></Grid>" + "</ItemsPanelTemplate>";

            try  {
                ipt = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            } catch (err) {
                ok(false, "Loading a ItemsPanelTemplate should not error. " + err.toString());
            }
            strictEqual(ipt.constructor, Fayde.Controls.ItemsPanelTemplate, "Resulting object should be a ItemsPanelTemplate.");

            var visual = ipt.GetVisualTree(null);
            strictEqual(visual.constructor, Fayde.Controls.Grid, "Root visual from created visual tree should be a Grid.");
        });

        test("VisualStateManager", function () {
            var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<VisualStateManager.VisualStateGroups>" + "<VisualStateGroup x:Name=\"CommonStates\">" + "<VisualState x:Name=\"Normal\" />" + "<VisualState x:Name=\"Disabled\">" + "    <!-- composite controls will gain focus and visualize it -->" + "</VisualState>" + "</VisualStateGroup>" + "</VisualStateManager.VisualStateGroups>" + "</Grid>";

            var root = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            var groups = Fayde.Media.VSM.VisualStateManager.GetVisualStateGroups(root);
            strictEqual(groups.constructor, Fayde.Media.VSM.VisualStateGroupCollection, "VisualStateGroups on Grid should be a VisualStateGroupCollection.");
            strictEqual(groups.Count, 1, "There should be 1 VisualStateGroup in collection.");
            var states = groups.GetValueAt(0).States;
            strictEqual(states.Count, 2);
            var storyboard = states.GetValueAt(0).Storyboard;
            ok(storyboard == null || storyboard instanceof Fayde.Media.Animation.Storyboard);
            storyboard = states.GetValueAt(1).Storyboard;
            ok(storyboard == null || storyboard instanceof Fayde.Media.Animation.Storyboard);
        });

        test("Events", function () {
            var xaml = "<test:TestControl xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" xmlns:test=\"http://schemas.test.com/\">" + "<test:TestControl.Content>" + "<Button Click=\"TestCallback\" />" + "</test:TestControl.Content>" + "</test:TestControl>";
            var tc = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            var button = tc.Content;
            button.Click.Raise(button, new Fayde.RoutedEventArgs());
            ok(tc.CallbackFired, "Raise");
        });
    }
    exports.run = run;
});
//# sourceMappingURL=XamlLoadTests.js.map
