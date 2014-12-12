import MVVM = Fayde.MVVM;
import RelayCommand = MVVM.RelayCommand;
import FilteredCollection = Fayde.Collections.FilteredCollection;
import DeepObservableCollection = Fayde.Collections.DeepObservableCollection;
import Item = require('./Item');

class FilteredViewModel extends MVVM.ViewModelBase {
    ToggleEvenCommand: RelayCommand;
    ToggleOddCommand: RelayCommand;
    Items = new FilteredCollection<Item>();

    private _Odd = true;
    private _Even = true;

    constructor () {
        super();
        var source = new DeepObservableCollection<Item>();
        source.AddRange([
            new Item("Item 0"),
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

        this.Items = new FilteredCollection<Item>((item, index) => this.FilterItem(item, index), source);

        this.ToggleEvenCommand = new RelayCommand((par) => this.ToggleEven());
        this.ToggleOddCommand = new RelayCommand((par) => this.ToggleOdd());
    }

    ToggleOdd () {
        this._Odd = !this._Odd;
        this.Items.Update();
    }

    ToggleEven () {
        this._Even = !this._Even;
        this.Items.Update();
    }

    FilterItem (item: Item, index: number): boolean {
        return ((index % 2 === 0) ? this._Even : this._Odd) === true;
    }
}
export = FilteredViewModel;