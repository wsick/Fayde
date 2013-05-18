/// CODE
/// <reference path="../../Core/DependencyObject.ts" />
/// <reference path="../../Core/DependencyProperty.ts" />
/// <reference path="AnimationBase.ts" />

module Fayde.Media.Animation {
    export interface IAnimationStorage {
        Animation: AnimationBase;
        TargetObj: DependencyObject;
        TargetProp: DependencyProperty;
        IsDisabled: bool;
        BaseValue: any;
        CurrentValue: any;
        StopValue: any;
    }

    export interface IAnimStorageHidden {
        _Storage: IAnimationStorage;
    }

    export class AnimationStore {
        static Clone(oldanims: IAnimationStorage[], newTarget: DependencyObject): IAnimationStorage[] {
            if (!oldanims)
                return undefined;

            var newanims = oldanims.slice(0);
            var len = newanims.length;
            var newanim: IAnimationStorage;
            var wasDisabled: bool;
            for (var i = 0; i < len; i++) {
                newanim = newanims[i];
                wasDisabled = newanim.IsDisabled;
                newanim.IsDisabled = true;
                newanim.TargetObj = newTarget;
                newanim.IsDisabled = wasDisabled;
            }

            return newanims;
        }
        static AttachAnimation(animation: AnimationBase, targetObj: DependencyObject, targetProp: DependencyProperty): IAnimationStorage {
            var storage: IAnimationStorage = {
                Animation: animation,
                TargetObj: targetObj,
                TargetProp: targetProp,
                IsDisabled: false,
                BaseValue: undefined,
                CurrentValue: undefined,
                StopValue: undefined,
            };
            var prevStorage = AnimationStore.Attach(targetObj, targetProp, storage);

            var baseValue = targetObj.GetValue(targetProp);
            if (baseValue === undefined) {
                var targetType = targetProp.GetTargetType();
                if (targetType === Number)
                    baseValue = 0;
                else if (targetType === String)
                    baseValue = "";
                else
                    baseValue = new (<any>targetType)();
            }
            storage.BaseValue = baseValue;

            if (prevStorage)
                storage.StopValue = prevStorage.StopValue;
            else
                storage.StopValue = targetObj.ReadLocalValue(targetProp);

            return (<IAnimStorageHidden>animation)._Storage = storage;
        }
        static UpdateCurrentValueAndApply(storage: IAnimationStorage, clockData: IClockData) {
            if (storage.IsDisabled || !storage.TargetObj)
                return;
            var oldValue = storage.CurrentValue;
            storage.CurrentValue = storage.Animation.GetCurrentValue(storage.BaseValue, storage.StopValue !== undefined ? storage.StopValue : storage.BaseValue, clockData);
            if (oldValue === storage.CurrentValue)
                return;
            ApplyCurrentValue(storage);
        }
        static Disable(storage: IAnimationStorage) {
            storage.IsDisabled = true;
        }
        static Stop(storage: IAnimationStorage) {
            var to = storage.TargetObj;
            if (!to)
                return;
            var tp = storage.TargetProp;
            if (!tp)
                return;
            Detach(to, tp, storage);
            to.SetStoreValue(tp, storage.StopValue);
        }

        private static Attach(dobj: DependencyObject, propd: DependencyProperty, animStorage: IAnimationStorage): IAnimationStorage {
            var storage = Providers.GetStorage(dobj, propd);

            var list = storage.Animation;
            if (!list) {
                storage.Animation = list = [animStorage];
                return undefined;
            }

            var attached = list[list.length - 1];
            if (attached)
                attached.IsDisabled = true;
            list.push(animStorage);
            return attached;
        }
        private static Detach(dobj: DependencyObject, propd: DependencyProperty, animStorage: IAnimationStorage) {
            var storage = Providers.GetStorage(dobj, propd);

            var list = storage.Animation;
            if (!list)
                return;

            var len = list.length;
            if (len < 1)
                return;

            var i;
            var cur: Media.Animation.IAnimationStorage;
            for (i = len - 1; i >= 0; i--) {
                cur = list[i];
                if (cur === animStorage)
                    break;
            }
            if (i === (len - 1)) {
                list.pop();
                if (len > 1)
                    Enable(list[len - 2]);
            } else {
                list.splice(i, 1);
                if (i > 0)
                    list[i - 1].StopValue = animStorage.StopValue;
            }
        }
        private static Enable(storage: IAnimationStorage) {
            storage.IsDisabled = false;
            ApplyCurrentValue(storage);
        }
        private static ApplyCurrentValue(storage: IAnimationStorage) {
            if (storage.CurrentValue === undefined) return;
            //AnimationDebug(function () { return "ApplyCurrentValue: [" + that._TargetObj.constructor._TypeName + "." + that._TargetProp.Name + "] --> " + that._CurrentValue.toString(); });
            storage.TargetObj.SetStoreValue(storage.TargetProp, storage.CurrentValue);
        }
    }
}