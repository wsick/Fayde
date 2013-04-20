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
            Object.defineProperty(this, "Children", {
                value: new TimelineCollection(),
                writable: false
            });
        }

        Begin() {
            this.Reset();
            var error = new BError();
            var promotedValues: any[] = [];
            if (this._HookupAnimations(promotedValues, error)) {
                App.Instance.RegisterStoryboard(this);
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
            App.Instance.UnregisterStoryboard(this);
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Timeline>enumerator.Current).Stop();
            }
        }

        private _HookupAnimations(promotedValues: any[], error: BError): bool {
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                if (!this._HookupAnimation((<Animation>enumerator.Current), null, null, promotedValues, error))
                    return false;
            }
            return true;
        }
        private _HookupAnimation(animation: Animation, targetObject: DependencyObject, targetPropertyPath: Data.PropertyPath, promotedValues: any[], error: BError): bool {
            animation.Reset();
            var localTargetObject = null;
            var localTargetPropertyPath = null;
            if (animation.HasManualTarget) {
                localTargetObject = animation.ManualTarget;
            } else {
                var name = Storyboard.GetTargetName(animation);
                if (name)
                    localTargetObject = animation.XamlNode.FindName(name);
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
            var targetProperty = Data.PropertyPath.ResolvePropertyPath(refobj, targetPropertyPath, promotedValues);
            if (targetProperty == null) {
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
            animation.HookupStorage(refobj.Value, targetProperty);
            return true;
        }

        UpdateInternal(clockData: IClockData) {
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Timeline>enumerator.Current).Update(clockData.CurrentTime.Ticks);
            }
        }

        GetNaturalDurationCore(): Duration {
            var fullTicks = 0;
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                var timeline = <Timeline>enumerator.Current;
                var dur = timeline.GetNaturalDuration();
                if (dur.IsAutomatic)
                    continue;
                if (dur.IsForever)
                    return Duration.CreateForever();
                //duration must have a timespan if we got here
                var spanTicks = dur.TimeSpan.Ticks;
                var repeat = timeline.RepeatBehavior;
                if (repeat.IsForever)
                    return Duration.CreateForever();
                if (repeat.HasCount)
                    spanTicks = spanTicks * repeat.Count;
                if (timeline.AutoReverse)
                    spanTicks *= 2;
                if (repeat.HasDuration)
                    spanTicks = repeat.Duration.TimeSpan.Ticks;
                if (spanTicks !== 0)
                    spanTicks = spanTicks / timeline.SpeedRatio;
                spanTicks += timeline.BeginTime.Ticks;
                if (fullTicks === 0 || fullTicks <= spanTicks)
                    fullTicks = spanTicks;
            }

            if (!fullTicks)
                return Duration.CreateAutomatic();
            return Duration.CreateTimeSpan(TimeSpan.FromTicks(fullTicks));
        }
    }
    Nullstone.RegisterType(Storyboard, "Storyboard");
}