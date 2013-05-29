/// <reference path="Timeline.ts" />
/// CODE
/// <reference path="../../Engine/App.ts" />
/// <reference path="../../Data/PropertyPath.ts" />

module Fayde.Media.Animation {
    export class Storyboard extends Timeline {
        static TargetNameProperty: DependencyProperty = DependencyProperty.RegisterAttached("TargetName", () => String, Storyboard);
        static GetTargetName(d: DependencyObject): string { return d.GetValue(TargetNameProperty); }
        static SetTargetName(d: DependencyObject, value: string) { return d.SetValue(TargetNameProperty, value); }
        
        static TargetPropertyProperty: DependencyProperty = DependencyProperty.RegisterAttached("TargetProperty", () => Data.PropertyPath, Storyboard);
        static GetTargetProperty(d: DependencyObject): Data.PropertyPath { return d.GetValue(TargetPropertyProperty); }
        static SetTargetProperty(d: DependencyObject, value: Data.PropertyPath) { return d.SetValue(TargetPropertyProperty, value); }

        TargetName: string;
        TargetProperty: Data.PropertyPath;

        Children: TimelineCollection;

        static Annotations = { ContentProperty: "Children" }

        constructor() {
            super();
            
            var coll = new TimelineCollection();
            coll.AttachTo(this);
            Object.defineProperty(this, "Children", {
                value: coll,
                writable: false
            });
        }

        Begin() {
            this.Reset();
            var error = new BError();
            var promotedValues: any[] = [];
            if (this._HookupAnimations(promotedValues, error)) {
                App.Current.RegisterStoryboard(this);
            } else {
                error.ThrowException();
            }
        }
        Pause() {
            super.Pause();
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Timeline>enumerator.Current).Pause();
            }
        }
        Resume() {
            super.Resume();
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Timeline>enumerator.Current).Resume();
            }
        }
        Stop() {
            super.Stop();
            App.Current.UnregisterStoryboard(this);
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Timeline>enumerator.Current).Stop();
            }
        }

        private _HookupAnimations(promotedValues: any[], error: BError): bool {
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                if (!this._HookupAnimation((<AnimationBase>enumerator.Current), null, null, promotedValues, error))
                    return false;
            }
            return true;
        }
        private _HookupAnimation(animation: AnimationBase, targetObject: DependencyObject, targetPropertyPath: Data.PropertyPath, promotedValues: any[], error: BError): bool {
            animation.Reset();
            var localTargetObject: DependencyObject = null;
            var localTargetPropertyPath: Data.PropertyPath = null;
            if (animation.HasManualTarget) {
                localTargetObject = animation.ManualTarget;
            } else {
                var name = Storyboard.GetTargetName(animation);
                if (name) {
                    var n = animation.XamlNode.FindName(name);
                    localTargetObject = <DependencyObject>n.XObject;
                }
            }
            localTargetPropertyPath = Storyboard.GetTargetProperty(animation);

            if (localTargetObject != null)
                targetObject = localTargetObject;
            if (localTargetPropertyPath != null)
                targetPropertyPath = localTargetPropertyPath;

            var refobj = { Value: targetObject };
            var targetProperty = targetPropertyPath.TryResolveDependencyProperty(refobj, promotedValues);
            if (!targetProperty) {
                error.Number = BError.XamlParse;
                error.Message = "Could not resolve property for storyboard. [" + localTargetPropertyPath.Path.toString() + "]";
                return false;
            }
            if (!animation.Resolve(refobj.Value, targetProperty)) {
                error.Number = BError.InvalidOperation;
                error.Message = "Storyboard value could not be converted to the correct type";
                return false;
            }
            //AnimationDebug(function () { return "Hookup (" + Storyboard.GetTargetName(animation) + "." + targetPropertyPath.Path + ")"; });
            AnimationStore.AttachAnimation(animation, refobj.Value, targetProperty);
            return true;
        }

        private UpdateInternal(clockData: IClockData) {
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Timeline>enumerator.Current).Update(clockData.CurrentTime.Ticks);
            }
        }

        private GetNaturalDurationCore(): Duration {
            var fullTicks = 0;
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                var timeline = <Timeline>enumerator.Current;
                var dur = timeline.GetNaturalDuration();
                if (dur.IsAutomatic)
                    continue;
                if (dur.IsForever)
                    return Duration.Forever;
                //duration must have a timespan if we got here
                var spanTicks = dur.TimeSpan.Ticks;
                var repeat = timeline.RepeatBehavior || Timeline.DEFAULT_REPEAT_BEHAVIOR;
                if (repeat.IsForever)
                    return Duration.Forever;
                if (repeat.HasCount)
                    spanTicks = spanTicks * repeat.Count;
                if (timeline.AutoReverse)
                    spanTicks *= 2;
                if (repeat.HasDuration)
                    spanTicks = repeat.Duration.TimeSpan.Ticks;
                if (spanTicks !== 0)
                    spanTicks = spanTicks / timeline.SpeedRatio;
                var bt = timeline.BeginTime;
                if (bt) spanTicks += bt.Ticks;
                if (fullTicks === 0 || fullTicks <= spanTicks)
                    fullTicks = spanTicks;
            }

            if (!fullTicks)
                return Duration.Automatic;
            return new Duration(TimeSpan.FromTicks(fullTicks));
        }
    }
    Nullstone.RegisterType(Storyboard, "Storyboard");
}