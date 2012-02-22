/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="Timeline.js"/>
/// <reference path="../../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="TimelineCollection.js"/>
/// <reference path="../../Primitives/TimeSpan.js"/>
/// <reference path="../../Primitives/Duration.js"/>
/// <reference path="Animation.js"/>

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
    ///<returns type="_PropertyPath"></returns>
    return d.GetValue(Storyboard.TargetPropertyProperty);
};
Storyboard.SetTargetProperty = function (d, value) {
    ///<param name="value" type="_PropertyPath"></param>
    d.SetValue(Storyboard.TargetPropertyProperty, value);
};

//#endregion

//#region ANNOTATIONS

Storyboard.Annotations = {
    ContentProperty: Storyboard.ChildrenProperty
};

//#endregion

Storyboard.prototype.Begin = function () {
    this.Reset();
    this._HookupAnimations();
    App.Instance.RegisterStoryboard(this);
};
Storyboard.prototype.Pause = function () {
    this._IsPaused = true;
};
Storyboard.prototype.Resume = function () {
    var nowTime = new Date().getTime();
    this._LastStep = nowTime;
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        this.GetChildren(i).GetValueAt(i)._LastStep = nowTime;
    }
    this._IsPaused = false;
};
Storyboard.prototype.Stop = function () {
    App.Instance.UnregisterStoryboard(this);
};

Storyboard.prototype._HookupAnimations = function () {
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        this._HookupAnimation(this.GetChildren(i).GetValueAt(i));
    }
};
Storyboard.prototype._HookupAnimation = function (animation, targetObject, targetPropertyPath) {
    /// <param name="animation" type="Animation"></param>
    animation.Reset();
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
    animation.HookupStorage(refobj.Value, targetProperty);
    return true;
};

Storyboard.prototype._Tick = function (lastTime, nowTime) {
    if (this._IsPaused)
        return;
    this.Update(nowTime);
};
Storyboard.prototype.UpdateInternal = function (nowTime) {
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        this.GetChildren().GetValueAt(i).Update(nowTime);
    }
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