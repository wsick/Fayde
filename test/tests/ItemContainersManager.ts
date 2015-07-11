import DependencyObject = Fayde.DependencyObject;
import FrameworkElement = Fayde.FrameworkElement;
import ContentControl = Fayde.Controls.ContentControl;
import ItemContainersManager = Fayde.Controls.Internal.ItemContainersManager;
import ListBoxItem = Fayde.Controls.ListBoxItem;

export function load() {
    QUnit.module("ItemContainersManager");

    var owner: Fayde.Controls.Internal.IItemContainersOwner = {
        PrepareContainerForItem: function (container: Fayde.UIElement, item: any) {
            if (!container)
                return;
            if (container === item)
                return;
            var cc = <ContentControl>container;
            if (cc instanceof ContentControl)
                cc.Content = item;
        },
        ClearContainerForItem: function (container: Fayde.UIElement, item: any) {
        },
        GetContainerForItem: function (): Fayde.UIElement {
            return new ContentControl();
        },
        IsItemItsOwnContainer: function (item: any): boolean {
            return item instanceof FrameworkElement;
        }
    };

    test("Enumerator-Full", () => {
        var icm = new ItemContainersManager(owner);
        icm.OnItemsAdded(0, [1, 2, 3, 4, 5]);

        var count = 0;
        for (var i = 0, enumerator = icm.GetEnumerator(0, 5); enumerator.moveNext(); i++) {
            strictEqual(enumerator.CurrentItem, i + 1);
            strictEqual(enumerator.CurrentIndex, i);
            count++;
        }
        strictEqual(count, 5);

    });
    test("Enumerator-Partial", () => {
        var icm = new ItemContainersManager(owner);
        icm.OnItemsAdded(0, [1, 2, 3, 4, 5]);

        var count = 0;
        for (var i = 2, enumerator = icm.GetEnumerator(2, 2); enumerator.moveNext(); i++) {
            strictEqual(enumerator.CurrentItem, i + 1);
            strictEqual(enumerator.CurrentIndex, i);
            count++;
        }
        strictEqual(count, 2);
    });
    test("Enumerator-Overlap", () => {
        var icm = new ItemContainersManager(owner);
        icm.OnItemsAdded(0, [1, 2, 3, 4, 5]);

        var count = 0;
        for (var i = 4, enumerator = icm.GetEnumerator(4, 2); enumerator.moveNext(); i++) {
            strictEqual(enumerator.CurrentItem, i + 1);
            strictEqual(enumerator.CurrentIndex, i);
            count++;
        }
        strictEqual(count, 1);
    });

    test("Generator-ItemsSource", () => {
        var icm = new ItemContainersManager(owner);
        icm.OnItemsAdded(0, [1, 2, 3, 4, 5]);

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
    test("Generator-Existing", () => {
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