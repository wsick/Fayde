/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/DoubleKeyedDictionary.js" />
/// CODE

var GenerationState = Nullstone.Create("GenerationState");

Nullstone.Instance.Init = function () {
    this._allowStartAtRealizedItem = false;
    this._generatorDirection = 0;
    this._positionIndex = 0;
    this._positionOffset = 0;
    this._step = 1;
}

Nullstone.FinishCreate(GenerationState);

//#region ItemContainerGenerator
var ItemContainerGenerator = Nullstone.Create("ItemContainerGenerator", null, 1);

ItemContainerGenerator.Instance.Init = function (owner) {
    this.ItemsChanged = new MulticastEvent();
    
    this.Cache = [];
    this.ContainerIndexMap = new DoubleKeyedDictionary();
    this.ContainerItemMap = new Dictionary();
    this.Owner = owner;
};

ItemContainerGenerator.Instance.ContainerFromIndex = function (index) {
    var container;
    this.ContainerIndexMap.TryMapFromKey2(index, container);
    return container;
};

ItemContainerGenerator.Instance.ContainerFromItem = function (item) {
    if (!item) {
        return;
    }

    //TODO: finish this
};

ItemContainerGenerator.Instance.CheckOffsetAndRealized = function (positionIndex, positionOffset, count) {
    if (positionOffset != 0) {
        throw new ArgumentException("position.Offset must be zero as the position must refer to a realized element");
    }

    var index = this.IndexFromGeneratorPosition(positionIndex, positionOffset);
    //TODO: finish this
};

ItemContainerGenerator.Instance.GenerateNext = function (isNewlyRealized) {
    if (!this._GenerationState) {
        throw new InvalidOperationException("Cannot call GenerateNext before calling StartAt");
    }

    var index;
    var startAt = this._GenerationState._positionIndex;
    var startOffset = this._GenerationState._positionOffset;
    if (startAt == -1) {
        if (startOffset < 0) {
            index = this.Owner.Items.GetCount() + startOffset;
        }
        else if (startOffset == 0) {
            index = 0;
        }
        else {
            index = startOffset - 1;
        }
    }
    else if (startAt >= 0 && startAt < this.RealizedElements.GetCount()) {
        index = this.RealizedElements.GetValueAt(startAt) + startOffset;
    }
    else {
        index = -1;
    }

    var alreadyRealized = this.RealizedElements.Contains(index);
    if (!this._GenerationState._allowStartAtRealizedItem && alreadyRealized && startOffset == 0) {
        index = index + this._GenerationState._step;
        alreadyRealized = this.RealizedElements.Contains(index);
    }

    if (index < 0 || index >= this.Owner.Items.GetCount()) {
        isNewlyRealized = false;
        return null;
    }

    if (alreadyRealized) {
        this._GenerationState._positionIndex = this.RealizedElements.IndexOf(index);
        this._GenerationState._positionOffset = this._GenerationState._step;
        isNewlyRealized = false;
        var result;
        this.ContainerIndexMap.TryGetValueFromKey1(index, result);
        return result;
    }

    var container;
    var item = this.Owner.Items.GetValueAt(index);
    if (this.Owner.IsItemItsOwnContainer(item)) {
        container = Nullstone.As(item, DependencyObject);
        isNewlyRealized = true;
    }
    else {
        if (this.Cache.length == 0) {
            container = this.Owner.GetContainerForItem();
            isNewlyRealized = true;
        }
        else {
            container = this.Cache.pop();
            isNewlyRealized = false;
        }

        var c = Nullstone.As(container, ContentControl);
        if (c) {
            c.ContentSetsParent = false;
        }
    }

    var f = Nullstone.As(container, FrameworkElement);
    if (f && !Nullstone.Is(item, UIElement)) {
        f.DataContext = item;
    }

    this.RealizedElements.Add(index);
    this.ContainerIndexMap.Add(container, index);
    this.ContainerItemMap(container, item);

    this._GenerationState._positionIndex = this.RealizedItems.IndexOf(index);
    this._GenerationState._positionOffset = this._GenerationState._step;
    return container;
};

ItemContainerGenerator.Instance.GeneratorPositionFromIndex = function (itemIndex) {

};

ItemContainerGenerator.Instance.GetItemContainerGeneratorForPanel = function (panel) {

};

ItemContainerGenerator.Instance.IndexFromContainer = function (container) {

};

ItemContainerGenerator.Instance.IndexFromGeneratorPosition = function (positionIndex, positionOffset) {

};

ItemContainerGenerator.Instance.ItemFromContainer = function (container) {

};

ItemContainerGenerator.Instance.OnOwnerItemsItemsChanged = function (sender, e) {

};

ItemContainerGenerator.Instance.PrepareItemContainer = function (container) {

};

ItemContainerGenerator.Instance.Remove = function (positionIndex, positionOffset, count) {

};

ItemContainerGenerator.Instance.MoveExistingItems = function (index, offset) {

};

ItemContainerGenerator.Instance.RemoveAll = function () {

};

ItemContainerGenerator.Instance.StartAt = function (positionIndex, positionOffset, direction, allowStartAtRealizedItem) {

};

ItemContainerGenerator.Instance.Recycle = function (positionIndex, positionOffset, count) {

};

Nullstone.FinishCreate(ItemContainerGenerator);
//#endregion