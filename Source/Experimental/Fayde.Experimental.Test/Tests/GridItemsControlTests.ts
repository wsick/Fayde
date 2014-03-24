/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />
/// <reference path="../../Fayde.Experimental/Fayde.Experimental.d.ts" />

import GridItemsControl = Fayde.Experimental.GridItemsControl;
import GridItemsPresenter = Fayde.Experimental.GridItemsPresenter;
import GridTextColumn = Fayde.Experimental.GridTextColumn;

export function run() {
    QUnit.module("GridItemsControl Tests");

    var mock1 = Fayde.ArrayEx.AsEnumerable([
        { Name: "Name1", Description: "Description 1" },
        { Name: "Name2", Description: "Description 2" },
        { Name: "Name3", Description: "Description 3" },
        { Name: "Name4", Description: "Description 4" }
    ]);

    test("Add columns", () => {
        var gic = new GridItemsControl();
        gic.Measure(size.fromRaw(100, 100));

        gic.ItemsSource = mock1;

        var col = new GridTextColumn();
        col.DisplayMemberPath = "Name";
        gic.Columns.Add(col);
        col = new GridTextColumn();
        col.DisplayMemberPath = "Description";
        gic.Columns.Add(col);

        var presenter = gic.XamlNode.ItemsPresenter;
        var grid = presenter.Panel;
        strictEqual(grid.ColumnDefinitions.Count, 2);
        strictEqual(grid.RowDefinitions.Count, 4);
        strictEqual(grid.Children.Count, 8);
    });
}