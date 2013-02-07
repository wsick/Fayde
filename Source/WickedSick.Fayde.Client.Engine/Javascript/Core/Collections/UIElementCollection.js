/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="DependencyObjectCollection.js"/>
/// CODE

(function (Fayde) {
    function zIndexComparer(uie1, uie2) {
        var p = Fayde.Controls.Panel;
        var zi1 = p.GetZIndex(uie1);
        var zi2 = p.GetZIndex(uie2);
        if (zi1 === zi2) {
            var z1 = p.GetZ(uie1);
            var z2 = p.GetZ(uie2);
            if (isNaN(z1) || isNaN(z2))
                return 0;
            return z1 > z2 ? 1 : (z1 < z2 ? -1 : 0);
        }
        return zi1 - zi2;
    }

    var UIElementCollection = Nullstone.Create("UIElementCollection", Fayde.DependencyObjectCollection);

    UIElementCollection.Instance.Init = function () {
        this.Init$DependencyObjectCollection();
        this._ZSorted = [];
    };

    UIElementCollection.Instance.GetValueAtZIndex = function (index) {
        return this._ZSorted[index];
    };
    UIElementCollection.Instance.GetZSortedCount = function () {
        return this._ZSorted.length;
    };
    UIElementCollection.Instance.ResortByZIndex = function () {
        var count = this.GetCount();
        this._ZSorted = new Array(count);
        if (count < 1)
            return;

        for (var i = 0; i < count; i++) {
            this._ZSorted[i] = this._ht[i];
        }

        if (count > 1) {
            this._ZSorted.sort(zIndexComparer);
        }
    };
    UIElementCollection.Instance.IsElementType = function (value) {
        return value instanceof Fayde.UIElement;
    };

    Fayde.UIElementCollection = Nullstone.FinishCreate(UIElementCollection);
})(Nullstone.Namespace("Fayde"));