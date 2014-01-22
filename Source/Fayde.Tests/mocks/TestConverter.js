var TestConverter = (function () {
    function TestConverter() {
    }
    TestConverter.prototype.Convert = function (value, targetType, parameter, culture) {
        return value;
    };
    TestConverter.prototype.ConvertBack = function (value, targetType, parameter, culture) {
        return value;
    };
    return TestConverter;
})();
Fayde.RegisterType(TestConverter, "window", "http://schemas.test.com");
Fayde.RegisterTypeInterfaces(TestConverter, Fayde.Data.IValueConverter_);
//# sourceMappingURL=TestConverter.js.map
