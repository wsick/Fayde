/// <reference path="../../Core/RoutedEventArgs.ts" />
/// CODE

module Fayde.Controls.Primitives {
    export enum ScrollEventType {
        SmallDecrement = 0,
        SmallIncrement = 1,
        LargeDecrement = 2,
        LargeIncrement = 3,
        ThumbPosition = 4,
        ThumbTrack = 5,
        First = 6,
        Last = 7,
        EndScroll = 8,
    }

    export class ScrollEventArgs extends RoutedEventArgs {
        private _ScrollEventType: ScrollEventType;
        get ScrollEventType(): ScrollEventType { return this._ScrollEventType; }
        private _Value: number;
        get Value(): number { return this._Value; }
        constructor(scrollEventType: ScrollEventType, value: number) {
            super();
            this._ScrollEventType = scrollEventType;
            this._Value = value;
        }
    }
    Nullstone.RegisterType(ScrollEventArgs, "ScrollEventArgs");
}