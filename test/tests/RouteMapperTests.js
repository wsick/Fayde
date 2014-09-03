define(["require", "exports", "../mocks/TestViewModelProvider"], function(require, exports, TestViewModelProvider) {
    function load() {
        QUnit.module("Route Mapper");

        test("MapUri", function () {
            var mapper = new Fayde.Navigation.RouteMapper();
            mapper.ViewModelProvider = new TestViewModelProvider();

            var mapping1 = new Fayde.Navigation.RouteMapping();
            mapping1.Uri = new Uri("");
            mapping1.View = new Uri("/Views/Home.fayde");
            mapper.RouteMappings.Add(mapping1);

            var mapping2 = new Fayde.Navigation.RouteMapping();
            mapping2.Uri = new Uri("/FantasyTeam/{id}");
            mapping2.View = new Uri("/Views/FantasyTeam.fayde");
            mapper.RouteMappings.Add(mapping2);

            var mapped = mapper.MapUri(new Uri("", 1 /* Relative */));
            strictEqual(mapped.View.toString(), "/Views/Home.fayde", "Default");

            var mapped = mapper.MapUri(new Uri("/FantasyTeam/1", 1 /* Relative */));
            strictEqual(mapped.View.toString(), "/Views/FantasyTeam.fayde", "Id");
            strictEqual(mapped.HashParams["id"], "1", "HashParams");
            strictEqual(mapped.DataContext.TeamId, +mapped.HashParams["id"], "ViewModel");
        });
    }
    exports.load = load;
});
//# sourceMappingURL=RouteMapperTests.js.map
