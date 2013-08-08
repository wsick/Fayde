/// <reference path="../../../jsbin/Fayde.d.ts" />

module Tests.IssueTests {
    export class Application extends App {
        constructor() {
            super();
            this.Loaded.Subscribe(this.OnLoaded, this);
        }
        OnLoaded(sender, e: EventArgs) {
            this.RootVisual.DataContext = new TestViewModel();
        }
    }
    Nullstone.RegisterType(Application, "Application");

    export class TestViewModel extends Fayde.MVVM.ViewModelBase {
        AllItems: string[] = ["Item1", "Item2", "Item3"];
        SelectedItem: string;
        private static ctor = (() => {
            Fayde.MVVM.NotifyProperties(TestViewModel, ["SelectedItem"]);
        })();
    }
}