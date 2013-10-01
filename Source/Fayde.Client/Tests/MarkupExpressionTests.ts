/// <reference path="qunit-1.10.0.d.ts" />

QUnit.module("Markup Expression Tests");

class TestConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {
        return value;
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        return value;
    }
}
Fayde.RegisterType(TestConverter, {
    Name: "TestConverter",
    Namespace: "window",
    XmlNamespace: "http://schemas.test.com",
    Interfaces: [Fayde.Data.IValueConverter_]
});

test("x:Null", () => {
    var xaml = "<Border xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Tag=\"{x:Null}\"></Border>";
    var border = <Fayde.Controls.Border>Fayde.Xaml.Load(xaml);
    strictEqual(border.Tag, null, "x:Null");
});

test("x:Type", () => {
    var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Tag=\"{x:Type Border}\"></Grid>";
    var grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(xaml);
    strictEqual(grid.Tag, Fayde.Controls.Border, "x:Type");
});

test("x:Static", () => {
    var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Tag=\"{x:Static new TestConverter()}\"></Grid>";
    var grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(xaml);
    ok(grid.Tag instanceof TestConverter, "x:Static");
});

test("TemplateBinding", () => {
    var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<Grid.Resources>"
        + "<Style x:Key=\"SomeStyle\" TargetType=\"Button\">"
        + "<Setter Property=\"Template\">"
        + "<Setter.Value>"
        + "<ControlTemplate TargetType=\"Button\">"
        + "<Border Margin=\"{TemplateBinding Padding}\" />"
        + "</ControlTemplate>"
        + "</Setter.Value>"
        + "</Setter>"
        + "</Style>"
        + "</Grid.Resources>"
        + "</Grid>";
    var grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(xaml);
    var style = <Fayde.Style>grid.Resources.Get("SomeStyle");
    style.Seal();
    var setter = style.Setters.GetValueAt(0);
    var template = <Fayde.Controls.ControlTemplate>setter.ConvertedValue;
    var button = new Fayde.Controls.Button();
    var border = <Fayde.Controls.Border>template.GetVisualTree(button);

    button.Padding = new Thickness(1, 2, 3, 4);
    ok(Thickness.Equals(border.Margin, button.Padding), "After");
});

test("StaticResource", () => {
    var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<Grid.Resources>"
        + "<x:Thickness x:Key=\"TestThickness\">1,2,3,4</x:Thickness>"
        + "</Grid.Resources>"
        + "<Border Margin=\"{StaticResource TestThickness}\" />"
        + "</Grid>";
    var grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(xaml);
    var border = <Fayde.Controls.Border>grid.Children.GetValueAt(0);
    ok(Thickness.Equals(border.Margin, new Thickness(1, 2, 3, 4)), "Value");
});

test("Binding", () => {
    var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Margin=\"{Binding TestPath}\" />";
    var grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(xaml);
    var expr = grid.GetBindingExpression(Fayde.FrameworkElement.MarginProperty);
    ok(expr instanceof Fayde.Data.BindingExpression, "Type");
    var binding = expr.ParentBinding;
    strictEqual(binding.Path.Path, "TestPath", "Implict Path");

    xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Margin=\"{Binding Path=TestPath}\" />";
    grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(xaml);
    expr = grid.GetBindingExpression(Fayde.FrameworkElement.MarginProperty);
    binding = expr.ParentBinding;
    strictEqual(binding.Path.Path, "TestPath", "Explict Path");

    xaml = "<ComboBox xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" xmlns:res=\"http://schemas.test.com\""
        + " SelectedItem=\"{Binding TestPath, Mode=TwoWay, UpdateSourceTrigger=Explicit, Converter={StaticResource testConverter}}\">"
        + "<ComboBox.Resources>"
        + "<res:TestConverter x:Key=\"testConverter\" />"
        + "</ComboBox.Resources>"
        + "</ComboBox>";
    var combobox = <Fayde.Controls.ComboBox>Fayde.Xaml.Load(xaml);
    expr = combobox.GetBindingExpression(Fayde.Controls.Primitives.Selector.SelectedItemProperty);
    binding = expr.ParentBinding;
    strictEqual(binding.Path.Path, "TestPath", "Implicit Path");
    strictEqual(binding.Mode, Fayde.Data.BindingMode.TwoWay, "Mode");
    strictEqual(binding.UpdateSourceTrigger, Fayde.Data.UpdateSourceTrigger.Explicit, "UpdateSourceTrigger");
    ok(binding.Converter instanceof TestConverter, "Converter");

    xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Margin=\"{Binding RelativeSource={RelativeSource TemplatedParent}}\" />";
    grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(xaml);
    expr = grid.GetBindingExpression(Fayde.FrameworkElement.MarginProperty);
    binding = expr.ParentBinding;
    var rs = binding.RelativeSource;
    strictEqual(rs.Mode, Fayde.Data.RelativeSourceMode.TemplatedParent, "Mode");
});

test("EventBinding", () => {
    var methodcalled = false;
    var vm = {
        TestMethod: function (parameter: any) {
            methodcalled = true;
        }
    };

    var xaml = "<UserControl xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<Button Click=\"{EventBinding Command={Binding TestMethod}}\" />"
        + "</UserControl > ";
    var uc = <Fayde.Controls.UserControl>Fayde.Xaml.Load(xaml);
    uc.DataContext = vm;
    var button = <Fayde.Controls.Button>uc.Content;
    button.OnClick();
    ok(methodcalled, "Command.");


    xaml = "<UserControl xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<Button x:Name=\"MyButton\" Click=\"{EventBinding Command={Binding TestMethod}, CommandParameter={Binding ElementName=MyButton}}\" />"
        + "</UserControl > ";
    methodcalled = false;
    vm = {
        TestMethod: function (parameter: any) {
            if (!(parameter instanceof Fayde.Controls.Button))
                throw new Exception("CommandParameter was not transmitted properly.");
            methodcalled = true;
        }
    };
    var uc = <Fayde.Controls.UserControl>Fayde.Xaml.Load(xaml);
    uc.DataContext = vm;
    var button = <Fayde.Controls.Button>uc.Content;
    button.OnClick();
    ok(methodcalled, "Command, CommandParameter.");

    
    xaml = "<UserControl xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<Button x:Name=\"MyButton\" Click=\"{EventBinding TestMethod, CommandParameter={Binding ElementName=MyButton}}\" />"
        + "</UserControl > ";
    methodcalled = false;
    var uc = <Fayde.Controls.UserControl>Fayde.Xaml.Load(xaml);
    uc.DataContext = vm;
    var button = <Fayde.Controls.Button>uc.Content;
    button.OnClick();
    ok(methodcalled, "Implicit Command, CommandParameter.");
});