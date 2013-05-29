/// <reference path="Timeline.ts" />
/// CODE
/// <reference path="AnimationStore.ts"/>

module Fayde.Media.Animation {
    export class AnimationBase extends Timeline implements IAnimStorageHidden {
        private _Storage: IAnimationStorage;

        Resolve(target: DependencyObject, propd: DependencyProperty) { return true; }

        Disable() {
            var storage = this._Storage;
            if (storage)
                AnimationStore.Disable(storage);
        }
        Stop() {
            var storage = this._Storage;
            if (storage)
                AnimationStore.Stop(storage);
        }
        UpdateInternal(clockData: IClockData) {
            var storage = this._Storage;
            if (storage)
                AnimationStore.UpdateCurrentValueAndApply(storage, clockData);
        }
        GetNaturalDurationCore(): Duration { return new Duration(TimeSpan.FromArgs(0, 0, 0, 1)); }

        GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): any { return undefined; }
    }
    Nullstone.RegisterType(AnimationBase, "AnimationBase");
}