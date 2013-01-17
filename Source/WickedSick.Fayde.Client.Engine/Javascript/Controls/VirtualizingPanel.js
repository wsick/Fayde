/// <reference path="Panel.js"/>
/// CODE
/// <reference path="ItemsControl.js"/>

(function (namespace) {
    var VirtualizingPanel = Nullstone.Create("VirtualizingPanel", Panel);

    //#region Properties

    Nullstone.Property(VirtualizingPanel, "ItemContainerGenerator", {
        get: function () {
            if (this._Generator == null) {
                var owner = ItemsControl.GetItemsOwner(this);
                if (owner == null)
                    throw new InvalidOperationException("VirtualizingPanels must be in the Template of an ItemsControl in order to generate items");
                this._Generator = owner.ItemContainerGenerator;
                this._Generator.ItemsChanged.Subscribe(this.OnItemsChangedInternal, this);
            }
            return this._Generator;
        }
    });

    //#endregion

    VirtualizingPanel.Instance.AddInternalChild = function (child) {
        this.Children.Add(child);
    };
    VirtualizingPanel.Instance.InsertInternalChild = function (index, child) {
        this.Children.Insert(index, child);
    };
    VirtualizingPanel.Instance.RemoveInternalChildRange = function (index, range) {
        var children = this.Children;
        for (var i = 0; i < range; i++) {
            children.RemoveAt(index);
        }
    };
    VirtualizingPanel.Instance.BringIndexIntoView = function (index) { };
    VirtualizingPanel.Instance.OnClearChildren = function () { };
    VirtualizingPanel.Instance.OnItemsChangedInternal = function (sender, args) {
        this._InvalidateMeasure();
        if (args.Action === NotifyCollectionChangedAction.Reset) {
            this.Children.Clear();
            this.ItemContainerGenerator.RemoveAll();
            this.OnClearChildren();
        }
        this.OnItemsChanged(sender, args);
    };
    VirtualizingPanel.Instance.OnItemsChanged = function (sender, args) { };

    namespace.VirtualizingPanel = Nullstone.FinishCreate(VirtualizingPanel);
})(window);