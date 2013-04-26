var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (ItemsChangedAction) {
            ItemsChangedAction._map = [];
            ItemsChangedAction.Add = 1;
            ItemsChangedAction.Remove = 2;
            ItemsChangedAction.Replace = 3;
            ItemsChangedAction.Reset = 4;
        })(Controls.ItemsChangedAction || (Controls.ItemsChangedAction = {}));
        var ItemsChangedAction = Controls.ItemsChangedAction;
        var ItemContainerGenerator = (function () {
            function ItemContainerGenerator() { }
            ItemContainerGenerator.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            ItemContainerGenerator.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            ItemContainerGenerator.prototype.GeneratorPositionFromIndex = function (index) {
            };
            ItemContainerGenerator.prototype.IndexFromGeneratorPosition = function (position) {
            };
            ItemContainerGenerator.prototype.StartAt = function (position, direction, allowStartAtRealizedItem) {
            };
            ItemContainerGenerator.prototype.GenerateNext = function (isNewlyRealized) {
            };
            ItemContainerGenerator.prototype.StopGeneration = function () {
            };
            ItemContainerGenerator.prototype.PrepareItemContainer = function (container) {
            };
            ItemContainerGenerator.prototype.Recycle = function (position, count) {
            };
            ItemContainerGenerator.prototype.Remove = function (position, count) {
            };
            return ItemContainerGenerator;
        })();
        Controls.ItemContainerGenerator = ItemContainerGenerator;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemContainerGenerator.js.map
