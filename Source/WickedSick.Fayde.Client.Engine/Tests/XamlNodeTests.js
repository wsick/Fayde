/// <reference path="qunit-1.10.0.d.ts" />
/// <reference path="../Typescript/Core/XamlObject.ts" />
//Test registering/unregistering names
//Test find namescope
//Test absorbing of namescopes
//Test isattached modification
//Test AttachTo/Detach
test("AttachTo", function () {
    var root = new Fayde.XamlObject();
    root.XamlNode.NameScope = new Fayde.NameScope();
    root.XamlNode.SetIsAttached(true);
    var child = new Fayde.XamlObject();
    child.XamlNode.Name = "CHILD";
    var error = new BError();
    if(!child.XamlNode.AttachTo(root.XamlNode, error)) {
        ok(false, "Error should not happen when attaching child node:" + error.Message);
    }
    strictEqual(child.XamlNode.ParentNode, root.XamlNode, "ParentNode of child needs to be its direct logical parent.");
    strictEqual(child.XamlNode.IsAttached, root.XamlNode.IsAttached, "Child IsAttached should match Parent IsAttached after attaching.");
    var ns = root.XamlNode.FindNameScope();
    var found = ns.FindName("CHILD");
    strictEqual(found, child.XamlNode, "Registered child should be returned from FindNameScope.");
    //TODO: Haven't tested "NameScope.Absorb"
    });
//@ sourceMappingURL=XamlNodeTests.js.map
