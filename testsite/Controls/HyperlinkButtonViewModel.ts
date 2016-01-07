class HyperlinkButtonViewModel extends Fayde.MVVM.ViewModelBase {
    Item: string;
    
    constructor()
    {
        this.Item = "This is a test";
        super();        
    }
}
export = HyperlinkButtonViewModel;