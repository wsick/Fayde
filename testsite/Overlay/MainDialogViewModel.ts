import ChooserViewModel = require('./ChooserViewModel');
import DialogViewModel = Fayde.MVVM.DialogViewModel;

class MainDialogViewModel extends Fayde.MVVM.ViewModelBase {
    Color: string = "#ffffff";
    LaunchChooser: DialogViewModel<any, string>;

    constructor () {
        super();
        this.LaunchChooser = new DialogViewModel<any, string>({
            ViewModelBuilder: (builder: any) => new ChooserViewModel(this.Color),
            AcceptAction: (data: string) => this.Color = data
        });
    }
}
Fayde.MVVM.NotifyProperties(MainDialogViewModel, ["Color", "LaunchChooser"]);
export = MainDialogViewModel;