/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

import DependencyObject = Fayde.DependencyObject;
import FrameworkElement = Fayde.FrameworkElement;
import ContentControl = Fayde.Controls.ContentControl;
import ItemContainersManager = Fayde.Controls.Internal.ItemContainersManager;
import ListBoxItem = Fayde.Controls.ListBoxItem;

export function run() {
    QUnit.module("ItemContainersManager Tests");

    var owner = {
        PrepareContainerForItem: function (container: DependencyObject, item: any) {
            if (!container)
                return;
            if (container === item)
                return;
            var cc = <ContentControl>container;
            if (cc instanceof ContentControl)
                cc.Content = item;
        },
        ClearContainerForItem: function (container: DependencyObject, item: any) {
        },
        GetContainerForItem: function (): DependencyObject {
            return new ContentControl();
        },
        IsItemItsOwnContainer: function (item: any): boolean {
            return item instanceof FrameworkElement;
        }
    };

    test("Enumerator-Full", () => {
        var icm = new ItemContainersManager(owner);
        icm.Items = new Fayde.Controls.ItemCollection();
        icm.ItemsSource = Fayde.ArrayEx.AsEnumerable([1, 2, 3, 4, 5]);

        var count = 0;
        for (var i = 0, enumerator = icm.GetEnumerator(0, 5); enumerator.MoveNext(); i++) {
            strictEqual(enumerator.CurrentItem, i + 1);
            strictEqual(enumerator.CurrentIndex, i);
            count++;
        }
        strictEqual(count, 5);

    });
    test("Enumerator-Partial", () => {
        var icm = new ItemContainersManager(owner);
        icm.Items = new Fayde.Controls.ItemCollection();
        icm.ItemsSource = Fayde.ArrayEx.AsEnumerable([1, 2, 3, 4, 5]);

        var count = 0;
        for (var i = 2, enumerator = icm.GetEnumerator(2, 2); enumerator.MoveNext(); i++) {
            strictEqual(enumerator.CurrentItem, i + 1);
            strictEqual(enumerator.CurrentIndex, i);
            count++;
        }
        strictEqual(count, 2);
    });
    test("Enumerator-Overlap", () => {
        var icm = new ItemContainersManager(owner);
        icm.Items = new Fayde.Controls.ItemCollection();
        icm.ItemsSource = Fayde.ArrayEx.AsEnumerable([1, 2, 3, 4, 5]);

        var count = 0;
        for (var i = 4, enumerator = icm.GetEnumerator(4, 2); enumerator.MoveNext(); i++) {
            strictEqual(enumerator.CurrentItem, i + 1);
            strictEqual(enumerator.CurrentIndex, i);
            count++;
        }
        strictEqual(count, 1);
    });

    test("Generator-ItemsSource", () => {
        var icm = new ItemContainersManager(owner);
        icm.Items = new Fayde.Controls.ItemCollection();
        icm.ItemsSource = Fayde.ArrayEx.AsEnumerable([1, 2, 3, 4, 5]);

        for (var i = 0, generator = icm.CreateGenerator(0, 5); generator.Generate(); i++) {
            ok(generator.Current instanceof ContentControl);
            if (generator.IsCurrentNew)
                owner.PrepareContainerForItem(generator.Current, generator.CurrentItem);
            strictEqual((<ContentControl>generator.Current).Content, generator.CurrentItem);
            strictEqual(generator.CurrentItem, i + 1);
            strictEqual(generator.CurrentIndex, i);
        }
    });
    test("Generator-Items", () => {
        var icm = new ItemContainersManager(owner);
        icm.Items = new Fayde.Controls.ItemCollection();
        var lbi1 = new ListBoxItem();
        lbi1.Content = "ListBoxItem1";
        var lbi2 = new ListBoxItem();
        lbi1.Content = "ListBoxItem2";
        var lbi3 = new ListBoxItem();
        lbi1.Content = "ListBoxItem3";
        icm.Items.AddRange([lbi1, lbi2, lbi3]);

        for (var i = 0, generator = icm.CreateGenerator(0, 5); generator.Generate(); i++) {
            strictEqual(generator.GenerateIndex, i);
            ok(generator.Current instanceof ContentControl);
            if (generator.IsCurrentNew)
                owner.PrepareContainerForItem(generator.Current, generator.CurrentItem);
            strictEqual(generator.CurrentItem, icm.Items.GetValueAt(i));
            strictEqual(generator.CurrentIndex, i);
        }
    });
    test("Generator-Existing", () => {
        var icm = new ItemContainersManager(owner);
        icm.Items = new Fayde.Controls.ItemCollection();
        icm.ItemsSource = Fayde.ArrayEx.AsEnumerable([1, 2, 3, 4, 5]);
        for (var i = 0, generator = icm.CreateGenerator(0, 3); generator.Generate(); i++) {
            //Create 0,1,2
        }
        for (var i = 0, generator = icm.CreateGenerator(2, 3); generator.Generate(); i++) {
            strictEqual(generator.GenerateIndex, i);
            //Create 2,3,4 (2 is the only one that should exist already)
            ok(generator.IsCurrentNew === (i > 0));
        }
    });

    test("Remover-None", () => {
        var icm = new ItemContainersManager(owner);
        icm.Items = new Fayde.Controls.ItemCollection();
        icm.ItemsSource = Fayde.ArrayEx.AsEnumerable([1, 2, 3, 4, 5]);

        for (var i = 0; i < 5; i++) {
            strictEqual(icm.ContainerFromIndex(i), null);
        }

        var items: DependencyObject[] = [];

        var generator = icm.CreateGenerator(0, 5);
        while (generator.Generate()) {
            items.push(generator.Current);
        }

        strictEqual(items.length, 5);

        var remover = icm.CreateRemover(0, 5);
        while (remover.MoveNext()) {
            items.splice(0, 1);
            remover.Remove(false);
        }
        
        strictEqual(items.length, 5);

        for (var i = 0; i < 5; i++) {
            ok(icm.ContainerFromIndex(i) instanceof ContentControl);
        }
    });

    test("Remover-Partial", () => {
        var icm = new ItemContainersManager(owner);
        icm.Items = new Fayde.Controls.ItemCollection();
        icm.ItemsSource = Fayde.ArrayEx.AsEnumerable([1, 2, 3, 4, 5]);

        for (var i = 0; i < 5; i++) {
            strictEqual(icm.ContainerFromIndex(i), null);
        }

        var items: DependencyObject[] = [];

        var generator = icm.CreateGenerator(0, 5);
        while (generator.Generate()) {
            items.push(generator.Current);
        }

        strictEqual(items.length, 5);

        var remover = icm.CreateRemover(2, 2);
        while (remover.MoveNext()) {
            items.splice(2, 1);
            remover.Remove(false);
        }

        strictEqual(items.length, 2);

        for (var i = 0; i < 2; i++) {
            ok(icm.ContainerFromIndex(i) === null);
        }
        for (var i = 2; i < 4; i++) {
            ok(icm.ContainerFromIndex(i) instanceof ContentControl);
        }
        for (var i = 4; i < 5; i++) {
            ok(icm.ContainerFromIndex(i) === null);
        }
    });

    test("Remover-All", () => {
        var icm = new ItemContainersManager(owner);
        icm.Items = new Fayde.Controls.ItemCollection();
        icm.ItemsSource = Fayde.ArrayEx.AsEnumerable([1, 2, 3, 4, 5]);

        for (var i = 0; i < 5; i++) {
            strictEqual(icm.ContainerFromIndex(i), null);
        }

        var items: DependencyObject[] = [];

        var generator = icm.CreateGenerator(0, 5);
        while (generator.Generate()) {
            items.push(generator.Current);
        }

        strictEqual(items.length, 5);

        var remover = icm.CreateRemover(0, 2);
        while (remover.MoveNext()) {
            items.splice(0, 1);
            remover.Remove(false);
        }
        
        for (var i = 0; i < 2; i++) {
            ok(icm.ContainerFromIndex(i) instanceof ContentControl);
        }
        for (var i = 2; i < 5; i++) {
            ok(icm.ContainerFromIndex(i) === null);
        }
        
        var remover = icm.CreateRemover();
        while (remover.MoveNext()) {
            items.splice(0, 1);
            remover.Remove(false);
        }

        strictEqual(items.length, 0);

        for (var i = 0; i < 5; i++) {
            ok(icm.ContainerFromIndex(i) === null);
        }
    });
}