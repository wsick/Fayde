import RelayCommand = Fayde.MVVM.RelayCommand;
import ObservableCollection = Fayde.Collections.ObservableCollection;
import Item = require('./Item');

class ListBoxManagerViewModel extends Fayde.MVVM.ViewModelBase {
    HideCommand: RelayCommand;
    RemoveCommand: RelayCommand;
    Items = new ObservableCollection<Item>();

    constructor () {
        super();
        this.Items.AddRange([
            new Item("Item 1"),
            new Item("Item 2"),
            new Item("Item 3"),
            new Item("Item 4"),
            new Item("Item 5"),
            new Item("Item 6"),
            new Item("Item 7"),
            new Item("Item 8"),
            new Item("Item 9"),
            new Item("Item 10")
        ]);
        this.RemoveCommand = new RelayCommand((par) => {
            this.Items.Remove(par);
        });
        this.HideCommand = new RelayCommand((par) => {
            par.Visible = false;
        });
    }
}
export = ListBoxManagerViewModel;