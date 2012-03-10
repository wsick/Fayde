/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js" />

//#region ItemsPresenter

function ItemsPresenter() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(ItemsPresenter, "ItemsPresenter", FrameworkElement);

//#endregion