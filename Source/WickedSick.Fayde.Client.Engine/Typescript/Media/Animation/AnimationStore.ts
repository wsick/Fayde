/// CODE
/// <reference path="../../Core/DependencyObject.ts" />
/// <reference path="../../Core/DependencyProperty.ts" />
/// <reference path="AnimationBase.ts" />

module Fayde.Media.Animation {
    export interface IAnimationStorage {
        Animation: AnimationBase;
        PropStorage: Providers.IPropertyStorage;
        IsDisabled: bool;
        BaseValue: any;
        CurrentValue: any;
        StopValue: any;
    }

    export class AnimationStore {
        static Create(target: DependencyObject, propd: DependencyProperty): IAnimationStorage {
            var baseValue = target.GetValue(propd);
            if (baseValue === undefined) {
                var targetType = propd.GetTargetType();
                if (targetType === Number)
                    baseValue = 0;
                else if (targetType === String)
                    baseValue = "";
                else
                    baseValue = new (<any>targetType)();
            }
            return {
                Animation: undefined,
                PropStorage: Providers.GetStorage(target, propd),
                IsDisabled: false,
                BaseValue: baseValue,
                CurrentValue: undefined,
                StopValue: undefined,
            };
        }
        static Clone(oldanims: IAnimationStorage[], newTarget: DependencyObject): IAnimationStorage[] {
            if (!oldanims)
                return undefined;

            var len = oldanims.length;
            var newanims = [];
            var oldanim: IAnimationStorage;
            for (var i = 0; i < len; i++) {
                oldanim = oldanims[i];
                newanims.push({
                    Animation: oldanim.Animation,
                    PropStorage: Providers.GetStorage(newTarget, oldanim.PropStorage.Property),
                    IsDisabled: oldanim.IsDisabled,
                    BaseValue: oldanim.BaseValue,
                    CurrentValue: undefined,
                    StopValue: oldanim.StopValue,
                });
            }
            return newanims;
        }
        static Attach(animStorage: IAnimationStorage) {
            var storage = animStorage.PropStorage;
            var list = storage.Animation;
            if (!list)
                storage.Animation = list = [];
            var prevStorage = list[list.length - 1];
            list.push(animStorage);
            if (prevStorage) {
                animStorage.StopValue = prevStorage.StopValue;
                prevStorage.IsDisabled = true;
            } else {
                animStorage.StopValue = storage.Local;
            }
        }
        static Detach(animStorage: IAnimationStorage): bool {
            var storage = animStorage.PropStorage;

            var list = storage.Animation;
            if (!list)
                return false;

            var len = list.length;
            if (len < 1)
                return false;

            var i = list.lastIndexOf(animStorage);
            if (i === (len - 1)) {
                list.pop();
                if (len > 1) {
                    var last = list[len - 2];
                    last.IsDisabled = false;
                    ApplyCurrent(last);
                    return true;
                }
            } else {
                list.splice(i, 1);
                if (i > 0)
                    list[i].StopValue = animStorage.StopValue;
            }
            return false;
        }
        static ApplyCurrent(animStorage: IAnimationStorage) {
            var storage = animStorage.PropStorage;
            storage.Property.Store.SetLocalValue(storage, animStorage.CurrentValue);
        }
        static ApplyStop(animStorage: IAnimationStorage) {
            var storage = animStorage.PropStorage;
            storage.Property.Store.SetLocalValue(storage, animStorage.StopValue);
        }
    }
}