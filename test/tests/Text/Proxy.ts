export function load () {
    QUnit.module("Text/Proxy");

    test("Undo + Redo", (assert) => {
        var proxy = new Fayde.Text.Proxy(Fayde.Text.EmitChangedType.TEXT, 10);
        proxy.setText("test1");
        assert.strictEqual(proxy.text, "test1");
        proxy.undo();
        assert.strictEqual(proxy.text, "");
        proxy.redo();
        assert.strictEqual(proxy.text, "test1");
    });

    test("Undo limit", (assert) => {
        var maxUndo = 3;
        var proxy = new Fayde.Text.Proxy(Fayde.Text.EmitChangedType.TEXT, maxUndo);

        for (var i = 0; i < (maxUndo + 1); i++) {
            proxy.setText("test-" + i.toString());
        }
        for (var i = maxUndo - 1; i >= 0; i--) {
            proxy.undo();
            assert.strictEqual(proxy.text, "test-" + i.toString());
        }
        proxy.undo();
        assert.strictEqual(proxy.text, "test-0", "Consecutive undo attempts after max should not change text.");
    });
}