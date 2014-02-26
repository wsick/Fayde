/// <reference path="Timeline.ts" />

module Fayde.Media.Animation {
    export interface IStoryboadResolution {
        Target: DependencyObject;
        Property: Data.PropertyPath;
    }

    /// http://msdn.microsoft.com/en-us/library/cc189019(v=vs.95).aspx
    export class Storyboard extends Timeline {
        static TargetNameProperty: DependencyProperty = DependencyProperty.RegisterAttached("TargetName", () => String, Storyboard);
        static GetTargetName(d: DependencyObject): string { return d.GetValue(Storyboard.TargetNameProperty); }
        static SetTargetName(d: DependencyObject, value: string) { return d.SetValue(Storyboard.TargetNameProperty, value); }
        TargetName: string;
        
        static TargetPropertyProperty: DependencyProperty = DependencyProperty.RegisterAttached("TargetProperty", () => Data.PropertyPath, Storyboard);
        static GetTargetProperty(d: DependencyObject): Data.PropertyPath { return d.GetValue(Storyboard.TargetPropertyProperty); }
        static SetTargetProperty(d: DependencyObject, value: Data.PropertyPath) { return d.SetValue(Storyboard.TargetPropertyProperty, value); }
        TargetProperty: Data.PropertyPath;

        static ResolveTarget(timeline: Timeline): IStoryboadResolution {
            var res: IStoryboadResolution = {
                Target: undefined,
                Property: undefined
            };

            if (timeline.HasManualTarget) {
                res.Target = timeline.ManualTarget;
            } else {
                var targetName = Storyboard.GetTargetName(timeline);
                if (targetName)
                    res.Target = <DependencyObject>timeline.FindName(targetName)
            }

            res.Property = Storyboard.GetTargetProperty(timeline);

            return res;
        }

        static ChildrenProperty = DependencyProperty.RegisterImmutable<TimelineCollection>("Children", () => TimelineCollection, Storyboard);
        Children: TimelineCollection;

        constructor() {
            super();

            var coll = Storyboard.ChildrenProperty.Initialize(this);
            coll.AttachTo(this);
        }

        static SetTarget(timeline: Timeline, target: DependencyObject) {
            timeline.ManualTarget = target;
        }

        Begin() {
            if (Animation.Log)
                console.log(getLogMessage("Storyboard.Begin", this, true));
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
            if (Animation.Log)
                console.log(getLogMessage("Storyboard.Stop", this, false));
            super.Stop();
            Application.Current.UnregisterStoryboard(this);
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Timeline>enumerator.Current).Stop();
            }
        }

        UpdateInternal(clockData: IClockData) {
            if (Animation.Log)
                console.log(getLogMessage("Storyboard.UpdateInternal", this, false, clockData));
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
    }
    Fayde.RegisterType(Storyboard, "Fayde.Media.Animation", Fayde.XMLNS);
    Xaml.Content(Storyboard, Storyboard.ChildrenProperty);

    function getLogMessage(action: string, storyboard: Storyboard, full: boolean, clockData?: IClockData): string {
        var anims = [];
        var cur = "";

        var enumerator = storyboard.Children.GetEnumerator();
        var animation: Timeline;
        while (enumerator.MoveNext()) {
            animation = enumerator.Current;
            cur = "";
            cur += "(";
            cur += (<any>animation).constructor.name;
            cur += ":";
            cur += Storyboard.GetTargetName(animation);
            cur += ":";
            var path = Storyboard.GetTargetProperty(animation);
            cur += path ? path.Path : "";
            cur += ")";
            anims.push(cur);
        }
        var msg = "ANIMATION:" + action + ":" + (<any>storyboard)._ID;
        if (clockData)
            msg += "(" + (clockData.Progress * 100).toFixed(0) + "%)";
        if (full)
            msg += "->[" + anims.join(",") + "]";
        return msg;
    }
}