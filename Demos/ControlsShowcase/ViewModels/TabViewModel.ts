/// <reference path="../lib/Fayde.Controls/Fayde.Controls.Ex.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

class TabViewModel extends Fayde.MVVM.ViewModelBase {

    Tabs: Fayde.Collections.ObservableCollection<Fayde.Controls.TabItem> = new Fayde.Collections.ObservableCollection<Fayde.Controls.TabItem>();

    constructor() {
        super();
        this.Load();
    }

    private _addTabCommand: Fayde.Input.ICommand = null;
    get AddTabCommand(): Fayde.Input.ICommand {
        if (this._addTabCommand === null) {
            this._addTabCommand = new Fayde.MVVM.RelayCommand(
                () => this.AddTab(),
                () => this.CanAddTab());
        }
        return this._addTabCommand;
    }

    AddTab() {
        var index = this.Tabs.Count + 1;
        var item = new Fayde.Controls.TabItem();
        item.Header = "Tab" + index;
        item.Content = "Content in Tab" + index;
        this.Tabs.Add(item);
    }
    CanAddTab() {
        return this.Tabs.Count < 10;
    }

    Load() {
        this.AddTab();
        this.AddTab();
    }
}
export = TabViewModel
