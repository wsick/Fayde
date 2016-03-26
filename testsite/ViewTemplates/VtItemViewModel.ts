class VtItemViewModel extends Fayde.MVVM.ViewModelBase
{
    DisplayName:string;

    constructor(displayname:string)
    {
        super();
        this.DisplayName = displayname;
    }
}
export = VtItemViewModel;