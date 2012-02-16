/// <reference path="../../Core/DependencyObject.js"/>
/// <reference path="../../Runtime/MulticastEvent.js"/>
/// <reference path="../../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="VisualTransition.js"/>
/// <reference path="VisualState.js"/>
/// <reference path="../Animation/Storyboard.js"/>

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