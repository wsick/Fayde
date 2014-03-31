/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />
/// <reference path="../../Fayde.Experimental/Fayde.Experimental.d.ts" />

import Grid = Fayde.Controls.Grid;
import GridItemsControl = Fayde.Experimental.GridItemsControl;
import GridItemsPresenter = Fayde.Experimental.GridItemsPresenter;
import GridTextColumn = Fayde.Experimental.GridTextColumn;

export function run() {
    QUnit.module("GridItemsControl Tests");

    var mock1 = new Fayde.Collections.ObservableCollection();
    mock1.AddRange([
        { Name: "Name1", Description: "Description 1" },
        { Name: "Name3", Description: "Description 3" },
        { Name: "Name4", Description: "Description 4" },
        { Name: "Name5", Description: "Description 5" }
    ]);

    function createTextColumn(displayMemberPath: string): GridTextColumn {
        var col = new GridTextColumn();
        col.Binding = new Fayde.Data.Binding(displayMemberPath);
        return col;
    }
    function verifyColumns(grid: Grid, ilen: number, jlen: number):boolean {
        for (var i = 0; i < ilen; i++) {
            for (var j = 0; j < jlen; j++) {
                var cell = grid.Children.GetValueAt(i * jlen + j);
                if (Grid.GetColumn(cell) !== j)
                    return false;
            }
        }
        return true;
    }
    function verifyRows(grid: Grid, ilen: number, jlen: number): boolean {
        for (var i = 0; i < ilen; i++) {
            for (var j = 0; j < jlen; j++) {
                var cell = grid.Children.GetValueAt(i * jlen + j);
                if (Grid.GetRow(cell) !== i)
                    return false;
            }
        }
        return true;
    }

    test("Column movement", () => {
        var gic = new GridItemsControl();
        gic.Measure(size.fromRaw(100, 100));

        gic.ItemsSource = mock1;

        gic.Columns.Add(createTextColumn("Name"));
        gic.Columns.Add(createTextColumn("Description"));

        var presenter = gic.XamlNode.ItemsPresenter;
        var grid = presenter.Panel;
        strictEqual(grid.ColumnDefinitions.Count, 2);
        strictEqual(grid.RowDefinitions.Count, 4);
        strictEqual(grid.Children.Count, 8);

        //Add column
        gic.Columns.Insert(1, createTextColumn("Extra"));
        strictEqual(grid.ColumnDefinitions.Count, 3);
        strictEqual(grid.Children.Count, 12);
        ok(verifyColumns(grid, 4, 3), "cols");
        ok(verifyRows(grid, 4, 3), "rows");

        //Remove column
        gic.Columns.RemoveAt(1);
        strictEqual(grid.ColumnDefinitions.Count, 2);
        strictEqual(grid.Children.Count, 8);
        ok(verifyColumns(grid, 4, 2), "cols");
        ok(verifyRows(grid, 4, 2), "rows");
    });

    test("Item movement", () => {
        var gic = new GridItemsControl();
        gic.Measure(size.fromRaw(100, 100));

        gic.ItemsSource = mock1;

        gic.Columns.Add(createTextColumn("Name"));
        gic.Columns.Add(createTextColumn("Description"));

        var presenter = gic.XamlNode.ItemsPresenter;
        var grid = presenter.Panel;
        strictEqual(grid.ColumnDefinitions.Count, 2);
        strictEqual(grid.RowDefinitions.Count, 4);
        strictEqual(grid.Children.Count, 8);
        ok(verifyColumns(grid, 4, 2), "cols");
        ok(verifyRows(grid, 4, 2), "rows");

        var newItem = { Name: "Name2", Description: "Description 2" };

        //Add item
        mock1.Insert(newItem, 1);
        strictEqual(grid.RowDefinitions.Count, 5);
        strictEqual(grid.Children.Count, 10);
        ok(verifyColumns(grid, 5, 2), "cols");
        ok(verifyRows(grid, 5, 2), "rows");

        //Remove item
        mock1.Remove(newItem);
        strictEqual(grid.RowDefinitions.Count, 4);
        strictEqual(grid.Children.Count, 8);
        ok(verifyColumns(grid, 4, 2), "cols");
        ok(verifyRows(grid, 4, 2), "rows");
    });
}