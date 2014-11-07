import TestObservable = require("../mocks/TestObservable");
import DeepObservableCollection = Fayde.Collections.DeepObservableCollection;

export function load() {
    QUnit.module("DeepObservableCollection Tests");

    test("ItemPropertyChanged", () => {
        var doc = new DeepObservableCollection<TestObservable>();
        var to1 = new TestObservable();
        var to2 = new TestObservable();
        doc.AddRange([to1, to2]);

        var to1changed = false;
        var to2changed = false;
        doc.ItemPropertyChanged.Subscribe(onItemPropertyChanged, {});
        function onItemPropertyChanged(sender, e: Fayde.Collections.ItemPropertyChangedEventArgs<TestObservable>) {
            to1changed = (e.Item === to1) ? true : to1changed;
            to2changed = (e.Item === to2) ? true : to2changed;
        }

        to1.Member1 = 10;
        ok(to1changed, "Notification of item property changing for test observable 1");
        to2.Member2 = "hey";
        ok(to2changed, "Notification of item property changing for test observable 1");
    });

    test("Cleanup", () => {
        var doc = new DeepObservableCollection<TestObservable>();
        var to1 = new TestObservable();
        var to2 = new TestObservable();
        doc.AddRange([to1, to2]);
        
        var to1changed = false;
        var to2changed = false;
        doc.ItemPropertyChanged.Subscribe(onItemPropertyChanged, {});
        function onItemPropertyChanged(sender, e: Fayde.Collections.ItemPropertyChangedEventArgs<TestObservable>) {
            to1changed = (e.Item === to1) ? true : to1changed;
            to2changed = (e.Item === to2) ? true : to2changed;
        }

        doc.Remove(to1);
        to1.Member1 = 10;
        ok(!to1changed, "Collection should not notify if item was removed from collection");
        doc.Insert(to1, 0);
        
        var to3 = new TestObservable();
        doc.SetValueAt(0, to3);
        to1.Member1 = 15;
        ok(!to1changed, "Collection should not notify if item was replaced in collection");
        doc.SetValueAt(0, to1);
        to1.Member1 = 20;
        ok(to1changed, "Collection should notify of item that was placed back into collection");

        to1changed = false;
        doc.Clear();
        to1.Member1 = 25;
        to2.Member2 = "brad";
        ok(!to1changed, "Collection should not notify item 1 property if collection was cleared");
        ok(!to2changed, "Collection should not notify item 2 property if collection was cleared");
    });
}