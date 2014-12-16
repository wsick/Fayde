import StressTest = require('../StressTest');

class ListBox extends StressTest {
    listBox: Fayde.Controls.ListBox;
    allItems: Fayde.Collections.ObservableCollection<any>;

    prepare (ready?: () => any): boolean {
        this.listBox = new Fayde.Controls.ListBox();
        Fayde.Controls.VirtualizingPanel.SetVirtualizationMode(this.listBox, Fayde.Controls.VirtualizationMode.Standard);
        this.allItems = new Fayde.Collections.ObservableCollection();
        for (var i = 0; i < 1000; i++) {
            this.allItems.Add({
                name: "Item " + i.toString()
            });
        }
        return false;
    }

    runIteration () {
        var lb = this.listBox;
        for (var i = 0; i < 10; i++) {
            lb.ItemsSource = this.allItems;
            lb.Measure(new minerva.Size(200, 500));
            lb.ItemsSource = null;
            lb.Measure(new minerva.Size(200, 500));
        }
    }
}
export = ListBox;