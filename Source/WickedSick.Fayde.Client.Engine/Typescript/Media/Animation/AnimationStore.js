var Fayde;
(function (Fayde) {
    (function (Media) {
        /// CODE
        /// <reference path="../../Core/DependencyObject.ts" />
        /// <reference path="../../Core/DependencyProperty.ts" />
        /// <reference path="AnimationBase.ts" />
        (function (Animation) {
            var DEBUG_ON = true;
            var AnimationStore = (function () {
                function AnimationStore() { }
                AnimationStore.Clone = function Clone(oldanims, newTarget) {
                    if(!oldanims) {
                        return undefined;
                    }
                    var newanims = oldanims.slice(0);
                    var len = newanims.length;
                    var newanim;
                    var wasDisabled;
                    for(var i = 0; i < len; i++) {
                        newanim = newanims[i];
                        wasDisabled = newanim.IsDisabled;
                        newanim.IsDisabled = true;
                        newanim.TargetObj = newTarget;
                        newanim.IsDisabled = wasDisabled;
                    }
                    return newanims;
                };
                AnimationStore.AttachAnimation = function AttachAnimation(animation, targetObj, targetProp) {
                    var storage = {
                        Animation: animation,
                        TargetObj: targetObj,
                        TargetProp: targetProp,
                        IsDisabled: false,
                        BaseValue: undefined,
                        CurrentValue: undefined,
                        StopValue: undefined
                    };
                    var prevStorage = AnimationStore.Attach(targetObj, targetProp, storage);
                    var baseValue = targetObj.GetValue(targetProp);
                    if(baseValue === undefined) {
                        var targetType = targetProp.GetTargetType();
                        if(targetType === Number) {
                            baseValue = 0;
                        } else if(targetType === String) {
                            baseValue = "";
                        } else {
                            baseValue = new (targetType)();
                        }
                    }
                    storage.BaseValue = baseValue;
                    if(prevStorage) {
                        storage.StopValue = prevStorage.StopValue;
                    } else {
                        storage.StopValue = targetObj.ReadLocalValue(targetProp);
                    }
                    if(DEBUG_ON && window.console) {
                        console.info("AnimationStore.AttachAnimation");
                    }
                    return (animation)._Storage = storage;
                };
                AnimationStore.UpdateCurrentValueAndApply = function UpdateCurrentValueAndApply(storage, clockData) {
                    if(storage.IsDisabled || !storage.TargetObj) {
                        return;
                    }
                    var oldValue = storage.CurrentValue;
                    storage.CurrentValue = storage.Animation.GetCurrentValue(storage.BaseValue, storage.StopValue !== undefined ? storage.StopValue : storage.BaseValue, clockData);
                    if(oldValue === storage.CurrentValue) {
                        return;
                    }
                    AnimationStore.ApplyCurrentValue(storage);
                };
                AnimationStore.Disable = function Disable(storage) {
                    if(DEBUG_ON && window.console) {
                        console.info("AnimationStore.Disable");
                    }
                    storage.IsDisabled = true;
                };
                AnimationStore.Stop = function Stop(storage) {
                    if(DEBUG_ON && window.console) {
                        console.info("AnimationStore.Stop");
                    }
                    var to = storage.TargetObj;
                    var tp = storage.TargetProp;
                    if(!to || !tp) {
                        return;
                    }
                    AnimationStore.Detach(to, tp, storage);
                    to.SetStoreValue(tp, storage.StopValue);
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
                        attached.IsDisabled = true;
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
                            AnimationStore.Enable(list[len - 2]);
                        }
                    } else {
                        list.splice(i, 1);
                        if(i > 0) {
                            list[i - 1].StopValue = animStorage.StopValue;
                        }
                    }
                };
                AnimationStore.Enable = function Enable(storage) {
                    storage.IsDisabled = false;
                    AnimationStore.ApplyCurrentValue(storage);
                };
                AnimationStore.ApplyCurrentValue = function ApplyCurrentValue(storage) {
                    if(DEBUG_ON && window.console) {
                        console.info("AnimationStore.ApplyCurrentValue");
                    }
                    if(storage.CurrentValue === undefined) {
                        return;
                    }
                    //AnimationDebug(function () { return "ApplyCurrentValue: [" + that._TargetObj.constructor._TypeName + "." + that._TargetProp.Name + "] --> " + that._CurrentValue.toString(); });
                    storage.TargetObj.SetStoreValue(storage.TargetProp, storage.CurrentValue);
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
