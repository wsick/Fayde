/// <reference path="../lib/Fayde/Fayde.d.ts" />

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    Items = new Fayde.Collections.ObservableCollection();
    constructor() {
        super();
        this.Items.AddRange([
            {
                FirstName: "First",
                LastName: "Last"
            },
            {
                FirstName: "First",
                LastName: "Last"
            },
            {
                FirstName: "First",
                LastName: "Last"
            },
            {
                FirstName: "First",
                LastName: "Last"
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