export function load () {
    QUnit.module("Text Proxy Tests");

    test("Undo + Redo", (assert) => {
        var proxy = new Fayde.Controls.Internal.TextProxy(Fayde.Controls.Internal.TextBoxEmitChangedType.TEXT);
        proxy.setText("test1");
        assert.strictEqual(proxy.text, "test1");
        proxy.undo();
        assert.strictEqual(proxy.text, "")
        proxy.redo();
        assert.strictEqual(proxy.text, "test1");
    });
}