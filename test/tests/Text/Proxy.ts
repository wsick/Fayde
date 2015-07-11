export function load () {
    QUnit.module("Text/Proxy");

    test("Undo + Redo", (assert) => {
        var proxy = new Fayde.Controls.Internal.TextProxy(Fayde.Controls.Internal.TextBoxEmitChangedType.TEXT);
        proxy.setText("test1");
        assert.strictEqual(proxy.text, "test1");
        proxy.undo();
        assert.strictEqual(proxy.text, "");
        proxy.redo();
        assert.strictEqual(proxy.text, "test1");
    });

    test("Undo limit", (assert) => {
        var proxy = new Fayde.Controls.Internal.TextProxy(Fayde.Controls.Internal.TextBoxEmitChangedType.TEXT);

        for (var i = 1; i <= 11; i++) {
            proxy.setText("test-" + i.toString());
        }
        for (var i = 10; i > 0; i--) {
            proxy.undo();
            assert.strictEqual(proxy.text, "test-" + i.toString());
        }
        proxy.undo();
        assert.strictEqual(proxy.text, "test-1");
    });
}