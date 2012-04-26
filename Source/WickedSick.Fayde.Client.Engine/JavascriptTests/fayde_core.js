FaydeTest = TestCase("Fayde");

FaydeTest.prototype.testApp = function () {
    var app = new App();
    assertNotNull(app);
};