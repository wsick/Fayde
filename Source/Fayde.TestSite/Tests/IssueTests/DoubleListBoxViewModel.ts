/// <reference path="../../../jsbin/Fayde.d.ts" />

module Tests.IssueTests {
    export class DoubleListBoxViewModel extends Fayde.MVVM.ViewModelBase {
        AllItems = new Fayde.Collections.ObservableCollection<any>();
        RemoveFirstItemCommand: Fayde.MVVM.RelayCommand;
        constructor() {
            super();
            for (var i = 0; i < 6; i++) {
                var ni = {
                    SubItems: new Fayde.Collections.ObservableCollection()
                };
                ni.SubItems.AddRange([1, 2, 3, 4, 5]);
                this.AllItems.Add(ni);
            }
            this.RemoveFirstItemCommand = new Fayde.MVVM.RelayCommand(() => this.RemoveFirst());
        }

        private RemoveFirst() {
            if (this.AllItems.Count < 1)
                return;
            var first = this.AllItems.GetValueAt(0);
            if (first.SubItems.Count < 1)
                return;
            first.SubItems.RemoveAt(0);
            if (first.SubItems.Count < 1)
                this.AllItems.RemoveAt(0);
        }
    }
    Fayde.RegisterType(DoubleListBoxViewModel, {
        Name: "DoubleListBoxViewModel",
        Namespace: "Tests.IssueTests",
        XmlNamespace: "folder:Tests/IssueTests"
    });
}