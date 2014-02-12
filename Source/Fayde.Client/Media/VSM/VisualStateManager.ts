/// <reference path="../../Core/DependencyObject.ts" />

module Fayde.Media.VSM {
    export interface IStateData {
        state: VisualState;
        group: VisualStateGroup;
    }

    export class VisualStateManager extends DependencyObject {
        static VisualStateGroupsProperty: DependencyProperty = DependencyProperty.RegisterAttachedCore("VisualStateGroups", () => VisualStateGroupCollection, VisualStateManager);
        static GetVisualStateGroups(d: DependencyObject): VisualStateGroupCollection { return d.GetValue(VisualStateManager.VisualStateGroupsProperty); }
        static SetVisualStateGroups(d: DependencyObject, value: VisualStateGroupCollection) { d.SetValue(VisualStateManager.VisualStateGroupsProperty, value); }

        static CustomVisualStateManagerProperty: DependencyProperty = DependencyProperty.RegisterAttachedCore("CustomVisualStateManager", () => VisualStateManager, VisualStateManager);
        static GetCustomVisualStateManager(d: DependencyObject): VisualStateManager { return d.GetValue(VisualStateManager.CustomVisualStateManagerProperty); }
        static SetCustomVisualStateManager(d: DependencyObject, value: VisualStateManager) { d.SetValue(VisualStateManager.CustomVisualStateManagerProperty, value); }

        static GoToState(control: Controls.Control, stateName: string, useTransitions: boolean): boolean {
            if (!control)
                throw new ArgumentException("control");
            if (!stateName)
                throw new ArgumentException("stateName");

            var root = VisualStateManager._GetTemplateRoot(control);
            if (!root)
                return false;

            var groups = VisualStateManager.GetVisualStateGroups(root);
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
        GoToStateCore(control: Controls.Control, element: FrameworkElement, stateName: string, group: VisualStateGroup, state: VisualState, useTransitions: boolean): boolean {
            return VisualStateManager.GoToStateInternal(control, element, group, state, useTransitions);
        }
        private static GoToStateInternal(control: Controls.Control, element: FrameworkElement, group: VisualStateGroup, state: VisualState, useTransitions: boolean): boolean {
            var lastState = group.CurrentState;
            if (lastState === state)
                return true;

            if (VSM.Debug && window.console) {
                console.log("VSM:GoToState:[" + (<any>control)._ID + "]" + (lastState ? lastState.Name : "()") + "-->" + state.Name);
            }

            var transition = useTransitions ? VisualStateManager._GetTransition(element, group, lastState, state) : null;
            var storyboard: Animation.Storyboard;
            if (transition == null || (transition.GeneratedDuration.IsZero && ((storyboard = transition.Storyboard) == null || storyboard.Duration.IsZero))) {
                if (transition != null && storyboard != null) {
                    group.StartNewThenStopOld(element, [storyboard, state.Storyboard]);
                } else {
                    group.StartNewThenStopOld(element, [state.Storyboard]);
                }
                group.RaiseCurrentStateChanging(element, lastState, state, control);
                group.RaiseCurrentStateChanged(element, lastState, state, control);
            } else {
                var dynamicTransition = genDynamicTransAnimations(element, group, state, transition);

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

        static DestroyStoryboards(control: Controls.Control, root: FrameworkElement) {
            if (!root)
                return false;
            var groups = VisualStateManager.GetVisualStateGroups(root);
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
            var node: FENode = null;
            if (enumerator.MoveNext()) {
                node = enumerator.Current;
                if (!(node instanceof FENode))
                    node = null;
            }
            return (node) ? node.XObject : null;
        }
        private static _TryGetState(groups: VisualStateGroupCollection, stateName: string, data: IStateData): boolean {
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

            var enumerator = group.Transitions.GetEnumerator();
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
            if (best != null)
                return best;
            return defaultTransition;
        }
    }
    Fayde.RegisterType(VisualStateManager, "Fayde.Media.VSM", Fayde.XMLNS);

    import Timeline = Animation.Timeline;
    import Storyboard = Animation.Storyboard;

    function genDynamicTransAnimations(root: FrameworkElement, group: VisualStateGroup, state: VisualState, transition: VisualTransition): Animation.Storyboard {
        var dynamic = new Animation.Storyboard();
        if (transition != null) {
            dynamic.Duration = transition.GeneratedDuration;
        } else {
            dynamic.Duration = new Duration(new TimeSpan());
        }

        var currentAnimations = flattenTimelines(group.CurrentStoryboards);
        var transitionAnimations = flattenTimelines([transition != null ? transition.Storyboard : null]);
        var newStateAnimations = flattenTimelines([state.Storyboard]);

        // Remove any animations that the transition already animates.
        // There is no need to create an interstitial animation if one already exists.
        for (var i = 0, len = transitionAnimations.length; i < len; i++){
            removeTuple(transitionAnimations[i], currentAnimations);
            removeTuple(transitionAnimations[i], newStateAnimations);
        }

        var tuple: ITimelineTuple;
        // Generate the "to" animations
        for (var i = 0, len = newStateAnimations.length; i < len;i++){
            // The new "To" Animation -- the root is passed as a reference point for name lookup.
            tuple = newStateAnimations[i];
            var toAnimation = genToAnimation(root, tuple.timeline, true);

            // If the animation is of a type that we can't generate transition animations
            // for, GenerateToAnimation will return null, and we should just keep going.
            if (toAnimation != null) {
                ensureTarget(root, tuple.timeline, toAnimation);
                toAnimation.Duration = dynamic.Duration;
                dynamic.Children.Add(toAnimation);
            }

            removeTuple(tuple, currentAnimations);
        }

        // Generate the "from" animations
        for (var i = 0, len = currentAnimations.length; i < len;i++){
            tuple = currentAnimations[i];
            var fromAnimation = tuple.timeline.GenerateFrom();
            if (fromAnimation != null) {
                ensureTarget(root, tuple.timeline, fromAnimation);
                fromAnimation.Duration = dynamic.Duration;

                var propertyName = Animation.Storyboard.GetTargetProperty(tuple.timeline);
                Animation.Storyboard.SetTargetProperty(fromAnimation, propertyName);
                dynamic.Children.Add(fromAnimation);
            }
        }

        return dynamic;
    }
    function ensureTarget(root: FrameworkElement, source: Timeline, dest: Timeline) {
        if (source.ManualTarget != null) {
            Storyboard.SetTarget(dest, source.ManualTarget);
        } else {
            var targetName = Storyboard.GetTargetName(source);
            if (targetName)
                Storyboard.SetTargetName(dest, targetName);
        }
    }
    function genToAnimation(root: FrameworkElement, timeline: Timeline, isEntering: boolean) {
        var result = timeline.GenerateTo(isEntering);
        if (!result)
            return null;

        var targetName = Storyboard.GetTargetName(timeline);
        Storyboard.SetTargetName(result, targetName);
        if (targetName) {
            var target = <DependencyObject>root.FindName(targetName);
            if (target instanceof DependencyObject)
                Storyboard.SetTarget(result, target);
        }

        Storyboard.SetTargetProperty(result, Storyboard.GetTargetProperty(timeline));
        return result;
    }

    interface ITimelineTuple {
        dobj: DependencyObject;
        propd: DependencyProperty;
        timeline: Timeline;
    }
    function flattenTimelines(storyboards: Storyboard[]): ITimelineTuple[]{
        var tuples: ITimelineTuple[] = [];
        for (var i = 0, len = storyboards.length; i < len; i++) {
            flattenTimeline((tp) => tuples.push(tp), storyboards[i], null, null);
        }
        return tuples;
    }
    function flattenTimeline(callback: (tuple: ITimelineTuple) => void, timeline: Timeline, targetObject: DependencyObject, targetPropertyPath: Data.PropertyPath) {
        if (!timeline)
            return;
        if (timeline.HasManualTarget) {
            targetObject = timeline.ManualTarget;
        } else {
            var targetName = Storyboard.GetTargetName(timeline);
            if (targetName) {
                var n = timeline.XamlNode.FindName(targetName);
                targetObject = <DependencyObject>(n ? n.XObject : null);
            }
        }

        var pp = Storyboard.GetTargetProperty(timeline);
        if (pp)
            targetPropertyPath = pp;

        if (timeline instanceof Storyboard) {
            for (var i = 0, children = (<Storyboard>timeline).Children, len = children.Count; i < len; i++) {
                flattenTimeline(callback, children.GetValueAt(i), targetObject, targetPropertyPath);
            }
        } else {
            if (targetPropertyPath && targetObject) {
                // When resolving down to a DO and DP, we don't actually want to clone DOs like we do
                // when starting a storyboard normally.
                var oto: IOutValue = { Value: targetObject };
                var propd = Data.PropertyPath.ResolvePropertyPath(oto, targetPropertyPath, []);

                if (propd && oto.Value)
                    callback({ dobj: oto.Value, propd: propd, timeline: timeline });
            }
        }
    }
    function removeTuple(tuple: ITimelineTuple, list: ITimelineTuple[]) {
        for (var i = 0, len = list.length; i < len; i++) {
            var l = list[i];
            if (l.dobj === tuple.dobj && l.propd === tuple.propd)
                return list.splice(i, 1);
        }
    }
}