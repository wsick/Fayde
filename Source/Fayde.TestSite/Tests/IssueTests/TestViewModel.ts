/// <reference path="../../../jsbin/Fayde.d.ts" />

module Tests.IssueTests {
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
        SelectedItem: IItem;
        constructor() {
            super();
            this.SelectedItem = this.AllItems[0];
        }
        TestMethod(e: Fayde.IEventBindingArgs<EventArgs>) {
            if (e.sender)
                alert("TestMethod called. [" + e.sender.constructor._TypeName + "]");
            else if (e.parameter)
                alert("TestMethod called. [" + e.parameter.Name + "]");
        }
        private static ctor = (() => {
            Fayde.MVVM.NotifyProperties(TestViewModel, ["SelectedItem"]);
        })();
    }
    Fayde.RegisterType(TestViewModel, {
        Name: "TestViewModel",
        Namespace: "Tests.IssueTests",
        XmlNamespace: "folder:Tests/IssueTests"
    });
}