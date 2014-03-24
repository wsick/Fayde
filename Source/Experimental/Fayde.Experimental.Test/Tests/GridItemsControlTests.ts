/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />
/// <reference path="../../Fayde.Experimental/Fayde.Experimental.d.ts" />

import GridItemsControl = Fayde.Experimental.GridItemsControl;
import GridItemsPresenter = Fayde.Experimental.GridItemsPresenter;

export function run() {
    QUnit.module("GridItemsControl Tests");

    test("Create", () => {
        var gic = new GridItemsControl();
        gic.Measure(size.fromRaw(100, 100));
        ok(true);
    });
}