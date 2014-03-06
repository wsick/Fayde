/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

import DependencyObject = Fayde.DependencyObject;
import FrameworkElement = Fayde.FrameworkElement;
import ContentControl = Fayde.Controls.ContentControl;
import ItemContainersManager = Fayde.Controls.Internal.ItemContainersManager;

export function run() {
    QUnit.module("ItemContainersManager Tests");

    var owner = {
        PrepareContainerForItem: function (container: DependencyObject, item: any) {
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

    test("Enumerator", () => {
        var icm = new ItemContainersManager(owner);
        icm.Items = new Fayde.Controls.ItemCollection();
        icm.ItemsSource = Fayde.ArrayEx.AsEnumerable([1, 2, 3, 4, 5, 6]);

        var count = 0;
        for (var i = 0, enumerator = icm.GetEnumerator(0, 6); enumerator.MoveNext(); i++) {
            strictEqual(enumerator.CurrentItem, i + 1);
            strictEqual(enumerator.CurrentIndex, i);
            count++;
        }
        strictEqual(count, 6);

        count = 0;
        for (var i = 2, enumerator = icm.GetEnumerator(2, 2); enumerator.MoveNext(); i++) {
            strictEqual(enumerator.CurrentItem, i + 1);
            strictEqual(enumerator.CurrentIndex, i);
            count++;
        }
        strictEqual(count, 2);
    });
} 