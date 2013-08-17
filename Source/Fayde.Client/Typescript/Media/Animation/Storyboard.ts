/// <reference path="Timeline.ts" />
/// CODE
/// <reference path="../../Engine/Application.ts" />
/// <reference path="../../Data/PropertyPath.ts" />
/// <reference path="../../Runtime/Debug.ts" />

module Fayde.Media.Animation {
    /// http://msdn.microsoft.com/en-us/library/cc189019(v=vs.95).aspx
    export class Storyboard extends Timeline {
        static TargetNameProperty: DependencyProperty = DependencyProperty.RegisterAttached("TargetName", () => String, Storyboard);
        static GetTargetName(d: DependencyObject): string { return d.GetValue(Storyboard.TargetNameProperty); }
        static SetTargetName(d: DependencyObject, value: string) { return d.SetValue(Storyboard.TargetNameProperty, value); }
        
        static TargetPropertyProperty: DependencyProperty = DependencyProperty.RegisterAttached("TargetProperty", () => Data.PropertyPath, Storyboard);
        static GetTargetProperty(d: DependencyObject): Data.PropertyPath { return d.GetValue(Storyboard.TargetPropertyProperty); }
        static SetTargetProperty(d: DependencyObject, value: Data.PropertyPath) { return d.SetValue(Storyboard.TargetPropertyProperty, value); }

        static ChildrenProperty = DependencyProperty.RegisterImmutable("Children", () => TimelineCollection, Storyboard);

        TargetName: string;
        TargetProperty: Data.PropertyPath;

        Children: TimelineCollection;

        static Annotations = { ContentProperty: Storyboard.ChildrenProperty }

        constructor() {
            super();

            var coll = Storyboard.ChildrenProperty.Initialize<TimelineCollection>(this);
            coll.AttachTo(this);
        }

        static SetTarget(timeline: Timeline, target: DependencyObject) {
            timeline.ManualTarget = target;
        }

        Begin() {
            if (Animation.Debug && window.console) {
                console.log("ANIMATION:Begin:" + this.__DebugString());
            }
            this.Reset();
            var error = new BError();
            var promotedValues: any[] = [];
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                var animation = <AnimationBase>enumerator.Current;
                if (!animation._Hookup(promotedValues, error))
                    error.ThrowException();
            }
            Application.Current.RegisterStoryboard(this);
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
            if (Animation.Debug && window.console) {
                console.log("ANIMATION:Stop:" + this.__DebugString());
            }
            super.Stop();
            Application.Current.UnregisterStoryboard(this);
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Timeline>enumerator.Current).Stop();
            }
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

        private __DebugString(): string {
            var anims = [];
            var cur = "";

            var enumerator = this.Children.GetEnumerator();
            var animation: Timeline;
            while (enumerator.MoveNext()) {
                animation = enumerator.Current;
                cur = "";
                cur += "(";
                cur += (<any>animation).constructor._TypeName;
                cur += ":";
                cur += Storyboard.GetTargetName(animation);
                cur += ":";
                var path = Storyboard.GetTargetProperty(animation);
                cur += path ? path.Path : "";
                cur += ")";
                anims.push(cur);
            }
            
            return "[" + anims.join(",") + "]";
        }
    }
    Fayde.RegisterType(Storyboard, {
    	Name: "Storyboard",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
}