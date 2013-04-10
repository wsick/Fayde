/// <reference path="qunit-1.10.0.d.ts" />
/// <reference path="../Typescript/Core/XamlObject.ts" />

//Test registering/unregistering names
//Test find namescope
//Test absorbing of namescopes
//Test isattached modification
//Test AttachTo/Detach

test("AttachTo", () => {
    var root = new Fayde.XamlObject();
    root.XamlNode.NameScope = new Fayde.NameScope(true);
    root.XamlNode.SetIsAttached(true);
    var child = new Fayde.XamlObject();
    child.XamlNode.SetName("CHILD");
    var error = new BError();
    
    if (!child.XamlNode.AttachTo(root.XamlNode, error)) {
        ok(false, "Error should not happen when attaching child node:" + error.Message);
    }

    strictEqual(child.XamlNode.ParentNode, root.XamlNode, "ParentNode of child needs to be its direct logical parent.");
    strictEqual(child.XamlNode.IsAttached, root.XamlNode.IsAttached, "Child IsAttached should match Parent IsAttached after attaching.");
    
    var ns = root.XamlNode.FindNameScope();
    strictEqual(ns.FindName("CHILD"), child.XamlNode, "Registered child should be returned from FindName on root namescope.");

    var childNs = child.XamlNode.FindNameScope();
    strictEqual(childNs, ns, "Child.FindNameScope should be the same as the root NameScope.");

});

test("Merge NameScopes", () => {
    var root = new Fayde.XamlObject();
    root.XamlNode.NameScope = new Fayde.NameScope(true);
    root.XamlNode.SetIsAttached(true);
    var child = new Fayde.XamlObject();
    child.XamlNode.NameScope = new Fayde.NameScope();
    child.XamlNode.SetName("CHILD");
    var error = new BError();
    
    if (!child.XamlNode.AttachTo(root.XamlNode, error)) {
        ok(false, "Error should not happen when attaching child node:" + error.Message);
    }

    var ns = root.XamlNode.FindNameScope();
    var childNs = child.XamlNode.FindNameScope();
    strictEqual(childNs, ns, "Child.FindNameScope should be the same as the root NameScope because AttachTo merges namescopes if NameScope.IsRoot=false.");

    strictEqual(ns.FindName("CHILD"), child.XamlNode, "Child should be registered in root namescope after merge.");
});

//TODO: Test throws with name collisions