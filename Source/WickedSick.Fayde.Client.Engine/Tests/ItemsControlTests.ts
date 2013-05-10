/// <reference path="qunit-1.10.0.d.ts" />
/// <reference path="../Typescript/Controls/ItemContainerGenerator.ts" />

test("ItemContainerGenerator.Initialization", () => {
    var ic = new Fayde.Controls.ItemsControl();
    var generator = new Fayde.Controls.ItemContainerGenerator(ic);

    var state: Fayde.Controls.IGenerationState;
    try {
        try {
            state = generator.StartAt({ index: -1, offset: 1 }, true, true);
            ok(true, "First 'StartAt' call should create a valid generation state.");
        } catch (err) {
            ok(false, "First 'StartAt' call should create a valid generation state.");
        }

        try {
            state = generator.StartAt({ index: -1, offset: 1 }, true, true);
            ok(false, "Subsequent calls to 'StartAt' should error because only 1 generation state can happen per ItemContainerGenerator.");
        } catch (err) {
            ok(true, "Subsequent calls to 'StartAt' should error because only 1 generation state can happen per ItemContainerGenerator.");
        }
    } finally {
        state.Dispose();
    }

    try {
        state = generator.StartAt({ index: -1, offset: 1 }, true, true);
        ok(true, "StopGeneration should have cleared the current generation state.");
    } catch (err) {
        ok(false, "StopGeneration should have cleared the current generation state.");
    } finally {
        state.Dispose();
    }
});

test("ItemsControl.NonUIItems", () => {
    var ic = new Fayde.Controls.ItemsControl();
    ic.Measure(size.createInfinite());
    var icg = ic.ItemContainerGenerator;
    ic.ApplyTemplate();
    var o1 = { id: 1 };
    ic.Items.Add(o1);
    var o2 = { id: 2 };
    ic.Items.Add(o2);
    var o3 = { id: 3 };
    ic.Items.Add(o3);

    strictEqual(icg.ItemFromContainer(icg.ContainerFromIndex(0)), o1, "ItemFromContainerFromIndex0 should be o1.");
    strictEqual(icg.ItemFromContainer(icg.ContainerFromIndex(1)), o2, "ItemFromContainerFromIndex1 should be o2.");
    strictEqual(icg.ItemFromContainer(icg.ContainerFromIndex(2)), o3, "ItemFromContainerFromIndex2 should be o3.");

    strictEqual(icg.ContainerFromIndex(0), icg.ContainerFromItem(o1), "Container @ 0 should match container for o1.");
    strictEqual(icg.ContainerFromIndex(1), icg.ContainerFromItem(o2), "Container @ 1 should match container for o2.");
    strictEqual(icg.ContainerFromIndex(2), icg.ContainerFromItem(o3), "Container @ 2 should match container for o3.");

    var o4 = { id: 4 };
    ic.Items.Insert(o4, 1);
    strictEqual(icg.ContainerFromIndex(1), icg.ContainerFromItem(o4), "Container @ 1 should now match container for o4 after inserting o4 @ 1.");
    strictEqual(icg.ContainerFromIndex(2), icg.ContainerFromItem(o2), "Container @ 2 should now match container for o2 after inserting o4 @ 1.");
    strictEqual(icg.ContainerFromIndex(3), icg.ContainerFromItem(o3), "Container @ 3 should now match container for o3 after inserting o4 @ 1.");

    ic.Items.Clear();
    strictEqual(icg.ContainerFromIndex(1), undefined, "Container @ 2 should no longer exist after clear.");
    strictEqual(icg.ContainerFromIndex(1), undefined, "Container @ 1 should no longer exist after clear.");
    strictEqual(icg.ContainerFromIndex(0), undefined, "Container @ 0 should no longer exist after clear.");

});