class ChooserViewModel extends Fayde.MVVM.ViewModelBase {
    OriginalColor: string;
    Color: string;

    constructor (color: string) {
        super();
        this.Color = this.OriginalColor = color;
    }
}
Fayde.MVVM.NotifyProperties(ChooserViewModel, ["Color"]);
export = ChooserViewModel;