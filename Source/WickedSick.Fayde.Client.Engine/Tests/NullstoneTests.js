/// <reference path="../Javascript/"/>

test("Create Inherited", function () {
    var Mock7;
    throws(function () { Mock7 = Nullstone.Create("Mock7", Object); }, InvalidOperationException, "Nullstones are only allowed to inherit from other nullstones.");

    var Mock2;
    Mock2 = Nullstone.Create("Mock2", Fayde.DependencyObject);
    Nullstone.FinishCreate(Mock2);
    notEqual(Mock2._BaseClass, null, "_BaseClass must be set.");
});

test("Auto Property", function () {
    var Mock1 = Nullstone.Create("Mock1", Fayde.DependencyObject);
    Mock1.SomeDProperty = DependencyProperty.Register("SomeD", function () { return Number; }, Mock1, null);
    Nullstone.AutoProperties(Mock1, [
        "Test",
        Mock1.SomeDProperty
    ]);
    Nullstone.FinishCreate(Mock1);

    var m = new Mock1();

    //Test basic property
    var propDesc = Nullstone.GetPropertyDescriptor(m, "Test");
    notStrictEqual(propDesc, undefined, "Property Descriptor should exist on Mock1 object.");
    notStrictEqual(propDesc, null, "Property Descriptor should exist on Mock1 object.");
    strictEqual(propDesc.value, null, "Initial property value should be null.");
    ok(propDesc.writable, "Property should be writable.");
    m.Test = 54;
    strictEqual(m.Test, 54, "Test");

    //Test dependency property
    propDesc = Nullstone.GetPropertyDescriptor(m, "SomeD");
    notStrictEqual(propDesc, undefined, "Property Descriptor should exist on Mock1 object.");
    notStrictEqual(propDesc, null, "Property Descriptor should exist on Mock1 object.");
    ok(typeof propDesc.get === "function", "Property Descriptor should contain a get method.");
    ok(typeof propDesc.set === "function", "Property Descriptor should contain a set method.");

    m.SomeD = 27;
    strictEqual(m.SomeD, 27, "SomeD");
});

test("Auto Property Read Only", function () {
    var Mock2 = Nullstone.Create("Mock2", Fayde.DependencyObject);
    Mock2.SomeDProperty = DependencyProperty.RegisterReadOnly("SomeD", function () { return Number; }, Mock2, null);
    Nullstone.AutoPropertiesReadOnly(Mock2, [
        "Test",
        Mock2.SomeDProperty
    ]);
    Nullstone.FinishCreate(Mock2);

    var m = new Mock2();

    //Test basic property
    var propDesc = Nullstone.GetPropertyDescriptor(m, "Test");
    notStrictEqual(propDesc, undefined, "Property Descriptor should exist on Mock2 object.");
    notStrictEqual(propDesc, null, "Property Descriptor should exist on Mock2 object.");
    strictEqual(propDesc.value, null, "Initial property value should be null.");
    strictEqual(propDesc.writable, false, "Property should NOT be writable.");
    m.Test = 54;
    notStrictEqual(m.Test, 54, "Value should not have changed to 54.");
    strictEqual(m.Test, null, "Value should not have changed from 54.");

    //Test dependency property
    propDesc = Nullstone.GetPropertyDescriptor(m, "SomeD");
    notStrictEqual(propDesc, undefined, "Property Descriptor should exist on Mock2 object.");
    notStrictEqual(propDesc, null, "Property Descriptor should exist on Mock2 object.");
    ok(typeof propDesc.get === "function", "Property Descriptor should contain a get method.");
    strictEqual(propDesc.set, undefined, "Property Descriptor should NOT contain a set method.");
    throws(function () { m.$SetValue(Mock2.SomeDProperty, 27); }, InvalidOperationException, "DependencyObject should not allow setting a readonly DP publicly.");
    strictEqual(m.SomeD, null, "Initial value should still be set on DependencyObject.SomeD");
    m.$SetValueInternal(Mock2.SomeDProperty, 27);
    strictEqual(m.SomeD, 27, "SomeD");
});

test("Abstract Property", function () {
    var MockBase1 = Nullstone.Create("MockBase1", Fayde.DependencyObject);
    Nullstone.AbstractProperty(MockBase1, "IsNoisy");
    Nullstone.FinishCreate(MockBase1);

    //Test implementing abstract property
    var Mock3 = Nullstone.Create("Mock3", MockBase1);
    Nullstone.AutoProperty(Mock3, "IsNoisy");
    try {
        Nullstone.FinishCreate(Mock3);
        ok(true, "Creation of Mock3 object should not error.");
    } catch (err) {
        ok(false, "Creation of Mock3 object should not error.");
    }

    //Test invalid non-implementation of abstract property
    var Mock4 = Nullstone.Create("Mock4", MockBase1);
    throws(function () { Nullstone.FinishCreate(Mock4); }, PropertyNotImplementedException, "Creation of Mock4 object should error because the abstract property was not overriden.");
});

test("Property Collision", function () {
    var MockBase2 = Nullstone.Create("MockBase2");
    Nullstone.AutoProperty(MockBase2, "IsMetal");
    Nullstone.FinishCreate(MockBase2);

    var Mock5 = Nullstone.Create("Mock5", MockBase2);
    Nullstone.AutoProperty(Mock5, "IsMetal");
    throws(function () { Nullstone.FinishCreate(Mock5); }, PropertyCollisionException, "Creation of Mock5 object should error because 'IsMetal' property was NOT specified as override.");

    var Mock6 = Nullstone.Create("Mock6", MockBase2);
    Nullstone.AutoProperty(Mock6, "IsMetal", undefined, true);
    try {
        Nullstone.FinishCreate(Mock6);
        ok(true, "Creation of Mock6 object should NOT error because 'IsMetal' property was specified as override.");
    } catch (err) {
        ok(false, "Creation of Mock6 object should NOT error because 'IsMetal' property was specified as override.");
    }
});