var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Core/DependencyObject.ts" />
        /// <reference path="../../Core/XamlObjectCollection.ts" />
        /// CODE
        /// <reference path="VisualState.ts" />
        /// <reference path="VisualTransition.ts" />
        /// <reference path="../Animation/Storyboard.ts" />
        /// <reference path="../../Controls/Control.ts" />
        (function (VSM) {
            var VisualStateChangedEventArgs = (function (_super) {
                __extends(VisualStateChangedEventArgs, _super);
                function VisualStateChangedEventArgs(oldState, newState, control) {
                                _super.call(this);
                    Object.defineProperty(this, "OldState", {
                        value: oldState,
                        writable: false
                    });
                    Object.defineProperty(this, "NewState", {
                        value: newState,
                        writable: false
                    });
                    Object.defineProperty(this, "Control", {
                        value: control,
                        writable: false
                    });
                }
                return VisualStateChangedEventArgs;
            })(EventArgs);
            VSM.VisualStateChangedEventArgs = VisualStateChangedEventArgs;            
            var VisualStateGroup = (function (_super) {
                __extends(VisualStateGroup, _super);
                function VisualStateGroup() {
                                _super.call(this);
                    this._CurrentStoryboards = [];
                    this._Transitions = null;
                    this.CurrentStateChanging = new MulticastEvent();
                    this.CurrentStateChanged = new MulticastEvent();
                    this.CurrentState = null;
                    Object.defineProperty(this, "States", {
                        value: new VSM.VisualStateCollection(),
                        writable: false
                    });
                    Object.defineProperty(this, "Transitions", {
                        get: function () {
                            if(!this._Transitions) {
                                this._Transitions = [];
                            }
                            return this._Transitions;
                        }
                    });
                }
                VisualStateGroup.Annotations = {
                    ContentProperty: "States"
                };
                VisualStateGroup.prototype.GetState = function (stateName) {
                    var enumerator = this.States.GetEnumerator();
                    var state;
                    while(enumerator.MoveNext()) {
                        state = enumerator.Current;
                        if(state.Name === stateName) {
                            return state;
                        }
                    }
                    return null;
                };
                VisualStateGroup.prototype.StartNewThenStopOld = function (element, newStoryboards) {
                    //var that = this;
                    //AnimationDebug(function () { return "StartNewThenStopOld (" + element.__DebugToString() + " - " + that.Name + ")"; });
                    var i;
                    var storyboard;
                    var res = element.Resources;
                    for(i = 0; i < newStoryboards.length; i++) {
                        storyboard = newStoryboards[i];
                        if(storyboard == null) {
                            continue;
                        }
                        res.Set(storyboard._ID, storyboard);
                        try  {
                            storyboard.Begin();
                        } catch (err) {
                            //clear storyboards on error
                            for(var j = 0; j <= i; j++) {
                                if(newStoryboards[j] != null) {
                                    res.Set((newStoryboards[j])._ID, undefined);
                                }
                            }
                            throw err;
                        }
                    }
                    this.StopCurrentStoryboards(element);
                    var curStoryboards = this._CurrentStoryboards;
                    for(i = 0; i < newStoryboards.length; i++) {
                        if(newStoryboards[i] == null) {
                            continue;
                        }
                        curStoryboards.push(newStoryboards[i]);
                    }
                };
                VisualStateGroup.prototype.StopCurrentStoryboards = function (element) {
                    var curStoryboards = this._CurrentStoryboards;
                    var enumerator = Fayde.ArrayEx.GetEnumerator(curStoryboards);
                    var storyboard;
                    while(enumerator.MoveNext()) {
                        storyboard = enumerator.Current;
                        if(!storyboard) {
                            continue;
                        }
                        element.Resources.Set((storyboard)._ID, undefined);
                        storyboard.Stop();
                    }
                    this._CurrentStoryboards = [];
                };
                VisualStateGroup.prototype.RaiseCurrentStateChanging = function (element, oldState, newState, control) {
                    this.CurrentStateChanging.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
                };
                VisualStateGroup.prototype.RaiseCurrentStateChanged = function (element, oldState, newState, control) {
                    this.CurrentStateChanged.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
                };
                return VisualStateGroup;
            })(Fayde.DependencyObject);
            VSM.VisualStateGroup = VisualStateGroup;            
            Nullstone.RegisterType(VisualStateGroup, "VisualStateGroup");
            var VisualStateGroupCollection = (function (_super) {
                __extends(VisualStateGroupCollection, _super);
                function VisualStateGroupCollection() {
                    _super.apply(this, arguments);

                }
                return VisualStateGroupCollection;
            })(Fayde.XamlObjectCollection);
            VSM.VisualStateGroupCollection = VisualStateGroupCollection;            
            Nullstone.RegisterType(VisualStateGroupCollection, "VisualStateGroupCollection");
        })(Media.VSM || (Media.VSM = {}));
        var VSM = Media.VSM;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=VisualStateGroup.js.map
