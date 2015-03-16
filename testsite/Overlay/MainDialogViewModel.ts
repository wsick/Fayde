import ChooserViewModel = require('./ChooserViewModel');
import DialogViewModel = Fayde.MVVM.DialogViewModel;

class MainDialogViewModel extends Fayde.MVVM.ViewModelBase {
    Color: string = "#ffffff";
    LaunchChooser: DialogViewModel<any, ChooserViewModel>;

    constructor () {
        super();
        this.LaunchChooser = new DialogViewModel({
            ViewModelBuilder: (builder: any) => new ChooserViewModel(this.Color),
            AcceptAction: (data: ChooserViewModel) => this.Color = data.Color
        });
    }
}
Fayde.MVVM.NotifyProperties(MainDialogViewModel, ["Color", "LaunchChooser"]);
export = MainDialogViewModel;