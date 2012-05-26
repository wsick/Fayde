/// <reference path="../Javascript/Runtime/Nullstone.js"/>
/// <reference path="../Javascript/Core/DependencyProperty.js"/>
/// <reference path="../jsTestDriverAsserts.js"/>

var NullstoneTests = TestCase("NullstoneTests");

NullstoneTests.prototype.testAutoProperty = function () {
    var Mock = Nullstone.Create("Mock", DependencyObject);
    Mock.SomeDProperty = DependencyProperty.Register("SomeD", function () { return Number; }, Mock, null);
    Nullstone.AutoProperties(Mock, [
        "Test",
        Mock.SomeDProperty
    ]);
    Nullstone.FinishCreate(Mock);

    var m = new Mock();

    //Test basic property
    var propDesc = Object.getOwnPropertyDescriptor(m, "Test");
    assertNotUndefined("Property Descriptor should exist on Mock object.", propDesc);
    assertNotNull("Property Descriptor should exist on Mock object.", propDesc);
    assertNull("Initial property value should be null.", propDesc.value);
    assertTrue("Property should be writable.", propDesc.writable);
    m.Test = 54;
    assertSame("Test", 54, m.Test);

    //Test dependency property
    propDesc = Object.getOwnPropertyDescriptor(m, "SomeD");
    assertNotUndefined("Property Descriptor should exist on Mock object.", propDesc);
    assertNotNull("Property Descriptor should exist on Mock object.", propDesc);
    assertFunction("Property Descriptor should contain a get method.", propDesc.get);
    assertFunction("Property Descriptor should contain a set method.", propDesc.set);

    m.SomeD = 27;
    assertSame("SomeD", 27, m.SomeD);
};
NullstoneTests.prototype.testAutoPropertyReadOnly = function () {
    var Mock2 = Nullstone.Create("Mock2", DependencyObject);
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
};
NullstoneTests.prototype.testProperty = function () {
};