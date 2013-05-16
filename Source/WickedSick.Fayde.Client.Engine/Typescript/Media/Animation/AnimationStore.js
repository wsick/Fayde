var Fayde;
(function (Fayde) {
    (function (Media) {
        /// CODE
        /// <reference path="../../Core/DependencyObject.ts" />
        /// <reference path="../../Core/DependencyProperty.ts" />
        /// <reference path="AnimationStorage.ts" />
        (function (Animation) {
            var AnimationStore = (function () {
                function AnimationStore() { }
                AnimationStore.Get = function Get(dobj, propd) {
                    var storage = Fayde.Providers.GetStorage(dobj, propd);
                    var list = storage.Animation;
                    if(list && list.length > 0) {
                        return list[list.length - 1];
                    }
                    return undefined;
                };
                AnimationStore.Attach = function Attach(dobj, propd, animStorage) {
                    var storage = Fayde.Providers.GetStorage(dobj, propd);
                    var list = storage.Animation;
                    if(!list) {
                        storage.Animation = list = [
                            animStorage
                        ];
                        return undefined;
                    }
                    var attached = list[list.length - 1];
                    if(attached) {
                        attached.Disable();
                    }
                    list.push(animStorage);
                    return attached;
                };
                AnimationStore.Detach = function Detach(dobj, propd, animStorage) {
                    var storage = Fayde.Providers.GetStorage(dobj, propd);
                    var list = storage.Animation;
                    if(!list) {
                        return;
                    }
                    var len = list.length;
                    if(len < 1) {
                        return;
                    }
                    var i;
                    var cur;
                    for(i = len - 1; i >= 0; i--) {
                        cur = list[i];
                        if(cur === animStorage) {
                            break;
                        }
                    }
                    if(i === (len - 1)) {
                        list.pop();
                        if(len > 1) {
                            list[len - 2].Enable();
                        }
                    } else {
                        list.splice(i, 1);
                        if(i > 0) {
                            list[i - 1].StopValue = animStorage.StopValue;
                        }
                    }
                };
                return AnimationStore;
            })();
            Animation.AnimationStore = AnimationStore;            
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=AnimationStore.js.map
