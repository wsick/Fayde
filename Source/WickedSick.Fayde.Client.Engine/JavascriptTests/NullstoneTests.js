/// <reference path="../Javascript/Runtime/Nullstone.js"/>
/// <reference path="../Javascript/Core/DependencyProperty.js"/>
/// <reference path="../jsTestDriverAsserts.js"/>

var NullstoneTests = TestCase("NullstoneTests");

NullstoneTests.prototype.testCreateInherited = function () {
    var Mock7;
    assertException("Nullstones are only allowed to inherit from other nullstones.", function () { Mock7 = Nullstone.Create("Mock7", Object); }, "InvalidOperationException");
};

NullstoneTests.prototype.testAutoProperty = function () {
    var Mock1 = Nullstone.Create("Mock1", Fayde.DependencyObject);
    Mock1.SomeDProperty = DependencyProperty.Register("SomeD", function () { return Number; }, Mock1, null);
    Nullstone.AutoProperties(Mock1, [
        "Test",
        Mock1.SomeDProperty
    ]);
    Nullstone.FinishCreate(Mock1);

    var m = new Mock1();

    //Test basic property
    var propDesc = Object.getOwnPropertyDescriptor(m, "Test");
    assertNotUndefined("Property Descriptor should exist on Mock1 object.", propDesc);
    assertNotNull("Property Descriptor should exist on Mock1 object.", propDesc);
    assertNull("Initial property value should be null.", propDesc.value);
    assertTrue("Property should be writable.", propDesc.writable);
    m.Test = 54;
    assertSame("Test", 54, m.Test);

    //Test dependency property
    propDesc = Object.getOwnPropertyDescriptor(m, "SomeD");
    assertNotUndefined("Property Descriptor should exist on Mock1 object.", propDesc);
    assertNotNull("Property Descriptor should exist on Mock1 object.", propDesc);
    assertFunction("Property Descriptor should contain a get method.", propDesc.get);
    assertFunction("Property Descriptor should contain a set method.", propDesc.set);

    m.SomeD = 27;
    assertSame("SomeD", 27, m.SomeD);
};
NullstoneTests.prototype.testAutoPropertyReadOnly = function () {
    var Mock2 = Nullstone.Create("Mock2", Fayde.DependencyObject);
    Mock2.SomeDProperty = DependencyProperty.RegisterReadOnly("SomeD", function () { return Number; }, Mock2, null);
    Nullstone.AutoPropertiesReadOnly(Mock2, [
        "Test",
        Mock2.SomeDProperty
    ]);
    Nullstone.FinishCreate(Mock2);

    var m = new Mock2();

    //Test basic property
    var propDesc = Object.getOwnPropertyDescriptor(m, "Test");
    assertNotUndefined("Property Descriptor should exist on Mock2 object.", propDesc);
    assertNotNull("Property Descriptor should exist on Mock2 object.", propDesc);
    assertNull("Initial property value should be null.", propDesc.value);
    assertFalse("Property should NOT be writable.", propDesc.writable);
    m.Test = 54;
    assertNull("Value should not have changed.", m.Test);

    //Test dependency property
    propDesc = Object.getOwnPropertyDescriptor(m, "SomeD");
    assertNotUndefined("Property Descriptor should exist on Mock2 object.", propDesc);
    assertNotNull("Property Descriptor should exist on Mock2 object.", propDesc);
    assertFunction("Property Descriptor should contain a get method.", propDesc.get);
    assertUndefined("Property Descriptor should NOT contain a set method.", propDesc.set);
    assertException("DependencyObject should not allow setting a readonly DP publicly.", function () { m.$SetValue(Mock2.SomeDProperty, 27); }, "InvalidOperationException");
    assertNull("Initial value should still be set on DependencyObject.SomeD", m.SomeD);
    m.$SetValueInternal(Mock2.SomeDProperty, 27);
    assertSame("SomeD", 27, m.SomeD);
};
NullstoneTests.prototype.testAbstractProperty = function () {
    var MockBase1 = Nullstone.Create("MockBase1", Fayde.DependencyObject);
    Nullstone.AbstractProperty(MockBase1, "IsNoisy");
    Nullstone.FinishCreate(MockBase1);

    //Test implementing abstract property
    var Mock3 = Nullstone.Create("Mock3", MockBase1);
    Nullstone.AutoProperty(Mock3, "IsNoisy");
    assertNoException("Creation of Mock3 object should not error.", function () { Nullstone.FinishCreate(Mock3); });

    //Test invalid non-implementation of abstract property
    var Mock4 = Nullstone.Create("Mock4", MockBase1);
    assertException("Creation of Mock4 object should error because the abstract property was not overriden.", function () { Nullstone.FinishCreate(Mock4); }, "PropertyNotImplementedException");
};
NullstoneTests.prototype.testPropertyCollision = function () {
    var MockBase2 = Nullstone.Create("MockBase2");
    Nullstone.AutoProperty(MockBase2, "IsMetal");
    Nullstone.FinishCreate(MockBase2);

    var Mock5 = Nullstone.Create("Mock5", MockBase2);
    Nullstone.AutoProperty(Mock5, "IsMetal");
    assertException("Creation of Mock5 object should error because 'IsMetal' property was NOT specified as override.", function () { Nullstone.FinishCreate(Mock5); }, "PropertyCollisionException");

    var Mock6 = Nullstone.Create("Mock6", MockBase2);
    Nullstone.AutoProperty(Mock6, "IsMetal", undefined, true);
    assertNoException("Creation of Mock6 object should NOT error because 'IsMetal' property was specified as override.", function () { Nullstone.FinishCreate(Mock6); });
};