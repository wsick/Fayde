/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js" />

//#region ItemsPresenter
var ItemsPresenter = Nullstone.Create("ItemsPresenter", FrameworkElement);

ItemsPresenter.GetStackPanelFallbackTemplate = function () {
    if (!this._stackPanelFallbackTemplate) {
        this._stackPanelFallbackTemplate = new ItemsPanelTemplate({ Type: StackPanel });
    }
    return this._stackPanelFallbackTemplate;
};

ItemsPresenter.GetVirtualizingStackPanelFallbackTemplate = function () {
    throw new NotSupportedException();
};

ItemsPresenter.Instance.OnApplyTemplate = function () {
    var c = Nullstone.As(this.TemplateOwner, ItemsControl);
    c._SetItemsPresenter(this);
    this.OnApplyTemplate$FrameworkElement();
};

ItemsPresenter.Instance._GetDefaultTemplateCallback = function () {
    var c = Nullstone.As(this.TemplateOwner, ItemsControl);
    if (!c) {
        return null;
    }

    if (this._elementRoot) {
        return this._elementRoot;
    }

    if (c.ItemsPanel) {
        var root = c.ItemsPanel.GetVisualTree(this);
        if (root && !Nullstone.Is(root, Panel)) {
            throw new InvalidOperationException("The root element of an ItemsPanelTemplate must be a Panel subclass");
        }
        this._elementRoot = Nullstone.As(root, Panel);
    }

    if (!this._elementRoot) {
        var template = Nullstone.Is(c, ListBox) ? ItemsPresenter.GetVirtualizingStackPanelFallbackTemplate() : ItemsPresenter.GetStackPanelFallbackTemplate();
        this._elementRoot = template.GetVisualTree(this);
    }

    this._elementRoot.IsItemsHost = true;
    return this._elementRoot;
};

Nullstone.FinishCreate(ItemsPresenter);
//#endregion