/// <reference path="Timeline.ts" />
/// CODE
/// <reference path="AnimationStorage.ts"/>

module Fayde.Media.Animation {
    export class AnimationBase extends Timeline {
        private _Storage: AnimationStorage;

        Resolve(target: DependencyObject, propd: DependencyProperty) { return true; }

        HookupStorage(targetObj: DependencyObject, targetProp: DependencyProperty): AnimationStorage {
            return (this._Storage = new AnimationStorage(this, targetObj, targetProp));
        }
        Disable() {
            var storage = this._Storage;
            if (storage)
                storage.Disable();
        }
        Stop() {
            var storage = this._Storage;
            if (storage)
                storage.Stop();
        }
        UpdateInternal(clockData: IClockData) {
            var storage = this._Storage;
            if (storage)
                storage.UpdateCurrentValueAndApply(clockData);
        }
        GetNaturalDurationCore(): Duration { return Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 1)); }

        GetTargetValue(defaultOriginalValue: any): any { return undefined; }
        GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): any { return undefined; }
    }
    Nullstone.RegisterType(AnimationBase, "AnimationBase");
}