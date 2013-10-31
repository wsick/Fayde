/// <reference path="scripts/qunit-1.10.0.d.ts" />
/// <reference path="scripts/Fayde.d.ts" />
QUnit.module("Uri Mapper");

test("MapUri", function () {
    var mapper = new Fayde.Navigation.UriMapper();

    var mapping1 = new Fayde.Navigation.UriMapping();
    mapping1.Uri = new Uri("");
    mapping1.MappedUri = new Uri("/Views/Home.fayde");
    mapper.UriMappings.Add(mapping1);

    var mapping2 = new Fayde.Navigation.UriMapping();
    mapping2.Uri = new Uri("/{pageName}");
    mapping2.MappedUri = new Uri("/Views/{pageName}.fayde");
    mapper.UriMappings.Add(mapping2);

    var mapped = mapper.MapUri(new Uri("", UriKind.Relative));
    strictEqual(mapped.toString(), "/Views/Home.fayde", "Default");

    var mapped = mapper.MapUri(new Uri("/Core", UriKind.Relative));
    strictEqual(mapped.toString(), "/Views/Core.fayde", "PageName");
});
//# sourceMappingURL=UriMapperTests.js.map
