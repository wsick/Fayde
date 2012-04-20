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

//#region DEPENDENCY PROPERTIES

Storyboard.ChildrenProperty = DependencyProperty.Register("Children", function () { return TimelineCollection; }, Storyboard);
Storyboard.Instance.GetChildren = function () {
    ///<returns type="TimelineCollection"></returns>
    return this.$GetValue(Storyboard.ChildrenProperty);
};

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

//#endregion

//#region ANNOTATIONS

Storyboard.Annotations = {
    ContentProperty: Storyboard.ChildrenProperty
};

//#endregion

Storyboard.Instance.Begin = function () {
    var error = new BError();
    this.BeginWithError(error);
    if (error.IsErrored())
        throw error.CreateException();
};
Storyboard.Instance.BeginWithError = function (error) {
    this.Reset();
    if (!this._HookupAnimations(error))
        return false;
    App.Instance.RegisterStoryboard(this);
};
Storyboard.Instance.Pause = function () {
    this._IsPaused = true;
};
Storyboard.Instance.Resume = function () {
    var nowTime = new Date().getTime();
    this._LastStep = nowTime;
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        this.GetChildren(i).GetValueAt(i)._LastStep = nowTime;
    }
    this._IsPaused = false;
};
Storyboard.Instance.Stop = function () {
    App.Instance.UnregisterStoryboard(this);
    var children = this.GetChildren();
    for (var i = 0; i < children.GetCount(); i++) {
        children.GetValueAt(i).Stop();
    }
};

Storyboard.Instance._HookupAnimations = function (error) {
    /// <param name="error" type="BError"></param>
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        var animation = this.GetChildren(i).GetValueAt(i);
        animation.Reset();
        if (!this._HookupAnimation(animation, null, null, error))
            return false;
    }
    return true;
};
Storyboard.Instance._HookupAnimation = function (animation, targetObject, targetPropertyPath, error) {
    /// <param name="animation" type="Animation"></param>
    /// <param name="targetObject" type="DependencyObject"></param>
    /// <param name="targetPropertyPath" type="DependencyProperty"></param>
    /// <param name="error" type="BError">Description</param>
    var localTargetObject = null;
    var localTargetPropertyPath = null;
    if (animation.HasManualTarget()) {
        localTargetObject = animation.GetManualTarget();
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

Storyboard.Instance._Tick = function (lastTime, nowTime) {
    if (this._IsPaused)
        return;
    this.Update(nowTime);
};
Storyboard.Instance.UpdateInternal = function (clockData) {
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        this.GetChildren().GetValueAt(i).Update(clockData.RealTicks);
    }
};
Storyboard.Instance.OnDurationReached = function () {
    App.Instance.UnregisterStoryboard(this);
    this.OnDurationReached$Timeline();
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