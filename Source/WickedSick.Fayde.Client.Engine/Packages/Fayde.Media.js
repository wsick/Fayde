function Brush() {
    DependencyObject.call(this);
};
Brush.InheritFrom(DependencyObject);
Brush.prototype._Translate = function (ctx) {
    AbstractMethod("Brush._Translate()");
};

var AlignmentX = {
    Left: 0,
    Center: 1,
    Right: 2
};
var AlignmentY = {
    Top: 0,
    Center: 1,
    Bottom: 2
};
var Stretch = {
    None: 0,
    Fill: 1,
    Uniform: 2,
    UniformToFill: 3
};
var BrushMappingMode = {
    Absolute: 0,
    RelativeToBoundingBox: 1
};

function Geometry() {
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
Geometry.InheritFrom(DependencyObject);
Geometry.prototype.GetBounds = function () {
    var compute = this._LocalBounds.IsEmpty();
    if (compute)
        this._LocalBounds = this.ComputePathBounds();
    var bounds = this._LocalBounds;
    return bounds;
};
Geometry.prototype.ComputePathBounds = function () {
};

function GradientStop() {
    DependencyObject.call(this);
}
GradientStop.InheritFrom(DependencyObject);
GradientStop.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, GradientStop, new Color());
GradientStop.prototype.GetColor = function () {
    return this.GetValue(GradientStop.ColorProperty);
};
GradientStop.prototype.SetColor = function (value) {
    this.SetValue(GradientStop.ColorProperty, value);
};
GradientStop.OffsetProperty = DependencyProperty.Register("Offset", function () { return Number; }, GradientStop, 0.0);
GradientStop.prototype.GetOffset = function () {
    return this.GetValue(GradientStop.OffsetProperty);
};
GradientStop.prototype.SetOffset = function (value) {
    this.SetValue(GradientStop.OffsetProperty, value);
};

function GradientStopCollection() {
    DependencyObjectCollection.call(this);
}
GradientStopCollection.InheritFrom(DependencyObjectCollection);
GradientStopCollection.prototype.IsElementType = function (value) {
    return value instanceof GradientStop;
};

function Storyboard() {
    Timeline.call(this);
}
Storyboard.InheritFrom(Timeline);
Storyboard.ChildrenProperty = DependencyProperty.Register("Children", function () { return TimelineCollection; }, Storyboard);
Storyboard.prototype.GetChildren = function () {
    return this.GetValue(Storyboard.ChildrenProperty);
};
Storyboard.TargetNameProperty = DependencyProperty.RegisterAttached("TargetName", function () { return String }, Storyboard);
Storyboard.GetTargetName = function (d) {
    return d.GetValue(Storyboard.TargetNameProperty);
};
Storyboard.SetTargetName = function (d, value) {
    d.SetValue(Storyboard.TargetNameProperty, value);
};
Storyboard.TargetPropertyProperty = DependencyProperty.RegisterAttached("TargetProperty", function () { return _PropertyPath }, Storyboard);
Storyboard.GetTargetProperty = function (d) {
    return d.GetValue(Storyboard.TargetPropertyProperty);
};
Storyboard.SetTargetProperty = function (d, value) {
    d.SetValue(Storyboard.TargetPropertyProperty, value);
};
Storyboard.Annotations = {
    ContentProperty: Storyboard.ChildrenProperty
};
Storyboard.prototype.Begin = function () {
    NotImplemented("Storyboard.Begin");
};
Storyboard.prototype.Stop = function () {
    NotImplemented("Storyboard.Stop");
};
function StoryboardCollection() {
    DependencyObjectCollection.call(this);
}
StoryboardCollection.InheritFrom(DependencyObjectCollection);
StoryboardCollection.prototype.IsElementType = function (obj) {
    return obj instanceof Storyboard;
};

function Timeline() {
    DependencyObject.call(this);
    this.Completed = new MulticastEvent();
}
Timeline.InheritFrom(DependencyObject);
Timeline.DurationProperty = DependencyProperty.Register("Duration", function () { return Duration; }, Timeline);
Timeline.prototype.GetDuration = function () {
    return this.GetValue(Timeline.DurationProperty);
};
Timeline.prototype.SetDuration = function (value) {
    this.SetValue(Timeline.DurationProperty, value);
};

function TimelineCollection() {
    PresentationFrameworkCollection.call(this);
}
TimelineCollection.InheritFrom(PresentationFrameworkCollection);

function VisualState() {
    DependencyObject.call(this);
}
VisualState.InheritFrom(DependencyObject);
VisualState.StoryboardProperty = DependencyProperty.Register("Storyboard", function () { return Storyboard; }, VisualState, null);
VisualState.prototype.GetStoryboard = function () {
    return this.GetValue(VisualState.StoryboardProperty);
};
VisualState.prototype.SetStoryboard = function (value) {
    this.SetValue(VisualState.StoryboardProperty, value);
};
VisualState.Annotations = {
    ContentProperty: VisualState.StoryboardProperty
};
function VisualStateCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateCollection.InheritFrom(DependencyObjectCollection);
VisualStateCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualState;
};

function VisualStateGroup() {
    DependencyObject.call(this);
    this.CurrentStateChanging = new MulticastEvent();
    this.CurrentStateChanged = new MulticastEvent();
}
VisualStateGroup.InheritFrom(DependencyObject);
VisualStateGroup.prototype.GetStates = function () {
    if (this._States == null)
        this._States = new VisualStateCollection();
    return this._States;
};
VisualStateGroup.prototype.GetCurrentStoryboards = function () {
    if (this._CurrentStoryboards == null)
        this._CurrentStoryboards = new StoryboardCollection();
    return this._CurrentStoryboards;
};
VisualStateGroup.prototype.GetTransitions = function () {
    if (this._Transitions == null)
        this._Transitions = new VisualTransitionCollection();
    return this._Transitions;
};
VisualStateGroup.prototype.GetCurrentState = function () {
    return this._CurrentState;
};
VisualStateGroup.prototype.SetCurrentState = function (value) {
    this._CurrentState = value;
};
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
    this.CurrentStateChanging.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
};
VisualStateGroup.prototype.RaiseCurrentStateChanged = function (element, oldState, newState, control) {
    this.CurrentStateChanged.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
};
VisualStateGroup.Annotations = {
    ContentProperty: "States"
};
function VisualStateGroupCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateGroupCollection.InheritFrom(DependencyObjectCollection);
VisualStateGroupCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualStateGroup;
}

function VisualTransition() {
    DependencyObject.call(this);
    this.SetDynamicStoryboardCompleted(true);
    this.SetExplicitStoryboardCompleted(true);
    this._GeneratedDuration = new Duration();
}
VisualTransition.InheritFrom(DependencyObject);
VisualTransition.prototype.GetFrom = function () {
    return this._From;
};
VisualTransition.prototype.SetFrom = function (value) {
    this._From = value;
};
VisualTransition.prototype.GetTo = function () {
    return this._To;
};
VisualTransition.prototype.SetTo = function (value) {
    this._To = value;
};
VisualTransition.prototype.GetStoryboard = function () {
    return this._Storyboard;
};
VisualTransition.prototype.SetStoryboard = function (value) {
    this._Storyboard = value;
};
VisualTransition.prototype.GetGeneratedDuration = function () {
    return this._GeneratedDuration;
};
VisualTransition.prototype.SetGeneratedDuration = function (value) {
    this._GeneratedDuration = value;
};
VisualTransition.prototype.GetDynamicStoryboardCompleted = function () {
    return this._DynamicStoryboardCompleted;
};
VisualTransition.prototype.SetDynamicStoryboardCompleted = function (value) {
    this._DynamicStoryboardCompleted = value;
};
VisualTransition.prototype.GetExplicitStoryboardCompleted = function () {
    return this._ExplicitStoryboardCompleted;
};
VisualTransition.prototype.SetExplicitStoryboardCompleted = function (value) {
    this._ExplicitStoryboardCompleted = value;
};
VisualTransition.prototype.GetGeneratedEasingFunction = function () {
    return this._GeneratedEasingFunction;
};
VisualTransition.prototype.SetGeneratedEasingFunction = function (value) {
    this._GeneratedEasingFunction = value;
};
function VisualTransitionCollection() {
    DependencyObjectCollection.call(this);
}
VisualTransitionCollection.InheritFrom(DependencyObjectCollection);
VisualTransitionCollection.prototype.IsElementType = function (obj) {
    return obj instanceof VisualTransition;
};

function GradientBrush() {
    Brush.call(this);
}
GradientBrush.InheritFrom(Brush);
GradientBrush.prototype._GetMappingModeTransform = function (bounds) {
    if (this.GetMappingMode() === BrushMappingMode.Absolute)
        return new Matrix();
    return new ScalingMatrix(bounds.Width, bounds.Height);
};
GradientBrush.GradientStopsProperty = DependencyProperty.RegisterFull("GradientStops", function () { return GradientStopCollection; }, GradientBrush, null, { GetValue: function () { return new GradientStopCollection(); } });
GradientBrush.prototype.GetGradientStops = function () {
    return this.GetValue(GradientBrush.GradientStopsProperty);
};
GradientBrush.MappingModeProperty = DependencyProperty.Register("MappingMode", function () { return Number; }, GradientBrush, BrushMappingMode.RelativeToBoundingBox);
GradientBrush.prototype.GetMappingMode = function () {
    return this.GetValue(GradientBrush.MappingModeProperty);
};
GradientBrush.prototype.SetMappingMode = function (value) {
    this.SetValue(GradientBrush.MappingModeProperty, value);
};

function LinearGradientBrush() {
    GradientBrush.call(this);
}
LinearGradientBrush.InheritFrom(GradientBrush);
LinearGradientBrush.StartPointProperty = DependencyProperty.RegisterFull("StartPoint", function () { return Point; }, LinearGradientBrush, new Point());
LinearGradientBrush.prototype.GetStartPoint = function () {
    return this.GetValue(LinearGradientBrush.StartPointProperty);
};
LinearGradientBrush.prototype.SetStartPoint = function (value) {
    this.SetValue(LinearGradientBrush.StartPointProperty, value);
};
LinearGradientBrush.EndPointProperty = DependencyProperty.RegisterFull("EndPoint", function () { return Point; }, LinearGradientBrush, new Point(1, 1));
LinearGradientBrush.prototype.GetEndPoint = function () {
    return this.GetValue(LinearGradientBrush.EndPointProperty);
};
LinearGradientBrush.prototype.SetEndPoint = function (value) {
    this.SetValue(LinearGradientBrush.EndPointProperty, value);
};
LinearGradientBrush.prototype._Translate = function (ctx, bounds) {
    var transform = this._GetMappingModeTransform(bounds);
    var start = this.GetStartPoint().Apply(transform);
    var end = this.GetEndPoint().Apply(transform);
    var grd = ctx.createLinearGradient(start.X, start.Y, end.X, end.Y);
    var stops = this.GetGradientStops();
    for (var i = 0; i < stops.GetCount(); i++) {
        var stop = stops.GetValueAt(i);
        grd.addColorStop(stop.GetOffset(), stop.GetColor()._Translate());
    }
    return grd;
};

function RadialGradientBrush() {
    GradientBrush.call(this);
}
RadialGradientBrush.InheritFrom(GradientBrush);
RadialGradientBrush.CenterProperty = DependencyProperty.RegisterFull("Center", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.prototype.GetCenter = function () {
    return this.GetValue(RadialGradientBrush.CenterProperty);
};
RadialGradientBrush.prototype.SetCenter = function (value) {
    this.SetValue(RadialGradientBrush.CenterProperty, value);
};
RadialGradientBrush.GradientOriginProperty = DependencyProperty.RegisterFull("GradientOrigin", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.prototype.GetGradientOrigin = function () {
    return this.GetValue(RadialGradientBrush.GradientOriginProperty);
};
RadialGradientBrush.prototype.SetGradientoOrigin = function (value) {
    this.SetValue(RadialGradientBrush.GradientOriginProperty, value);
};
RadialGradientBrush.RadiusXProperty = DependencyProperty.RegisterFull("RadiusX", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.prototype.GetRadiusX = function () {
    return this.GetValue(RadialGradientBrush.RadiusXProperty);
};
RadialGradientBrush.prototype.SetRadiusX = function (value) {
    this.SetValue(RadialGradientBrush.RadiusXProperty, value);
};
RadialGradientBrush.RadiusYProperty = DependencyProperty.RegisterFull("RadiusY", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.prototype.GetRadiusY = function () {
    return this.GetValue(RadialGradientBrush.RadiusYProperty);
};
RadialGradientBrush.prototype.SetRadiusY = function (value) {
    this.SetValue(RadialGradientBrush.RadiusYProperty, value);
};
RadialGradientBrush.prototype._Translate = function (ctx, bounds) {
    NotImplemented("RadialGradientBrush._Translate");
};

function RectangleGeometry() {
    Geometry.call(this);
}
RectangleGeometry.InheritFrom(Geometry);
RectangleGeometry.RectProperty = DependencyProperty.Register("Rect", function () { return Rect; }, RectangleGeometry);
RectangleGeometry.prototype.GetRect = function () {
    return this.GetValue(RectangleGeometry.RectProperty);
};
RectangleGeometry.prototype.SetRect = function (value) {
    this.SetValue(RectangleGeometry.RectProperty, value);
};
RectangleGeometry.prototype.ComputePathBounds = function () {
    var rect = this.GetRect();
    if (rect)
        return rect;
    return new Rect(0.0, 0.0, 0.0, 0.0);
};
RectangleGeometry.prototype.Draw = function (canvasCtx) {
    var rect = this.GetRect();
    canvasCtx.beginPath();
    canvasCtx.rect(rect.X, rect.Y, rect.Width, rect.Height);
};

function SolidColorBrush(color) {
    Brush.call(this);
    this._Color = color;
}
SolidColorBrush.InheritFrom(Brush);
SolidColorBrush.prototype._Translate = function (ctx) {
    return this._Color.toString();
};

function TileBrush() {
    Brush.call(this);
}
TileBrush.InheritFrom(Brush);
TileBrush.AlignmentXProperty = DependencyProperty.Register("AlignmentX", function () { return Number; }, TileBrush, AlignmentX.Center);
TileBrush.prototype.GetAlignmentX = function () {
    return this.GetValue(TileBrush.AlignmentXProperty);
};
TileBrush.prototype.SetAlignmentX = function (value) {
    this.SetValue(TileBrush.AlignmentXProperty, value);
};
TileBrush.AlignmentYProperty = DependencyProperty.Register("AlignmentY", function () { return Number; }, TileBrush, AlignmentY.Center);
TileBrush.prototype.GetAlignmentY = function () {
    return this.GetValue(TileBrush.AlignmentYProperty);
};
TileBrush.prototype.SetAlignmentY = function (value) {
    this.SetValue(TileBrush.AlignmentYProperty, value);
};
TileBrush.StretchProperty = DependencyProperty.Register("Stretch", function () { return Number; }, TileBrush, Stretch.Fill);
TileBrush.prototype.GetStretch = function () {
    return this.GetValue(TileBrush.StretchProperty);
};
TileBrush.prototype.SetStretch = function (value) {
    this.SetValue(TileBrush.StretchProperty, value);
};

function Animation() {
    Timeline.call(this);
}
Animation.InheritFrom(Timeline);

function ColorAnimation() {
    Animation.call(this);
}
ColorAnimation.InheritFrom(Animation);
ColorAnimation.ByProperty = DependencyProperty.Register("By", function () { return Color; }, ColorAnimation);
ColorAnimation.prototype.GetBy = function () {
    return this.GetValue(ColorAnimation.ByProperty);
};
ColorAnimation.prototype.SetBy = function (value) {
    this.SetValue(ColorAnimation.ByProperty, value);
};
ColorAnimation.FromProperty = DependencyProperty.Register("From", function () { return Color; }, ColorAnimation);
ColorAnimation.prototype.GetFrom = function () {
    return this.GetValue(ColorAnimation.FromProperty);
};
ColorAnimation.prototype.SetFrom = function (value) {
    this.SetValue(ColorAnimation.FromProperty, value);
};
ColorAnimation.ToProperty = DependencyProperty.Register("To", function () { return Color; }, ColorAnimation);
ColorAnimation.prototype.GetTo = function () {
    return this.GetValue(ColorAnimation.ToProperty);
};
ColorAnimation.prototype.SetTo = function (value) {
    this.SetValue(ColorAnimation.ToProperty, value);
};

function DoubleAnimation() {
    Animation.call(this);
}
DoubleAnimation.InheritFrom(Animation);
DoubleAnimation.ByProperty = DependencyProperty.Register("By", function () { return Number; }, DoubleAnimation);
DoubleAnimation.prototype.GetBy = function () {
    return this.GetValue(DoubleAnimation.ByProperty);
};
DoubleAnimation.prototype.SetBy = function (value) {
    this.SetValue(DoubleAnimation.ByProperty, value);
};
DoubleAnimation.FromProperty = DependencyProperty.Register("From", function () { return Number; }, DoubleAnimation);
DoubleAnimation.prototype.GetFrom = function () {
    return this.GetValue(DoubleAnimation.FromProperty);
};
DoubleAnimation.prototype.SetFrom = function (value) {
    this.SetValue(DoubleAnimation.FromProperty, value);
};
DoubleAnimation.ToProperty = DependencyProperty.Register("To", function () { return Number; }, DoubleAnimation);
DoubleAnimation.prototype.GetTo = function () {
    return this.GetValue(DoubleAnimation.ToProperty);
};
DoubleAnimation.prototype.SetTo = function (value) {
    this.SetValue(DoubleAnimation.ToProperty, value);
};

function VisualStateManager() {
    DependencyObject.call(this);
}
VisualStateManager.InheritFrom(DependencyObject);
VisualStateManager.VisualStateGroupsProperty = DependencyProperty.RegisterAttached("VisualStateGroups", function () { return VisualStateGroupCollection; }, VisualStateManager, null);
VisualStateManager.GetVisualStateGroups = function (d) {
    return d.GetValue(VisualStateManager.VisualStateGroupsProperty);
};
VisualStateManager.SetVisualStateGroups = function (d, value) {
    d.SetValue(VisualStateManager.VisualStateGroupsProperty, value);
};
VisualStateManager._GetVisualStateGroupsInternal = function (d) {
    var groups = this.GetVisualStateGroups(d);
    if (groups == null) {
        groups = new VisualStateGroupCollection();
        VisualStateManager.SetVisualStateGroups(d, groups);
    }
    return groups;
};
VisualStateManager.CustomVisualStateManagerProperty = DependencyProperty.RegisterAttached("CustomVisualStateManager", function () { return VisualStateManager }, VisualStateManager, null);
VisualStateManager.GetCustomVisualStateManager = function (d) {
    return d.GetValue(VisualStateManager.CustomVisualStateManagerProperty);
};
VisualStateManager.SetCustomVisualStateManager = function (d, value) {
    d.SetValue(VisualStateManager.CustomVisualStateManagerProperty, value);
};
VisualStateManager.prototype.GoToStateCore = function (control, element, stateName, group, state, useTransitions) {
    return VisualStateManager.GoToStateInternal(control, element, group, state, useTransitions);
};
VisualStateManager.GoToState = function (control, stateName, useTransitions) {
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
    var userControl = RefObject.As(control, UserControl);
    if (userControl != null)
        return RefObject.As(userControl.GetContent(), FrameworkElement);
    if (VisualTreeHelper.GetChildrenCount(control) > 0)
        return RefObject.As(VisualTreeHelper.GetChild(control, 0), FrameworkElement);
    return null;
};
VisualStateManager._TryGetState = function (groups, stateName, data) {
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
    NotImplemented("VisualStateManager._GetTransition");
    return new VisualTransition();
};
VisualStateManager._GenerateDynamicTransitionAnimations = function (root, group, state, transition) {
    NotImplemented("VisualStateManager._GenerateDynamicTransitionAnimations");
    return new Storyboard();
};

function ImageBrush() {
    TileBrush.call(this);
}
ImageBrush.InheritFrom(TileBrush);

