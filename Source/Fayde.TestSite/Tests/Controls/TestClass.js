define(["require", "exports"], function(require, exports) {
    var TestClass = (function () {
        function TestClass() {
            this.Name = "Brad";
            this.Age = 28;
        }
        return TestClass;
    })();
    
    return TestClass;
});
