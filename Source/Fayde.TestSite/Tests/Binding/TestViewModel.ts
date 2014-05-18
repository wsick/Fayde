/// <reference path="../../../jsbin/Fayde.d.ts" />

interface IItem {
    Name: string;
    Data: number;
}

class TestViewModel extends Fayde.MVVM.ViewModelBase {
    ObsItems = new Fayde.Collections.ObservableCollection<string>();
    AllItems = [
        { Name: "Item1", Data: 0 },
        { Name: "Item2", Data: 1 },
        { Name: "Item3", Data: 2 }
    ];
    SomeText = "";
    SelectedItem: any;
    SomeDate: DateTime = DateTime.Now;
    TestCommand: Fayde.MVVM.RelayCommand;
    constructor() {
        super();
        this.SelectedItem = this.AllItems[0];
        this.TestCommand = new Fayde.MVVM.RelayCommand(parameter => alert("TestCommand executed."));
    }
    TestMethod(e: Fayde.IEventBindingArgs<EventArgs>) {
        if (!this || !(this instanceof TestViewModel))
            alert("ERROR: this is not scoped to TestViewModel.");
        if (e.sender)
            alert("TestMethod called. [" + e.sender.constructor.name + "]");
        else if (e.parameter)
            alert("TestMethod called. [" + e.parameter.Name + "]");
    }
    AddObservableItem(e: Fayde.IEventBindingArgs<Fayde.Input.MouseEventArgs>) {
        this.ObsItems.Add(this.ObsItems.Count.toString());
    }
    private static ctor = (() => {
        Fayde.MVVM.NotifyProperties(TestViewModel, ["SelectedItem", "SomeText"]);
    })();
}
export = TestViewModel;