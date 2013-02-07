/// <reference path="../Javascript/"/>

test("Test DependencyObject Basic Value Storage", function () {
    function unregisterProperty(propd) {
        if (DependencyProperty._Registered == null)
            return;

        var typeReg;
        if ((typeReg = DependencyProperty._Registered[propd.OwnerType]) == null)
            return;

        delete typeReg[propd.Name];
    }

    var TestClass = Nullstone.Create("TestClass", Fayde.DependencyObject);
    TestClass.SomeProperty = DependencyProperty.Register("Some", function () { return Number; }, TestClass);
    Nullstone.FinishCreate(TestClass);

    var obj = new TestClass();
    obj.$SetValue(TestClass.SomeProperty, 250)

    strictEqual(obj.$GetValue(TestClass.SomeProperty), 250, "DependencyObject GetValue did not return correct value.");
    obj.$ClearValue(TestClass.SomeProperty);
    strictEqual(obj.$GetValue(TestClass.SomeProperty), undefined, "DependencyObject ClearValue did not clear value.");
    strictEqual(obj._ReadLocalValue(TestClass.SomeProperty), undefined, "DependencyObject _ReadLocalValueImpl should return undefined.");

    ok(obj.$ReadLocalValue(TestClass.SomeProperty) instanceof Fayde.UnsetValue, "DependencyObject ReadLocalValue is not returning 'UnsetValue'.");
    obj.$SetValue(TestClass.SomeProperty, null);
    strictEqual(obj.$GetValue(TestClass.SomeProperty), null, "DependencyObject GetValue is not saving 'null' properly.");

    //Clean up
    unregisterProperty(TestClass.SomeProperty);
});