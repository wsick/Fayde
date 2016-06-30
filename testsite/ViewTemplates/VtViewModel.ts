import VtItemViewModel = require("./VtItemViewModel");

class VtViewModel extends Fayde.MVVM.ViewModelBase
{
    ListItems = new Fayde.Collections.ObservableCollection<VtItemViewModel>();

    constructor()
    {
        super();
        this.ListItems.Add(new VtItemViewModel("One"));
        this.ListItems.Add(new VtItemViewModel("Two"));
        this.ListItems.Add(new VtItemViewModel("Three"));
    }
}
export = VtViewModel;