/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

export function run() {
    QUnit.module("ItemsControl Tests");

    test("ItemContainerGenerator Initialization", () => {
        var ic = new Fayde.Controls.ItemsControl();
        var generator = new Fayde.Controls.ItemContainerGenerator(ic);

        var state: Fayde.Controls.IGenerationState;
        try {
            try {
                state = generator.StartAt({ Index: -1, Offset: 1 }, true, true);
                ok(true, "First 'StartAt' call should create a valid generation state.");
            } catch (err) {
                ok(false, "First 'StartAt' call should create a valid generation state.");
            }

            try {
                state = generator.StartAt({ Index: -1, Offset: 1 }, true, true);
                ok(false, "Subsequent calls to 'StartAt' should error because only 1 generation state can happen per ItemContainerGenerator.");
            } catch (err) {
                ok(true, "Subsequent calls to 'StartAt' should error because only 1 generation state can happen per ItemContainerGenerator.");
            }
        } finally {
            state.Dispose();
        }

        try {
            state = generator.StartAt({ Index: -1, Offset: 1 }, true, true);
            ok(true, "StopGeneration should have cleared the current generation state.");
        } catch (err) {
            ok(false, "StopGeneration should have cleared the current generation state.");
        } finally {
            state.Dispose();
        }
    });

    test("Non-UI Items", () => {
        var ic = new Fayde.Controls.ItemsControl();
        ic.Measure(size.createInfinite());
        var icg = ic.ItemContainerGenerator;

        var o1 = { id: 1 };
        ic.Items.Add(<any>o1);
        var o2 = { id: 2 };
        ic.Items.Add(<any>o2);
        var o3 = { id: 3 };
        ic.Items.Add(<any>o3);
        ok(icg.ItemFromContainer(icg.ContainerFromIndex(0)) === o1, "Items.Add: ItemFromContainerFromIndex0 should be o1.");
        ok(icg.ItemFromContainer(icg.ContainerFromIndex(1)) === o2, "Items.Add: ItemFromContainerFromIndex1 should be o2.");
        ok(icg.ItemFromContainer(icg.ContainerFromIndex(2)) === o3, "Items.Add: ItemFromContainerFromIndex2 should be o3.");
        ok(icg.ContainerFromIndex(0) === icg.ContainerFromItem(o1), "Items.Add: Container @ 0 should match container for o1.");
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o2), "Items.Add: Container @ 1 should match container for o2.");
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o3), "Items.Add: Container @ 2 should match container for o3.");

        var o4 = { id: 4 };
        ic.Items.Insert(1, <any>o4);
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o4), "Items.Insert: Container @ 1 should now match container for o4.");
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o2), "Items.Insert: Container @ 2 should now match container for o2.");
        ok(icg.ContainerFromIndex(3) === icg.ContainerFromItem(o3), "Items.Insert: Container @ 3 should now match container for o3.");

        ic.Items.Remove(<any>o4);
        ok(icg.ContainerFromItem(o4) === undefined, "Items.Remove: Container from o4 should no longer exist.");
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o2), "Items.Remove: Container @ 1 should now match container for o2.");
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o3), "Items.Remove: Container @ 2 should now match container for o3.");

        ic.Items.Clear();
        ok(icg.ContainerFromIndex(2) === undefined, "Items.Clear: Container @ 2 should no longer exist.");
        ok(icg.ContainerFromIndex(1) === undefined, "Items.Clear: Container @ 1 should no longer exist.");
        ok(icg.ContainerFromIndex(0) === undefined, "Items.Clear: Container @ 0 should no longer exist.");

        ic.ItemsSource = Fayde.ArrayEx.AsEnumerable([o1, o2, o3, o4]);
        ok(icg.ContainerFromIndex(0) === icg.ContainerFromItem(o1), "ItemsSource=Array: Container @ 0 should now match container for o1.");
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o2), "ItemsSource=Array: Container @ 1 should now match container for o2.");
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o3), "ItemsSource=Array: Container @ 2 should now match container for o3.");
        ok(icg.ContainerFromIndex(3) === icg.ContainerFromItem(o4), "ItemsSource=Array: Container @ 3 should now match container for o4.");

        var collection = new Fayde.Collections.ObservableCollection();
        ic.ItemsSource = collection;
        collection.Add(o1);
        collection.Add(o2);
        ok(icg.ContainerFromIndex(0) === icg.ContainerFromItem(o1), "ItemsSource=ObservableCollection.Add: Container @ 0 should now match container for o1.");
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o2), "ItemsSource=ObservableCollection.Add: Container @ 1 should now match container for o2.");

        collection.AddRange([o3, o4]);
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o3), "ItemsSource=ObservableCollection.AddRange: Container @ 2 should now match container for o3.");
        ok(icg.ContainerFromIndex(3) === icg.ContainerFromItem(o4), "ItemsSource=ObservableCollection.AddRange: Container @ 3 should now match container for o4.");

        collection.Remove(o2);
        ok(icg.ContainerFromItem(o2) === undefined, "Items.Clear: Container from o2 should no longer exist.");
        ok(icg.ContainerFromIndex(0) === icg.ContainerFromItem(o1), "ItemsSource=ObservableCollection.Remove: Container @ 0 should now match container for o1.");
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o3), "ItemsSource=ObservableCollection.Remove: Container @ 1 should now match container for o3.");
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o4), "ItemsSource=ObservableCollection.Remove: Container @ 2 should now match container for o4.");

        collection.Clear();
        ok(icg.ContainerFromIndex(2) === undefined, "Items.Clear: Container @ 2 should no longer exist.");
        ok(icg.ContainerFromIndex(1) === undefined, "Items.Clear: Container @ 1 should no longer exist.");
        ok(icg.ContainerFromIndex(0) === undefined, "Items.Clear: Container @ 0 should no longer exist.");
    });

    test("UI Items", () => {
        var ic = new Fayde.Controls.ItemsControl();
        ic.Measure(size.createInfinite());
        var icg = ic.ItemContainerGenerator;

        var lbi1 = new Fayde.Controls.ListBoxItem();
        ic.Items.Add(lbi1);
        var lbi2 = new Fayde.Controls.ListBoxItem();
        ic.Items.Add(lbi2);
        var lbi3 = new Fayde.Controls.ListBoxItem();
        ic.Items.Add(lbi3);
        ok(icg.ContainerFromIndex(0) === lbi1, "Items.Add: Container @ 0 should be lbi1.");
        ok(icg.ContainerFromIndex(1) === lbi2, "Items.Add: Container @ 1 shoudl be lbi2.");
        ok(icg.ContainerFromIndex(2) === lbi3, "Items.Add: Container @ 2 should be lbi3.");
    });

    test("Virtualizing Non-UI Items", () => {
        var ic = new Fayde.Controls.ItemsControl();
        ic.ItemsPanel = <Fayde.Controls.ItemsPanelTemplate>Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument("<ItemsPanelTemplate xmlns=\"" + Fayde.XMLNS + "\"><VirtualizingStackPanel /></ItemsPanelTemplate>").Document);
        ic.Measure(size.createInfinite());
        var icg = ic.ItemContainerGenerator;

        var o1 = { id: 1 };
        ic.Items.Add(<any>o1);
        var o2 = { id: 2 };
        ic.Items.Add(<any>o2);
        var o3 = { id: 3 };
        ic.Items.Add(<any>o3);
        ic.Panel.Measure(size.createInfinite());
        ok(icg.ItemFromContainer(icg.ContainerFromIndex(0)) === o1, "Items.Add: ItemFromContainerFromIndex0 should be o1.");
        ok(icg.ItemFromContainer(icg.ContainerFromIndex(1)) === o2, "Items.Add: ItemFromContainerFromIndex1 should be o2.");
        ok(icg.ItemFromContainer(icg.ContainerFromIndex(2)) === o3, "Items.Add: ItemFromContainerFromIndex2 should be o3.");
        ok(icg.ContainerFromIndex(0) === icg.ContainerFromItem(o1), "Items.Add: Container @ 0 should match container for o1.");
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o2), "Items.Add: Container @ 1 should match container for o2.");
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o3), "Items.Add: Container @ 2 should match container for o3.");

        var o4 = { id: 4 };
        ic.Items.Insert(1, <any>o4);
        ic.Panel.Measure(size.createInfinite());
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o4), "Items.Insert: Container @ 1 should now match container for o4.");
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o2), "Items.Insert: Container @ 2 should now match container for o2.");
        ok(icg.ContainerFromIndex(3) === icg.ContainerFromItem(o3), "Items.Insert: Container @ 3 should now match container for o3.");

        ic.Items.Remove(<any>o4);
        ic.Panel.Measure(size.createInfinite());
        ok(icg.ContainerFromItem(o4) === undefined, "Items.Remove: Container from o4 should no longer exist.");
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o2), "Items.Remove: Container @ 1 should now match container for o2.");
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o3), "Items.Remove: Container @ 2 should now match container for o3.");

        ic.Items.Clear();
        ic.Panel.Measure(size.createInfinite());
        ok(icg.ContainerFromIndex(2) === undefined, "Items.Clear: Container @ 2 should no longer exist.");
        ok(icg.ContainerFromIndex(1) === undefined, "Items.Clear: Container @ 1 should no longer exist.");
        ok(icg.ContainerFromIndex(0) === undefined, "Items.Clear: Container @ 0 should no longer exist.");

        ic.ItemsSource = Fayde.ArrayEx.AsEnumerable([o1, o2, o3, o4]);
        ic.Panel.Measure(size.createInfinite());
        ok(icg.ContainerFromIndex(0) === icg.ContainerFromItem(o1), "ItemsSource=Array: Container @ 0 should now match container for o1.");
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o2), "ItemsSource=Array: Container @ 1 should now match container for o2.");
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o3), "ItemsSource=Array: Container @ 2 should now match container for o3.");
        ok(icg.ContainerFromIndex(3) === icg.ContainerFromItem(o4), "ItemsSource=Array: Container @ 3 should now match container for o4.");

        var collection = new Fayde.Collections.ObservableCollection();
        ic.ItemsSource = collection;
        collection.Add(o1);
        collection.Add(o2);
        ic.Panel.Measure(size.createInfinite());
        ok(icg.ContainerFromIndex(0) === icg.ContainerFromItem(o1), "ItemsSource=ObservableCollection.Add: Container @ 0 should now match container for o1.");
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o2), "ItemsSource=ObservableCollection.Add: Container @ 1 should now match container for o2.");

        collection.AddRange([o3, o4]);
        ic.Panel.Measure(size.createInfinite());
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o3), "ItemsSource=ObservableCollection.AddRange: Container @ 2 should now match container for o3.");
        ok(icg.ContainerFromIndex(3) === icg.ContainerFromItem(o4), "ItemsSource=ObservableCollection.AddRange: Container @ 3 should now match container for o4.");

        collection.Remove(o2);
        ic.Panel.Measure(size.createInfinite());
        ok(icg.ContainerFromItem(o2) === undefined, "Items.Clear: Container from o2 should no longer exist.");
        ok(icg.ContainerFromIndex(0) === icg.ContainerFromItem(o1), "ItemsSource=ObservableCollection.Remove: Container @ 0 should now match container for o1.");
        ok(icg.ContainerFromIndex(1) === icg.ContainerFromItem(o3), "ItemsSource=ObservableCollection.Remove: Container @ 1 should now match container for o3.");
        ok(icg.ContainerFromIndex(2) === icg.ContainerFromItem(o4), "ItemsSource=ObservableCollection.Remove: Container @ 2 should now match container for o4.");

        collection.Clear();
        ic.Panel.Measure(size.createInfinite());
        ok(icg.ContainerFromIndex(2) === undefined, "Items.Clear: Container @ 2 should no longer exist.");
        ok(icg.ContainerFromIndex(1) === undefined, "Items.Clear: Container @ 1 should no longer exist.");
        ok(icg.ContainerFromIndex(0) === undefined, "Items.Clear: Container @ 0 should no longer exist.");
    });
}