/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />
define(["require", "exports"], function(require, exports) {
    var FrameworkElement = Fayde.FrameworkElement;
    var ContentControl = Fayde.Controls.ContentControl;
    var ItemContainersManager = Fayde.Controls.Internal.ItemContainersManager;
    var ListBoxItem = Fayde.Controls.ListBoxItem;

    function run() {
        QUnit.module("ItemContainersManager Tests");

        var owner = {
            PrepareContainerForItem: function (container, item) {
                if (!container)
                    return;
                if (container === item)
                    return;
                var cc = container;
                if (cc instanceof ContentControl)
                    cc.Content = item;
            },
            ClearContainerForItem: function (container, item) {
            },
            GetContainerForItem: function () {
                return new ContentControl();
            },
            IsItemItsOwnContainer: function (item) {
                return item instanceof FrameworkElement;
            }
        };

        test("Enumerator-Full", function () {
            var icm = new ItemContainersManager(owner);
            icm.OnItemsAdded(0, [1, 2, 3, 4, 5]);

            var count = 0;
            for (var i = 0, enumerator = icm.GetEnumerator(0, 5); enumerator.MoveNext(); i++) {
                strictEqual(enumerator.CurrentItem, i + 1);
                strictEqual(enumerator.CurrentIndex, i);
                count++;
            }
            strictEqual(count, 5);
        });
        test("Enumerator-Partial", function () {
            var icm = new ItemContainersManager(owner);
            icm.OnItemsAdded(0, [1, 2, 3, 4, 5]);

            var count = 0;
            for (var i = 2, enumerator = icm.GetEnumerator(2, 2); enumerator.MoveNext(); i++) {
                strictEqual(enumerator.CurrentItem, i + 1);
                strictEqual(enumerator.CurrentIndex, i);
                count++;
            }
            strictEqual(count, 2);
        });
        test("Enumerator-Overlap", function () {
            var icm = new ItemContainersManager(owner);
            icm.OnItemsAdded(0, [1, 2, 3, 4, 5]);

            var count = 0;
            for (var i = 4, enumerator = icm.GetEnumerator(4, 2); enumerator.MoveNext(); i++) {
                strictEqual(enumerator.CurrentItem, i + 1);
                strictEqual(enumerator.CurrentIndex, i);
                count++;
            }
            strictEqual(count, 1);
        });

        test("Generator-ItemsSource", function () {
            var icm = new ItemContainersManager(owner);
            icm.OnItemsAdded(0, [1, 2, 3, 4, 5]);

            for (var i = 0, generator = icm.CreateGenerator(0, 5); generator.Generate(); i++) {
                ok(generator.Current instanceof ContentControl);
                if (generator.IsCurrentNew)
                    owner.PrepareContainerForItem(generator.Current, generator.CurrentItem);
                strictEqual(generator.Current.Content, generator.CurrentItem);
                strictEqual(generator.CurrentItem, i + 1);
                strictEqual(generator.CurrentIndex, i);
            }
        });
        test("Generator-Items", function () {
            var icm = new ItemContainersManager(owner);
            var lbi1 = new ListBoxItem();
            lbi1.Content = "ListBoxItem1";
            var lbi2 = new ListBoxItem();
            lbi1.Content = "ListBoxItem2";
            var lbi3 = new ListBoxItem();
            lbi1.Content = "ListBoxItem3";
            var items = [lbi1, lbi2, lbi3];
            icm.OnItemsAdded(0, items);

            for (var i = 0, generator = icm.CreateGenerator(0, 5); generator.Generate(); i++) {
                strictEqual(generator.GenerateIndex, i);
                ok(generator.Current instanceof ContentControl);
                if (generator.IsCurrentNew)
                    owner.PrepareContainerForItem(generator.Current, generator.CurrentItem);
                strictEqual(generator.CurrentItem, items[i]);
                strictEqual(generator.CurrentIndex, i);
            }
        });
        test("Generator-Existing", function () {
            var icm = new ItemContainersManager(owner);
            icm.OnItemsAdded(0, [1, 2, 3, 4, 5]);
            for (var i = 0, generator = icm.CreateGenerator(0, 3); generator.Generate(); i++) {
                //Create 0,1,2
            }
            for (var i = 0, generator = icm.CreateGenerator(2, 3); generator.Generate(); i++) {
                strictEqual(generator.GenerateIndex, i);

                //Create 2,3,4 (2 is the only one that should exist already)
                ok(generator.IsCurrentNew === (i > 0));
            }
        });
    }
    exports.run = run;
});
//# sourceMappingURL=ItemContainersManagerTests.js.map
