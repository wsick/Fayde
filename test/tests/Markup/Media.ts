import TestControl = require('../../mocks/TestControl');

export function load () {
    QUnit.module("Markup Load Tests");

    test("VisualStateManager", () => {
        var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
            + "<VisualStateManager.VisualStateGroups>"
            + "<VisualStateGroup x:Name=\"CommonStates\">"
            + "<VisualState x:Name=\"Normal\" />"
            + "<VisualState x:Name=\"Disabled\">"
            + "    <!-- composite controls will gain focus and visualize it -->"
            + "</VisualState>"
            + "</VisualStateGroup>"
            + "</VisualStateManager.VisualStateGroups>"
            + "</Grid>";

        var root = Fayde.Markup.LoadXaml<Fayde.Controls.Grid>(null, xaml);
        var groups = Fayde.Media.VSM.VisualStateManager.GetVisualStateGroups(root);
        strictEqual((<any>groups).constructor, Fayde.Media.VSM.VisualStateGroupCollection, "VisualStateGroups on Grid should be a VisualStateGroupCollection.");
        strictEqual(groups.Count, 1, "There should be 1 VisualStateGroup in collection.");
        var states = groups.GetValueAt(0).States;
        strictEqual(states.Count, 2);
        var storyboard = states.GetValueAt(0).Storyboard;
        ok(storyboard == null || storyboard instanceof Fayde.Media.Animation.Storyboard);
        storyboard = states.GetValueAt(1).Storyboard;
        ok(storyboard == null || storyboard instanceof Fayde.Media.Animation.Storyboard);
    });
}