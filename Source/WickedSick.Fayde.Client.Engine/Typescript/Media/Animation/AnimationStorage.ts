/// <reference path="../../Runtime/Nullstone.ts"/>
/// CODE
/// <reference path="AnimationBase.ts"/>
/// <reference path="../../Core/DependencyObject.ts"/>
/// <reference path="../../Core/DependencyProperty.ts"/>
/// <reference path="AnimationStore.ts"/>

module Fayde.Media.Animation {
    export class AnimationStorage {
        private _Animation: AnimationBase;
        private _TargetObj: DependencyObject;
        private _TargetProp: DependencyProperty;
        private _Disabled: bool = false;
        private _BaseValue: any;
        private _CurrentValue: any = undefined;
        StopValue: any;

        constructor(animation: AnimationBase, targetObj: DependencyObject, targetProp: DependencyProperty) {
            this._Animation = animation;
            this._TargetObj = targetObj;
            this._TargetProp = targetProp;

            var prevStorage = AnimationStore.Attach(targetObj, targetProp, this);

            this._BaseValue = targetObj.GetValue(targetProp);
            if (this._BaseValue === undefined) {
                var targetType = targetProp.GetTargetType();
                if (targetType === Number)
                    this._BaseValue = 0;
                else if (targetType === String)
                    this._BaseValue = "";
                else
                    this._BaseValue = new (<any>targetType)();
            }

            if (prevStorage)
                this.StopValue = prevStorage.StopValue;
            else
                this.StopValue = targetObj.ReadLocalValue(targetProp);
        }

        SwitchTarget(target: DependencyObject) {
            var wasDisabled = this._Disabled;
            if (!this._Disabled)
                this.Disable();
            this._TargetObj = target;
            this._Disabled = wasDisabled;
        }

        Enable() {
            this._Disabled = false;
            this.ApplyCurrentValue();
        }
        Disable() { this._Disabled = true; }

        Stop() {
            this.DetachFromObject();
            this.ResetPropertyValue();
        }
        DetachFromObject() {
            var to = this._TargetObj;
            if (!to)
                return;
            var tp = this._TargetProp;
            if (!tp)
                return;
            AnimationStore.Detach(to, tp, this);
        }
        ResetPropertyValue() {
            var to = this._TargetObj;
            if (!to)
                return;
            var tp = this._TargetProp;
            if (!tp)
                return;
            to.SetStoreValue(tp, this.StopValue);
        }

        UpdateCurrentValueAndApply(clockData: IClockData) {
            if (this._Disabled)
                return;
            if (!this._TargetObj)
                return;
            var oldValue = this._CurrentValue;
            this._CurrentValue = this._Animation.GetCurrentValue(this._BaseValue, this.StopValue !== undefined ? this.StopValue : this._BaseValue, clockData);
            if (Nullstone.Equals(oldValue, this._CurrentValue))
                return;
            this.ApplyCurrentValue();
        }
        ApplyCurrentValue() {
            if (this._CurrentValue == null)
                return;
            //var that = this;
            //AnimationDebug(function () { return "ApplyCurrentValue: [" + that._TargetObj.constructor._TypeName + "." + that._TargetProp.Name + "] --> " + that._CurrentValue.toString(); });
            this._TargetObj.SetStoreValue(this._TargetProp, this._CurrentValue);
        }

        CloneCore() {
            //TODO: Implement
        }
    }
    Nullstone.RegisterType(AnimationStorage, "AnimationStorage");
}