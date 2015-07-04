class NavigationViewModel extends Fayde.MVVM.ObservableObject {
    Links: any[] = [];

    constructor () {
        super();
        this.Links.push({ Name: "Home", Uri: "" });
        this.Links.push({ Name: "Page 1", Uri: "/page1" });
        this.Links.push({ Name: "Page 2", Uri: "/page2" });
    }
}
export = NavigationViewModel;