/// <reference path="../../Core/DependencyObject.ts" />
/// CODE
/// <reference path="../../Controls/Control.ts" />
/// <reference path="../../Controls/UserControl.ts" />
/// <reference path="VisualState.ts" />
/// <reference path="VisualStateGroup.ts" />

module Fayde.Media.VSM {
    declare var NotImplemented;

    export interface IStateData {
        state: VisualState;
        group: VisualStateGroup;
    }

    export class VisualStateManager extends DependencyObject {
        static VisualStateGroupsProperty: DependencyProperty = DependencyProperty.RegisterAttachedCore("VisualStateGroups", () => VisualStateGroupCollection, VisualStateManager);
        static GetVisualStateGroups(d: DependencyObject): VisualStateGroupCollection { return d.GetValue(VisualStateGroupsProperty); }
        static SetVisualStateGroups(d: DependencyObject, value: VisualStateGroupCollection) { d.SetValue(VisualStateGroupsProperty, value); }
        private static _GetVisualStateGroupsInternal(d: DependencyObject): VisualStateGroupCollection {
            var groups = this.GetVisualStateGroups(d);
            if (!groups) {
                groups = new VisualStateGroupCollection();
                VisualStateManager.SetVisualStateGroups(d, groups);
            }
            return groups;
        }

        static CustomVisualStateManagerProperty: DependencyProperty = DependencyProperty.RegisterAttachedCore("CustomVisualStateManager", () => VisualStateManager, VisualStateManager);
        static GetCustomVisualStateManager(d: DependencyObject): VisualStateManager { return d.GetValue(CustomVisualStateManagerProperty); }
        static SetCustomVisualStateManager(d: DependencyObject, value: VisualStateManager) { d.SetValue(CustomVisualStateManagerProperty, value); }

        static GoToState(control: Controls.Control, stateName: string, useTransitions: bool): bool {
            var root = VisualStateManager._GetTemplateRoot(control);
            if (!root)
                return false;

            var groups = VisualStateManager._GetVisualStateGroupsInternal(root);
            if (!groups)
                return false;

            var data: IStateData = { group: null, state: null };
            if (!VisualStateManager._TryGetState(groups, stateName, data))
                return false;

            var customVsm = VisualStateManager.GetCustomVisualStateManager(root);
            if (customVsm) {
                return customVsm.GoToStateCore(control, root, stateName, data.group, data.state, useTransitions);
            } else if (data.state != null) {
                return VisualStateManager.GoToStateInternal(control, root, data.group, data.state, useTransitions);
            }

            return false;
        }
        GoToStateCore(control: Controls.Control, element: FrameworkElement, stateName: string, group: VisualStateGroup, state: VisualState, useTransitions: bool): bool {
            return VisualStateManager.GoToStateInternal(control, element, group, state, useTransitions);
        }
        private static GoToStateInternal(control: Controls.Control, element: FrameworkElement, group: VisualStateGroup, state: VisualState, useTransitions: bool): bool {
            var lastState = group.CurrentState;
            if (lastState === state)
                return true;

            //VsmDebug("GoToStateInternal: " + state.Name);

            var transition = useTransitions ? VisualStateManager._GetTransition(element, group, lastState, state) : null;
            var storyboard;
            if (transition == null || (transition.GeneratedDuration.IsZero() && ((storyboard = transition.Storyboard) == null || storyboard.Duration.IsZero()))) {
                if (transition != null && storyboard != null) {
                    group.StartNewThenStopOld(element, [storyboard, state.Storyboard]);
                } else {
                    group.StartNewThenStopOld(element, [state.Storyboard]);
                }
                group.RaiseCurrentStateChanging(element, lastState, state, control);
                group.RaiseCurrentStateChanged(element, lastState, state, control);
            } else {
                var dynamicTransition = VisualStateManager._GenerateDynamicTransitionAnimations(element, group, state, transition);
                //LOOKS USELESS: dynamicTransition.IsTemplateItem = true;

                transition.DynamicStoryboardCompleted = false;
                var dynamicCompleted = function (sender, e) {
                    if (transition.Storyboard == null || transition.ExplicitStoryboardCompleted === true) {
                        group.StartNewThenStopOld(element, [state.Storyboard]);
                        group.RaiseCurrentStateChanged(element, lastState, state, control);
                    }
                    transition.DynamicStoryboardCompleted = true;
                };
                var eventClosure = {};
                dynamicTransition.Completed.Subscribe(dynamicCompleted, eventClosure);

                if (transition.Storyboard != null && transition.ExplicitStoryboardCompleted === true) {
                    var transitionCompleted = function (sender, e) {
                        if (transition.DynamicStoryboardCompleted === true) {
                            group.StartNewThenStopOld(element, [state.Storyboard]);
                            group.RaiseCurrentStateChanged(element, lastState, state, control);
                        }
                        transition.Storyboard.Completed.Unsubscribe(transitionCompleted, eventClosure);
                        transition.ExplicitStoryboardCompleted = true;
                    };
                    transition.ExplicitStoryboardCompleted = false;
                    transition.Storyboard.Completed.Subscribe(transitionCompleted, eventClosure);
                }
                group.StartNewThenStopOld(element, [transition.Storyboard, dynamicTransition]);
                group.RaiseCurrentStateChanging(element, lastState, state, control);
            }

            group.CurrentState = state;
            return true;
        }

        private static DestroyStoryboards(control: Controls.Control, root: FrameworkElement) {
            if (!root)
                return false;
            var groups = VisualStateManager._GetVisualStateGroupsInternal(root);
            if (!groups)
                return false;
            var enumerator = groups.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<VisualStateGroup>enumerator.Current).StopCurrentStoryboards(root);
            }
        }

        private static _GetTemplateRoot(control: Controls.Control): FrameworkElement {
            if (control instanceof Controls.UserControl)
                return (<Controls.UserControl>control).XamlNode.TemplateRoot;

            var enumerator = control.XamlNode.GetVisualTreeEnumerator();
            var fe: FrameworkElement = null;
            if (enumerator.MoveNext()) {
                fe = enumerator.Current;
                if (!(fe instanceof FrameworkElement))
                    fe = null;
            }
            return fe;
        }
        private static _TryGetState(groups: VisualStateGroupCollection, stateName: string, data: IStateData): bool {
            var enumerator = groups.GetEnumerator();
            while (enumerator.MoveNext()) {
                data.group = enumerator.Current;
                data.state = data.group.GetState(stateName);
                if (data.state)
                    return true;
            }
            data.group = null;
            data.state = null;
            return false;
        }

        private static _GetTransition(element: FrameworkElement, group: VisualStateGroup, from: VisualState, to: VisualState): VisualTransition {
            if (!element)
                throw new ArgumentException("element");
            if (!group)
                throw new ArgumentException("group");
            if (!to)
                throw new ArgumentException("to");

            var best = null;
            var defaultTransition = null;
            var bestScore = -1;

            var transitions = group.Transitions;
            if (transitions) {
                var enumerator = ArrayEx.GetEnumerator(transitions);
                var transition: VisualTransition;
                while (enumerator.MoveNext()) {
                    transition = enumerator.Current;
                    if (!defaultTransition && transition.IsDefault) {
                        defaultTransition = transition;
                        continue;
                    }
                    var score = -1;
                    var transFromState = group.GetState(transition.From);
                    var transToState = group.GetState(transition.To);
                    if (from === transFromState)
                        score += 1;
                    else if (transFromState != null)
                        continue;

                    if (to === transToState)
                        score += 2;
                    else if (transToState != null)
                        continue;

                    if (score > bestScore) {
                        bestScore = score;
                        best = transition;
                    }
                }
            }
            if (best != null)
                return best;
            return defaultTransition;
        }
        private static _GenerateDynamicTransitionAnimations(root: FrameworkElement, group: VisualStateGroup, state: VisualState, transition: VisualTransition): Animation.Storyboard {
            var dynamic = new Animation.Storyboard();
            if (transition != null) {
                dynamic.Duration = transition.GeneratedDuration;
            } else {
                dynamic.Duration = Duration.CreateTimeSpan(new TimeSpan());
            }

            var currentAnimations; //FlattenTimelines
            var transitionAnimations; //FlattenTimelines
            var newStateAnimations; //FlattenTimelines



            NotImplemented("VisualStateManager._GenerateDynamicTransitionAnimations");
            return dynamic;
        }
    }
}