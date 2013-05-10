var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="ItemContainerGenerator.ts" />
    (function (Controls) {
        var ContainerMap = (function () {
            function ContainerMap(Owner) {
                this.Owner = Owner;
                this._Containers = [];
                this._Items = [];
            }
            ContainerMap.prototype.IndexFromItem = function (item) {
                var items = this._Items;
                var len = items.length;
                for(var i = 0; i < len; i++) {
                    if(item === items[i]) {
                        return i;
                    }
                }
                return -1;
            };
            ContainerMap.prototype.IndexFromContainer = function (container) {
                var containers = this._Containers;
                var len = containers.length;
                for(var i = 0; i < len; i++) {
                    if(container === containers[i]) {
                        return i;
                    }
                }
                return -1;
            };
            ContainerMap.prototype.ContainerFromIndex = function (index) {
                return this._Containers[index];
            };
            ContainerMap.prototype.ItemFromContainer = function (container) {
                var index = this.IndexFromContainer(container);
                if(index > -1) {
                    return this._Items[index];
                }
                return new Fayde.UnsetValue();
            };
            ContainerMap.prototype.ContainerFromItem = function (item) {
                if(item == null) {
                    return null;
                }
                var index = this.IndexFromItem(item);
                if(index > -1) {
                    return this._Containers[index];
                }
            };
            ContainerMap.prototype.Add = function (container, item, index) {
                if(index >= this._Containers.length) {
                    this._Containers.push(container);
                    this._Items.push(item);
                } else {
                    this._Containers.splice(index, 0, container);
                    this._Items.splice(index, 0, item);
                }
            };
            ContainerMap.prototype.RemoveIndex = function (index) {
                this._Items.splice(index, 1);
                return this._Containers.splice(index, 1)[0];
            };
            ContainerMap.prototype.Move = function (oldIndex, offset) {
                var items = this._Items;
                var containers = this._Containers;
                var finalIndex = oldIndex + offset;
                if(offset > 0) {
                    finalIndex--;
                }
                items.splice(finalIndex, 0, items.splice(oldIndex, 1)[0]);
                containers.splice(finalIndex, 0, containers.splice(oldIndex, 1)[0]);
            };
            ContainerMap.prototype.Clear = function () {
                var ic = this.Owner.Owner;
                var containers = this._Containers;
                var items = this._Items;
                var len = containers.length;
                for(var i = 0; i < len; i++) {
                    ic.ClearContainerForItem(containers[i], items[i]);
                }
                this._Containers = [];
                this._Items = [];
            };
            return ContainerMap;
        })();
        Controls.ContainerMap = ContainerMap;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ContainerMap.js.map
