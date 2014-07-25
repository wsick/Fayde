/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

export function load() {
    QUnit.module("Binding Tests");

    test("BindingExpression with Source", () => {
        var binding = new Fayde.Data.Binding("Value");
        var data = { Value: 12 };
        binding.Source = data;
        var r = new Fayde.Shapes.Rectangle();
        var expr = <Fayde.Data.BindingExpression>r.SetBinding(Fayde.Shapes.Shape.WidthProperty, binding);

        strictEqual(expr.DataItem, data, "DataItem should be the source.");
        strictEqual(expr.ParentBinding, binding, "ParentBinding on expression should be the same as specified binding.");
    });

    test("BindingExpression with DataContext", () => {
        var binding = new Fayde.Data.Binding("Value");

        var vm = { Value: 23 };

        var r = new Fayde.Shapes.Rectangle();
        r.SetBinding(Fayde.Shapes.Shape.WidthProperty, binding);
        r.DataContext = vm;

        equal(r.Width, 23, "Target of binding with datacontext set should have value provided.");
    });

    test("TwoWay + OneWay Binding", () => {
        var Binding = Fayde.Data.Binding;
        var BindingMode = Fayde.Data.BindingMode;

        var vm = new Fayde.MVVM.ViewModelBase();
        var backing = {};
        Object.defineProperty(vm, "SelectedItem", {
            get: function () { return backing; },
            set: function (value) {
                backing = value;
                this.OnPropertyChanged("SelectedItem");
            }
        });

        var sp = new Fayde.Controls.StackPanel();
        sp.DataContext = vm;

        var binding = new Binding("SelectedItem"); //2-way
        binding.Mode = BindingMode.TwoWay;
        var lb = new Fayde.Controls.ListBox();
        lb.SetBinding(Fayde.Controls.Primitives.Selector.SelectedItemProperty, binding);
        sp.Children.Add(lb);

        var binding2 = new Binding("SelectedItem");
        var binding3 = new Binding("Test");
        var tb = new Fayde.Controls.TextBlock();
        tb.SetBinding(Fayde.DependencyObject.DataContextProperty, binding2);
        tb.SetBinding(Fayde.Controls.TextBlock.TextProperty, binding3);
        sp.Children.Add(tb);

        equal(tb.Text, "", "TextBlock Text binding should be broken upon initialization since there is not selected item.");

        var si = { Test: "Hey" };
        lb.ItemsSource = <Fayde.IEnumerable<any>><any>[si];
        Fayde.Data.IsCounterEnabled = true;
        Fayde.Data.DataContextCounter = 0;
        lb.SelectedItem = si;
        Fayde.Data.IsCounterEnabled = false;
        ok(true, "[INFO] Number of BindingExpression DataContext Changes: " + Fayde.Data.DataContextCounter);

        equal(tb.Text, "Hey", "TextBlock Text should match new selected item on ListBox.");
    });

    test("UpdateSource", () => {
        var data = { Value: 10 };

        var binding = new Fayde.Data.Binding("Value");
        binding.Mode = Fayde.Data.BindingMode.TwoWay;
        binding.Source = data;
        binding.UpdateSourceTrigger = Fayde.Data.UpdateSourceTrigger.Explicit;

        var r = new Fayde.Shapes.Rectangle();
        var expr = <Fayde.Data.BindingExpression>r.SetBinding(Fayde.Shapes.Shape.WidthProperty, binding);
        r.Width = 100;

        equal(data.Value, 10, "Explicit Two-Way Binding should not update data until explicitly called.");
        expr.UpdateSource();
        equal(data.Value, 100, "Explicit Two-Way Binding should update after UpdateSource()");
    });
}