define(["require", "exports", "../mocks/TestViewModel"], function(require, exports, TestViewModel) {
    var TestViewModelProvider = (function () {
        function TestViewModelProvider() {
        }
        TestViewModelProvider.prototype.ResolveViewModel = function (route) {
            switch (route.View.toString()) {
                case "/Views/FantasyTeam.fayde":
                    return new TestViewModel(+route.HashParams["id"]);
                    break;
            }
        };
        return TestViewModelProvider;
    })();
    
    return TestViewModelProvider;
});
//# sourceMappingURL=TestViewModelProvider.js.map
