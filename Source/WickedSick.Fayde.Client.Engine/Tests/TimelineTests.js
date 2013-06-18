/// <reference path="qunit-1.10.0.d.ts" />
/// <reference path="../Typescript/Media/Animation/Timeline.ts" />
/// <reference path="../Typescript/Media/Animation/Storyboard.ts" />
/// <reference path="../Typescript/Media/Animation/DoubleAnimation.ts" />
QUnit.module("Timeline Tests");
test("Storyboard Natural Duration", function () {
    var storyboard = new Fayde.Media.Animation.Storyboard();
    var duration = storyboard.GetNaturalDuration();
    ok(duration.IsAutomatic, "By default, a storyboard should have an automatic duration.");
    var a1 = new Fayde.Media.Animation.DoubleAnimation();
    storyboard.Children.Add(a1);
    duration = storyboard.GetNaturalDuration();
    ok(duration.IsAutomatic, "Adding a default animation also gives an automatic duration for the owning storyboard.");
    a1.Duration = new Duration(TimeSpan.FromArgs(0, 0, 0, 0, 100));
    duration = storyboard.GetNaturalDuration();
    strictEqual(duration.TimeSpan.Milliseconds, 100, "Storyboard natural duration should be 100 milliseconds.");
    var a2 = new Fayde.Media.Animation.DoubleAnimation();
    a2.Duration = new Duration(TimeSpan.FromArgs(0, 0, 0, 0, 50));
    storyboard.Children.Add(a2);
    duration = storyboard.GetNaturalDuration();
    strictEqual(duration.TimeSpan.Milliseconds, 100, "Storyboard natural duration should still be 100 milliseconds.");
    a2.Duration = new Duration(TimeSpan.FromArgs(0, 0, 0, 0, 200));
    duration = storyboard.GetNaturalDuration();
    strictEqual(duration.TimeSpan.Milliseconds, 200, "Storyboard natural duration should now be 200 milliseconds.");
    a2.RepeatBehavior = Fayde.Media.Animation.RepeatBehavior.FromIterationCount(2);
    duration = storyboard.GetNaturalDuration();
    strictEqual(duration.TimeSpan.Milliseconds, 400, "RepeatBehavior Iteration Count 2 on Animation #2 should double natural duration.");
    a2.AutoReverse = true;
    duration = storyboard.GetNaturalDuration();
    strictEqual(duration.TimeSpan.Milliseconds, 800, "AutoReverse on Animation #2 should double natural duration.");
    a2.SpeedRatio = 2.0;
    duration = storyboard.GetNaturalDuration();
    strictEqual(duration.TimeSpan.Milliseconds, 400, "Speed Ratio of 2.0 on Animation #2 should speed up natural duration.");
    a2.BeginTime = TimeSpan.FromArgs(0, 0, 0, 0, 50);
    duration = storyboard.GetNaturalDuration();
    strictEqual(duration.TimeSpan.Milliseconds, 450, "BeginTime of 0:0:0.05 on Animation #2 should increase natural duration.");
    a2.RepeatBehavior = Fayde.Media.Animation.RepeatBehavior.Forever;
    duration = storyboard.GetNaturalDuration();
    ok(duration.IsForever, "Setting a forever repeat behavior should force the natural duration to be a forever duration.");
});
test("Storyboard Update", function () {
    var storyboard = new Fayde.Media.Animation.Storyboard();
    var a1 = new Fayde.Media.Animation.DoubleAnimation();
    a1.From = 1.0;
    a1.To = 2.0;
    storyboard.Children.Add(a1);
    a1.Duration = new Duration(TimeSpan.FromArgs(0, 0, 0, 0, 100));
    //Animation #1 delays 0ms, duration of 200ms, no speed up, no auto reverse, run once
    var b1 = new Fayde.Controls.Border();
    Fayde.Media.Animation.Storyboard.SetTargetProperty(a1, new Fayde.Data.PropertyPath("(FrameworkElement.Height)"));
    Fayde.Media.Animation.Storyboard.SetTarget(a1, b1);
    var a2 = new Fayde.Media.Animation.DoubleAnimation();
    a2.From = 0.5;
    a2.To = 1.0;
    storyboard.Children.Add(a2);
    a2.Duration = new Duration(TimeSpan.FromArgs(0, 0, 0, 0, 200));
    a2.RepeatBehavior = Fayde.Media.Animation.RepeatBehavior.FromIterationCount(2);
    a2.AutoReverse = true;
    a2.SpeedRatio = 2.0;
    a2.BeginTime = TimeSpan.FromArgs(0, 0, 0, 0, 50);
    //Animation #2 delays 50ms, duration of 200ms, sped up x2, autoreverse, run twice
    var b2 = new Fayde.Controls.Border();
    Fayde.Media.Animation.Storyboard.SetTargetProperty(a2, new Fayde.Data.PropertyPath("(FrameworkElement.Height)"));
    Fayde.Media.Animation.Storyboard.SetTarget(a2, b2);
    var a1completed = false;
    var a2completed = false;
    a1.Completed.Subscribe(function () {
        return a1completed = true;
    }, a1);
    a2.Completed.Subscribe(function () {
        return a2completed = true;
    }, a2);
    App.Current = new App();
    storyboard.Begin();
    storyboard.Update(0);
    strictEqual(b1.Height, 1.0, "Animation #1 hit its begin time setting the Height to 1.0.");
    ok(isNaN(b2.Height), "Animation #2 hasn't hit its begin time, Height will default to NaN.");
    storyboard.Update(50);
    strictEqual(b1.Height, 1.5, "Animation #1 hit the midpoint setting the height to 1.5.");
    strictEqual(b2.Height, 0.5, "Animation #2 hit its begin time setting the height to 0.5.");
    storyboard.Update(100);
    strictEqual(b1.Height, 2.0, "Animation #1 hit the end setting the height to 2.0.");
    ok(a1completed, "Animation #1 should have raised Completed event.");
    strictEqual(b2.Height, 0.75, "Animation #2 hit 100ms, 50ms past begin time, height should be 0.75.");
    storyboard.Update(150);
    strictEqual(b2.Height, 1.0, "Animation #2 hit 150ms, 100ms past begin time, height should be 0.5.");
    storyboard.Update(250);
    strictEqual(b2.Height, 1.0, "Animation #2 hit 250ms, 200ms past begin time, height should be 1.0.");
    storyboard.Update(350);
    strictEqual(b2.Height, 1.0, "Animation #2 hit 350ms, 300ms past begin time, height should be 0.5.");
    storyboard.Update(450);
    strictEqual(b2.Height, 1.0, "Animation #2 hit 450ms, 400ms past begin time, height should be 1.0.");
    ok(a2completed, "Animation #2 should have raised Completed event.");
});
//@ sourceMappingURL=TimelineTests.js.map
