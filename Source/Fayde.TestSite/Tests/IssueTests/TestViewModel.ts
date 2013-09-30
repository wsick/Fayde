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
        SelectedItem: string;
        TestMethod(parameter: Fayde.IEventCommandParameter<EventArgs>) {
            var sender = parameter.sender;
            alert("TestMethod called. [" + sender.constructor._TypeName + "]");
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