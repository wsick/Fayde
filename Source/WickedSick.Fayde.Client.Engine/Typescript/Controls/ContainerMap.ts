/// CODE
/// <reference path="ItemContainerGenerator.ts" />

module Fayde.Controls {
    export class ContainerMap {
        private _Containers: DependencyObject[] = [];
        private _Items: any[] = [];

        constructor(public Owner: ItemContainerGenerator) { }

        IndexFromItem(item: any) {
            var items = this._Items;
            var len = items.length;
            for (var i = 0; i < len; i++) {
                if (item === items[i])
                    return i;
            }
            return -1;
        }
        IndexFromContainer(container: DependencyObject): number {
            var containers = this._Containers;
            var len = containers.length;
            for (var i = 0; i < len; i++) {
                if (container === containers[i])
                    return i;
            }
            return -1;
        }
        ContainerFromIndex(index: number): DependencyObject { return this._Containers[index]; }
        ItemFromContainer(container: DependencyObject): any {
            var index = this.IndexFromContainer(container);
            if (index > 0)
                return this._Items[index];
            return new UnsetValue();
        }
        ContainerFromItem(item: any): DependencyObject {
            if (item == null)
                return null;
            var index = this.IndexFromItem(item);
            if (index > 0)
                return this._Containers[index];
        }

        Add(container: DependencyObject, item: any, index: number) {
            if (index < this._Containers.length)
                throw new InvalidOperationException("Cannot insert into ContainerMap - only append.");
            this._Containers.push(container);
            this._Items.push(item);
        }
        RemoveIndex(index: number): DependencyObject {
            this._Items.splice(index, 1);
            return this._Containers.splice(index, 1)[0];
        }
        Move(oldIndex: number, offset: number) {
            var items = this._Items;
            var containers = this._Containers;
            var finalIndex = oldIndex + offset;
            if (offset > 0)
                finalIndex--;
                
            items.splice(finalIndex, 0, items.splice(oldIndex, 1)[0]);
            containers.splice(finalIndex, 0, containers.splice(oldIndex, 1)[0]);
        }
        Clear() {
            var ic = this.Owner.Owner;
            var containers = this._Containers;
            var items = this._Items;
            var len = containers.length;
            for (var i = 0; i < len; i++) {
                ic.ClearContainerForItem(containers[i], items[i]);
            }
        }
    }
}