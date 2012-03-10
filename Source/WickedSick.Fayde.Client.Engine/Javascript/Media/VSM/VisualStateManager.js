/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// <reference path="VisualStateGroup.js"/>
/// CODE
/// <reference path="UserControl.js"/>
/// <reference path="VisualTreeHelper.js"/>
/// <reference path="Control.js"/>
/// <reference path="VisualState.js"/>
/// <reference path="VisualStateGroup.js"/>
/// <reference path="VisualTransition.js"/>
/// <reference path="../../Runtime/Closure.js"/>

//#region VisualStateManager
var VisualStateManager = Nullstone.Create("VisualStateManager", DependencyObject);

//#region DEPENDENCY PROPERTIES

VisualStateManager.VisualStateGroupsProperty = DependencyProperty.RegisterAttached("VisualStateGroups", function () { return VisualStateGroupCollection; }, VisualStateManager, null);
VisualStateManager.GetVisualStateGroups = function (d) {
    /// <param name="d" type="DependencyObject"></param>
    /// <returns type="VisualStateGroupCollection" />
    return d.GetValue(VisualStateManager.VisualStateGroupsProperty);
};
VisualStateManager.SetVisualStateGroups = function (d, value) {
    /// <param name="d" type="DependencyObject"></param>
    /// <param name="value" type="VisualStateGroupCollection"></param>
    d.SetValue(VisualStateManager.VisualStateGroupsProperty, value);
};
VisualStateManager._GetVisualStateGroupsInternal = function (d) {
    /// <param name="d" type="DependencyObject"></param>
    var groups = this.GetVisualStateGroups(d);
    if (groups == null) {
        groups = new VisualStateGroupCollection();
        VisualStateManager.SetVisualStateGroups(d, groups);
    }
    return groups;
};

VisualStateManager.CustomVisualStateManagerProperty = DependencyProperty.RegisterAttached("CustomVisualStateManager", function () { return VisualStateManager }, VisualStateManager, null);
VisualStateManager.GetCustomVisualStateManager = function (d) {
    ///<returns type="VisualStateManager"></returns>
    return d.GetValue(VisualStateManager.CustomVisualStateManagerProperty);
};
VisualStateManager.SetCustomVisualStateManager = function (d, value) {
    ///<param name="value" type="VisualStateManager"></param>
    d.SetValue(VisualStateManager.CustomVisualStateManagerProperty, value);
};

//#endregion

VisualStateManager.Instance.GoToStateCore = function (control, element, stateName, group, state, useTransitions) {
    /// <param name="control" type="Control"></param>
    /// <param name="element" type="FrameworkElement"></param>
    /// <param name="stateName" type="String"></param>
    /// <param name="group" type="VisualStateGroup"></param>
    /// <param name="state" type="VisualState"></param>
    /// <param name="useTransitions" type="Boolean"></param>
    /// <returns type="Boolean" />
    return VisualStateManager.GoToStateInternal(control, element, group, state, useTransitions);
};

VisualStateManager.GoToState = function (control, stateName, useTransitions) {
    /// <param name="control" type="Control"></param>
    /// <param name="stateName" type="String"></param>
    /// <param name="useTransitions" type="Boolean"></param>
    /// <returns type="Boolean" />

    var root = VisualStateManager._GetTemplateRoot(control);
    if (root == null)
        return false;

    var groups = VisualStateManager._GetVisualStateGroupsInternal(root);
    if (groups == null)
        return false;

    var data = {};
    if (!VisualStateManager._TryGetState(groups, stateName, data))
        return false;

    var customVsm = VisualStateManager.GetCustomVisualStateManager(root);
    if (customVsm != null) {
        return customVsm.GoToStateCore(control, root, stateName, data.group, data.state, useTransitions);
    } else if (data.state != null) {
        return VisualStateManager.GoToStateInternal(control, root, data.group, data.state, useTransitions);
    }

    return false;
};
VisualStateManager.GoToStateInternal = function (control, element, group, state, useTransitions) {
    /// <param name="control" type="Control"></param>
    /// <param name="element" type="FrameworkElement"></param>
    /// <param name="group" type="VisualStateGroup"></param>
    /// <param name="state" type="VisualState"></param>
    /// <param name="useTransitions" type="Boolean"></param>
    /// <returns type="Boolean" />

    var lastState = group.GetCurrentState();
    if (Nullstone.RefEquals(lastState, state))
        return true;

    var transition = useTransitions ? VisualStateManager._GetTransition(element, group, lastState, state) : null;
    if (transition == null || (transition.GetGeneratedDuration().IsZero() && (transition.GetStoryboard() == null || transition.GetStoryboard().GetDuration().IsZero()))) {
        if (transition != null && transition.GetStoryboard() != null) {
            group.StartNewThenStopOld(element, [transition.GetStoryboard(), state.GetStoryboard()]);
        } else {
            group.StartNewThenStopOld(element, [state.GetStoryboard()]);
        }
        group.RaiseCurrentStateChanging(element, lastState, state, control);
        group.RaiseCurrentStateChanged(element, lastState, state, control);
    } else {
        var dynamicTransition = VisualStateManager._GenerateDynamicTransitionAnimations(element, group, state, transition);
        dynamicTransition.SetValue(Control.IsTemplateItemProperty, true);

        var eventClosure = new Closure();
        transition.SetDynamicStoryboardCompleted(false);
        var dynamicCompleted = function (sender, e) {
            if (transition.GetStoryboard() == null || transition.GetExplicitStoryboardCompleted() === true) {
                group.StartNewThenStopOld(element, [state.GetStoryboard()]);
                group.RaiseCurrentStateChanged(element, lastState, state, control);
            }
            transition.SetDynamicStoryboardCompleted(true);
        };
        dynamicTransition.Completed.Subscribe(dynamicCompleted, eventClosure);

        if (transition.GetStoryboard() != null && transition.GetExplicitStoryboardCompleted() === true) {
            var transitionCompleted = function (sender, e) {
                if (transition.GetDynamicStoryboardCompleted() === true) {
                    group.StartNewThenStopOld(element, [state.GetStoryboard()]);
                    group.RaiseCurrentStateChanged(element, lastState, state, control);
                }
                transition.GetStoryboard().Completed.Unsubscribe(transitionCompleted, eventClosure);
                transition.SetExplicitStoryboardCompleted(true);
            };
            transition.SetExplicitStoryboardCompleted(false);
            transition.GetStoryboard().Completed.Subscribe(transitionCompleted, eventClosure);
        }
        group.StartNewThenStopOld(element, [transition.GetStoryboard(), dynamicTransition]);
        group.RaiseCurrentStateChanging(element, lastState, state, control);
    }

    group.SetCurrentState(state);
    return true;
};

VisualStateManager._GetTemplateRoot = function (control) {
    /// <param name="control" type="Control"></param>
    /// <returns type="FrameworkElement" />
    var userControl = Nullstone.As(control, UserControl);
    if (userControl != null)
        return Nullstone.As(userControl.GetContent(), FrameworkElement);
    if (VisualTreeHelper.GetChildrenCount(control) > 0)
        return Nullstone.As(VisualTreeHelper.GetChild(control, 0), FrameworkElement);
    return null;
};
VisualStateManager._TryGetState = function (groups, stateName, data) {
    /// <param name="groups" type="VisualStateGroupCollection"></param>
    /// <param name="stateName" type="String"></param>
    /// <returns type="Boolean" />
    for (var i = 0; i < groups.GetCount(); i++) {
        data.group = groups.GetValueAt(i);
        data.state = data.group.GetState(stateName);
        if (data.state != null)
            return true;
    }
    data.group = null;
    data.state = null;
    return false;
};

VisualStateManager._GetTransition = function (element, group, from, to) {
    /// <param name="element" type="FrameworkElement"></param>
    /// <param name="group" type="VisualStateGroup"></param>
    /// <param name="from" type="VisualState"></param>
    /// <param name="to" type="VisualState"></param>
    /// <returns type="VisualTransition" />
    if (element == null)
        throw new ArgumentException("element");
    if (group == null)
        throw new ArgumentException("group");
    if (to == null)
        throw new ArgumentException("to");

    var best = null;
    var defaultTransition = null;
    var bestScore = -1;

    var transitions = group.GetTransitions();
    if (transitions != null) {
        var transition;
        for (var i = 0; i < transitions.GetCount(); i++) {
            transition = transitions.GetValueAt(i);
            if (defaultTransition == null && transition.GetIsDefault()) {
                defaultTransition = transition;
                continue;
            }
            var score = -1;
            var transFromState = group.GetState(transition.GetFrom());
            var transToState = group.GetState(transition.GetTo());
            if (Nullstone.RefEquals(from, transFromState))
                score += 1;
            else if (transFromState != null)
                continue;

            if (Nullstone.RefEquals(to, transToState))
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
};
VisualStateManager._GenerateDynamicTransitionAnimations = function (root, group, state, transition) {
    /// <param name="root" type="FrameworkElement"></param>
    /// <param name="group" type="VisualStateGroup"></param>
    /// <param name="state" type="VisualState"></param>
    /// <param name="transition" type="VisualTransition"></param>
    /// <returns type="Storyboard" />

    var dynamic = new Storyboard();
    if (transition != null) {
        dynamic.SetDuration(transition.GetGeneratedDuration());
    } else {
        dynamic.SetDuration(new Duration(0));
    }

    var currentAnimations; //FlattenTimelines
    var transitionAnimations; //FlattenTimelines
    var newStateAnimations; //FlattenTimelines



    NotImplemented("VisualStateManager._GenerateDynamicTransitionAnimations");
    return dynamic;
};

Nullstone.FinishCreate(VisualStateManager);
//#endregion