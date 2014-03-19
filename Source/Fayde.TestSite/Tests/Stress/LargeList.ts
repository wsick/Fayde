class LargeListViewModel {
    Items: any[] = [];
    constructor() {
        for (var i = 0; i < 1000000; i++) {
            this.Items.push("ListBoxItem " + i);
        }
    }
}
export = LargeListViewModel;