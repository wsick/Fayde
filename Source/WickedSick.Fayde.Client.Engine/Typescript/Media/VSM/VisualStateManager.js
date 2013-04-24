var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Core/DependencyObject.ts" />
        /// CODE
        /// <reference path="../../Controls/Control.ts" />
        /// <reference path="../../Controls/UserControl.ts" />
        /// <reference path="VisualState.ts" />
        /// <reference path="VisualStateGroup.ts" />
        (function (VSM) {
            var VisualStateManager = (function (_super) {
                __extends(VisualStateManager, _super);
                function VisualStateManager() {
                    _super.apply(this, arguments);

                }
                VisualStateManager.VisualStateGroupsProperty = DependencyProperty.RegisterAttachedCore("VisualStateGroups", function () {
                    return VSM.VisualStateGroupCollection;
                }, VisualStateManager);
                VisualStateManager.GetVisualStateGroups = function GetVisualStateGroups(d) {
                    return d.GetValue(VisualStateManager.VisualStateGroupsProperty);
                };
                VisualStateManager.SetVisualStateGroups = function SetVisualStateGroups(d, value) {
                    d.SetValue(VisualStateManager.VisualStateGroupsProperty, value);
                };
                VisualStateManager._GetVisualStateGroupsInternal = function _GetVisualStateGroupsInternal(d) {
                    var groups = this.GetVisualStateGroups(d);
                    if(!groups) {
                        groups = new VSM.VisualStateGroupCollection();
                        VisualStateManager.SetVisualStateGroups(d, groups);
                    }
                    return groups;
                };
                VisualStateManager.CustomVisualStateManagerProperty = DependencyProperty.RegisterAttachedCore("CustomVisualStateManager", function () {
                    return VisualStateManager;
                }, VisualStateManager);
                VisualStateManager.GetCustomVisualStateManager = function GetCustomVisualStateManager(d) {
                    return d.GetValue(VisualStateManager.CustomVisualStateManagerProperty);
                };
                VisualStateManager.SetCustomVisualStateManager = function SetCustomVisualStateManager(d, value) {
                    d.SetValue(VisualStateManager.CustomVisualStateManagerProperty, value);
                };
                VisualStateManager.GoToState = function GoToState(control, stateName, useTransitions) {
                    var root = VisualStateManager._GetTemplateRoot(control);
                    if(!root) {
                        return false;
                    }
                    var groups = VisualStateManager._GetVisualStateGroupsInternal(root);
                    if(!groups) {
                        return false;
                    }
                    var data = {
                        group: null,
                        state: null
                    };
                    if(!VisualStateManager._TryGetState(groups, stateName, data)) {
                        return false;
                    }
                    var customVsm = VisualStateManager.GetCustomVisualStateManager(root);
                    if(customVsm) {
                        return customVsm.GoToStateCore(control, root, stateName, data.group, data.state, useTransitions);
                    } else if(data.state != null) {
                        return VisualStateManager.GoToStateInternal(control, root, data.group, data.state, useTransitions);
                    }
                    return false;
                };
                VisualStateManager.prototype.GoToStateCore = function (control, element, stateName, group, state, useTransitions) {
                    return VisualStateManager.GoToStateInternal(control, element, group, state, useTransitions);
                };
                VisualStateManager.GoToStateInternal = function GoToStateInternal(control, element, group, state, useTransitions) {
                    var lastState = group.CurrentState;
                    if(lastState === state) {
                        return true;
                    }
                    //VsmDebug("GoToStateInternal: " + state.Name);
                    var transition = useTransitions ? VisualStateManager._GetTransition(element, group, lastState, state) : null;
                    var storyboard;
                    if(transition == null || (transition.GeneratedDuration.IsZero() && ((storyboard = transition.Storyboard) == null || storyboard.Duration.IsZero()))) {
                        if(transition != null && storyboard != null) {
                            group.StartNewThenStopOld(element, [
                                storyboard, 
                                state.Storyboard
                            ]);
                        } else {
                            group.StartNewThenStopOld(element, [
                                state.Storyboard
                            ]);
                        }
                        group.RaiseCurrentStateChanging(element, lastState, state, control);
                        group.RaiseCurrentStateChanged(element, lastState, state, control);
                    } else {
                        var dynamicTransition = VisualStateManager._GenerateDynamicTransitionAnimations(element, group, state, transition);
                        //LOOKS USELESS: dynamicTransition.IsTemplateItem = true;
                        transition.DynamicStoryboardCompleted = false;
                        var dynamicCompleted = function (sender, e) {
                            if(transition.Storyboard == null || transition.ExplicitStoryboardCompleted === true) {
                                group.StartNewThenStopOld(element, [
                                    state.Storyboard
                                ]);
                                group.RaiseCurrentStateChanged(element, lastState, state, control);
                            }
                            transition.DynamicStoryboardCompleted = true;
                        };
                        var eventClosure = {
                        };
                        dynamicTransition.Completed.Subscribe(dynamicCompleted, eventClosure);
                        if(transition.Storyboard != null && transition.ExplicitStoryboardCompleted === true) {
                            var transitionCompleted = function (sender, e) {
                                if(transition.DynamicStoryboardCompleted === true) {
                                    group.StartNewThenStopOld(element, [
                                        state.Storyboard
                                    ]);
                                    group.RaiseCurrentStateChanged(element, lastState, state, control);
                                }
                                transition.Storyboard.Completed.Unsubscribe(transitionCompleted, eventClosure);
                                transition.ExplicitStoryboardCompleted = true;
                            };
                            transition.ExplicitStoryboardCompleted = false;
                            transition.Storyboard.Completed.Subscribe(transitionCompleted, eventClosure);
                        }
                        group.StartNewThenStopOld(element, [
                            transition.Storyboard, 
                            dynamicTransition
                        ]);
                        group.RaiseCurrentStateChanging(element, lastState, state, control);
                    }
                    group.CurrentState = state;
                    return true;
                };
                VisualStateManager.DestroyStoryboards = function DestroyStoryboards(control, root) {
                    if(!root) {
                        return false;
                    }
                    var groups = VisualStateManager._GetVisualStateGroupsInternal(root);
                    if(!groups) {
                        return false;
                    }
                    var enumerator = groups.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        (enumerator.Current).StopCurrentStoryboards(root);
                    }
                };
                VisualStateManager._GetTemplateRoot = function _GetTemplateRoot(control) {
                    if(control instanceof Fayde.Controls.UserControl) {
                        return (control).XamlNode.TemplateRoot;
                    }
                    var enumerator = control.XamlNode.GetVisualTreeEnumerator();
                    var fe = null;
                    if(enumerator.MoveNext()) {
                        fe = enumerator.Current;
                        if(!(fe instanceof Fayde.FrameworkElement)) {
                            fe = null;
                        }
                    }
                    return fe;
                };
                VisualStateManager._TryGetState = function _TryGetState(groups, stateName, data) {
                    var enumerator = groups.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        data.group = enumerator.Current;
                        data.state = data.group.GetState(stateName);
                        if(data.state) {
                            return true;
                        }
                    }
                    data.group = null;
                    data.state = null;
                    return false;
                };
                VisualStateManager._GetTransition = function _GetTransition(element, group, from, to) {
                    if(!element) {
                        throw new ArgumentException("element");
                    }
                    if(!group) {
                        throw new ArgumentException("group");
                    }
                    if(!to) {
                        throw new ArgumentException("to");
                    }
                    var best = null;
                    var defaultTransition = null;
                    var bestScore = -1;
                    var transitions = group.Transitions;
                    if(transitions) {
                        var enumerator = Fayde.ArrayEx.GetEnumerator(transitions);
                        var transition;
                        while(enumerator.MoveNext()) {
                            transition = enumerator.Current;
                            if(!defaultTransition && transition.IsDefault) {
                                defaultTransition = transition;
                                continue;
                            }
                            var score = -1;
                            var transFromState = group.GetState(transition.From);
                            var transToState = group.GetState(transition.To);
                            if(from === transFromState) {
                                score += 1;
                            } else if(transFromState != null) {
                                continue;
                            }
                            if(to === transToState) {
                                score += 2;
                            } else if(transToState != null) {
                                continue;
                            }
                            if(score > bestScore) {
                                bestScore = score;
                                best = transition;
                            }
                        }
                    }
                    if(best != null) {
                        return best;
                    }
                    return defaultTransition;
                };
                VisualStateManager._GenerateDynamicTransitionAnimations = function _GenerateDynamicTransitionAnimations(root, group, state, transition) {
                    var dynamic = new Media.Animation.Storyboard();
                    if(transition != null) {
                        dynamic.Duration = transition.GeneratedDuration;
                    } else {
                        dynamic.Duration = Duration.CreateTimeSpan(new TimeSpan());
                    }
                    var currentAnimations;//FlattenTimelines
                    
                    var transitionAnimations;//FlattenTimelines
                    
                    var newStateAnimations;//FlattenTimelines
                    
                    NotImplemented("VisualStateManager._GenerateDynamicTransitionAnimations");
                    return dynamic;
                };
                return VisualStateManager;
            })(Fayde.DependencyObject);
            VSM.VisualStateManager = VisualStateManager;            
        })(Media.VSM || (Media.VSM = {}));
        var VSM = Media.VSM;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=VisualStateManager.js.map
