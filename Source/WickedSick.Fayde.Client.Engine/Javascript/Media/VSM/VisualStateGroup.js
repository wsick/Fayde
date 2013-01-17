/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// <reference path="../../Runtime/MulticastEvent.js"/>
/// <reference path="../../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="VisualTransition.js"/>
/// <reference path="VisualState.js"/>
/// <reference path="../Animation/Storyboard.js"/>

(function (namespace) {
    var VisualStateGroup = Nullstone.Create("VisualStateGroup", DependencyObject);

    VisualStateGroup.Instance.Init = function () {
        this.Init$DependencyObject();
        this.CurrentStateChanging = new MulticastEvent();
        this.CurrentStateChanged = new MulticastEvent();
        this._CurrentStoryboards = [];
    };

    //#region Properties

    Nullstone.Property(VisualStateGroup, "States", {
        get: function () {
            /// <returns type="VisualStateCollection" />
            if (this._States == null)
                this._States = new VisualStateCollection();
            return this._States;
        }
    });
    VisualStateGroup.Instance.GetTransitions = function () {
        ///<returns type="VisualTransitionCollection"></returns>
        if (this._Transitions == null)
            this._Transitions = new VisualTransitionCollection();
        return this._Transitions;
    };

    //#endregion

    VisualStateGroup.Instance.GetState = function (stateName) {
        var states = this.States;
        for (var i = 0; i < states.GetCount() ; i++) {
            var state = states.GetValueAt(i);
            if (state.Name === stateName)
                return state;
        }
        return null;
    };

    VisualStateGroup.Instance.StartNewThenStopOld = function (element, newStoryboards) {
        /// <param name="element" type="FrameworkElement"></param>
        /// <param name="newStoryboards" type="Array"></param>

        AnimationDebug("StartNewThenStopOld (" + element.__DebugToString() + " - " + this.Name + ")");

        var i;
        var storyboard;
        for (i = 0; i < newStoryboards.length; i++) {
            storyboard = newStoryboards[i];
            if (storyboard == null)
                continue;
            element.Resources.Add(storyboard._ID, storyboard);
            try {
                storyboard.Begin();
            } catch (err) {
                //clear storyboards on error
                for (var j = 0; j <= i; j++) {
                    if (newStoryboards[j] != null)
                        element.Resources.Remove(newStoryboards[j]._ID);
                }
                throw err;
            }
        }

        this.StopCurrentStoryboards(element);

        var curStoryboards = this._CurrentStoryboards;
        for (i = 0; i < newStoryboards.length; i++) {
            if (newStoryboards[i] == null)
                continue;
            curStoryboards.push(newStoryboards[i]);
        }
    };
    VisualStateGroup.Instance.StopCurrentStoryboards = function (element) {
        var curStoryboards = this._CurrentStoryboards;
        var len = curStoryboards.length;
        for (i = 0; i < len; i++) {
            storyboard = curStoryboards[i];
            if (storyboard == null)
                continue;
            element.Resources.Remove(storyboard._ID);
            storyboard.Stop();
        }
        this._CurrentStoryboards = [];
    };
    VisualStateGroup.Instance.RaiseCurrentStateChanging = function (element, oldState, newState, control) {
        /// <param name="element" type="FrameworkElement"></param>
        /// <param name="oldState" type="VisualState"></param>
        /// <param name="newState" type="VisualState"></param>
        /// <param name="control" type="Control">Description</param>
        this.CurrentStateChanging.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
    };
    VisualStateGroup.Instance.RaiseCurrentStateChanged = function (element, oldState, newState, control) {
        /// <param name="element" type="FrameworkElement"></param>
        /// <param name="oldState" type="VisualState"></param>
        /// <param name="newState" type="VisualState"></param>
        /// <param name="control" type="Control">Description</param>
        this.CurrentStateChanged.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
    };

    //#region Annotations

    VisualStateGroup.Annotations = {
        ContentProperty: "States"
    };

    //#endregion

    namespace.VisualStateGroup = Nullstone.FinishCreate(VisualStateGroup);
})(window);

(function (namespace) {
    var VisualStateGroupCollection = Nullstone.Create("VisualStateGroupCollection", Collection);
    namespace.VisualStateGroupCollection = Nullstone.FinishCreate(VisualStateGroupCollection);
})(window);