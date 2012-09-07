/// <reference path="../Core/FrameworkElement.js" />
/// CODE
/// <reference path="StackPanel.js"/>
/// <reference path="VirtualizingStackPanel.js"/>

//#region ItemsPresenter
var ItemsPresenter = Nullstone.Create("ItemsPresenter", FrameworkElement);

//#region Properties

Nullstone.Property(ItemsPresenter, "StackPanelFallbackTemplate", {
    get: function () {
        if (this._SPFT == null)
            this._SPFT = new ItemsPanelTemplate({ Type: StackPanel });
        return this._SPFT;
    }
});

Nullstone.Property(ItemsPresenter, "VirtualizingStackPanelFallbackTemplate", {
    get: function () {
        if (this._VSPFT == null)
            this._VSPFT = new ItemsPanelTemplate({ Type: VirtualizingStackPanel });
        return this._VSPFT;
    }
});

//#endregion

ItemsPresenter.Instance.OnApplyTemplate = function () {
    this.TemplateOwner._SetItemsPresenter(this);
    this.OnApplyTemplate$FrameworkElement();
};
ItemsPresenter.Instance._GetDefaultTemplateCallback = function () {
    var c = Nullstone.As(this.TemplateOwner, ItemsControl);
    if (c == null)
        return null;

    if (this._ElementRoot != null)
        return this._ElementRoot;

    if (c.ItemsPanel != null) {
        var root = c.ItemsPanel.GetVisualTree(this);
        if (root != null && !(root instanceof Panel))
            throw new InvalidOperationException("The root element of an ItemsPanelTemplate must be a Panel subclass");
        this._ElementRoot = root;
    }

    if (this._ElementRoot == null) {
        
        var template = c instanceof ListBox ? this.VirtualizingStackPanelFallbackTemplate : this.StackPanelFallbackTemplate;
        this._ElementRoot = template.GetVisualTree(this);
    }

    this._ElementRoot.IsItemsHost = true;
    return this._ElementRoot;
};

Nullstone.FinishCreate(ItemsPresenter);
//#endregion