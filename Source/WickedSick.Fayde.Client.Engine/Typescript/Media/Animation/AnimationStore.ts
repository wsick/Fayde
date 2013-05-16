/// CODE
/// <reference path="../../Core/DependencyObject.ts" />
/// <reference path="../../Core/DependencyProperty.ts" />
/// <reference path="AnimationStorage.ts" />

module Fayde.Media.Animation {
    export class AnimationStore {
        static Get(dobj: DependencyObject, propd: DependencyProperty): AnimationStorage {
            var storage = Providers.GetStorage(dobj, propd);
            var list = storage.Animation;
            if (list && list.length > 0)
                return list[list.length - 1];
            return undefined;
        }
        static Attach(dobj: DependencyObject, propd: DependencyProperty, animStorage: AnimationStorage): AnimationStorage {
            var storage = Providers.GetStorage(dobj, propd);

            var list = storage.Animation;
            if (!list) {
                storage.Animation = list = [animStorage];
                return undefined;
            }

            var attached = list[list.length - 1];
            if (attached)
                attached.Disable();
            list.push(animStorage);
            return attached;
        }
        static Detach(dobj: DependencyObject, propd: DependencyProperty, animStorage: AnimationStorage) {
            var storage = Providers.GetStorage(dobj, propd);

            var list = storage.Animation;
            if (!list)
                return;

            var len = list.length;
            if (len < 1)
                return;

            var i;
            var cur: Media.Animation.AnimationStorage;
            for (i = len - 1; i >= 0; i--) {
                cur = list[i];
                if (cur === animStorage)
                    break;
            }
            if (i === (len - 1)) {
                list.pop();
                if (len > 1)
                    list[len - 2].Enable();
            } else {
                list.splice(i, 1);
                if (i > 0)
                    list[i - 1].StopValue = animStorage.StopValue;
            }
        }
    }
}