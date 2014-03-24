import GridItemsControlTests = require("Tests/GridItemsControlTests");

export function run() {
    GridItemsControlTests.run();

    QUnit.load();
    QUnit.start();
} 