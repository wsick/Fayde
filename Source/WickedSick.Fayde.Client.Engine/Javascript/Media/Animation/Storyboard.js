/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="Timeline.js"/>
/// <reference path="../../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="TimelineCollection.js"/>
/// <reference path="../../Primitives/TimeSpan.js"/>
/// <reference path="../../Primitives/Duration.js"/>
/// <reference path="Animation.js"/>

//#region Storyboard
var Storyboard = Nullstone.Create("Storyboard", Timeline);

//#region Properties

Storyboard.ChildrenProperty = DependencyProperty.RegisterFull("Children", function () { return TimelineCollection; }, Storyboard, undefined, { GetValue: function () { return new TimelineCollection(); }});

Storyboard.TargetNameProperty = DependencyProperty.RegisterAttached("TargetName", function () { return String }, Storyboard);
Storyboard.GetTargetName = function (d) {
    ///<returns type="String"></returns>
    return d.$GetValue(Storyboard.TargetNameProperty);
};
Storyboard.SetTargetName = function (d, value) {
    ///<param name="value" type="String"></param>
    d.$SetValue(Storyboard.TargetNameProperty, value);
};

Storyboard.TargetPropertyProperty = DependencyProperty.RegisterAttached("TargetProperty", function () { return _PropertyPath }, Storyboard);
Storyboard.GetTargetProperty = function (d) {
    ///<returns type="_PropertyPath"></returns>
    return d.$GetValue(Storyboard.TargetPropertyProperty);
};
Storyboard.SetTargetProperty = function (d, value) {
    ///<param name="value" type="_PropertyPath"></param>
    d.$SetValue(Storyboard.TargetPropertyProperty, value);
};

Nullstone.AutoProperties(Storyboard, [
    Storyboard.ChildrenProperty
]);

//#endregion

//#region Annotations

Storyboard.Annotations = {
    ContentProperty: Storyboard.ChildrenProperty
};

//#endregion

Storyboard.Instance.Begin = function () {
    this.Reset();
    var error = new BError();
    if (this._HookupAnimations(error)) {
        App.Instance.RegisterStoryboard(this);
    } else {
        throw error.CreateException();
    }
};
Storyboard.Instance.Pause = function () {
    this.Pause$Timeline();

    var children = this.Children;
    var count = children.GetCount();
    for (var i = 0; i < count; i++) {
        children.GetValueAt(i).Pause();
    }
};
Storyboard.Instance.Resume = function () {
    this.Resume$Timeline();
    
    var children = this.Children;
    var count = children.GetCount();
    for (var i = 0; i < count; i++) {
        children.GetValueAt(i).Resume();
    }
};
Storyboard.Instance.Stop = function () {
    this.Stop$Timeline();
    App.Instance.UnregisterStoryboard(this);
    var children = this.Children;
    if (!children)
        return;
    var count = children.GetCount();
    for (var i = 0; i < count; i++) {
        children.GetValueAt(i).Stop();
    }
};

Storyboard.Instance._HookupAnimations = function (error) {
    /// <param name="error" type="BError"></param>
    var children = this.Children;
    if (!children)
        return true;
    var count = children.GetCount();
    for (var i = 0; i < count; i++) {
        if (!this._HookupAnimation(children.GetValueAt(i), null, null, error))
            return false;
    }
    return true;
};
Storyboard.Instance._HookupAnimation = function (animation, targetObject, targetPropertyPath, error) {
    /// <param name="animation" type="Animation"></param>
    /// <param name="targetObject" type="DependencyObject"></param>
    /// <param name="targetPropertyPath" type="DependencyProperty"></param>
    /// <param name="error" type="BError">Description</param>
    animation.Reset();
    var localTargetObject = null;
    var localTargetPropertyPath = null;
    if (animation.HasManualTarget) {
        localTargetObject = animation.ManualTarget;
    } else {
        var name = Storyboard.GetTargetName(animation);
        if (name)
            localTargetObject = animation.FindName(name);
    }
    localTargetPropertyPath = Storyboard.GetTargetProperty(animation);

    if (localTargetObject != null)
        targetObject = localTargetObject;
    if (localTargetPropertyPath != null)
        targetPropertyPath = localTargetPropertyPath;

    var refobj = {
        Value: targetObject
    };
    targetPropertyPath.TryResolveDependencyProperty(targetObject);
    var targetProperty = DependencyProperty.ResolvePropertyPath(refobj, targetPropertyPath);
    if (targetProperty == null) {
        Warn("Could not resolve property for storyboard. [" + localTargetPropertyPath.GetPath().toString() + "]");
        return false;
    }
    if (!animation.Resolve(refobj.Value, targetProperty)) {
        error.SetErrored(BError.InvalidOperation, "Storyboard value could not be converted to the correct type");
        return false;
    }
    animation.HookupStorage(refobj.Value, targetProperty);
    return true;
};

Storyboard.Instance.UpdateInternal = function (clockData) {
    var children = this.Children;
    if (!children)
        return;
    var count = children.GetCount();
    for (var i = 0; i < count; i++) {
        children.GetValueAt(i).Update(clockData.CurrentTime._Ticks);
    }
};

Storyboard.Instance.GetNaturalDurationCore = function () {
    var children = this.Children;
    var count = children.GetCount();
    if (count === 0)
        return new Duration(new TimeSpan());

    var fullTicks = null;
    for (var i = 0; i < count; i++) {
        var timeline = children.GetValueAt(i);
        var dur = timeline.GetNaturalDuration();
        if (dur.IsAutomatic)
            continue;
        if (dur.IsForever)
            return Duration.CreateForever();
        //duration must have a timespan if we got here
        var spanTicks = dur.TimeSpan._Ticks;
        var repeat = timeline.RepeatBehavior;
        if (repeat.IsForever)
            return dur.IsForever;
        if (repeat.HasCount)
            spanTicks = spanTicks * repeat.Count;
        if (timeline.AutoReverse)
            spanTicks *= 2;
        if (repeat.HasDuration)
            spanTicks = repeat.Duration.TimeSpan._Ticks;
        if (spanTicks !== 0)
            spanTicks = spanTicks / timeline.SpeedRatio;
        spanTicks += timeline.BeginTime._Ticks;
        if (fullTicks == null || fullTicks <= spanTicks)
            fullTicks = spanTicks;
    }
    if (fullTicks == null)
        return Duration.CreateAutomatic();
    return new Duration(new TimeSpan(fullTicks));
};

Nullstone.FinishCreate(Storyboard);
//#endregion

//#region StoryboardCollection
var StoryboardCollection = Nullstone.Create("StoryboardCollection", Collection);

StoryboardCollection.Instance.IsElementType = function (obj) {
    return obj instanceof Storyboard;
};

Nullstone.FinishCreate(StoryboardCollection);
//#endregion