class Item extends Fayde.MVVM.ObservableObject {
    Display: string;
    Visible: boolean;

    constructor (display: string) {
        super();
        this.Display = display;
        this.Visible = true;
    }
}
Fayde.MVVM.NotifyProperties(Item, ["Display", "Visible"]);
export = Item;
