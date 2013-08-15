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

    export interface IItem {
        Name: string;
        Data: number;
    }

    export class TestViewModel extends Fayde.MVVM.ViewModelBase {
        AllItems: IItem[] = [
            { Name: "Item1", Data: 0 },
            { Name: "Item2", Data: 1 },
            { Name: "Item3", Data: 2 }
        ];
        SelectedItem: string;
        private static ctor = (() => {
            Fayde.MVVM.NotifyProperties(TestViewModel, ["SelectedItem"]);
        })();
    }
}