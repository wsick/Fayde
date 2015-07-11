//Test registering/unregistering names
//Test find namescope
//Test absorbing of namescopes
//Test isattached modification
//Test AttachTo/Detach

export function load() {
    QUnit.module("XamlNode");

    test("AttachTo & Detach", () => {
        var root = new Fayde.XamlObject();
        root.XamlNode.NameScope = new Fayde.NameScope(true);
        root.XamlNode.SetIsAttached(true);
        var child = new Fayde.XamlObject();
        child.XamlNode.SetName("CHILD");

        var error = new BError();
        ok(child.XamlNode.AttachTo(root.XamlNode, error), "Error should not happen when attaching child node:" + error.Message);

        strictEqual(child.XamlNode.ParentNode, root.XamlNode, "ParentNode of child needs to be its direct logical parent.");
        strictEqual(child.XamlNode.IsAttached, root.XamlNode.IsAttached, "Child IsAttached should match Parent IsAttached after attaching.");

        var ns = root.XamlNode.FindNameScope();
        strictEqual(ns.FindName("CHILD"), child.XamlNode, "Registered child should be returned from FindName on root namescope.");

        var childNs = child.XamlNode.FindNameScope();
        strictEqual(childNs, ns, "ChildNode.FindNameScope should be the same as the root NameScope.");

        child.XamlNode.Detach();
        ok(!child.XamlNode.IsAttached, "Child Node should be IsAttached=false after being detached.");
        equal(child.XamlNode.FindNameScope(), null, "Child Node should no longer have a namescope after being detached.");
        equal(child.XamlNode.ParentNode, null, "Child Node should no longer have a parent node after being detached.");
    });

    test("Merge NameScopes", () => {
        var root = new Fayde.XamlObject();
        root.XamlNode.NameScope = new Fayde.NameScope(true);
        root.XamlNode.SetIsAttached(true);
        var child = new Fayde.XamlObject();
        child.XamlNode.NameScope = new Fayde.NameScope();
        child.XamlNode.SetName("CHILD");

        var error = new BError();
        ok(child.XamlNode.AttachTo(root.XamlNode, error), "Error should not happen when attaching child node:" + error.Message);

        var ns = root.XamlNode.FindNameScope();
        var childNs = child.XamlNode.FindNameScope();
        strictEqual(childNs, ns, "Child.FindNameScope should be the same as the root NameScope because AttachTo merges namescopes if NameScope.IsRoot=false.");

        strictEqual(ns.FindName("CHILD"), child.XamlNode, "Child should be registered in root namescope after merge.");
    });

    test("Child Root NameScope", () => {
        var root = new Fayde.XamlObject();
        root.XamlNode.NameScope = new Fayde.NameScope(true);
        root.XamlNode.SetIsAttached(true);

        var child = new Fayde.XamlObject();
        child.XamlNode.NameScope = new Fayde.NameScope(true);
        child.XamlNode.SetName("CHILD");

        var error = new BError();
        ok(child.XamlNode.AttachTo(root.XamlNode, error), "Error should not happen when attaching child node:" + error.Message);

        var childNs = child.XamlNode.FindNameScope();
        notStrictEqual(childNs, root.XamlNode.FindNameScope(), "Child NameScope should be absorbed by parent on attach when IsRoot=true.");
        strictEqual(childNs.FindName("CHILD"), child.XamlNode, "Child should be registered in its own namescope after merge.");

        child.XamlNode.Detach();
        strictEqual(childNs.FindName("CHILD"), child.XamlNode, "Child should be still be registered in its own namescope after detach.");
    });

    test("Name Collision", () => {
        var root = new Fayde.XamlObject();
        root.XamlNode.NameScope = new Fayde.NameScope(true);
        root.XamlNode.SetIsAttached(true);

        var child1 = new Fayde.XamlObject();
        child1.XamlNode.SetName("CHILD");

        var child2 = new Fayde.XamlObject();
        child2.XamlNode.SetName("CHILD");

        var error = new BError();
        ok(child1.XamlNode.AttachTo(root.XamlNode, error), "Error should not happen when attaching child node 1:" + error.Message);
        ok(!child2.XamlNode.AttachTo(root.XamlNode, error), "Attaching child node 2 with same Name as child node 1 should error because the name is already registered in the namescope.");
        ok(child1.XamlNode.AttachTo(root.XamlNode, error), "Attaching child node 1 twice should not error because attaching parent is same as current parent.");
        ok(!root.XamlNode.AttachTo(child1.XamlNode, error), "Attaching root to child node 1 should error because cycles are not allowed.");
    });
}