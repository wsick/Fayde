/// <reference path="../Javascript/Core/DependencyObject.js"/>
/// <reference path="../jsTestDriverAsserts.js"/>
/// <reference path="FaydeAsserts.js"/>

DependencyObjectTest = TestCase("DependencyObjectTests");

DependencyObjectTest.prototype.testBasicValueStorage = function () {
    var TestClass = Nullstone.Create("TestClass", DependencyObject);
    TestClass.SomeProperty = DependencyProperty.Register("Some", function () { return Number; }, TestClass);
    Nullstone.FinishCreate(TestClass);

    var obj = new TestClass();
    obj.$SetValue(TestClass.SomeProperty, 250)
    assertSame("DependencyObject GetValue is not working properly.", 250, obj.$GetValue(TestClass.SomeProperty));
    obj.ClearValue(TestClass.SomeProperty);
    assertSame("DependencyObject ClearValue is not working properly.", undefined, obj.$GetValue(TestClass.SomeProperty));
    assertSame("DependencyObject _ReadLocalValueImpl is not working properly.", undefined, obj._ReadLocalValueImpl(TestClass.SomeProperty));
    assertInstanceOf("DependencyObject ReadLocalValue is not working properly.", UnsetValue, obj.ReadLocalValue(TestClass.SomeProperty));
    obj.$SetValue(TestClass.SomeProperty, null);
    assertSame("DependencyObject GetValue is not saving 'null' properly.", null, obj.$GetValue(TestClass.SomeProperty));

    //Clean up
    DependencyObjectTest.UnregisterProperty(TestClass.SomeProperty);
};

DependencyObjectTest.UnregisterProperty = function (propd) {
    if (DependencyProperty._Registered == null)
        return;

    var typeReg;
    if ((typeReg = DependencyProperty._Registered[propd.OwnerType]) == null)
        return;

    delete typeReg[propd.Name];
};