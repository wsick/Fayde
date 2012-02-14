/// <reference path="DependencyObject.js"/>
/// <reference path="Collections.js"/>
/// <reference path="Timeline.js"/>
/// <reference path="Primitives.js"/>
/// CODE
/// <reference path="UserControl.js"/>
/// <reference path="VisualTreeHelper.js"/>
/// <reference path="Control.js"/>

//#region VisualTransition

function VisualTransition() {
    DependencyObject.call(this);
    this.SetDynamicStoryboardCompleted(true);
    this.SetExplicitStoryboardCompleted(true);
    this._GeneratedDuration = new Duration();
}
VisualTransition.InheritFrom(DependencyObject);

//#region PROPERTIES

VisualTransition.prototype.GetFrom = function () {
    ///<returns type="String"></returns>
    return this._From;
};
VisualTransition.prototype.SetFrom = function (value) {
    ///<param name="value" type="String"></param>
    this._From = value;
};

VisualTransition.prototype.GetTo = function () {
    ///<returns type="String"></returns>
    return this._To;
};
VisualTransition.prototype.SetTo = function (value) {
    ///<param name="value" type="String"></param>
    this._To = value;
};

VisualTransition.prototype.GetStoryboard = function () {
    ///<returns type="Storyboard"></returns>
    return this._Storyboard;
};
VisualTransition.prototype.SetStoryboard = function (value) {
    ///<param name="value" type="Storyboard"></param>
    this._Storyboard = value;
};

VisualTransition.prototype.GetGeneratedDuration = function () {
    ///<returns type="Duration"></returns>
    return this._GeneratedDuration;
};
VisualTransition.prototype.SetGeneratedDuration = function (value) {
    ///<param name="value" type="Duration"></param>
    this._GeneratedDuration = value;
};

VisualTransition.prototype.GetDynamicStoryboardCompleted = function () {
    ///<returns type="Boolean"></returns>
    return this._DynamicStoryboardCompleted;
};
VisualTransition.prototype.SetDynamicStoryboardCompleted = function (value) {
    ///<param name="value" type="Boolean"></param>
    this._DynamicStoryboardCompleted = value;
};

VisualTransition.prototype.GetExplicitStoryboardCompleted = function () {
    ///<returns type="Boolean"></returns>
    return this._ExplicitStoryboardCompleted;
};
VisualTransition.prototype.SetExplicitStoryboardCompleted = function (value) {
    ///<param name="value" type="Boolean"></param>
    this._ExplicitStoryboardCompleted = value;
};

VisualTransition.prototype.GetGeneratedEasingFunction = function () {
    ///<returns type="IEasingFunction"></returns>
    return this._GeneratedEasingFunction;
};
VisualTransition.prototype.SetGeneratedEasingFunction = function (value) {
    ///<param name="value" type="IEasingFunction"></param>
    this._GeneratedEasingFunction = value;
};

//#endregion

//#endregion

//#region VisualTransitionCollection

function VisualTransitionCollection() {
    DependencyObjectCollection.call(this);
}
VisualTransitionCollection.InheritFrom(DependencyObjectCollection);

VisualTransitionCollection.prototype.IsElementType = function (obj) {
    return obj instanceof VisualTransition;
};

//#endregion


//#region VisualState

function VisualState() {
    DependencyObject.call(this);
}
VisualState.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

VisualState.StoryboardProperty = DependencyProperty.Register("Storyboard", function () { return Storyboard; }, VisualState, null);
VisualState.prototype.GetStoryboard = function () {
    return this.GetValue(VisualState.StoryboardProperty);
};
VisualState.prototype.SetStoryboard = function (value) {
    this.SetValue(VisualState.StoryboardProperty, value);
};

//#endregion

//#region ANNOTATIONS

VisualState.Annotations = {
    ContentProperty: VisualState.StoryboardProperty
};

//#endregion

//#endregion

//#region VisualStateCollection

function VisualStateCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateCollection.InheritFrom(DependencyObjectCollection);

VisualStateCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualState;
};

//#endregion


//#region VisualStateGroup

function VisualStateGroup() {
    DependencyObject.call(this);

    this.CurrentStateChanging = new MulticastEvent();
    this.CurrentStateChanged = new MulticastEvent();
}
VisualStateGroup.InheritFrom(DependencyObject);

//#region PROPERTIES

VisualStateGroup.prototype.GetStates = function () {
    /// <returns type="VisualStateCollection" />
    if (this._States == null)
        this._States = new VisualStateCollection();
    return this._States;
};
VisualStateGroup.prototype.GetCurrentStoryboards = function () {
    ///<returns type="StoryboardCollection"></returns>
    if (this._CurrentStoryboards == null)
        this._CurrentStoryboards = new StoryboardCollection();
    return this._CurrentStoryboards;
};
VisualStateGroup.prototype.GetTransitions = function () {
    ///<returns type="VisualTransitionCollection"></returns>
    if (this._Transitions == null)
        this._Transitions = new VisualTransitionCollection();
    return this._Transitions;
};

VisualStateGroup.prototype.GetCurrentState = function () {
    ///<returns type="VisualState"></returns>
    return this._CurrentState;
};
VisualStateGroup.prototype.SetCurrentState = function (value) {
    ///<param name="value" type="VisualState"></param>
    this._CurrentState = value;
};

//#endregion

VisualStateGroup.prototype.GetState = function (stateName) {
    var states = this.GetStates();
    for (var i = 0; i < states.GetCount(); i++) {
        var state = states.GetValueAt(i);
        if (state.Name === stateName)
            return state;
    }
    return null;
};

VisualStateGroup.prototype.StartNewThenStopOld = function (element, newStoryboards) {
    /// <param name="element" type="FrameworkElement"></param>
    /// <param name="newStoryboards" type="Array"></param>

    var storyboardResColl = element.GetResources().Get("^^__CurrentStoryboards__^^");
    if (storyboardResColl == null) {
        storyboardResColl = new StoryboardCollection();
        element.GetResources().Set("^^__CurrentStoryboards__^^", storyboardResColl);
    }

    var i;
    var storyboard;
    for (i = 0; i < newStoryboards.length; i++) {
        storyboard = newStoryboards[i];
        if (storyboard == null)
            continue;
        storyboardResColl.Add(storyboard);
        try {
            storyboard.Begin();
        } catch (err) {
            //clear storyboards on error
            for (var j = 0; j <= i; j++) {
                if (newStoryboards[i] != null)
                    storyboardResColl.Remove(newStoryboards[i]);
            }
            throw err;
        }
    }

    var currentStoryboards = this.GetCurrentStoryboards();
    for (i = 0; i < currentStoryboards.GetCount(); i++) {
        storyboard = currentStoryboards.GetValueAt(i);
        if (storyboard == null)
            continue;
        storyboardResColl.Remove(storyboard);
        storyboard.Stop();
    }

    currentStoryboards.Clear();
    for (i = 0; i < newStoryboards.length; i++) {
        currentStoryboards.Add(newStoryboards[i]);
    }
};
VisualStateGroup.prototype.RaiseCurrentStateChanging = function (element, oldState, newState, control) {
    /// <param name="element" type="FrameworkElement"></param>
    /// <param name="oldState" type="VisualState"></param>
    /// <param name="newState" type="VisualState"></param>
    /// <param name="control" type="Control">Description</param>
    this.CurrentStateChanging.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
};
VisualStateGroup.prototype.RaiseCurrentStateChanged = function (element, oldState, newState, control) {
    /// <param name="element" type="FrameworkElement"></param>
    /// <param name="oldState" type="VisualState"></param>
    /// <param name="newState" type="VisualState"></param>
    /// <param name="control" type="Control">Description</param>
    this.CurrentStateChanged.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
};

//#region ANNOTATIONS

VisualStateGroup.Annotations = {
    ContentProperty: "States"
};

//#endregion

//#endregion

//#region VisualStateGroupCollection

function VisualStateGroupCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateGroupCollection.InheritFrom(DependencyObjectCollection);

VisualStateGroupCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualStateGroup;
}

//#endregion


//#region Storyboard

function Storyboard() {
    Timeline.call(this);
}
Storyboard.InheritFrom(Timeline);

//#region DEPENDENCY PROPERTIES

Storyboard.ChildrenProperty = DependencyProperty.Register("Children", function () { return TimelineCollection; }, Storyboard);
Storyboard.prototype.GetChildren = function () {
    ///<returns type="TimelineCollection"></returns>
    return this.GetValue(Storyboard.ChildrenProperty);
};

Storyboard.TargetNameProperty = DependencyProperty.RegisterAttached("TargetName", function () { return String }, Storyboard);
Storyboard.GetTargetName = function (d) {
    ///<returns type="String"></returns>
    return d.GetValue(Storyboard.TargetNameProperty);
};
Storyboard.SetTargetName = function (d, value) {
    ///<param name="value" type="String"></param>
    d.SetValue(Storyboard.TargetNameProperty, value);
};

Storyboard.TargetPropertyProperty = DependencyProperty.RegisterAttached("TargetProperty", function () { return _PropertyPath }, Storyboard);
Storyboard.GetTargetProperty = function (d) {
    ///<returns type="PropertyPath"></returns>
    return d.GetValue(Storyboard.TargetPropertyProperty);
};
Storyboard.SetTargetProperty = function (d, value) {
    ///<param name="value" type="PropertyPath"></param>
    d.SetValue(Storyboard.TargetPropertyProperty, value);
};

//#endregion

//#region ANNOTATIONS

Storyboard.Annotations = {
    ContentProperty: Storyboard.ChildrenProperty
};

//#endregion

Storyboard.prototype.Begin = function () {
    NotImplemented("Storyboard.Begin");
};
Storyboard.prototype.Stop = function () {
    NotImplemented("Storyboard.Stop");
};

//#endregion

//#region StoryboardCollection

function StoryboardCollection() {
    DependencyObjectCollection.call(this);
}
StoryboardCollection.InheritFrom(DependencyObjectCollection);

StoryboardCollection.prototype.IsElementType = function (obj) {
    return obj instanceof Storyboard;
};

//#endregion


//#region VisualStateManager

function VisualStateManager() {
    DependencyObject.call(this);
}
VisualStateManager.InheritFrom(DependencyObject);

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

VisualStateManager.prototype.GoToStateCore = function (control, element, stateName, group, state, useTransitions) {
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

    var customVsm = VisualStateManager._GetCustomVisualStateManager(root);
    if (customVsm != null) {
        return customVsm.GoToStateCore(control, root, stateName, data.group, data.state, useTransitions);
    } else if (state != null) {
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
    if (RefObject.RefEquals(lastState, state))
        return true;

    var transition = useTransitions ? VisualStateManager._GetTransition(element, group, lastState, state) : null;

    var dynamicTransition = VisualStateManager._GenerateDynamicTransitionAnimations(element, group, state, transition);
    dynamicTransition.SetValue(Control.IsTemplateItemProperty, true);

    if (transition == null || (transition.GetGeneratedDuration().IsZero() && (transition.GetStoryboard() == null || transition.GetStoryboard().GetDuration().IsZero()))) {
        if (transition != null && transition.GetStoryboard() != null) {
            group.StartNewThenStopOld(element, [transition.GetStoryboard(), state.GetStoryboard()]);
        } else {
            group.StartNewThenStopOld(element, [state.GetStoryboard()]);
        }
        group.RaiseCurrentStateChanging(element, lastState, state, control);
        group.RaiseCurrentStateChanged(element, lastState, state, control);
    } else {
        var eventClosure = new RefObject();
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
    var userControl = RefObject.As(control, UserControl);
    if (userControl != null)
        return RefObject.As(userControl.GetContent(), FrameworkElement);
    if (VisualTreeHelper.GetChildrenCount(control) > 0)
        return RefObject.As(VisualTreeHelper.GetChild(control, 0), FrameworkElement);
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
    NotImplemented("VisualStateManager._GetTransition");
    return new VisualTransition();
};
VisualStateManager._GenerateDynamicTransitionAnimations = function (root, group, state, transition) {
    /// <param name="root" type="FrameworkElement"></param>
    /// <param name="group" type="VisualStateGroup"></param>
    /// <param name="state" type="VisualState"></param>
    /// <param name="transition" type="VisualTransition"></param>
    /// <returns type="Storyboard" />
    NotImplemented("VisualStateManager._GenerateDynamicTransitionAnimations");
    return new Storyboard();
};

//#endregion