
module Fayde.Controls {
    export interface IGeneratorPosition {
        index: number;
        offset: number;
    }
    export interface IGenerationState {
        AllowStartAtRealizedItem: bool;
        PositionIndex: number;
        PositionOffset: number;
        Step: number;
    }
    export interface IItemsChangedListener {
        OnItemsChanged(action: ItemsChangedAction, itemCount: number, itemUICount: number, oldPosition: IGeneratorPosition, position: IGeneratorPosition);
    }

    export enum ItemsChangedAction {
        Add = 1,
        Remove = 2,
        Replace = 3,
        Reset = 4,
    }

    export class ItemContainerGenerator {
        private _Listener: IItemsChangedListener;
        Listen(listener: IItemsChangedListener) { this._Listener = listener; }
        Unlisten(listener: IItemsChangedListener) { if (this._Listener === listener) this._Listener = null; }

        GeneratorPositionFromIndex(index: number): IGeneratorPosition {
        }
        IndexFromGeneratorPosition(position: IGeneratorPosition): number {
        }

        StartAt(position: IGeneratorPosition, direction: number, allowStartAtRealizedItem: bool): IGenerationState {
        }
        GenerateNext(isNewlyRealized: IOutValue): UIElement {
        }
        StopGeneration() {
        }

        PrepareItemContainer(container: UIElement) {
        }

        Recycle(position: IGeneratorPosition, count: number) {
        }
        Remove(position: IGeneratorPosition, count: number) {
        }
    }
}