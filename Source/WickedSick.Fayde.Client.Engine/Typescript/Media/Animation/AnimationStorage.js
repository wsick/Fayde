var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Runtime/Nullstone.ts"/>
        /// CODE
        /// <reference path="AnimationBase.ts"/>
        /// <reference path="../../Core/DependencyObject.ts"/>
        /// <reference path="../../Core/DependencyProperty.ts"/>
        /// <reference path="AnimationStore.ts"/>
        (function (Animation) {
            var AnimationStorage = (function () {
                function AnimationStorage(animation, targetObj, targetProp) {
                    this._Disabled = false;
                    this._CurrentValue = undefined;
                    this._Animation = animation;
                    this._TargetObj = targetObj;
                    this._TargetProp = targetProp;
                    var prevStorage = Animation.AnimationStore.Attach(targetObj, targetProp, this);
                    this._BaseValue = targetObj.GetValue(targetProp);
                    if(this._BaseValue === undefined) {
                        var targetType = targetProp.GetTargetType();
                        if(targetType === Number) {
                            this._BaseValue = 0;
                        } else if(targetType === String) {
                            this._BaseValue = "";
                        } else {
                            this._BaseValue = new (targetType)();
                        }
                    }
                    if(prevStorage) {
                        this.StopValue = prevStorage.StopValue;
                    } else {
                        this.StopValue = targetObj.ReadLocalValue(targetProp);
                    }
                }
                AnimationStorage.prototype.SwitchTarget = function (target) {
                    var wasDisabled = this._Disabled;
                    if(!this._Disabled) {
                        this.Disable();
                    }
                    this._TargetObj = target;
                    this._Disabled = wasDisabled;
                };
                AnimationStorage.prototype.Enable = function () {
                    this._Disabled = false;
                    this.ApplyCurrentValue();
                };
                AnimationStorage.prototype.Disable = function () {
                    this._Disabled = true;
                };
                AnimationStorage.prototype.Stop = function () {
                    this.DetachFromObject();
                    this.ResetPropertyValue();
                };
                AnimationStorage.prototype.DetachFromObject = function () {
                    var to = this._TargetObj;
                    if(!to) {
                        return;
                    }
                    var tp = this._TargetProp;
                    if(!tp) {
                        return;
                    }
                    Animation.AnimationStore.Detach(to, tp, this);
                };
                AnimationStorage.prototype.ResetPropertyValue = function () {
                    var to = this._TargetObj;
                    if(!to) {
                        return;
                    }
                    var tp = this._TargetProp;
                    if(!tp) {
                        return;
                    }
                    to.SetStoreValue(tp, this.StopValue);
                };
                AnimationStorage.prototype.UpdateCurrentValueAndApply = function (clockData) {
                    if(this._Disabled) {
                        return;
                    }
                    if(!this._TargetObj) {
                        return;
                    }
                    var oldValue = this._CurrentValue;
                    this._CurrentValue = this._Animation.GetCurrentValue(this._BaseValue, this.StopValue !== undefined ? this.StopValue : this._BaseValue, clockData);
                    if(Nullstone.Equals(oldValue, this._CurrentValue)) {
                        return;
                    }
                    this.ApplyCurrentValue();
                };
                AnimationStorage.prototype.ApplyCurrentValue = function () {
                    if(this._CurrentValue == null) {
                        return;
                    }
                    //var that = this;
                    //AnimationDebug(function () { return "ApplyCurrentValue: [" + that._TargetObj.constructor._TypeName + "." + that._TargetProp.Name + "] --> " + that._CurrentValue.toString(); });
                    this._TargetObj.SetStoreValue(this._TargetProp, this._CurrentValue);
                };
                AnimationStorage.prototype.CloneCore = function () {
                    //TODO: Implement
                                    };
                return AnimationStorage;
            })();
            Animation.AnimationStorage = AnimationStorage;            
            Nullstone.RegisterType(AnimationStorage, "AnimationStorage");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=AnimationStorage.js.map
