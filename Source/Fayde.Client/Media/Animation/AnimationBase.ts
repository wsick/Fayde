/// <reference path="Timeline.ts" />

module Fayde.Media.Animation {
    export class AnimationBase extends Timeline {
        private _AnimStorage: IAnimationStorage;
        private _IsHolding: boolean = false;

        constructor() {
            super();
        }

        Resolve(target: DependencyObject, propd: DependencyProperty) { return true; }

        HoldEnd() { this._IsHolding = true; }
        Stop() {
            var animStorage = this._AnimStorage;
            if (!animStorage)
                return;
            if (AnimationStore.Detach(animStorage) || animStorage.IsDisabled)
                return;
            AnimationStore.ApplyStop(animStorage);
        }
        UpdateInternal(clockData: IClockData) {
            if (this._IsHolding)
                return;
            var animStorage = this._AnimStorage;
            if (!animStorage || animStorage.IsDisabled)
                return;

            var oldValue = animStorage.CurrentValue;
            animStorage.CurrentValue = this.GetCurrentValue(animStorage.BaseValue, animStorage.StopValue !== undefined ? animStorage.StopValue : animStorage.BaseValue, clockData);
            if (Animation.Log)
                console.log(getLogMessage("AnimationBase.UpdateInternal", this, oldValue, animStorage.CurrentValue));
            if (oldValue === animStorage.CurrentValue || animStorage.CurrentValue === undefined)
                return;
            AnimationStore.ApplyCurrent(animStorage);
        }
        GetNaturalDurationCore(): Duration { return new Duration(TimeSpan.FromArgs(0, 0, 0, 1)); }

        GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): any { return undefined; }

        _Hookup(promotedValues: any[], error: BError): boolean {
            this._IsHolding = false;
            this.Reset();

            var resolution = Storyboard.ResolveTarget(this);

            var refobj = { Value: resolution.Target };
            var targetProperty = resolution.Property.TryResolveDependencyProperty(refobj, promotedValues);
            resolution.Target = refobj.Value;
            if (!targetProperty) {
                error.Number = BError.XamlParse;
                error.Message = "Could not resolve property for storyboard. [" + resolution.Property.Path.toString() + "]";
                return false;
            }
            if (!this.Resolve(resolution.Target, targetProperty)) {
                error.Number = BError.InvalidOperation;
                error.Message = "Storyboard value could not be converted to the correct type";
                return false;
            }

            this._AnimStorage = AnimationStore.Create(resolution.Target, targetProperty);
            this._AnimStorage.Animation = this;
            AnimationStore.Attach(this._AnimStorage);
            return true;
        }
    }
    Fayde.RegisterType(AnimationBase, "Fayde.Media.Animation", Fayde.XMLNS);

    function getLogMessage(action: string, anim: AnimationBase, oldValue: any, newValue: any) {
        var msg = "ANIMATION:" + action + ":" + (<any>anim)._ID + "[" + (<any>anim).constructor.name + "]";
        msg += ";" + (oldValue === undefined ? "(undefined)" : (oldValue === null ? "(null)" : oldValue.toString()));
        msg += "->" + (newValue === undefined ? "(undefined)" : (newValue === null ? "(null)" : newValue.toString()));
        return msg;
    }
}