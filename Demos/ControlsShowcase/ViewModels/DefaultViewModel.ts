/// <reference path="../lib/Fayde/Fayde.d.ts" />

import MenuItem = require("Models/TreeData");

class DefaultViewModel extends Fayde.MVVM.ViewModelBase {
    Menu: Fayde.Collections.ObservableCollection<MenuItem> = new Fayde.Collections.ObservableCollection<MenuItem>();

    constructor() {
        super();
        this.Load();
    }

    Load() {
        var item = new MenuItem("Controls");
        this.Menu.Add(item);
        item.Children.Add(new MenuItem("Input Controls", "Input"));

        item.Children.Add(new MenuItem("ItemsControl", "ItemsControl"));
        item.Children.Add(new MenuItem("DatePicker", "DatePicker"));
        item.Children.Add(new MenuItem("Calendar", "Calendar"));
        item.Children.Add(new MenuItem("GridSpliter", "GridSpliter"));
        item.Children.Add(new MenuItem("TreeView", "TreeView"));
        item.Children.Add(new MenuItem("Tab Control", "Tab"));
        item.Children.Add(new MenuItem("Accordion", "Accordion"));
        
        var item = new MenuItem("Layout Panels");
        this.Menu.Add(item);
        item.Children.Add(new MenuItem("Grid", "TreeView"));
        item.Children.Add(new MenuItem("StackPanel", "Home"));
        item.Children.Add(new MenuItem("DockPanel", "TreeView"));
        item.Children.Add(new MenuItem("WrapPanel", "Home"));

        var item = new MenuItem("DataVisualization");
        this.Menu.Add(item);
        item.Children.Add(new MenuItem("Area Series", "TreeView"));
        item.Children.Add(new MenuItem("Bar Series", "TreeView"));
        item.Children.Add(new MenuItem("Bubble Series", "TreeView"));
        item.Children.Add(new MenuItem("Column Series", "TreeView"));
        item.Children.Add(new MenuItem("Line Series", "TreeView"));
        item.Children.Add(new MenuItem("Pie Series", "TreeView"));
        item.Children.Add(new MenuItem("Scatter Series", "TreeView"));
        item.Children.Add(new MenuItem("Stacked Series", "TreeView"));
        item.Children.Add(new MenuItem("TreeMap", "TreeView"));

        var item = new MenuItem("Navigation", "Navigation");
        this.Menu.Add(item);

        var item = new MenuItem("Theming", "Theming");
        this.Menu.Add(item);
        
        
    }
}

export = DefaultViewModel;