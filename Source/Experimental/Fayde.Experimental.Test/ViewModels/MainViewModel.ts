/// <reference path="../lib/Fayde/Fayde.d.ts" />

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    Items = new Fayde.Collections.ObservableCollection();
    constructor() {
        super();
        this.Items.AddRange([
            {
                FirstName: "First1",
                LastName: "Last1"
            },
            {
                FirstName: "First2",
                LastName: "Last2"
            },
            {
                FirstName: "First3",
                LastName: "Last3"
            },
            {
                FirstName: "First4",
                LastName: "Last4"
            }
        ]);
    }
    RemoveItem(args: Fayde.IEventBindingArgs<Fayde.RoutedEventArgs>) {
        if (!args.parameter)
            return;
        this.Items.Remove(args.parameter);
    }
}
export = MainViewModel;