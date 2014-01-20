/// <reference path="../../../jsbin/Fayde.d.ts" />

import RelayCommand = Fayde.MVVM.RelayCommand;

class DoubleListBoxViewModel extends Fayde.MVVM.ViewModelBase {
    AllItems = new Fayde.Collections.ObservableCollection<any>();
    AddItemCommand: RelayCommand;
    RemoveFirstItemCommand: RelayCommand;
    constructor() {
        super();
        for (var i = 0; i < 6; i++) {
            var ni = {
                SubItems: new Fayde.Collections.ObservableCollection()
            };
            ni.SubItems.AddRange([1, 2, 3, 4, 5]);
            this.AllItems.Add(ni);
        }
        this.AddItemCommand = new RelayCommand(() => this.Add());
        this.RemoveFirstItemCommand = new RelayCommand(() => this.RemoveFirst());
    }

    private Add() {
        if (this.AllItems.Count < 1)
            return;
        var first = this.AllItems.GetValueAt(0);
        first.SubItems.Add(first.SubItems.Count);
    }
    private RemoveFirst() {
        if (this.AllItems.Count < 1)
            return;
        var first = this.AllItems.GetValueAt(0);
        if (first.SubItems.Count < 1)
            return;
        first.SubItems.RemoveAt(0);
        if (first.SubItems.Count < 1)
            this.AllItems.RemoveAt(0);
    }
}
export = DoubleListBoxViewModel;